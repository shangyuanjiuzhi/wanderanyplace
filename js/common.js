// Common JavaScript functions for Beijing travel website

// Mobile Menu Functions
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

// Clipboard Functions
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    alert('Address copied to clipboard!');
  }, function(err) {
    console.error('Failed to copy: ', err);
  });
}

// Carousel Functions - Type 1: Flex scroll carousel
function nextSlide(carouselId) {
  const carousel = document.getElementById(carouselId + '-carousel');
  if (!carousel) return;
  
  // Try flex scroll carousel first
  const container = carousel.parentElement;
  const scrollWidth = carousel.scrollWidth;
  const clientWidth = carousel.clientWidth;
  const currentScroll = carousel.scrollLeft;
  
  if (scrollWidth > clientWidth) {
    // Flex scroll carousel - use clientWidth as item width for consistent scrolling
    const itemWidth = clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    let nextScroll = currentScroll + itemWidth;
    
    if (nextScroll > maxScroll) {
      nextScroll = 0;
    }
    
    carousel.scrollTo({
      left: nextScroll,
      behavior: 'smooth'
    });
    return;
  }
  
  // Fallback to hidden/show carousel
  const items = carousel.querySelectorAll('.carousel-item');
  if (!items.length) return;
  
  let currentIndex = 0;
  items.forEach((item, i) => { if (!item.classList.contains('hidden')) currentIndex = i; });
  items[currentIndex].classList.add('hidden');
  items[currentIndex].classList.remove('active');
  items[(currentIndex + 1) % items.length].classList.remove('hidden');
  items[(currentIndex + 1) % items.length].classList.add('active');
}

function prevSlide(carouselId) {
  const carousel = document.getElementById(carouselId + '-carousel');
  if (!carousel) return;
  
  // Try flex scroll carousel first
  const container = carousel.parentElement;
  const scrollWidth = carousel.scrollWidth;
  const clientWidth = carousel.clientWidth;
  const currentScroll = carousel.scrollLeft;
  
  if (scrollWidth > clientWidth) {
    // Flex scroll carousel - use clientWidth as item width for consistent scrolling
    const itemWidth = clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    let prevScroll = currentScroll - itemWidth;
    
    if (prevScroll < 0) {
      prevScroll = maxScroll;
    }
    
    carousel.scrollTo({
      left: prevScroll,
      behavior: 'smooth'
    });
    return;
  }
  
  // Fallback to hidden/show carousel
  const items = carousel.querySelectorAll('.carousel-item');
  if (!items.length) return;
  
  let currentIndex = 0;
  items.forEach((item, i) => { if (!item.classList.contains('hidden')) currentIndex = i; });
  items[currentIndex].classList.add('hidden');
  items[currentIndex].classList.remove('active');
  items[(currentIndex - 1 + items.length) % items.length].classList.remove('hidden');
  items[(currentIndex - 1 + items.length) % items.length].classList.add('active');
}

function goToSlide(index, carouselId) {
  const carousel = document.getElementById(carouselId + '-carousel');
  if (!carousel) return;
  const items = carousel.querySelectorAll('.carousel-item');
  items.forEach(item => { item.classList.add('hidden'); item.classList.remove('active'); });
  items[index].classList.remove('hidden');
  items[index].classList.add('active');
}

// Image Viewer Functions - Universal
var currentImageIndex = 0;
var allImages = [];

function initImageViewer() {
  // Get all images except background image
  const images = document.querySelectorAll('img:not(.header-bg)');
  allImages = Array.from(images).map(img => ({
    src: img.src,
    alt: img.alt || 'Image'
  }));
  
  // Add click event to each image
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openImageViewer(index);
    });
  });

  // Add click event to gallery zoom icons
  const zoomIcons = document.querySelectorAll('.gallery-zoom-icon');
  zoomIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const container = icon.closest('.gallery-container');
      if (container) {
        const img = container.querySelector('.gallery-image');
        if (img) {
          const index = allImages.findIndex(galleryImg => galleryImg.src === img.src);
          if (index !== -1) {
            openImageViewer(index);
          }
        }
      }
    });
  });

  // Add event listeners for modal controls
  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeImageViewer);
  }
  
  const prevImageBtn = document.getElementById('prevImage');
  if (prevImageBtn) {
    prevImageBtn.addEventListener('click', showPrevImage);
  }
  
  const nextImageBtn = document.getElementById('nextImage');
  if (nextImageBtn) {
    nextImageBtn.addEventListener('click', showNextImage);
  }

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageViewerModal');
    if (modal && modal.classList.contains('flex')) {
      if (e.key === 'Escape') {
        closeImageViewer();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });

  // Close modal when clicking outside image
  const modal = document.getElementById('imageViewerModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'imageViewerModal') {
        closeImageViewer();
      }
    });
  }
}

