function initTravelGuide(articleId) {
  document.addEventListener('DOMContentLoaded', function() {
    loadComments(articleId);
    
    const contentInput = document.getElementById('content');
    if (contentInput) {
      contentInput.addEventListener('input', function() {
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = this.value.length;
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
            const charCount = document.getElementById('charCount');
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

async function loadComments(articleId) {
  try {
    const response = await fetch(`/api/comments/${articleId}`);
    const result = await response.json();
    
    const container = document.getElementById('commentsList');
    if (!container) return;
    
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
          <p class="text-slate-700 pl-13">${escapeHtml(comment.content)}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p class="text-slate-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>';
    }
  } catch (error) {
    console.error('Error loading comments:', error);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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

function shareTo(platform) {
  const url = window.location.href;
  const title = document.title;
  
  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  } else if (platform === 'weibo') {
    window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  } else if (platform === 'wechat') {
    alert('Open WeChat and share manually, or copy the link below:\n' + url);
  }
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const successMsg = document.getElementById('copySuccess');
    if (successMsg) {
      successMsg.style.opacity = '1';
      setTimeout(() => {
        successMsg.style.opacity = '0';
      }, 2000);
    }
  }).catch(err => {
    alert('Failed to copy link. Please copy manually: ' + url);
  });
}