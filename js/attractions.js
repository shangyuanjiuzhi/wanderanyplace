// Attractions Page JavaScript
// Shared functionality for Great Wall, Forbidden City, and Summer Palace pages

// Carousel functionality
const carouselStates = {};

function showSlide(index, carouselId) {
  // Try both with and without '-carousel' suffix
  let carousel = document.getElementById(`${carouselId}`);
  if (!carousel) {
    carousel = document.getElementById(`${carouselId}-carousel`);
  }
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.carousel-item');
  
  // Hide all slides - remove active class and add hidden class
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.classList.add('hidden');
  });
  
  // Show the selected slide
  slides[index].classList.remove('hidden');
  slides[index].classList.add('active');
  
  // Update current slide for this carousel
  if (!carouselStates[carouselId]) {
    carouselStates[carouselId] = { current: 0, total: slides.length };
  }
  carouselStates[carouselId].current = index;
  carouselStates[carouselId].total = slides.length;
}

function nextSlide(carouselId) {
  let state = carouselStates[carouselId];
  if (!state) {
    // Initialize carousel state if it doesn't exist
    // Try both with and without '-carousel' suffix
    let carousel = document.getElementById(carouselId);
    if (!carousel) {
      carousel = document.getElementById(`${carouselId}-carousel`);
    }
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.carousel-item');
    state = { current: 0, total: slides.length };
    carouselStates[carouselId] = state;
  }
  
  let next = state.current + 1;
  if (next >= state.total) next = 0;
  showSlide(next, carouselId);
}

function prevSlide(carouselId) {
  let state = carouselStates[carouselId];
  if (!state) {
    // Initialize carousel state if it doesn't exist
    // Try both with and without '-carousel' suffix
    let carousel = document.getElementById(carouselId);
    if (!carousel) {
      carousel = document.getElementById(`${carouselId}-carousel`);
    }
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.carousel-item');
    state = { current: 0, total: slides.length };
    carouselStates[carouselId] = state;
  }
  
  let prev = state.current - 1;
  if (prev < 0) prev = state.total - 1;
  showSlide(prev, carouselId);
}

function goToSlide(index, carouselId) {
  showSlide(index, carouselId);
}

// Image Viewer functionality
let allImages = [];
let currentImageIndex = 0;

// Initialize image viewer
function initImageViewer() {
  // Get all images except background image
  const images = document.querySelectorAll('img:not(.header-bg)');
  allImages = Array.from(images);
  
  // Add click event to each image
  allImages.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openImageViewer(index);
    });
  });
  
  // Close modal on background click
  const modal = document.getElementById('imageViewerModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'imageViewerModal') {
        closeImageViewer();
      }
    });
    
    // Close modal on button click
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeImageViewer);
    }
    
    // Previous image
    const prevBtn = document.getElementById('prevImage');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPreviousImage();
      });
    }
    
    // Next image
    const nextBtn = document.getElementById('nextImage');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
      });
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageViewerModal');
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeImageViewer();
      } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
}

