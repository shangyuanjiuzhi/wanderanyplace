// City Wander Carousel
class Carousel {
  constructor(id) {
    this.id = id;
    this.carousel = document.getElementById(id + '-carousel');
    if (!this.carousel) return;
    this.items = Array.from(this.carousel.querySelectorAll('.gallery-container'));
    this.currentIndex = 0;
    this.lock = false;
  }
  
  goTo(index) {
    if (this.lock || !this.carousel) return;
    this.lock = true;
    
    this.currentIndex = ((index % this.items.length) + this.items.length) % this.items.length;
    
    requestAnimationFrame(() => {
      this.carousel.style.transform = `translate3d(-${this.currentIndex * 100}%, 0, 0)`;
      this.carousel.style.transition = 'transform 0.4s ease-out';
    });
    
    setTimeout(() => {
      this.lock = false;
    }, 450);
  }
  
  next() {
    this.goTo(this.currentIndex + 1);
  }
  
  prev() {
    this.goTo(this.currentIndex - 1);
  }
}

let carousels = {};

function cityWanderNext(id) {
  if (carousels[id]) {
    carousels[id].next();
  }
}

function cityWanderPrev(id) {
  if (carousels[id]) {
    carousels[id].prev();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  carousels = {
    line1: new Carousel('line1'),
    line2: new Carousel('line2'),
    line3: new Carousel('line3'),
    line4: new Carousel('line4'),
    line5: new Carousel('line5'),
    line6: new Carousel('line6')
  };
  
  const galleryImages = document.querySelectorAll('.gallery-container img');
  galleryImages.forEach(function(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      const carouselId = img.closest('[id$="-carousel"]')?.id?.replace('-carousel', '');
      openLightbox(img.src, carouselId);
    });
  });
});