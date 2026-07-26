// Attractions Page JavaScript
// Shared functionality for Great Wall, Forbidden City, and Summer Palace pages

// Carousel functionality - uses shared carousel functions from common.js
// Image Viewer functionality - uses shared image viewer from common.js

// Copy address function
function copyAddress(type = 'badaling') {
  let address;
  if (type === 'mutianyu') {
    address = "北京市怀柔区慕田峪长城\nMutianyu Great Wall, Huairou District, Beijing, China";
  } else if (type === 'juyongguan') {
    address = "北京市昌平区居庸关长城\nJuyongguan Great Wall, Changping216 Provincial Road, Juyongguancun, Nankouzhen,Changping District, Beijing, China";
  } else if (type === 'huanghuacheng') {
    address = "北京市怀柔区黄花城水长城\nHuanghuacheng Water Great Wall,HuairouXishuiyucun, Jiuduhezhen, Huairou District, Beijing,China";
  } else if (type === 'jiankou') {
    address = "北京市怀柔区箭扣长城\nJiankou Great Wall, HuairouWest Zhalancun South Side, Jiankou Liang,Huairou District, Beijing,China";
  } else if (type === 'simatai') {
    address = "北京市密云区司马台长城\nSimatai Great Wall, MiyunNorth to Simataicun, Gubeikouzhen, Miyun District, Beijing,China";
  } else if (type === 'badaling-remnant') {
    address = "北京市延庆区八达岭残长城\nBadaling Remnant Great Wall, Yanqing District, Beijing,China";
  } else if (type === 'gubeikou') {
    address = "北京市密云区古北口长城\nGubeikou Great Wall, MiyunGunan 2nd Road Guyu Road,Miyun District, Beijing,China";
  } else if (type === 'badaling-forest') {
    address = "北京市延庆区八达岭国家森林公园\nBadaling National Forest Park, YanqingShifosicun, Badaling,Yanqing District, Beijing,China";
  } else if (type === 'forbidden') {
    address = "故宫\nForbidden City, DongchengNo.4, Jingshan Front Street, Beijing, China";
  } else if (type === 'summer-palace') {
    address = "颐和园\nSummer Palace, HaidianNo.19, New Jiangongmen Road, Haidian District, Beijing, China";
  } else if (type === 'temple-of-heaven') {
    address = "天坛\nTemple of Heaven, Dongcheng Tiantan Dongli No.A1,Dongcheng District, Beijing, China";
  } else if (type === 'tiananmen') {
    address = "天安门广场\nTiananmen Square,Dongcheng Chang'an Avenue North Side, Dongcheng District, Beijing, China";
  } else if (type === 'yuanmingyuan') {
    address = "圆明园\nYuanmingyuan,HaidianNo.28, Qinghua West Road, Haidian District, Beijing, China";
  } else if (type === 'jingshan-park') {
    address = "景山公园\nJingshan Park, XichengNo.44, Jingshan West Street,Dongcheng District, Beijing, China";
  } else if (type === 'mingtombs') {
    address = "明十三陵\nMing Tombs, ChangpingShisanlingzhen Changchi Road, Changping District, Beijing, China";
  } else if (type === 'beihai-park') {
    address = "北海公园\nBeihai Park, Xicheng1, Wenjin Street No.1, Xicheng District, Beijing, China";
  } else if (type === 'confuciustemple') {
    address = "孔庙和国子监\nConfucius Temple and Guozijian, DongchengNo.15, Guozijian Street, Cong No.13 Xianshi Gate Jinru,Dongcheng District, Beijing, China";
  } else if (type === 'ditan-park') {
    address = "地坛公园\nDitan Park, Dongcheng Andingmen Outer Street,Dongcheng District, Beijing, China";
  } else if (type === 'zhongshan-park') {
    address = "中山公园\nZhongshan Park, DongchengNo.4, Zhonghua Road (West Side of Tian'anmen),Dongcheng District, Beijing, China";
  } else if (type === 'ritan-park') {
    address = "日坛公园\nRitan Park, ChaoyangChaowai Residential District Chaoyangmen Outer No.6, Ritan North Road,Chaoyang District, Beijing, China";
  } else if (type === 'xiannongtan') {
    address = "先农坛\nXiannongtan, XichengNo.21, Dongjing Road Beijing Ancient Architecture Museum,Xicheng District, Beijing, China";
  } else if (type === 'yuetan-park') {
    address = "月坛公园\nYuetan Park, XichengNo.A6, Yuetan North Street,Xicheng District, Beijing, China";
  } else if (type === 'lugou-bridge') {
    address = "卢沟桥\nLugou Bridge,Fengtai Opposite to Xicheng Gate Road, Wanpingcheng, Fengtai District, Beijing, China";
  } else if (type === 'yuandadu-park') {
    address = "元大都城垣遗址公园\nYuan Dadu City Wall Relics Park, Chaoyang Yuhui South Road South Intersection and Beitucheng East Road Intersection Dapaifang South Side,Haidian District, Beijing, China";
  } else if (type === 'zhoukoudian-park') {
    address = "周口店北京人遗址\nZhoukoudian Peking Man Site,China Fangshan World Geological Park, No.1, Zhoukoudian Street,Fangshan District, Beijing, China";
  } else if (type === 'fragrant-hills-park') {
    address = "香山公园\nFragrant Hills Park, HaidianNo.40, Maimai Street, Xiangshan,Haidian District, Beijing, China";
  } else if (type === 'olympic-park') {
    address = "奥林匹克森林公园\nBeijing Olympic Forest Park,Chaoyang No.15, Beichen East Road (Forest Park South Gate Subway Station C Southeast Koupang), Chaoyang District, Beijing, China";
  } else if (type === 'yuyuantan-park') {
    address = "玉渊潭公园\nYuyuantan Park, HaidianNo.10, W. 3rd Ring Road Middle,Haidian District, Beijing, China";
  } else if (type === 'national-botanical-garden') {
    address = "国家植物园\nNational Botanical Garden,HaidianWofosi Road, Xiangshan Beijing Botanical Garden, Haidian District, Beijing, China";
  } else if (type === 'beijing-grand-view-garden') {
    address = "大观园\nBeijing Grand View Garden, XichengNo.12, Nancaiyuan Street,Xuanwu District, Beijing, China";
  } else if (type === 'chaoyang-park') {
    address = "朝阳公园\nChaoyang Park,Chaoyang No.1, Chaoyang Park South Road, Chaoyang District, Beijing, China";
  } else if (type === 'badachu-park') {
    address = "八大处公园\nBadachu Park, Shijingshan No.3, Badachu Road,Shijingshan District, Beijing, China";
  } else if (type === 'beijing-garden-expo-park') {
    address = "园博园\nBeijing Garden Expo Park, Fengtai No.15, Shejichang Road,Fengtai District, Beijing, China";
  } else if (type === 'wangfujing') {
    address = "王府井步行街\nWangfujing Pedestrian Street,DongchengWangfujing Street No.256 (Jinyu Hutong Subway Station East Entrance & Exit B Pedestrian 80 Meters), Dongcheng District, Beijing, China";
  } else if (type === 'theplace') {
    address = "世贸天阶\nThe Place,Chaoyang No.A9, Guanghua Road, Chaoyang District, Beijing, China";
  } else if (type === 'xidan') {
    address = "西单商业街\nXidan Commercial Street, Xicheng District, Beijing, China";
  } else if (type === 'sanlitun-taikoo-li') {
    address = "三里屯太古里\nSanlitun Taikoo Li,ChaoyangSanlitun Road No.11, 19 (Workers' Stadium Subway Station Entrance & Exit D Pedestrian 240 Meters), Chaoyang District, Beijing, China";
  } else if (type === 'blueharbor') {
    address = "蓝色港湾\nSOLANA,ChaoyangNo.6, Chaoyang Park Road, Chaoyang District, Beijing, China";
  } else if (type === 'nationalmuseum') {
    address = "中国国家博物馆\nNational Museum of China, East Side of Tiananmen Square, Dongcheng District, Beijing, China";
  } else if (type === 'capitalmuseum') {
    address = "首都博物馆\nCapital Museum,Xicheng No.16, Fuxingmen Outer Street, Xicheng District, Beijing, China";
  } else if (type === 'guangfumuseum') {
    address = "观复博物馆\nGuanfu Museum,ChaoyangDashan Zizhang Wanfenjin South Road No.18, Chaoyang District, Beijing, China";
  } else if (type === 'birdnest-park') {
    address = "鸟巢\nBird's Nest (National Stadium), Chaoyang National Stadium South Road and Beichen Road Intersection North 260 Meters,Olympic Green, Chaoyang District, Beijing, China";
  } else if (type === 'watercube') {
    address = "水立方\nWater Cube (National Aquatics Center),ChaoyangNo.11, Tianchen East Road, Olympic Green, Chaoyang District, Beijing, China";
  } else if (type === '798') {
    address = "798艺术区\n798 Art District, ChaoyangNo.4, Jiuxianqiao Road, Chaoyang District, Beijing, China";
  } else if (type === 'central-business-district') {
    address = "中央商务区\nCentral Business District, Chaoyang District, Beijing, China";
  } else if (type === 'nCPA') {
    address = "国家大剧院\nNational Centre for the Performing Arts, Xicheng2, West Chang'an Avenue No.2, West Chang'an Avenue No.2 (Tian'anmen West Subway Station Entrance & Exit Beside), Xicheng District, Beijing, China";
  } else if (type === 'galaxysoho') {
    address = "银河SOHO\nGalaxy SOHO, Dongcheng Nanzhugan Hutong No.2, Chaoyang District, Beijing, China";
  } else if (type === 'redbrick') {
    address = "红砖美术馆\nRed Brick Art Museum, Chaoyang Cuigezhuangxiang Hegezhuangcun Shunbai Road Maquanying West Road Road Kouxi 100 Milu North,Chaoyang District, Beijing, China";
  } else if (type === 'CCTVTower') {
    address = "中央广播电视塔\nCCTV Tower,HaidianNo.11, W. 3rd Ring Road Middle (Yuyuantan Park Opposite), Haidian District, Beijing, China";
  } else if (type === 'SongArtMuseum') {
    address = "松美术馆\nSong Art Museum, ShunyiTianzhuzhen Loutai Cunnan Gelasi Road,Chaoyang District, Beijing, China";
  } else if (type === 'ShougangPark') {
    address = "首钢园\nShougang Park, Shijingshan Road No.68,Shijingshan District, Beijing, China";
  } else if (type === 'LamaTemple') {
    address = "雍和宫\nLama Temple,Dongcheng 28, Yonghegong Street, Dongcheng District, Beijing, China";
  } else if (type === 'HongluoTemple') {
    address = "红螺寺\nHongluo Temple,Huairou No.2, Hongluo East Road, Huairou District, Beijing, China";
  } else if (type === 'TanzheTemple') {
    address = "潭柘寺\nTanzhe Temple, Mentougou Tanzhesizhen Tanzhe Shanxia,Mentougou District, Beijing, China";
  } else if (type === 'WhiteCloudTemple') {
    address = "白云观\nWhite Cloud Temple,Fuchengmen Inner Street No.171 Xicheng District, Beijing, China";
  } else if (type === 'FayuanTemple') {
    address = "法源寺\nFayuan Temple,Xicheng Fayuansi Front Street No.7, Xicheng District, Beijing, China";
  } else if (type === 'FivePagodaTemple') {
    address = "五塔寺\nFive Pagoda Temple, Haidian Wutasi Road North 50 Meters ,Haidian District, Beijing, China";

} else if (type === 'FangshanShiduScenicArea') {
    address = "房山十渡风景旅游区\nFangshan Shidu Scenic Area, Fangshan No.9, Jiudu Street,Fangshan District, Beijing, China";

} else if (type === 'YuduMountainScenicArea') {
    address = "玉渡山风景旅游区\nYudu Mountain Scenic Area,YanqingZhangshanyingzhen Yuhai Road North No.1, Yanqing District, Beijing, China";
} else if (type === 'Longqingxia') {
    address = "龙庆峡\nLongqingxia, YanqingNorth to Guchengcun, Jiuxianzhen,Yanqing District, Beijing, China";
} else if (type === 'PhoenixRidgeScenicArea') {
    address = "凤凰岭\nPhoenix Ridge Scenic Area, Haidian Sujiatuozhen No.19, Fenghuangling Road,Haidian District, Beijing, China";
} else if (type === 'BeijingHappyValley') {
    address = "北京欢乐谷\nBeijing Happy Valley,Chaoyang Xiaowuji North Road, E. 4th Ring Road, Chaoyang District, Beijing, China";
} else if (type === 'UniversalBeijingResort') {
    address = "北京环球影城\nUniversal Beijing Resort,Tongzhou Liyuanzhen Huanqiu Avenue, Tongzhou District, Beijing, China";
} else if (type === 'HouhaiBarStreet') {
    address = "后海酒吧一条街\nHouhai Bar Street,Xicheng Houhai Beiyan No.50 (Jingulou West Street), Xicheng District, Beijing, China";
} else if (type === 'SanlitunNightclubs') {
    address = "三里屯夜店\nSanlitun,Chaoyang District, Beijing, China";

} else if (type === 'QushuilantingBathhouse') {
    address = "曲水兰亭\nQushuilanting Bathhouse, ChaoyangNo.1070, Tonghui Riverside, Huihe South Street, Gaobeidianxiang ,Dongcheng District, Beijing, China";

  } else if (type === 'bund') {
    address = "上海市黄浦区外滩\nThe Bund, Huangpu District, Shanghai, China";
  } else if (type === 'lujiazui') {
    address = "上海市浦东新区陆家嘴金融贸易区\nLujiazui Financial District, Pudong New Area, Shanghai, China";
  } else if (type === 'orientalpearl') {
    address = "上海市浦东新区世纪大道1号\nNo.1 Century Avenue, Pudong New Area, Shanghai, China";
  } else if (type === 'waibaidu') {
    address = "上海市虹口区北苏州路111号\nNo.111 North Suzhou Road, Hongkou District, Shanghai, China";
  } else if (type === 'waitanyuan') {
    address = "上海市黄浦区外滩源\nWaitanyuan, Huangpu District, Shanghai, China";
  } else if (type === 'wukang') {
    address = "上海市徐汇区淮海中路1850号\nNo.1850 Huaihai Middle Road, Xuhui District, Shanghai";
  } else if (type === 'rockbund') {
    address = "上海市黄浦区虎丘路20号\nNo.20 Huqiu Road, Huangpu District, Shanghai";
  } else if (type === 'sinan') {
    address = "上海市黄浦区思南路51、53、55、57、59、61号\n No.51,53,55,57,59,61 Sinan Road, Huangpu District, Shanghai, China";
  } else if (type === 'laochangfang') {
    address = "上海市虹口区沙泾路10号\n No.10 ShaJing Road, Hongkou District, Shanghai, China";
  } else if (type === 'xujiahui') {
    address = "上海市徐汇区蒲西路150号\n No.150 Puxi Road, Xuhui District, Shanghai";
  } else if (type === 'disney') {
    address = "上海市浦东新区川沙新镇黄赵路310号\n No.310 Huangzhao Road, Chuansha,Pudong New Area, Shanghai";
  } else if (type === 'madametussauds') {
    address = "上海市黄浦区南京西路2-68号新世界城F10号\n F10 New World City Mall, No.2-68 Nanjing West Road, Huangpu District, Shanghai";
  } else if (type === 'filmpark') {
    address = "上海市松江区车墩镇车亭公路211号\n No.211 Cheting Road, Songjiang District, Shanghai";
  } else if (type === 'tianzifang') {
    address = "上海市黄浦区泰康路210弄\n Lane 210 Taikang Road, Huangpu District, Shanghai";
  } else if (type === 'thames') {
    address = "上海市松江区三新北路900弄\n Lane 900 Sanxin North Road, Songjiang District, Shanghai";
  } else if (type === 'qibao') {
    address = "上海市闵行区青年路与横沥路交叉口\n Intersection of Qingnian Road and Hengli Road, Minhang District, Shanghai";
  } else if (type === 'sweetlove') {
    address = "上海市虹口区甜爱路\n Tian'ai Road, Hongkou District, Shanghai";
  } else if (type === 'nanjingroad') {
    address = "上海市黄浦区南京东路\n East Nanjing Road, Huangpu District, Shanghai";
  } else if (type === 'westnanjing') {
    address = "上海市黄浦区南京西路\n West Nanjing Road, Huangpu District, Shanghai";
  } else if (type === 'huaihai') {
    address = "上海市黄浦区南京西路和淮海路\n West Nanjing Road & Huaihai Road, Huangpu District, Shanghai";
  } else if (type === 'museum') {
    address = "上海市黄浦区人民大道201号\n No.201 Renmin Avenue, Huangpu District, Shanghai";
  } else if (type === 'chinaart') {
    address = "上海市浦东新区上南路205号\n No.205 Shangnan Road, Pudong New Area, Shanghai";
  } else if (type === 'powerstation') {
    address = "上海市黄浦区苗江路678号\n No.678 Miaojiang Road, Huangpu District, Shanghai";
  } else if (type === 'guangfulin') {
    address = "上海市松江区广富林路3260弄\n Lane 3260 Guangfulin Road, Songjiang District, Shanghai";
  } else if (type === 'yugarden') {
    address = "上海市黄浦区福佑路168号\n No.168 Fuyou Road, Huangpu District, Shanghai";
  } else if (type === 'citygod') {
    address = "上海市黄浦区方浜中路249号\n No.249 Fangbang Middle Road, Huangpu District, Shanghai";
  } else if (type === 'jingan') {
    address = "上海市静安区南京西路1686号\n No.1686 West Nanjing Road, Jing'an District, Shanghai";
  } else if (type === 'dishui') {
    address = "上海市浦东新区临港新片区滴水湖\nDishui Lake, Lingang New Area, Pudong District, Shanghai";
  } else if (type === 'Cuandixia') {
    address = "Cuandixia Village, Mentougou District, Beijing";
  } else if (type === 'Lingshui') {
    address = "Lingshui Village, Mentougou District, Beijing";
  } else if (type === 'Gubei Water Town') {
    address = "Gubei Water Town, Miyun District, Beijing";
  } else if (type === 'Liuliqu') {
    address = "Liuliqu Village, Mentougou District, Beijing";
  } 
  
  
  
  else {
    address = "北京市延庆区G6京藏高速58号出口\nBadaling Great Wall, YanqingExit 58, G6 Jingzang Expressway, Beijing, China";
  }
  navigator.clipboard.writeText(address)
    .then(() => {
      alert('Address copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy address: ', err);
    });
}

