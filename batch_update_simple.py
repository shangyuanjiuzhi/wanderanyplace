import os

html_dir = '/Volumes/Macintosh HD - Data/Brief/wander/2、网页设计/website/html'
script = '<script>\n    function setOptimalZoom() {\n      const screenWidth = window.innerWidth;\n      const screenHeight = window.innerHeight;\n      const diagonalPixels = Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2));\n      const dpi = window.devicePixelRatio || 1;\n      const diagonalInches = diagonalPixels / (dpi * 96);\n      let zoom = 1;\n      if (diagonalInches < 14) { zoom = 0.75; } else if (diagonalInches < 16) { zoom = 0.85; } else if (diagonalInches < 20) { zoom = 0.95; }\n      document.body.style.transform = `scale(${zoom})`;\n      document.body.style.transformOrigin = \"top left\";\n      document.body.style.width = `${100 / zoom}%`;\n    }\n    window.addEventListener(\"load\", setOptimalZoom);\n    window.addEventListener(\"resize\", setOptimalZoom);\n  </script>\n'

count = 0
for root, dirs, files in os.walk(html_dir):
    for f in files:
        if f.endswith('.html'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            if 'setOptimalZoom' not in content and 'https://cdn.tailwindcss.com' in content:
                content = content.replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>' + script)
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                count += 1
                print(f'Updated: {f}')
print(f'\nTotal updated: {count}')
