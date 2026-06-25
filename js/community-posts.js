function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileLogo = document.getElementById('mobileLogo');
  if (mobileNav && menuBtn) {
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    if (mobileLogo) {
      mobileLogo.classList.toggle('mobile-logo-hidden');
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getTypeConfig(type) {
  const configs = {
    'Question': { color: '#6366F1', bgColor: '#EEF2FF' },
    'Share': { color: '#22C55E', bgColor: '#ECFDF5' },
    'Help': { color: '#EF4444', bgColor: '#FEF2F2' },
    'Experience': { color: '#16A34A', bgColor: '#DCFCE7' },
    'Tips': { color: '#F59E0B', bgColor: '#FEF3C7' },
    'Photo': { color: '#8B5CF6', bgColor: '#EDE9FE' },
    'Other': { color: '#E11D48', bgColor: '#FFF1F2' }
  };
  return configs[type] || configs['Other'];
}

async function loadCommunityPosts(options) {
  const { tag, containerId, loadingId, emptyId, pageSize = 3 } = options;
  const loading = document.getElementById(loadingId);
  const empty = document.getElementById(emptyId);
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(`/api/posts/by-tag?tag=${tag}&pageSize=${pageSize}`);
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      renderCommunityPosts(result.data, containerId, loadingId, emptyId);
    } else {
      loading.classList.add('hidden');
      container.classList.add('hidden');
      empty.classList.remove('hidden');
    }
  } catch (error) {
    loading.classList.add('hidden');
    container.classList.add('hidden');
    empty.classList.remove('hidden');
  }
}

function renderCommunityPosts(posts, containerId, loadingId, emptyId) {
  const container = document.getElementById(containerId);
  const loading = document.getElementById(loadingId);
  const empty = document.getElementById(emptyId);

  loading.classList.add('hidden');
  empty.classList.add('hidden');
  container.classList.remove('hidden');

  try {
    container.innerHTML = posts.map(post => {
      const hasImages = post.imgs && post.imgs.length > 0;
      const typeConfig = getTypeConfig(post.type);
      const tags = post.tag ? post.tag.split(',').map(t => t.trim()).filter(t => t) : [];

      return `
        <article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
          ${hasImages ? `
            <div class="relative h-48 overflow-hidden">
              <img src="${escapeHtml(post.imgs[0])}" alt="${escapeHtml(post.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <div class="absolute top-3 left-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90" style="color: ${typeConfig.color};">
                  ${post.type}
                </span>
              </div>
            </div>
          ` : `
            <div class="relative h-48 flex items-center justify-center" style="background-color: ${typeConfig.bgColor};">
              <div class="absolute top-3 left-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90" style="color: ${typeConfig.color};">
                  ${post.type}
                </span>
              </div>
              <p class="text-lg font-bold text-center px-6 line-clamp-3 leading-relaxed" style="color: ${typeConfig.color};">${escapeHtml(post.title)}</p>
            </div>
          `}
          <div class="p-6 flex flex-col flex-1">
            <div class="flex-1">
              <h2 class="text-lg font-bold mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                <a href="../2.travel guide detail.html?id=${post.id}&title=${encodeURIComponent(post.title)}&nick=${encodeURIComponent(post.nick)}">${escapeHtml(post.title)}</a>
              </h2>
              <p class="text-slate-600 text-sm line-clamp-2">${escapeHtml(post.content)}</p>
            </div>
            <br>
            <div class="flex flex-wrap gap-2 mb-4">
              ${tags.slice(0, 3).map(tag => `<span class="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">${escapeHtml(tag)}</span>`).join('')}
              ${post.area ? `<span class="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"><i class="iconfont icon-ditu-dibiao w-3 h-3 mr-1"></i>${escapeHtml(post.area)}</span>` : ''}
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm">
                  ${escapeHtml(post.nick.charAt(0).toUpperCase())}
                </div>
                <span class="ml-2 text-sm text-slate-500">${escapeHtml(post.nick)}</span>
              </div>
              <a href="../2.travel guide detail.html?id=${post.id}&title=${encodeURIComponent(post.title)}&nick=${encodeURIComponent(post.nick)}" class="inline-flex items-center text-rose-600 font-medium hover:text-rose-700 transition-colors">
                Read More
                <i class="iconfont icon-arrow-right-s-line w-5 h-5 ml-1"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  } catch (renderError) {
    container.innerHTML = '<p class="text-center text-red-500">Failed to render posts</p>';
  }
}