function openImageViewer(index) {
  currentImageIndex = index;
  const modal = document.getElementById('imageViewerModal');
  const modalImage = document.getElementById('modalImage');
  const currentIndexEl = document.getElementById('currentIndex');
  const totalImagesEl = document.getElementById('totalImages');

  if (!modal || !modalImage) return;

  modalImage.src = allImages[index].src;
  modalImage.alt = allImages[index].alt || 'Image';
  
  if (currentIndexEl) {
    currentIndexEl.textContent = index + 1;
  }
  if (totalImagesEl) {
    totalImagesEl.textContent = allImages.length;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
  const modal = document.getElementById('imageViewerModal');
  if (!modal) return;
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Alias functions for compatibility
function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
  openImageViewer(currentImageIndex);
}

function showPreviousImage() {
  showPrevImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % allImages.length;
  openImageViewer(currentImageIndex);
}

function updateModalImage() {
  const modalImage = document.getElementById('modalImage');
  const currentIndexEl = document.getElementById('currentIndex');
  
  if (!modalImage) return;
  
  modalImage.src = allImages[currentImageIndex].src;
  modalImage.alt = allImages[currentImageIndex].alt;
  if (currentIndexEl) currentIndexEl.textContent = currentImageIndex + 1;
}

// Initialize image viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', initImageViewer);

// Tab Functions
function initTabs(containerSelector, options = {}) {
  const {
    useHiddenClass = true,
    activeClasses = ['active', 'border-rose-600', 'text-rose-600'],
    inactiveClasses = ['border-transparent'],
    ariaAttribute = true
  } = options;

  const tabs = document.querySelectorAll(`${containerSelector} button`);
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');

      tabs.forEach(t => {
        t.classList.remove(...activeClasses);
        t.classList.add(...inactiveClasses);
        if (ariaAttribute) {
          t.setAttribute('aria-selected', 'false');
        }
      });

      this.classList.add(...activeClasses);
      this.classList.remove(...inactiveClasses);
      if (ariaAttribute) {
        this.setAttribute('aria-selected', 'true');
      }

      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (useHiddenClass) {
          pane.classList.add('hidden');
        }
      });

      const activePane = document.getElementById(tabId);
      if (activePane) {
        activePane.classList.add('active');
        if (useHiddenClass) {
          activePane.classList.remove('hidden');
        }
      }
    });
  });
}

// Gallery Helper Functions
function createGalleryZoomOverlay() {
  return `
    <div class="gallery-zoom-overlay">
      <div class="gallery-zoom-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
        </svg>
      </div>
    </div>
  `;
}

function createGalleryCaption(text) {
  return `
    <div class="gallery-caption">
      <p>${text}</p>
    </div>
  `;
}

function initGalleryImage(container, imageSrc, imageAlt, captionText) {
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = imageAlt || 'Gallery image';
  img.className = 'h-96 object-contain gallery-image';
  container.appendChild(img);

  if (captionText) {
    container.insertAdjacentHTML('beforeend', createGalleryCaption(captionText));
  }

  container.insertAdjacentHTML('beforeend', createGalleryZoomOverlay());
}

// Scroll Utilities
function initScrollUtils() {
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initScrollUtils);

// Share Utilities
function shareTo(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  
  let shareUrl;
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    default:
      return;
  }
  
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(function() {
    const copySuccess = document.getElementById('copySuccess');
    if (copySuccess) {
      copySuccess.style.opacity = '1';
      setTimeout(function() {
        copySuccess.style.opacity = '0';
      }, 2000);
    }
  }).catch(function(err) {
    console.error('Failed to copy: ', err);
    alert('Failed to copy link. Please try again.');
  });
}
