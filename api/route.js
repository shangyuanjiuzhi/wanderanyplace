import { Client } from '@neondatabase/serverless';

async function getDbClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL
  });
  await client.connect();
  return client;
}

async function query(sql, params = []) {
  const client = await getDbClient();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    await client.end();
  }
}

async function run(sql, params = []) {
  const client = await getDbClient();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    await client.end();
  }
}

function normalizeTag(tag) {
  if (!tag) return '';
  return tag
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

export default async function handler(req, res) {
  const { method, url, query: qs, body } = req;

  try {
    if (url.startsWith('/api/init-db')) {
      await run(`
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          article_id TEXT NOT NULL,
          nick TEXT NOT NULL,
          content TEXT NOT NULL,
          create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await run(`
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          nick TEXT NOT NULL,
          type TEXT NOT NULL,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          imgs TEXT DEFAULT '[]',
          area TEXT,
          tag TEXT,
          password TEXT,
          create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await run(`
        CREATE TABLE IF NOT EXISTS post_comments (
          id SERIAL PRIMARY KEY,
          post_id INTEGER NOT NULL,
          nick TEXT NOT NULL,
          content TEXT NOT NULL,
          create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
        )
      `);

      return res.json({ success: true, message: 'Database tables created successfully' });
    }

    if (url.startsWith('/api/posts')) {
      const path = url.replace('/api/posts', '');

      if (method === 'GET' && qs.tag) {
        const tag = normalizeTag(qs.tag);
        const pageSize = parseInt(qs.pageSize) || 6;

        if (!tag) {
          return res.json({ success: true, data: [], total: 0 });
        }

        const result = await query(
          "SELECT * FROM posts WHERE LOWER(REPLACE(REPLACE(tag, '-', ''), ' ', '')) LIKE $1 ORDER BY create_time DESC LIMIT $2",
          [`%${tag}%`, pageSize]
        );

        const posts = result.rows.map(post => {
          const imgs = JSON.parse(post.imgs || '[]');
          const processedImgs = imgs.map(img => {
            if (img && img.length > 10240) return null;
            return img;
          }).filter(img => img !== null);
          return { ...post, imgs: processedImgs };
        });

        return res.json({ success: true, data: posts, total: posts.length });
      }

      if (method === 'GET' && (!qs.tag || qs.page)) {
        const page = parseInt(qs.page) || 1;
        const pageSize = parseInt(qs.pageSize) || 6;
        const offset = (page - 1) * pageSize;

        const countResult = await query('SELECT COUNT(*) as total FROM posts');
        const total = parseInt(countResult.rows[0].total);

        const result = await query(
          'SELECT * FROM posts ORDER BY create_time DESC LIMIT $1 OFFSET $2',
          [pageSize, offset]
        );

        const posts = result.rows.map(post => {
          const imgs = JSON.parse(post.imgs || '[]');
          const processedImgs = imgs.map(img => {
            if (img && img.length > 10240) return null;
            return img;
          }).filter(img => img !== null);
          return { ...post, imgs: processedImgs };
        });

        return res.json({
          success: true,
          data: posts,
          total: total,
          page: page,
          pageSize: pageSize
        });
      }

      if (method === 'POST' && path === '') {
        const { nick, type, title, content, imgs, area, tag, password } = body;

        if (!nick || !type || !title || !content) {
          return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields: nickname, type, title, and content'
          });
        }

        if (nick.length < 2 || nick.length > 20) {
          return res.status(400).json({
            success: false,
            message: 'Nickname must be between 2-20 characters'
          });
        }

        if (title.length < 5 || title.length > 100) {
          return res.status(400).json({
            success: false,
            message: 'Title must be between 5-100 characters'
          });
        }

        if (content.length < 10 || content.length > 300) {
          return res.status(400).json({
            success: false,
            message: 'Content must be between 10-300 characters'
          });
        }

        const validTypes = ['Question', 'Share', 'Help'];
        if (!validTypes.includes(type)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid post type. Must be: Question, Share, or Help'
          });
        }

        if (password && !/^\d{4}$/.test(password)) {
          return res.status(400).json({
            success: false,
            message: 'Password must be 4 digits'
          });
        }

        const imgsArray = Array.isArray(imgs) ? imgs : [];
        const imgsJson = JSON.stringify(imgsArray.slice(0, 9));

        const result = await run(
          'INSERT INTO posts (nick, type, title, content, imgs, area, tag, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
          [nick, type, title, content, imgsJson, area || null, tag || null, password || null]
        );

        return res.json({
          success: true,
          message: 'Post submitted successfully',
          data: {
            id: result.rows[0].id,
            nick,
            type,
            title,
            content,
            imgs: imgsArray,
            area,
            create_time: new Date().toISOString()
          }
        });
      }

      if (method === 'GET' && path.startsWith('/') && !path.includes('/delete') && !path.includes('/verify')) {
        const id = path.split('/')[1];
        const result = await query('SELECT * FROM posts WHERE id = $1', [id]);

        if (result.rows.length === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const row = result.rows[0];
        return res.json({
          success: true,
          data: { ...row, imgs: JSON.parse(row.imgs || '[]') }
        });
      }

      if (method === 'PUT' && path.startsWith('/')) {
        const id = path.split('/')[1];
        const { nick, type, title, content, imgs, area, tag, password } = body;

        const verifyResult = await query('SELECT * FROM posts WHERE id = $1', [id]);
        if (verifyResult.rows.length === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const row = verifyResult.rows[0];
        if (row.password !== password) {
          return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const validTypes = ['Question', 'Share', 'Help'];
        if (!validTypes.includes(type)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid post type. Must be: Question, Share, or Help'
          });
        }

        const imgsArray = Array.isArray(imgs) ? imgs : [];
        const imgsJson = JSON.stringify(imgsArray.slice(0, 9));

        await run(
          'UPDATE posts SET type = $1, title = $2, content = $3, imgs = $4, area = $5, tag = $6 WHERE id = $7',
          [type, title, content, imgsJson, area || null, tag || null, id]
        );

        return res.json({ success: true, message: 'Post updated successfully' });
      }

      if (method === 'DELETE' && path.startsWith('/')) {
        const id = path.split('/')[1];
        const result = await run('DELETE FROM posts WHERE id = $1', [id]);

        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        return res.json({ success: true, message: 'Post deleted successfully' });
      }

      if (method === 'POST' && path.includes('/verify')) {
        const id = path.split('/')[1];
        const { password, nick, title } = body;

        const verifyResult = await query('SELECT * FROM posts WHERE id = $1', [id]);
        if (verifyResult.rows.length === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const row = verifyResult.rows[0];

        if (row.password !== password) {
          return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        if (nick && row.nick !== nick) {
          return res.status(401).json({ success: false, message: 'Nickname does not match' });
        }

        if (title && row.title !== title) {
          return res.status(401).json({ success: false, message: 'Title does not match' });
        }

        return res.json({ success: true, message: 'Verification successful' });
      }

      if (method === 'POST' && path.includes('/delete')) {
        const id = path.split('/')[1];
        const { password, nick, title } = body;

        const verifyResult = await query('SELECT * FROM posts WHERE id = $1', [id]);
        if (verifyResult.rows.length === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const row = verifyResult.rows[0];

        if (row.password !== password) {
          return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        if (nick && row.nick !== nick) {
          return res.status(401).json({ success: false, message: 'Nickname does not match' });
        }

        if (title && row.title !== decodeURIComponent(title)) {
          return res.status(401).json({ success: false, message: 'Title does not match' });
        }

        await run('DELETE FROM posts WHERE id = $1', [id]);

        return res.json({ success: true, message: 'Post deleted successfully' });
      }
    }

    if (url.startsWith('/api/comments')) {
      const path = url.replace('/api/comments', '');

      if (method === 'GET' && path.startsWith('/')) {
        const articleId = path.split('/')[1];
        const result = await query(
          'SELECT * FROM comments WHERE article_id = $1 ORDER BY create_time DESC',
          [articleId]
        );

        return res.json({
          success: true,
          data: result.rows,
          total: result.rows.length
        });
      }

      if (method === 'POST' && path === '') {
        const { articleId, nick, content } = body;

        if (!articleId || !nick || !content) {
          return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields: article ID, nickname, and comment content'
          });
        }

        if (nick.length < 2 || nick.length > 20) {
          return res.status(400).json({
            success: false,
            message: 'Nickname must be between 2-20 characters'
          });
        }

        if (content.length < 10 || content.length > 300) {
          return res.status(400).json({
            success: false,
            message: 'Comment content must be between 10-300 characters'
          });
        }

        const result = await run(
          'INSERT INTO comments (article_id, nick, content) VALUES ($1, $2, $3) RETURNING id',
          [articleId, nick, content]
        );

        return res.json({
          success: true,
          message: 'Comment submitted successfully',
          data: {
            id: result.rows[0].id,
            article_id: articleId,
            nick,
            content,
            create_time: new Date().toISOString()
          }
        });
      }
    }

    if (url.startsWith('/api/post-comments')) {
      const path = url.replace('/api/post-comments', '');

      if (method === 'GET' && path.startsWith('/')) {
        const postId = path.split('/')[1];
        const result = await query(
          'SELECT * FROM post_comments WHERE post_id = $1 ORDER BY create_time DESC',
          [postId]
        );

        return res.json({
          success: true,
          data: result.rows,
          total: result.rows.length
        });
      }

      if (method === 'POST' && path === '') {
        const { postId, nick, content } = body;

        if (!postId || !nick || !content) {
          return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields: post ID, nickname, and comment content'
          });
        }

        if (nick.length < 2 || nick.length > 20) {
          return res.status(400).json({
            success: false,
            message: 'Nickname must be between 2-20 characters'
          });
        }

        if (content.length < 1 || content.length > 500) {
          return res.status(400).json({
            success: false,
            message: 'Comment content must be between 1-500 characters'
          });
        }

        const verifyResult = await query('SELECT id FROM posts WHERE id = $1', [postId]);
        if (verifyResult.rows.length === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const result = await run(
          'INSERT INTO post_comments (post_id, nick, content) VALUES ($1, $2, $3) RETURNING id',
          [postId, nick, content]
        );

        return res.json({
          success: true,
          message: 'Comment submitted successfully',
          data: {
            id: result.rows[0].id,
            post_id: postId,
            nick,
            content,
            create_time: new Date().toISOString()
          }
        });
      }

      if (method === 'DELETE' && path.startsWith('/')) {
        const id = path.split('/')[1];
        const result = await run('DELETE FROM post_comments WHERE id = $1', [id]);

        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        return res.json({ success: true, message: 'Comment deleted successfully' });
      }
    }

    if (url.startsWith('/api/admin')) {
      const path = url.replace('/api/admin', '');

      if (method === 'GET' && path === '/comments') {
        const result = await query('SELECT * FROM comments ORDER BY create_time DESC');
        return res.json({
          success: true,
          data: result.rows,
          total: result.rows.length
        });
      }

      if (method === 'DELETE' && path.startsWith('/comments/')) {
        const id = path.split('/')[2];
        const result = await run('DELETE FROM comments WHERE id = $1', [id]);

        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        return res.json({ success: true, message: 'Comment deleted successfully' });
      }

      if (method === 'GET' && path === '/posts') {
        const result = await query('SELECT * FROM posts ORDER BY create_time DESC');
        return res.json({
          success: true,
          total: result.rows.length,
          data: result.rows
        });
      }

      if (method === 'DELETE' && path.startsWith('/posts/')) {
        const id = path.split('/')[2];
        const result = await run('DELETE FROM posts WHERE id = $1', [id]);

        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }

        return res.json({ success: true, message: 'Post deleted successfully' });
      }

      if (method === 'GET' && path === '/post-comments') {
        const result = await query(
          'SELECT pc.*, p.title as post_title FROM post_comments pc LEFT JOIN posts p ON pc.post_id = p.id ORDER BY pc.create_time DESC'
        );
        return res.json({
          success: true,
          data: result.rows,
          total: result.rows.length
        });
      }

      if (method === 'DELETE' && path.startsWith('/post-comments/')) {
        const id = path.split('/')[2];
        const result = await run('DELETE FROM post_comments WHERE id = $1', [id]);

        if (result.rowCount === 0) {
          return res.status(404).json({ success: false, message: 'Post comment not found' });
        }

        return res.json({ success: true, message: 'Post comment deleted successfully' });
      }
    }

    if (url.startsWith('/html/travel-guides/community-id_')) {
      const match = url.match(/community-id_(\d+)\.html/);
      const postId = match ? match[1] : null;

      if (!postId) {
        return res.status(404).send('Post not found');
      }

      const result = await query('SELECT * FROM posts WHERE id = $1', [postId]);

      if (result.rows.length === 0) {
        const notFoundHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Post Not Found | Wander Any Place</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans">
  <header class="bg-black text-white py-4">
    <div class="max-w-4xl mx-auto px-6 flex items-center">
      <a href="/" class="flex items-center">
        <span class="text-rose-500 mr-2">📍</span>
        <span>Wander Any Place</span>
      </a>
    </div>
  </header>
  <main class="py-20 text-center">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="text-xl font-bold text-gray-800 mb-2">Post Not Found</h2>
      <p class="text-gray-500 mb-6">The post you're looking for doesn't exist or has been deleted.</p>
      <button onclick="window.location.href='/html/2.travel guide.html'" class="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors">
        Go Back to List
      </button>
    </div>
  </main>
</body>
</html>`;
        return res.send(notFoundHtml);
      }

      const row = result.rows[0];
      const images = JSON.parse(row.imgs || '[]');

      function escapeHtml(text) {
        const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
      }

      function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }

      const postHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L42GKWJLGB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "G-L42GKWJLGB");
</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(row.title)} | Wander Any Place</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="/iconfont/iconfont.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'sans': ['Noto Sans SC', 'sans-serif'],
          },
          colors: {
            'rose': {
              50: '#FFF1F2',
              100: '#FFE4E6',
              200: '#FECDD3',
              300: '#FDA4AF',
              400: '#FB7185',
              500: '#F43F5E',
              600: '#E11D48',
              700: '#BE123C',
              800: '#9F1239',
              900: '#881337',
            },
          },
        },
      }
    }
  </script>
</head>
<body class="bg-slate-50 font-sans text-slate-800">
  <header class="mobile-header-nav" style="background: black; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div class="nav-container">
      <a href="/html/index.html" class="logo" id="mobileLogo" style="display: flex; align-items: center; text-decoration: none;">
        <i class="iconfont icon-ditu-dibiao" style="color: #F43F5E;"></i>
        <span style="color: white;">Wander Any Place</span>
      </a>
      <div class="desktop-nav" id="desktopNavLinks" style="color: white;">
        <a href="/html/index.html" style="color: white;">Home</a>
        <a href="/html/2.Destination.html" style="color: white;">Destinations</a>
        <a href="/html/2.travel guide.html" style="color: white;">Travel Guides</a>
        <a href="/html/2.booking.html" style="color: white;">Booking Services</a>
        <a href="/html/2.aboutus.html" style="color: white;">About Us</a>
      </div>
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
        <span style="background-color: white;"></span>
        <span style="background-color: white;"></span>
        <span style="background-color: white;"></span>
      </button>
    </div>
  </header>
  <div class="mobile-nav-overlay" id="mobileNav">
    <button class="nav-close-btn" onclick="toggleMobileMenu()">&times;</button>
        <a href="/html/index.html" style="color: white;">Home</a>
        <a href="/html/2.Destination.html" style="color: white;">Destinations</a>
        <a href="/html/2.travel guide.html" style="color: white;">Travel Guides</a>
        <a href="/html/2.booking.html" style="color: white;">Booking Services</a>
        <a href="/html/2.aboutus.html" style="color: white;">About Us</a>
  </div>

  <main class="py-12" style="margin-top: 70px;">
    <div class="max-w-4xl mx-auto px-6">
      <nav class="flex items-center text-sm text-slate-500 mb-6">
        <a href="/html/index.html" class="hover:text-rose-600 transition-colors">Home</a>
        <i class="iconfont icon-youjiantou2 w-4 h-4 mx-2 text-slate-400"></i>
        <a href="/html/2.travel guide.html" class="hover:text-rose-600 transition-colors">Travel Guides</a>
        <i class="iconfont icon-youjiantou2 w-4 h-4 mx-2 text-slate-400"></i>
        <span class="text-slate-700 font-medium">${escapeHtml(row.title).substring(0, 30)}...</span>
      </nav>

      <article class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        ${images.length > 0 ? `
        <div class="relative h-64 md:h-96 overflow-hidden cursor-pointer" onclick="openLightbox(0)">
          <img src="${images[0]}" alt="Post Cover" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <i class="iconfont icon-fangdaqi text-white text-4xl"></i>
          </div>
          <div class="absolute top-4 left-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-slate-800 shadow-sm">
              ${row.type}
            </span>
          </div>
        </div>
        ` : ''}

        <div class="px-6 py-6">
          <h1 class="text-2xl md:text-3xl font-bold text-slate-800 mb-4">${escapeHtml(row.title)}</h1>
          
          <div class="flex items-center justify-between border-t border-b border-slate-100 py-4 mb-6">
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                <span class="text-lg font-bold text-rose-600">${row.nick.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p class="font-medium text-slate-800">${escapeHtml(row.nick)}</p>
                <p class="text-sm text-slate-500">${formatDate(row.create_time)}</p>
              </div>
            </div>
            ${row.area ? `<div class="flex items-center text-sm text-slate-500"><i class="iconfont icon-ditu-dibiao w-4 h-4 mr-1"></i>${escapeHtml(row.area)}</div>` : ''}
          </div>

          ${row.tag ? `<div class="flex flex-wrap gap-2 mb-6">${row.tag.split(',').map(t => t.trim()).filter(t => t).map(tag => `<span class="inline-flex items-center px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}

          <div class="text-slate-600 leading-relaxed whitespace-pre-wrap mb-6">${escapeHtml(row.content)}</div>

          ${images.length > 1 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            ${images.slice(1).map((img, index) => `<div class="relative h-48 rounded-lg overflow-hidden cursor-pointer" onclick="openLightbox(${index + 1})"><img src="${img}" alt="Post image" class="w-full h-full object-cover"><div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"><i class="iconfont icon-fangdaqi text-white text-3xl"></i></div></div>`).join('')}
          </div>
          ` : ''}

          <div class="flex gap-4">
            <button onclick="editPost(${row.id}, '${encodeURIComponent(row.title)}', '${encodeURIComponent(row.nick)}')" class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
             Edit
            </button>
            <button onclick="deletePost(${row.id}, '${encodeURIComponent(row.title)}', '${encodeURIComponent(row.nick)}')" class="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </article>

      <section class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold mb-6">Comments</h2>
        
        <form id="commentForm" class="mb-6">
          <div class="mb-4">
            <label for="nick" class="block text-sm font-medium text-slate-700 mb-1">Nickname</label>
            <input type="text" id="nick" name="nick" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent">
          </div>
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-slate-700 mb-1">Comment</label>
            <textarea id="content" name="content" required rows="3" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"></textarea>
          </div>
          <button type="submit" class="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors">Submit</button>
        </form>

        <div id="commentsList"></div>
      </section>

      <button onclick="goBack()" class="flex items-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
       Back to List
      </button>
    </div>

    <div id="lightboxModal" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center hidden">
      <button id="lightboxClose" onclick="closeLightbox()" class="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl">&times;</button>
      <button id="lightboxPrev" onclick="prevImage()" class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/30 px-2 rounded-full">&lt;</button>
      <button id="lightboxNext" onclick="nextImage()" class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/30 px-2 rounded-full">&gt;</button>
      <img id="lightboxImg" src="" alt="Enlarged image" class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg">
      <div id="lightboxCaption" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
        <span id="lightboxCounter"></span>
      </div>
    </div>
  </main>

  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center">
            <i class="iconfont icon-ditu-dibiao text-rose-500 mr-2"></i>
            Wander Any Place
          </h3>
          <p class="text-gray-400 mb-4">
            Your ultimate guide to exploring China. Discover the best destinations, plan your trip, and make unforgettable memories.
          </p>
        </div>

        <div>
          <h4 class="font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/html/index.html" class="hover:text-rose-400 transition-colors">Home</a></li>
            <li><a href="/html/2.Destination.html" class="hover:text-rose-400 transition-colors">Destinations</a></li>
            <li><a href="/html/2.travel guide.html" class="hover:text-rose-400 transition-colors">Travel Guides</a></li>
            <li><a href="/html/2.booking.html" class="hover:text-rose-400 transition-colors">Booking Services</a></li> 
            <li><a href="/html/2.aboutus.html" class="hover:text-rose-400 transition-colors">About Us</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4">Resources</h4>
          <ul class="space-y-2 text-gray-400">
            <li><a href="/html/2.pre-visa.html" class="hover:text-rose-400 transition-colors">Visa Information</a></li>
            <li><a href="/html/2.pre-app.html" class="hover:text-rose-400 transition-colors">Necessary Apps</a></li>
            <li><a href="/html/2.payment-methods.html" class="hover:text-rose-400 transition-colors">Payment Methods</a></li>
            <li><a href="/html/2.transportation.html" class="hover:text-rose-400 transition-colors">Transportation</a></li>
            <li><a href="/html/2.essential packing copy.html" class="hover:text-rose-400 transition-colors">Essential Packing</a></li>
          </ul>
        </div>

         <div>
          <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
          <p class="text-slate-400">Email: wanderanyplace@gmail.com</p>
        </div>
      </div>
  </footer>

  <script>
    function toggleMobileMenu() {
      const mobileNav = document.getElementById('mobileNav');
      mobileNav.classList.toggle('active');
    }

    function goBack() {
      window.location.href = '/html/2.travel guide.html';
    }

    function editPost(postId, title, nick) {
      window.location.href = '/html/2.travel guide modify.html?id=' + postId + '&title=' + title + '&nick=' + nick;
    }

    function deletePost(postId, title, nick) {
      const password = prompt('Please enter your password to delete this post:');
      if (!password) return;

      fetch('/api/posts/' + postId + '/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: password,
          nick: nick,
          title: title
        })
      })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          alert('Post deleted!');
          goBack();
        } else {
          alert('Delete failed: ' + result.message);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Delete failed due to network error.');
      });
    }

    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    async function loadComments() {
      const container = document.getElementById('commentsList');
      try {
        const response = await fetch('/api/post-comments/' + ${row.id});
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          container.innerHTML = result.data.map(c => '
            <div class="border-b border-slate-100 pb-4 mb-4">
              <div class="flex items-center mb-2">
                <div class="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mr-2">
                  <span class="text-sm font-bold text-rose-600">${c.nick.charAt(0).toUpperCase()}</span>
                </div>
                <span class="font-medium">${escapeHtml(c.nick)}</span>
                <span class="text-xs text-slate-400 ml-2">${formatDate(c.create_time)}</span>
              </div>
              <p class="text-slate-600 pl-10">${escapeHtml(c.content)}</p>
            </div>
          ').join('');
        } else {
          container.innerHTML = '<p class="text-slate-400 text-center py-4">No comments yet.</p>';
        }
      } catch (err) {
        console.error('Failed to load comments:', err);
        container.innerHTML = '<p class="text-slate-400 text-center py-4">Failed to load comments.</p>';
      }
    }

    document.getElementById('commentForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const nick = document.getElementById('nick').value.trim();
      const content = document.getElementById('content').value.trim();
      const submitBtn = e.target.querySelector('button[type="submit"]');

      if (!nick || !content) {
        alert('Please fill in all fields');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        const response = await fetch('/api/post-comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: ${row.id}, nick, content })
        });
        const result = await response.json();

        if (result.success) {
          document.getElementById('commentForm').reset();
          loadComments();
        } else {
          alert('Failed to submit comment: ' + result.message);
        }
      } catch (err) {
        console.error('Failed to submit comment:', err);
        alert('Failed to submit comment due to network error.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    });

    const allImages = ${JSON.stringify(images)};
    let currentImageIndex = 0;

    function openLightbox(index) {
      if (allImages.length === 0) return;
      
      currentImageIndex = index;
      const modal = document.getElementById('lightboxModal');
      const img = document.getElementById('lightboxImg');
      const counter = document.getElementById('lightboxCounter');
      
      img.src = allImages[currentImageIndex];
      counter.textContent = currentImageIndex + 1 + ' / ' + allImages.length;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      const modal = document.getElementById('lightboxModal');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    function prevImage() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
      } else {
        currentImageIndex = allImages.length - 1;
      }
      updateLightbox();
    }

    function nextImage() {
      if (currentImageIndex < allImages.length - 1) {
        currentImageIndex++;
      } else {
        currentImageIndex = 0;
      }
      updateLightbox();
    }

    function updateLightbox() {
      const img = document.getElementById('lightboxImg');
      const counter = document.getElementById('lightboxCounter');
      
      img.src = allImages[currentImageIndex];
      counter.textContent = currentImageIndex + 1 + ' / ' + allImages.length;
    }

    document.getElementById('lightboxModal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('lightboxModal')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('lightboxModal');
      if (!modal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    });

    document.addEventListener('DOMContentLoaded', loadComments);
  </script>
</body>
</html>`;

      return res.send(postHtml);
    }

    return res.status(404).json({ success: false, message: 'Endpoint not found' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}