const API_BASE = '';

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
        'Question': { color: '#6366F1', bgColor: '#EEF2FF'},
        'Share': { color: '#22C55E', bgColor: '#ECFDF5'},
        'Help': { color: '#EF4444', bgColor: '#FEF2F2' },
  };
  return configs[type] || configs['Other'];
}

function initContentLengthCounter(contentId, counterId) {
  const contentField = document.getElementById(contentId);
  const counterField = document.getElementById(counterId);
  if (contentField && counterField) {
    contentField.addEventListener('input', function() {
      const length = this.value.length;
      counterField.textContent = `${length}/300`;
    });
  }
}

function initPostTypeSelector(selectorId) {
  const container = document.getElementById(selectorId);
  if (!container) return;
  
  container.querySelectorAll('.type-option').forEach(function(label) {
    label.addEventListener('click', function(e) {
      container.querySelectorAll('.type-option').forEach(function(opt) {
        opt.classList.remove('border-rose-500', 'bg-rose-50');
        opt.classList.add('border-slate-300');
      });
      this.classList.remove('border-slate-300');
      this.classList.add('border-rose-500', 'bg-rose-50');
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });

    const radio = label.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', function() {
        if (this.checked) {
          container.querySelectorAll('.type-option').forEach(function(opt) {
            opt.classList.remove('border-rose-500', 'bg-rose-50');
            opt.classList.add('border-slate-300');
          });
          label.classList.remove('border-slate-300');
          label.classList.add('border-rose-500', 'bg-rose-50');
        }
      });
    }
  });
}

async function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function() {
      let width = img.width;
      let height = img.height;
      const maxDimension = 1200;
      
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      let quality = 0.8;
      if (file.size > 2 * 1024 * 1024) {
        quality = 0.6;
      } else if (file.size > 1 * 1024 * 1024) {
        quality = 0.7;
      }
      
      const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const compressedDataUrl = canvas.toDataURL(mimeType, quality);
      
      const originalSize = file.size;
      const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);
      
      if (compressedSize < originalSize * 0.9) {
        console.log(`Image compressed: ${(originalSize / 1024).toFixed(1)}KB -> ${(compressedSize / 1024).toFixed(1)}KB`);
        resolve(compressedDataUrl);
      } else {
        const reader = new FileReader();
        reader.onload = function(e) {
          console.log(`Using original image: ${(originalSize / 1024).toFixed(1)}KB (compressed was larger)`);
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    img.onerror = function() {
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    };
    img.src = URL.createObjectURL(file);
  });
}

function addImageInput(uploadImages, uploadId) {
  if (uploadImages.length >= 9) {
    alert('Maximum 9 images allowed');
    return;
  }
  document.getElementById(uploadId || 'image-upload').click();
}

async function handleImageUpload(input, uploadImages, renderCallback) {
  const files = input.files;
  for (let i = 0; i < files.length && uploadImages.length < 9; i++) {
    const file = files[i];
    const compressedDataUrl = await compressImage(file);
    uploadImages.push(compressedDataUrl);
    if (renderCallback) renderCallback();
  }
  input.value = '';
}

function removeImage(index, uploadImages, renderCallback) {
  uploadImages.splice(index, 1);
  if (renderCallback) renderCallback();
}

function renderImages(uploadImages, containerId, addBtnCallback) {
  const container = document.getElementById(containerId);
  container.innerHTML = uploadImages.map((img, index) => `
    <div class="aspect-square relative rounded-lg overflow-hidden group">
      <img src="${img}" alt="Uploaded image" class="w-full h-full object-cover">
      <button onclick="removeImage(${index})" 
              class="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <i class="iconfont icon-cha text-white text-sm"></i>
      </button>
    </div>
  `).join('');
  
  if (uploadImages.length < 9) {
    container.innerHTML += `
      <div class="aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-colors"
           onclick="addImageInput()">
      </div>
    `;
  }
}

function showStatus(message, type) {
  const statusDiv = document.getElementById('status-message');
  if (!statusDiv) return;
  
  statusDiv.textContent = message;
  statusDiv.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
  
  if (type === 'success') {
    statusDiv.classList.add('bg-green-100', 'text-green-700');
  } else {
    statusDiv.classList.add('bg-red-100', 'text-red-700');
  }
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

async function loadCommunityPostsByArea(options) {
  const { area, containerId, loadingId, emptyId, pageSize = 3 } = options;
  const loading = document.getElementById(loadingId);
  const empty = document.getElementById(emptyId);
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(`/api/posts?area=${area}&pageSize=${pageSize}`);
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

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

async function loadComments(articleId) {
  try {
    const response = await fetch(`/api/comments/${articleId}`);
    const result = await response.json();
    
    const container = document.getElementById('commentsList');
    
    if (result.success && result.data.length > 0) {
      container.innerHTML = result.data.map(comment => `
        <div class="bg-white border border-slate-200 rounded-xl p-4">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">
              ${comment.nick.charAt(0).toUpperCase()}
            </div>
            <div>
              <p class="font-medium text-slate-800">${escapeHtml(comment.nick)}</p>
              <p class="text-xs text-slate-500">${formatDate(comment.create_time)}</p>
            </div>
          </div>
          <p class="text-slate-700">${escapeHtml(comment.content)}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p class="text-slate-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>';
    }
  } catch (error) {
    console.error('Error loading comments:', error);
  }
}

function initArticleComments(articleId) {
  document.addEventListener('DOMContentLoaded', function() {
    loadComments(articleId);

    const contentField = document.getElementById('content');
    const charCount = document.getElementById('charCount');
    if (contentField && charCount) {
      contentField.addEventListener('input', function() {
        charCount.textContent = this.value.length;
      });
    }

    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
      commentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nick = document.getElementById('nick').value.trim();
        const content = document.getElementById('content').value.trim();
        
        try {
          const response = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ articleId, nick, content })
          });
          
          const result = await response.json();
          
          if (result.success) {
            alert('Comment submitted successfully!');
            commentForm.reset();
            if (charCount) charCount.textContent = '0';
            loadComments(articleId);
          } else {
            alert(result.message || 'Failed to submit comment');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Network error. Please try again.');
        }
      });
    }
  });
}