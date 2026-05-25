// Common JavaScript functions for Beijing travel website

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
function openTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.add('hidden');
  });

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('text-rose-600', 'border-b-2', 'border-rose-600');
    button.classList.add('text-slate-500');
  });

  // Show selected tab content
  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.classList.remove('hidden');
  }

  // Add active class to clicked button
  if (event && event.target) {
    event.target.classList.remove('text-slate-500');
    event.target.classList.add('text-rose-600', 'border-b-2', 'border-rose-600');
  }
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
