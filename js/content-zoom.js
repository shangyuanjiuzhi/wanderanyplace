function setOptimalZoom() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const diagonalPixels = Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2));
  const dpi = window.devicePixelRatio || 1;
  const diagonalInches = diagonalPixels / (dpi * 96);
  let zoom = 1;
  if (diagonalInches < 14) {
    zoom = 0.75;
  } else if (diagonalInches < 16) {
    zoom = 0.85;
  } else if (diagonalInches < 20) {
    zoom = 0.95;
  }
  const contentWrapper = document.getElementById('content-wrapper');
  if (contentWrapper) {
    contentWrapper.style.transform = `scale(${zoom})`;
    contentWrapper.style.transformOrigin = 'top left';
    contentWrapper.style.width = `${100 / zoom}%`;
  }
}
window.addEventListener('load', setOptimalZoom);
window.addEventListener('resize', setOptimalZoom);