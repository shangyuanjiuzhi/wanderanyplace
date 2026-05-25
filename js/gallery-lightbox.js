// Gallery Lightbox - 独立的图片放大切换功能
// 供 3.1.2-3.1.17 等页面引用

let lightboxActive = false;

function openLightbox(imageUrl, imageArray = null) {
  if (lightboxActive) {
    return;
  }
  lightboxActive = true;
  
  const images = imageArray && imageArray.length > 0 ? [...imageArray] : [imageUrl];
  let currentIndex = images.indexOf(imageUrl);
  if (currentIndex === -1) currentIndex = 0;
  
  const lightbox = document.createElement('div');
  lightbox.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center';
  lightbox.onclick = function() {
    lightbox.remove();
    lightboxActive = false;
  };
  
  const img = document.createElement('img');
  img.src = images[currentIndex];
  img.className = 'max-w-[90vw] max-h-[90vh] object-contain';
  img.onclick = function(e) {
    e.stopPropagation();
  };
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'absolute top-4 right-4 text-white text-2xl hover:text-gray-300';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = function() {
    lightbox.remove();
    lightboxActive = false;
  };
  
  if (images.length > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center';
    prevBtn.innerHTML = '<i class="iconfont icon-zuojiantou3 text-xl"></i>';
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      img.src = images[currentIndex];
      updateCounter();
    };
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/30 hover:bg-black/50 rounded-full w-12 h-12 flex items-center justify-center';
    nextBtn.innerHTML = '<i class="iconfont icon-youjiantou2 text-xl"></i>';
    nextBtn.onclick = function(e) {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      img.src = images[currentIndex];
      updateCounter();
    };
    
    const counter = document.createElement('div');
    counter.className = 'absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full';
    const updateCounter = function() {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    };
    updateCounter();
    
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.appendChild(counter);
  }
  
  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);
}
