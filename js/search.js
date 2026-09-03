// 景点搜索字典 - 包含所有北京、上海、西安景点
const attractionsDict = {
  // 城市入口
  "Beijing": "html/3.beijing/3.beijing.html",
  "北京": "html/3.beijing/3.beijing.html",

  // 历史古迹 (3.1.x)
  "Great Wall": "html/3.beijing/3.1.1 beijing-greatwall.html",
  "Great Wall of China": "html/3.beijing/3.1.1 beijing-greatwall.html",
  "长城": "html/3.beijing/3.1.1 beijing-greatwall.html",
  "Forbidden City": "html/3.beijing/3.1.2 beijing-forbiddencity.html",
  "Palace Museum": "html/3.beijing/3.1.2 beijing-forbiddencity.html",
  "故宫": "html/3.beijing/3.1.2 beijing-forbiddencity.html",
  "Summer Palace": "html/3.beijing/3.1.3 beijing-summerpalace.html",
  "颐和园": "html/3.beijing/3.1.3 beijing-summerpalace.html",
  "Temple of Heaven": "html/3.beijing/3.1.4 beijing-templeofheaven.html",
  "天坛": "html/3.beijing/3.1.4 beijing-templeofheaven.html",
  "Tiananmen Square": "html/3.beijing/3.1.5 beijing-tiananmensquare.html",
  "天安门广场": "html/3.beijing/3.1.5 beijing-tiananmensquare.html",
  "Old Summer Palace": "html/3.beijing/3.1.6 beijing-yuanmingyuan.html",
  "圆明园": "html/3.beijing/3.1.6 beijing-yuanmingyuan.html",
  "Jingshan Park": "html/3.beijing/3.1.7 beijing-jingshanpark.html",
  "景山公园": "html/3.beijing/3.1.7 beijing-jingshanpark.html",
  "Ming Tombs": "html/3.beijing/3.1.8 beijing-mingtombs.html",
  "明十三陵": "html/3.beijing/3.1.8 beijing-mingtombs.html",
  "Beihai Park": "html/3.beijing/3.1.9 beijing-beihaispark.html",
  "北海公园": "html/3.beijing/3.1.9 beijing-beihaispark.html",
  "Ditan Park": "html/3.beijing/3.1.11 beijing-ditanpark.html",
  "地坛公园": "html/3.beijing/3.1.11 beijing-ditanpark.html",
  "Confucius Temple": "html/3.beijing/3.1.10 beijing-confuciustemple.html",
  "孔庙": "html/3.beijing/3.1.10 beijing-confuciustemple.html",
  "Zhongshan Park": "html/3.beijing/3.1.12 beijing-zhongshanpark.html",
  "中山公园": "html/3.beijing/3.1.12 beijing-zhongshanpark.html",
  "Ritan Park": "html/3.beijing/3.1.13 beijing-ritanpark.html",
  "日坛公园": "html/3.beijing/3.1.13 beijing-ritanpark.html",
  "Xiannongtan": "html/3.beijing/3.1.14 beijing-xiannongtan.html",
  "先农坛": "html/3.beijing/3.1.14 beijing-xiannongtan.html",
  "Yuetan Park": "html/3.beijing/3.1.15 beijing-yuetanpark.html",
  "月坛公园": "html/3.beijing/3.1.15 beijing-yuetanpark.html",
  "Lugou Bridge": "html/3.beijing/3.1.16 beijing-lugoubridge.html",
  "卢沟桥": "html/3.beijing/3.1.16 beijing-lugoubridge.html",
  "Yuan Dadu": "html/3.beijing/3.1.17 beijing-yuandadu.html",
  "元大都城垣遗址": "html/3.beijing/3.1.17 beijing-yuandadu.html",

  // 自然景观 (3.2.x)
  "Zhoukoudian": "html/3.beijing/3.2.1 beijing-Zhoukoudian Peking Man Site.html",
  "周口店": "html/3.beijing/3.2.1 beijing-Zhoukoudian Peking Man Site.html",
  "Fragrant Hills": "html/3.beijing/3.2.2 beijing-Fragrant Hills Park.html",
  "香山公园": "html/3.beijing/3.2.2 beijing-Fragrant Hills Park.html",
  "Olympic Forest Park": "html/3.beijing/3.2.3 beijing-Beijing Olympic Forest Park.html",
  "奥林匹克森林公园": "html/3.beijing/3.2.3 beijing-Beijing Olympic Forest Park.html",
  "Yuyuantan Park": "html/3.beijing/3.2.4 beijing-Yuyuantan Park.html",
  "玉渊潭公园": "html/3.beijing/3.2.4 beijing-Yuyuantan Park.html",
  "National Botanical Garden": "html/3.beijing/3.2.5 beijing-National Botanical Garden.html",
  "国家植物园": "html/3.beijing/3.2.5 beijing-National Botanical Garden.html",
  "Grand View Garden": "html/3.beijing/3.2.6 beijing-Beijing Grand View Garden.html",
  "大观园": "html/3.beijing/3.2.6 beijing-Beijing Grand View Garden.html",
  "Chaoyang Park": "html/3.beijing/3.2.7 beijing-Chaoyang Park.html",
  "朝阳公园": "html/3.beijing/3.2.7 beijing-Chaoyang Park.html",
  "Badachu Park": "html/3.beijing/3.2.8 beijing-Badachu Park.html",
  "八大处公园": "html/3.beijing/3.2.8 beijing-Badachu Park.html",
  "Garden Expo Park": "html/3.beijing/3.2.9 beijing-Beijing Garden Expo Park.html",
  "园博园": "html/3.beijing/3.2.9 beijing-Beijing Garden Expo Park.html",

  // 购物商圈 (3.3.x)
  "Wangfujing": "html/3.beijing/3.3.1 beijing-Wangfujing Pedestrian Street.html",
  "王府井": "html/3.beijing/3.3.1 beijing-Wangfujing Pedestrian Street.html",
  "The Place": "html/3.beijing/3.3.2 beijing-The Place.html",
  "世贸天阶": "html/3.beijing/3.3.2 beijing-The Place.html",
  "Xidan": "html/3.beijing/3.3.3 beijing-Xidan Commercial Street.html",
  "西单": "html/3.beijing/3.3.3 beijing-Xidan Commercial Street.html",
  "Sanlitun Taikoo Li": "html/3.beijing/3.3.4 beijing-Sanlitun Taikoo Li.html",
  "三里屯太古里": "html/3.beijing/3.3.4 beijing-Sanlitun Taikoo Li.html",
  "Blue Harbor": "html/3.beijing/3.3.5 beijing-Blue Harbor.html",
  "蓝色港湾": "html/3.beijing/3.3.5 beijing-Blue Harbor.html",

  // 博物馆 (3.4.x)
  "National Museum": "html/3.beijing/3.4.1 beijing-National Museum of China Guide.html",
  "国家博物馆": "html/3.beijing/3.4.1 beijing-National Museum of China Guide.html",
  "Capital Museum": "html/3.beijing/3.4.2 beijing-Capital Museum Guide.html",
  "首都博物馆": "html/3.beijing/3.4.2 beijing-Capital Museum Guide.html",
  "Guanfu Museum": "html/3.beijing/3.4.3 beijing-Guanfu Museum Guide.html",
  "观复博物馆": "html/3.beijing/3.4.3 beijing-Guanfu Museum Guide.html",

  // 现代地标 (3.5.x)
  "Bird's Nest": "html/3.beijing/3.5.1 beijing-Bird's Nest.html",
  "鸟巢": "html/3.beijing/3.5.1 beijing-Bird's Nest.html",
  "Water Cube": "html/3.beijing/3.5.2 beijing-Water Cube.html",
  "水立方": "html/3.beijing/3.5.2 beijing-Water Cube.html",
  "798 Art District": "html/3.beijing/3.5.3 beijing-798 Art District.html",
  "798艺术区": "html/3.beijing/3.5.3 beijing-798 Art District.html",
  "CCTV Headquarters": "html/3.beijing/3.5.4 beijing-CCTV Headquarters.html",
  "CCTV大楼": "html/3.beijing/3.5.4 beijing-CCTV Headquarters.html",
  "National Centre for the Performing Arts": "html/3.beijing/3.5.5 beijing-National Centre for the Performing Arts.html",
  "国家大剧院": "html/3.beijing/3.5.5 beijing-National Centre for the Performing Arts.html",
  "Galaxy SOHO": "html/3.beijing/3.5.6 beijing-Galaxy SOHO.html",
  "银河SOHO": "html/3.beijing/3.5.6 beijing-Galaxy SOHO.html",
  "Red Brick Art Museum": "html/3.beijing/3.5.7 beijing-Red Brick Art Museum.html",
  "红砖美术馆": "html/3.beijing/3.5.7 beijing-Red Brick Art Museum.html",
  "CCTV Tower": "html/3.beijing/3.5.8 beijing-CCTV Tower.html",
  "中央电视塔": "html/3.beijing/3.5.8 beijing-CCTV Tower.html",
  "Song Art Museum": "html/3.beijing/3.5.9 beijing-Song Art Museum.html",
  "松美术馆": "html/3.beijing/3.5.9 beijing-Song Art Museum.html",
  "Shougang Park": "html/3.beijing/3.5.10 beijing-Shougang Park.html",
  "首钢园": "html/3.beijing/3.5.10 beijing-Shougang Park.html",

  // 寺庙宗教 (3.6.x)
  "Lama Temple": "html/3.beijing/3.6.1 beijing-Lama Temple.html",
  "雍和宫": "html/3.beijing/3.6.1 beijing-Lama Temple.html",
  "Hongluo Temple": "html/3.beijing/3.6.2 beijing-Hongluo Temple.html",
  "红螺寺": "html/3.beijing/3.6.2 beijing-Hongluo Temple.html",
  "Tanzhe Temple": "html/3.beijing/3.6.3 beijing-Tanzhe Temple.html",
  "潭柘寺": "html/3.beijing/3.6.3 beijing-Tanzhe Temple.html",
  "White Cloud Temple": "html/3.beijing/3.6.4 beijing-White Cloud Temple.html",
  "白云观": "html/3.beijing/3.6.4 beijing-White Cloud Temple.html",
  "Fayuan Temple": "html/3.beijing/3.6.5 beijing-Fayuan Temple.html",
  "法源寺": "html/3.beijing/3.6.5 beijing-Fayuan Temple.html",
  "Five Pagoda Temple": "html/3.beijing/3.6.6 beijing-Five Pagoda Temple.html",
  "五塔寺": "html/3.beijing/3.6.6 beijing-Five Pagoda Temple.html",

  // 郊区景点 (3.7.x)
  "Fangshan Shidu": "html/3.beijing/3.7.1 beijing-Fangshan Shidu Scenic Area.html",
  "十渡风景区": "html/3.beijing/3.7.1 beijing-Fangshan Shidu Scenic Area.html",
  "Yudu Mountain": "html/3.beijing/3.7.2 beijing-Yudu Mountain Scenic Area.html",
  "玉渡山": "html/3.beijing/3.7.2 beijing-Yudu Mountain Scenic Area.html",
  "Phoenix Ridge": "html/3.beijing/3.7.3 beijing-Phoenix Ridge Scenic Area.html",
  "凤凰岭": "html/3.beijing/3.7.3 beijing-Phoenix Ridge Scenic Area.html",
  "Longqingxia": "html/3.beijing/3.7.4 beijing-Longqingxia.html",
  "龙庆峡": "html/3.beijing/3.7.4 beijing-Longqingxia.html",

  // 娱乐体验 (3.8.x)
  "Beijing Happy Valley": "html/3.beijing/3.8.1 beijing-Beijing Happy Valley.html",
  "欢乐谷": "html/3.beijing/3.8.1 beijing-Beijing Happy Valley.html",
  "Universal Beijing Resort": "html/3.beijing/3.8.2 beijing-Universal Beijing Resort.html",
  "环球影城": "html/3.beijing/3.8.2 beijing-Universal Beijing Resort.html",
  "Houhai Bar Street": "html/3.beijing/3.8.3 beijing-Houhai Bar Street.html",
  "后海酒吧街": "html/3.beijing/3.8.3 beijing-Houhai Bar Street.html",
  "Sanlitun Nightclubs": "html/3.beijing/3.8.4 beijing-Sanlitun Nightclubs.html",
  "三里屯夜店": "html/3.beijing/3.8.4 beijing-Sanlitun Nightclubs.html",
  "Qushuilanting Bathhouse": "html/3.beijing/3.8.5 beijing-Qushuilanting Bathhouse.html",
  "曲水兰亭": "html/3.beijing/3.8.5 beijing-Qushuilanting Bathhouse.html",

  // 上海城市入口
  "Shanghai": "html/4.shanghai/4.shanghai.html",
  "上海": "html/4.shanghai/4.shanghai.html",

  // 上海必游景点 (4.1.x)
  "Bund": "html/4.shanghai/4.1.1 shanghai-bund.html",
  "外滩": "html/4.shanghai/4.1.1 shanghai-bund.html",
  "International Buildings": "html/4.shanghai/4.1.1 shanghai-bund.html",
  "万国建筑群": "html/4.shanghai/4.1.1 shanghai-bund.html",
  "Lujiazui": "html/4.shanghai/4.1.2 shanghai-lujiazui.html",
  "陆家嘴": "html/4.shanghai/4.1.2 shanghai-lujiazui.html",
  "Lujiazui Skyline": "html/4.shanghai/4.1.2 shanghai-lujiazui.html",
  "陆家嘴三件套": "html/4.shanghai/4.1.2 shanghai-lujiazui.html",
  "Oriental Pearl": "html/4.shanghai/4.1.3 shanghai-orientalpearl.html",
  "东方明珠": "html/4.shanghai/4.1.3 shanghai-orientalpearl.html",
  "Oriental Pearl TV Tower": "html/4.shanghai/4.1.3 shanghai-orientalpearl.html",
  "东方明珠电视塔": "html/4.shanghai/4.1.3 shanghai-orientalpearl.html",

  // 上海老建筑 (4.2.x)
  "Waibaidu Bridge": "html/4.shanghai/4.2.1 shanghai-waibaidu.html",
  "外白渡桥": "html/4.shanghai/4.2.1 shanghai-waibaidu.html",
  "Waitanyuan": "html/4.shanghai/4.2.2 shanghai-waitanyuan.html",
  "外滩源": "html/4.shanghai/4.2.2 shanghai-waitanyuan.html",
  "Bund Origin": "html/4.shanghai/4.2.2 shanghai-waitanyuan.html",
  "Wukang Building": "html/4.shanghai/4.2.3 shanghai-wukang.html",
  "武康大楼": "html/4.shanghai/4.2.3 shanghai-wukang.html",
  "Rockbund Art Museum": "html/4.shanghai/4.2.4 shanghai-rockbund.html",
  "外滩美术馆": "html/4.shanghai/4.2.4 shanghai-rockbund.html",
  "Sinan Mansions": "html/4.shanghai/4.2.5 shanghai-sinan.html",
  "思南公馆": "html/4.shanghai/4.2.5 shanghai-sinan.html",
  "1933 Laochangfang": "html/4.shanghai/4.2.6 shanghai-1933.html",
  "1933老场坊": "html/4.shanghai/4.2.6 shanghai-1933.html",
  "Xujiahui Cathedral": "html/4.shanghai/4.2.7 shanghai-xujiahui.html",
  "徐家汇天主堂": "html/4.shanghai/4.2.7 shanghai-xujiahui.html",

  // 上海休闲娱乐 (4.3.x)
  "Shanghai Disneyland": "html/4.shanghai/4.3.1 shanghai-disney.html",
  "上海迪士尼": "html/4.shanghai/4.3.1 shanghai-disney.html",
  "Disneyland": "html/4.shanghai/4.3.1 shanghai-disney.html",
  "Madame Tussauds": "html/4.shanghai/4.3.2 shanghai-madame-tussauds.html",
  "杜莎夫人蜡像馆": "html/4.shanghai/4.3.2 shanghai-madame-tussauds.html",
  "Shanghai Film Park": "html/4.shanghai/4.3.3 shanghai-filmpark.html",
  "上海影视乐园": "html/4.shanghai/4.3.3 shanghai-filmpark.html",

  // 上海文艺聚集区 (4.4.x)
  "Tianzifang": "html/4.shanghai/4.4.1 shanghai-tianzifang.html",
  "田子坊": "html/4.shanghai/4.4.1 shanghai-tianzifang.html",
  "Thames Town": "html/4.shanghai/4.4.2 shanghai-thames.html",
  "泰晤士小镇": "html/4.shanghai/4.4.2 shanghai-thames.html",
  "Qibao": "html/4.shanghai/4.4.3 shanghai-qibao.html",
  "七宝老街": "html/4.shanghai/4.4.3 shanghai-qibao.html",
  "Qibao Old Street": "html/4.shanghai/4.4.3 shanghai-qibao.html",
  "Sweet Love Road": "html/4.shanghai/4.4.4 shanghai-sweetlove.html",
  "甜爱路": "html/4.shanghai/4.4.4 shanghai-sweetlove.html",
  "Dishui Lake": "html/4.shanghai/4.4.5 shanghai-dishui.html",
  "滴水湖": "html/4.shanghai/4.4.5 shanghai-dishui.html",

  // 上海购物 (4.5.x)
  "Nanjing Road": "html/4.shanghai/4.5.1 shanghai-nanjingroad.html",
  "南京路": "html/4.shanghai/4.5.1 shanghai-nanjingroad.html",
  "West Nanjing Road": "html/4.shanghai/4.5.2 shanghai-westnanjing.html",
  "南京西路": "html/4.shanghai/4.5.2 shanghai-westnanjing.html",
  "Huaihai Road": "html/4.shanghai/4.5.3 shanghai-huaihai.html",
  "淮海路": "html/4.shanghai/4.5.3 shanghai-huaihai.html",
  "Xintiandi": "html/4.shanghai/4.5.3 shanghai-huaihai.html",
  "新天地": "html/4.shanghai/4.5.3 shanghai-huaihai.html",
  "Lujiazui Shopping": "html/4.shanghai/4.5.4 shanghai-lujiazuishopping.html",
  "陆家嘴商圈": "html/4.shanghai/4.5.4 shanghai-lujiazuishopping.html",

  // 上海博物馆 & 艺术 (4.6.x)
  "Shanghai Museum": "html/4.shanghai/4.6.1 shanghai-museum.html",
  "上海博物馆": "html/4.shanghai/4.6.1 shanghai-museum.html",
  "China Art Palace": "html/4.shanghai/4.6.2 shanghai-chinaart.html",
  "中华艺术宫": "html/4.shanghai/4.6.2 shanghai-chinaart.html",
  "Power Station of Art": "html/4.shanghai/4.6.3 shanghai-powerstation.html",
  "上海当代艺术博物馆": "html/4.shanghai/4.6.3 shanghai-powerstation.html",
  "Guangfulin": "html/4.shanghai/4.6.4 shanghai-guangfulin.html",
  "广富林": "html/4.shanghai/4.6.4 shanghai-guangfulin.html",
  "Guangfulin Cultural Heritage": "html/4.shanghai/4.6.4 shanghai-guangfulin.html",
  "广富林文化遗址": "html/4.shanghai/4.6.4 shanghai-guangfulin.html",

  // 上海老传统 (4.7.x)
  "Yu Garden": "html/4.shanghai/4.7.1 shanghai-yugarden.html",
  "豫园": "html/4.shanghai/4.7.1 shanghai-yugarden.html",
  "City God Temple": "html/4.shanghai/4.7.2 shanghai-citygod.html",
  "老城隍庙": "html/4.shanghai/4.7.2 shanghai-citygod.html",
  "城隍庙": "html/4.shanghai/4.7.2 shanghai-citygod.html",
  "Jing An Temple": "html/4.shanghai/4.7.3 shanghai-jingan.html",
  "静安寺": "html/4.shanghai/4.7.3 shanghai-jingan.html",

  // 西安城市入口
  "Xi'an": "html/5.shaanxi/5.1 xian/5.xian.html",
  "Xian": "html/5.shaanxi/5.1 xian/5.xian.html",
  "西安": "html/5.shaanxi/5.1 xian/5.xian.html",

  // 西安必游景点 (5.1.x)
  "Terracotta Army": "html/5.shaanxi/5.1 xian/5.1.1 xian-terracotta.html",
  "Terracotta Warriors": "html/5.shaanxi/5.1 xian/5.1.1 xian-terracotta.html",
  "兵马俑": "html/5.shaanxi/5.1 xian/5.1.1 xian-terracotta.html",
  "Xi'an City Wall": "html/5.shaanxi/5.1 xian/5.1.2 xian-citywall.html",
  "Xian City Wall": "html/5.shaanxi/5.1 xian/5.1.2 xian-citywall.html",
  "西安城墙": "html/5.shaanxi/5.1 xian/5.1.2 xian-citywall.html",
  "Huaqing Palace": "html/5.shaanxi/5.1 xian/5.1.3 xian-huaqingpalace.html",
  "Huaqing Hot Springs": "html/5.shaanxi/5.1 xian/5.1.3 xian-huaqingpalace.html",
  "华清宫": "html/5.shaanxi/5.1 xian/5.1.3 xian-huaqingpalace.html",
  "Da Tang Bu Ye Cheng": "html/5.shaanxi/5.1 xian/5.1.4 xian-datangbuyecheng.html",
  "Tang Dynasty Pedestrian Street": "html/5.shaanxi/5.1 xian/5.1.4 xian-datangbuyecheng.html",
  "大唐不夜城": "html/5.shaanxi/5.1 xian/5.1.4 xian-datangbuyecheng.html",

  // 西安演出 (5.2.x)
  "Song of Everlasting Sorrow": "html/5.shaanxi/5.1 xian/5.2.1 xian-changhenge.html",
  "长恨歌": "html/5.shaanxi/5.1 xian/5.2.1 xian-changhenge.html",
  "Dream Back to Tang Dynasty": "html/5.shaanxi/5.1 xian/5.2.2 xian-menghuitang.html",
  "梦回大唐": "html/5.shaanxi/5.1 xian/5.2.2 xian-menghuitang.html",
  "Xi'an Ever Love Scene": "html/5.shaanxi/5.1 xian/5.2.3 xian-qianguqing.html",
  "千古情": "html/5.shaanxi/5.1 xian/5.2.3 xian-qianguqing.html",
  "Great Qin": "html/5.shaanxi/5.1 xian/5.2.4 xian-daqin.html",
  "大秦": "html/5.shaanxi/5.1 xian/5.2.4 xian-daqin.html",

  // 西安历史古迹 (5.3.x)
  "Giant Wild Goose Pagoda": "html/5.shaanxi/5.1 xian/5.3.1 xian-dayanta.html",
  "Dayan Ta": "html/5.shaanxi/5.1 xian/5.3.1 xian-dayanta.html",
  "大雁塔": "html/5.shaanxi/5.1 xian/5.3.1 xian-dayanta.html",
  "Small Wild Goose Pagoda": "html/5.shaanxi/5.1 xian/5.3.2 xian-xiaoyanta.html",
  "Xiaoyan Ta": "html/5.shaanxi/5.1 xian/5.3.2 xian-xiaoyanta.html",
  "小雁塔": "html/5.shaanxi/5.1 xian/5.3.2 xian-xiaoyanta.html",
  "Daming Palace Heritage Park": "html/5.shaanxi/5.1 xian/5.3.3 xian-damingpalace.html",
  "Daming Palace": "html/5.shaanxi/5.1 xian/5.3.3 xian-damingpalace.html",
  "大明宫": "html/5.shaanxi/5.1 xian/5.3.3 xian-damingpalace.html",
  "Xi'an Bell Tower": "html/5.shaanxi/5.1 xian/5.3.5 xian-belltower.html",
  "Bell Tower": "html/5.shaanxi/5.1 xian/5.3.5 xian-belltower.html",
  "钟楼": "html/5.shaanxi/5.1 xian/5.3.5 xian-belltower.html",

  // 西安文化街区 (5.4.x)
  "Muslim Quarter": "html/5.shaanxi/5.1 xian/5.4.1 xian-huiminjie.html",
  "Hui Min Jie": "html/5.shaanxi/5.1 xian/5.4.1 xian-huiminjie.html",
  "回民街": "html/5.shaanxi/5.1 xian/5.4.1 xian-huiminjie.html",
  "Gao Family Courtyard": "html/5.shaanxi/5.1 xian/5.4.2 xian-gaojiayuan.html",
  "高家大院": "html/5.shaanxi/5.1 xian/5.4.2 xian-gaojiayuan.html",
  "Yongxing Square": "html/5.shaanxi/5.1 xian/5.4.3 xian-yongxingfang.html",
  "永兴坊": "html/5.shaanxi/5.1 xian/5.4.3 xian-yongxingfang.html",
  "Tang Paradise": "html/5.shaanxi/5.1 xian/5.4.5 xian-tangparadise.html",
  "大唐芙蓉园": "html/5.shaanxi/5.1 xian/5.4.5 xian-tangparadise.html",
  "Chang'an Twelve Hours": "html/5.shaanxi/5.1 xian/5.4.6 xian-changan.html",
  "长安十二时辰": "html/5.shaanxi/5.1 xian/5.4.6 xian-changan.html",

  // 西安博物馆 (5.5.x)
  "Shaanxi History Museum": "html/5.shaanxi/5.1 xian/5.5.1 xian-shaanximuseum.html",
  "陕西历史博物馆": "html/5.shaanxi/5.1 xian/5.5.1 xian-shaanximuseum.html",
  "Xi'an Museum": "html/5.shaanxi/5.1 xian/5.5.2 xian-museum.html",
  "西安博物馆": "html/5.shaanxi/5.1 xian/5.5.2 xian-museum.html",
  "Xi'an Beilin Museum": "html/5.shaanxi/5.1 xian/5.5.3 xian-beilin.html",
  "Beilin Museum": "html/5.shaanxi/5.1 xian/5.5.3 xian-beilin.html",
  "碑林": "html/5.shaanxi/5.1 xian/5.5.3 xian-beilin.html",

  // 西安自然景观 (5.6.x)
  "Zhongnan Mountain": "html/5.shaanxi/5.1 xian/5.6.1 xian-zhongnan.html",
  "终南山": "html/5.shaanxi/5.1 xian/5.6.1 xian-zhongnan.html"
};

