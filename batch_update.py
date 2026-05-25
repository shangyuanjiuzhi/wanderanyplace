import os

html_dir = '/Volumes/Macintosh HD - Data/Brief/wander/2、网页设计/website/html'
script_to_add = '''
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
      document.body.style.transformOrigin = 'top left';
      document.body.style.width = `${100 / zoom}%`;
    }
    window.addEventListener('load', setOptimalZoom);
    window.addEventListener('resize', setOptimalZoom);
  </script>
'''

count = 0
for root, dirs, files in os.walk(html_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'setOptimalZoom' not in content:
                content = content.replace(
                    '<script src="https://cdn.tailwindcss.com"></script>',
                    '<script src="https://cdn.tailwindcss.com"></script>' + script_to_add
                )
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                print(f'Updated: {filepath}')

print(f'\nTotal updated: {count} files')
