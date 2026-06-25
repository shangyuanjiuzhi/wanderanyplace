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

    return res.status(404).json({ success: false, message: 'Endpoint not found' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}