// 计算编辑距离 (Levenshtein距离)
function levenshteinDistance(s1, s2) {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}

// 搜索函数 - 支持模糊匹配，无提示直接跳转
function performSearch() {
  const input = document.getElementById('search-input');
  const query = input.value.trim().toLowerCase();

  if (!query) {
    // 空输入直接跳转到北京景点总览
    window.location.href = 'html/3.beijing/3.1 beijing- attractions.html';
    return;
  }

  // 精确匹配或包含匹配
  for (const [name, path] of Object.entries(attractionsDict)) {
    if (name.toLowerCase() === query || name.toLowerCase().includes(query)) {
      window.location.href = path;
      return;
    }
  }

  // 模糊匹配 - 查找最相似的景点
  let bestMatch = null;
  let bestDistance = Infinity;

  for (const [name, path] of Object.entries(attractionsDict)) {
    const distance = levenshteinDistance(query, name.toLowerCase());
    const maxLen = Math.max(query.length, name.length);
    const similarity = 1 - (distance / maxLen);

    // 相似度超过60%认为是有效匹配
    if (similarity > 0.6 && distance < bestDistance) {
      bestDistance = distance;
      bestMatch = { name, path, similarity };
    }
  }

  if (bestMatch) {
    // 直接跳转到最相似的景点
    window.location.href = bestMatch.path;
  } else {
    // 完全匹配不上，跳转到目的地页面
    window.location.href = 'html/2.Destination.html';
  }
}

// 回车键触发搜索
function handleSearch(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
}