function openImageViewer(index) {
  currentImageIndex = index;
  const modal = document.getElementById('imageViewerModal');
  const modalImage = document.getElementById('modalImage');
  const currentIndexEl = document.getElementById('currentIndex');
  const totalImagesEl = document.getElementById('totalImages');
  
  if (modal && modalImage && currentIndexEl && totalImagesEl) {
    modalImage.src = allImages[index].src;
    modalImage.alt = allImages[index].alt;
    currentIndexEl.textContent = index + 1;
    totalImagesEl.textContent = allImages.length;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeImageViewer() {
  const modal = document.getElementById('imageViewerModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

function showPreviousImage() {
  if (allImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
  openImageViewer(currentImageIndex);
}

function showNextImage() {
  if (allImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % allImages.length;
  openImageViewer(currentImageIndex);
}

// Copy address function
function copyAddress(type = 'badaling') {
  let address;
  if (type === 'mutianyu') {
    address = "北京市怀柔区慕田峪长城\nMutianyu Great Wall, Huairou District, Beijing, China";
  } else if (type === 'juyongguan') {
    address = "北京市昌平区居庸关长城\nJuyongguan Great Wall, Changping District, Beijing, China";
  } else if (type === 'huanghuacheng') {
    address = "北京市怀柔区黄花城水长城\nHuanghuacheng Water Great Wall, Huairou District, Beijing, China";
  } else if (type === 'jiankou') {
    address = "北京市怀柔区箭扣长城\nJiankou Great Wall, Huairou District, Beijing, China";
  } else if (type === 'simatai') {
    address = "北京市密云区司马台长城\nSimatai Great Wall, Miyun District, Beijing, China";
  } else if (type === 'badaling-remnant') {
    address = "北京市延庆区八达岭残长城\nBadaling Remnant Great Wall, Yanqing District, Beijing, China";
  } else if (type === 'gubeikou') {
    address = "北京市密云区古北口长城\nGubeikou Great Wall, Miyun District, Beijing, China";
  } else if (type === 'badaling-forest') {
    address = "北京市延庆区八达岭国家森林公园\nBadaling National Forest Park, Yanqing District, Beijing, China";
  } else if (type === 'forbidden') {
    address = "Forbidden City, Dongcheng District, Beijing, China";
  } else if (type === 'summer') {
    address = "Summer Palace, Haidian District, Beijing, China";
  } else {
    address = "北京市延庆区G6京藏高速58号出口\nBadaling Great Wall, Yanqing District, Beijing, China";
  }
  navigator.clipboard.writeText(address)
    .then(() => {
      alert('Address copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy address: ', err);
    });
}

// Tab functionality for Great Wall page
function openTab(tabId) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('#badaling-tab, #mutianyu-tab, #juyongguan-tab, #other-tab');
  tabContents.forEach(content => {
    content.classList.add('hidden');
  });
  
  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('text-rose-600', 'border-b-2', 'border-rose-600');
    button.classList.add('text-slate-500');
  });
  
  // Show the selected tab content
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
  }
  
  // Add active class to the clicked tab button
  if (event && event.currentTarget) {
    event.currentTarget.classList.remove('text-slate-500');
    event.currentTarget.classList.add('text-rose-600', 'border-b-2', 'border-rose-600');
  }
}

// Transportation toggle functionality
function toggleTransportation() {
  const items = document.querySelectorAll('#transportation-content li');
  const toggle = document.getElementById('transportation-toggle');
  if (!items.length || !toggle) return;
  
  const hasHiddenItems = Array.from(items).some(item => item.classList.contains('hidden'));
  
  items.forEach(item => {
    if (hasHiddenItems) {
      // If there are hidden items, show all
      item.classList.remove('hidden');
      item.classList.add('block');
      toggle.textContent = 'Collapse';
    } else {
      // If all are visible, hide the extra ones (keep first one)
      if (item !== items[0]) {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
      toggle.textContent = 'Expand All >';
    }
  });
}

function toggleJiankouTransportation() {
  const items = document.querySelectorAll('#jiankou-transportation-content li');
  const toggle = document.getElementById('jiankou-transportation-toggle');
  if (!items.length || !toggle) return;
  
  const hasHiddenItems = Array.from(items).some(item => item.classList.contains('hidden'));
  
  items.forEach(item => {
    if (hasHiddenItems) {
      // If there are hidden items, show all
      item.classList.remove('hidden');
      item.classList.add('block');
      toggle.textContent = 'Collapse';
    } else {
      // If all are visible, hide the extra ones (keep first one)
      if (item !== items[0]) {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
      toggle.textContent = 'More >';
    }
  });
}

function toggleSimataiTransportation() {
  const items = document.querySelectorAll('#simatai-transportation-content li');
  const toggle = document.getElementById('simatai-transportation-toggle');
  if (!items.length || !toggle) return;
  
  const hasHiddenItems = Array.from(items).some(item => item.classList.contains('hidden'));
  
  items.forEach(item => {
    if (hasHiddenItems) {
      // If there are hidden items, show all
      item.classList.remove('hidden');
      item.classList.add('block');
      toggle.textContent = 'Collapse';
    } else {
      // If all are visible, hide the extra ones (keep first one)
      if (item !== items[0]) {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
      toggle.textContent = 'More >';
    }
  });
}

function toggleBadalingRemnantTransportation() {
  const items = document.querySelectorAll('#badaling-remnant-transportation-content li');
  const toggle = document.getElementById('badaling-remnant-transportation-toggle');
  if (!items.length || !toggle) return;
  
  const hasHiddenItems = Array.from(items).some(item => item.classList.contains('hidden'));
  
  items.forEach(item => {
    if (hasHiddenItems) {
      // If there are hidden items, show all
      item.classList.remove('hidden');
      item.classList.add('block');
      toggle.textContent = 'Collapse';
    } else {
      // If all are visible, hide the extra ones (keep first one)
      if (item !== items[0]) {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
      toggle.textContent = 'More >';
    }
  });
}

function toggleBadalingRemnantOpeningHours() {
  const items = document.querySelectorAll('#badaling-remnant-opening-hours-content li');
  const toggle = document.getElementById('badaling-remnant-opening-hours-toggle');
  if (!items.length || !toggle) return;
  
  const hasHiddenItems = Array.from(items).some(item => item.classList.contains('hidden'));
  
  items.forEach(item => {
    if (hasHiddenItems) {
      // If there are hidden items, show all
      item.classList.remove('hidden');
      item.classList.add('block');
      toggle.textContent = 'Collapse';
    } else {
      // If all are visible, hide the extra ones (keep first one)
      if (item !== items[0]) {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
      toggle.textContent = 'More >';
    }
  });
}

function toggleBadalingForestTransportation() {
  const items = document.querySelectorAll('#badaling-forest-transportation-content li');
  const toggle = document.getElementById('badaling-forest-transportation-toggle');
  if (!items.length || !toggle) return;
  
  const hasHiddenItems = Array.from(items).some(item => item.classList.contains('hidden'));
  
  items.forEach(item => {
    if (hasHiddenItems) {
      // If there are hidden items, show all
      item.classList.remove('hidden');
      item.classList.add('block');
      toggle.textContent = 'Collapse';
    } else {
      // If all are visible, hide the extra ones (keep first one)
      if (item !== items[0]) {
        item.classList.add('hidden');
        item.classList.remove('block');
      }
      toggle.textContent = 'More >';
    }
  });
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize image viewer
  initImageViewer();
  
  // Initialize carousels (specific to each page)
  const carousels = [
    'badaling-carousel',
    'mutianyu-carousel',
    'mutianyu-map-carousel',
    'juyongguan-carousel',
    'huanghuacheng-carousel',
    'jiankou-carousel',
    'gubeikou-carousel',
    'badaling-forest-carousel',
    'forbidden-carousel',
    'forbidden-map-carousel',
    'summer-carousel',
    'summer-map-carousel',
    'temple-carousel',
    'temple-map-carousel',
    'tiananmen-carousel',
    'tiananmen-map-carousel',
    'yuanmingyuan-carousel',
    'yuanmingyuan-map-carousel',
    'jingshan-carousel',
    'jingshan-map-carousel'
  ];
  
  carousels.forEach(carouselId => {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      showSlide(0, carouselId);
    }
  });
});