// Tab functionality for attraction pages
function openTab(tabId) {
  const allTabContents = document.querySelectorAll('.tab-content');
  allTabContents.forEach(content => {
    content.classList.add('hidden');
  });
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('text-rose-600', 'border-b-2', 'border-rose-600');
    button.classList.add('text-slate-500');
  });
  
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
  }
  
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
  const content = document.getElementById('badaling-remnant-opening-hours-content');
  const toggle = document.getElementById('badaling-remnant-opening-hours-toggle');
  if (!content || !toggle) return;
  
  const hiddenParagraphs = content.querySelectorAll('p.hidden');
  
  hiddenParagraphs.forEach(p => {
    p.classList.toggle('hidden');
  });
  
  if (toggle.textContent === 'More >') {
    toggle.textContent = 'Less <';
  } else {
    toggle.textContent = 'More >';
  }
}

function updateIndicators(carouselId, activeIndex) {
  const indicatorContainer = document.querySelector(`[onclick="goToSlide(0, '${carouselId}')"]`)?.parentElement;
  if (!indicatorContainer) return;
  
  const indicators = indicatorContainer.querySelectorAll('button');
  indicators.forEach((ind, i) => {
    if (i === activeIndex) {
      ind.classList.add('active');
      ind.classList.remove('bg-white/70');
      ind.classList.add('bg-rose-500');
    } else {
      ind.classList.remove('active');
      ind.classList.remove('bg-rose-500');
      ind.classList.add('bg-white/70');
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

// Attraction Filter Functions
function initAttractionFilter() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const pageBtns = document.querySelectorAll('.page-btn');
  const attractionCards = document.querySelectorAll('.attraction-card');
  
  const defaultCategory = document.querySelector('[data-default-category]')?.getAttribute('data-default-category') || 'imperial';
  let currentCategory = defaultCategory;
  let currentPage = '1';
  
  function filterAttractions() {
    attractionCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardPage = card.getAttribute('data-page');
      
      let isMatch = false;
      if (currentCategory === 'landmark' || currentCategory === 'temple') {
        isMatch = cardCategory === currentCategory;
      } else if (currentCategory === 'imperial') {
        isMatch = cardCategory.includes(currentCategory);
      } else {
        isMatch = cardCategory === currentCategory;
      }
      
      if (pageBtns.length > 0) {
        if (isMatch && cardPage === currentPage) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      } else {
        if (isMatch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
  }
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => {
        b.classList.remove('active');
      });
      
      this.classList.add('active');
      currentCategory = this.getAttribute('data-category');
      currentPage = '1';
      
      pageBtns.forEach(b => {
        const pageNum = b.getAttribute('data-page');
        if (pageNum === '1') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      
      filterAttractions();
    });
  });
  
  pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      pageBtns.forEach(b => {
        b.classList.remove('active');
      });
      
      this.classList.add('active');
      currentPage = this.getAttribute('data-page');
      filterAttractions();
    });
  });
  
  filterAttractions();
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initAttractionFilter();
  
  const carousels = [
    'badaling',
    'mutianyu',
    'mutianyu-map',
    'juyongguan',
    'huanghuacheng',
    'jiankou',
    'gubeikou',
    'badaling-forest',
    'forbidden',
    'forbidden-map',
    'summer',
    'summer-map',
    'temple',
    'temple-map',
    'tiananmen',
    'tiananmen-map',
    'yuanmingyuan',
    'yuanmingyuan-map',
    'jingshan',
    'jingshan-map',
    'bund',
    'lujiazui',
    'orientalpearl',
    'waibaidu',
    'waitanyuan',
    'wukang',
    'rockbund',
    'sinan',
    'laochangfang',
    'xujiahui',
    'disney',
    'dishui'
  ];
  
  carousels.forEach(carouselId => {
    goToSlide(0, carouselId);
  });
});
