#!/bin/bash

HTML_DIR="/Volumes/Macintosh HD - Data/Brief/wander/2、网页设计/website/html"

SCRIPT_TO_ADD='
  <script>
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
      document.body.style.transform = `scale(${zoom})`;
      document.body.style.transformOrigin = "top left";
      document.body.style.width = `${100 / zoom}%`;
    }
    window.addEventListener("load", setOptimalZoom);
    window.addEventListener("resize", setOptimalZoom);
  </script>
'

cd "$HTML_DIR"

find . -name "*.html" | while read file; do
  if ! grep -q "setOptimalZoom" "$file"; then
    sed -i '' "s/<script src=\"https:\/\/cdn.tailwindcss.com\"><\/script>/<script src=\"https:\/\/cdn.tailwindcss.com\"><\/script>$SCRIPT_TO_ADD/" "$file"
    echo "Updated: $file"
  fi
done

echo "Done!"
