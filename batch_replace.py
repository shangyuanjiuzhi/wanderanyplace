import os
import re

html_dir = '/Volumes/Macintosh HD - Data/Brief/wander/2、网页设计/website/html'
script_to_add = '<script src="../../js/auto-zoom.js"></script>'

pattern = r'<script>\s*function setOptimalZoom\(\)\s*\{[^}]*document\.body\.style\.transform[^}]*\}.*?window\.addEventListener\([^)]+\);\s*</script>'

count = 0
for root, dirs, files in os.walk(html_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                if 'setOptimalZoom' in content:
                    new_content = re.sub(pattern, script_to_add, content, flags=re.DOTALL)
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f'Updated: {filepath}')
                        count += 1
            except Exception as e:
                print(f'Error processing {filepath}: {e}')

print(f'\nTotal updated: {count} files')
