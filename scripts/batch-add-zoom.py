import os
import re

# 要处理的页面范围
pages = [
    "3.1.2 beijing-forbiddencity.html",
    "3.1.3 beijing-summerpalace.html",
    "3.1.4 beijing-templeofheaven.html",
    "3.1.5 beijing-tiananmensquare.html",
    "3.1.6 beijing-yuanmingyuan.html",
    "3.1.7 beijing-jingshanpark.html",
    "3.1.8 beijing-mingtombs.html",
    "3.1.9 beijing-beihaispark.html",
    "3.1.10 beijing-confuciustemple.html",
    "3.1.11 beijing-ditanpark.html",
    "3.1.12 beijing-zhongshanpark.html",
    "3.1.13 beijing-ritanpark.html",
    "3.1.14 beijing-xiannongtan.html",
    "3.1.15 beijing-yuetanpark.html",
    "3.1.16 beijing-lugoubridge.html",
    "3.1.17 beijing-yuandadu.html",
    "3.2.1 beijing-Zhoukoudian Peking Man Site.html",
    "3.2.2 beijing-Fragrant Hills Park.html",
    "3.2.3 beijing-Beijing Olympic Forest Park.html",
    "3.2.4 beijing-Yuyuantan Park.html",
    "3.2.5 beijing-National Botanical Garden.html",
    "3.2.6 beijing-Beijing Grand View Garden.html",
    "3.2.7 beijing-Chaoyang Park.html",
    "3.2.8 beijing-Badachu Park.html",
    "3.2.9 beijing-Beijing Garden Expo Park.html",
    "3.3.1 beijing-Wangfujing Pedestrian Street.html",
    "3.3.2 beijing-The Place.html",
    "3.3.3 beijing-Xidan Commercial Street.html",
    "3.3.4 beijing-Sanlitun Taikoo Li.html",
    "3.3.5 beijing-Blue Harbor.html",
    "3.4.1 beijing-National Museum of China Guide.html",
    "3.4.2 beijing-Capital Museum Guide.html",
    "3.4.3 beijing-Guanfu Museum Guide.html",
    "3.5.1 beijing-Bird's Nest.html",
    "3.5.2 beijing-Water Cube.html",
    "3.5.3 beijing-798 Art District.html",
    "3.5.4 beijing-CCTV Headquarters.html",
    "3.5.5 beijing-National Centre for the Performing Arts.html",
    "3.5.6 beijing-Galaxy SOHO.html",
    "3.5.7 beijing-Red Brick Art Museum.html",
    "3.5.8 beijing-CCTV Tower.html",
    "3.5.9 beijing-Song Art Museum.html",
    "3.5.10 beijing-Shougang Park.html",
    "3.6.1 beijing-Lama Temple.html",
    "3.6.2 beijing-Hongluo Temple.html",
    "3.6.3 beijing-Tanzhe Temple.html",
    "3.6.4 beijing-White Cloud Temple.html",
    "3.6.5 beijing-Fayuan Temple.html",
    "3.6.6 beijing-Five Pagoda Temple.html",
    "3.7.1 beijing-Fangshan Shidu Scenic Area.html",
    "3.7.2 beijing-Yudu Mountain Scenic Area.html",
    "3.7.3 beijing-Phoenix Ridge Scenic Area.html",
    "3.7.4 beijing-Longqingxia.html",
    "3.8.1 beijing-Beijing Happy Valley.html",
    "3.8.2 beijing-Universal Beijing Resort.html",
    "3.8.3 beijing-Houhai Bar Street.html",
    "3.8.4 beijing-Sanlitun Nightclubs.html",
    "3.8.5 beijing-Qushuilanting Bathhouse.html",
    "3.9.1 beijing-Local Specialties.html",
    "3.9.2 beijing-Royal Desserts.html",
    "3.9.3 beijing-Hidden Gem Snacks.html",
    "3.9.4 beijing-Michelin Restaurants.html",
    "3.10.1 beijing-Hanfu Photography.html",
    "3.10.2 beijing-City Wander.html",
    "3.10.3 beijing-Village Tour.html",
    "3.beijing.html",
    "3.1 beijing- attractions.html"
]

base_path = "/Volumes/Macintosh HD - Data/Brief/wander/2、网页设计/website/html/3.beijing/"

for page in pages:
    file_path = os.path.join(base_path, page)
    if not os.path.exists(file_path):
        print(f"文件不存在: {file_path}")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 添加 JS 引用（在 iconfont.js 之后）
    if "<script src=\"../../../iconfont/iconfont.js\"></script>" in content and "<script src=\"../../js/content-zoom.js\"></script>" not in content:
        content = content.replace(
            "<script src=\"../../../iconfont/iconfont.js\"></script>",
            "<script src=\"../../../iconfont/iconfont.js\"></script>\n  <script src=\"../../js/content-zoom.js\"></script>"
        )
    
    # 添加内容包装器开始标签（在 </header> 之后）
    if "</header>\n\n  <!-- " in content and "id=\"content-wrapper\"" not in content:
        content = content.replace(
            "</header>\n\n  <!-- ",
            "</header>\n\n  <!-- 内容包装器 - 应用缩放 -->\n  <div id=\"content-wrapper\">\n\n  <!-- "
        )
    
    # 添加内容包装器结束标签（在 </body> 之前）
    if "</script>\n</body>" in content and "</div> <!-- 闭合内容包装器 -->" not in content:
        content = content.replace(
            "</script>\n</body>",
            "</script>\n  </div> <!-- 闭合内容包装器 -->\n</body>"
        )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"已处理: {page}")

print("批量处理完成！")