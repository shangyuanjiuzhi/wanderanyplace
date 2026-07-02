// Attractions data
const attractionsData = {
  attractions: [
    // Imperial Relics (17)
    { id: 'great-wall', name: 'Great Wall of China', time: '4-6 hours', category: 'imperial' },
    { id: 'forbidden-city', name: 'Forbidden City', time: '3-4 hours', category: 'imperial' },
    { id: 'summer-palace', name: 'Summer Palace', time: '2-3 hours', category: 'imperial' },
    { id: 'temple-of-heaven', name: 'Temple of Heaven', time: '2-3 hours', category: 'imperial' },
    { id: 'tiananmen-square', name: 'Tiananmen Square', time: '1-2 hours', category: 'imperial' },
    { id: 'yuanmingyuan', name: 'Yuanmingyuan (Old Summer Palace)', time: '2-3 hours', category: 'imperial' },
    { id: 'jingshan-park', name: 'Jingshan Park', time: '1 hour', category: 'imperial' },
    { id: 'ming-tombs', name: 'Ming Tombs', time: '2-3 hours', category: 'imperial' },
    { id: 'beihai-park', name: 'Beihai Park', time: '2-3 hours', category: 'imperial' },
    { id: 'confucius-temple', name: 'Confucius Temple and Guozijian', time: '1-2 hours', category: 'imperial' },
    { id: 'ditan-park', name: 'Ditan Park', time: '1-2 hours', category: 'imperial' },
    { id: 'zhongshan-park', name: 'Zhongshan Park', time: '1 hour', category: 'imperial' },
    { id: 'ritan-park', name: 'Ritan Park', time: '1 hour', category: 'imperial' },
    { id: 'xiannongtan', name: 'Xiannongtan (Temple of Agriculture)', time: '1-2 hours', category: 'imperial' },
    { id: 'yuetan-park', name: 'Yuetan Park (Temple of Moon)', time: '1-2 hours', category: 'imperial' },
    { id: 'lugou-bridge', name: 'Lugou Bridge (Marco Polo Bridge)', time: '1-2 hours', category: 'imperial' },
    { id: 'yuandadu', name: 'Yuan Dadu City Wall Relics Park', time: '1-2 hours', category: 'imperial' },
    // Special Parks (9)
    { id: 'zhoukoudian', name: 'Zhoukoudian Peking Man Site', time: '2-3 hours', category: 'park' },
    { id: 'fragrant-hills', name: 'Fragrant Hills Park', time: '3-4 hours', category: 'park' },
    { id: 'olympic-forest-park', name: 'Beijing Olympic Forest Park', time: '2-3 hours', category: 'park' },
    { id: 'yuyuantan-park', name: 'Yuyuantan Park', time: '2-3 hours', category: 'park' },
    { id: 'national-botanical', name: 'National Botanical Garden', time: '2-3 hours', category: 'park' },
    { id: 'grand-view-garden', name: 'Beijing Grand View Garden', time: '2-3 hours', category: 'park' },
    { id: 'chaoyang-park', name: 'Chaoyang Park', time: '2-3 hours', category: 'park' },
    { id: 'badachu-park', name: 'Badachu Park', time: '2-3 hours', category: 'park' },
    { id: 'garden-expo-park', name: 'Beijing Garden Expo Park', time: '2-3 hours', category: 'park' },
    // Shopping Malls (5)
    { id: 'wangfujing', name: 'Wangfujing Pedestrian Street', time: '2-3 hours', category: 'shopping' },
    { id: 'the-place', name: 'The Place', time: '1-2 hours', category: 'shopping' },
    { id: 'xidan-commercial', name: 'Xidan Commercial Street', time: '2-3 hours', category: 'shopping' },
    { id: 'sanlitun-taikoo', name: 'Sanlitun Taikoo Li', time: '2-3 hours', category: 'shopping' },
    { id: 'blue-harbor', name: 'Blue Harbor', time: '1-2 hours', category: 'shopping' },
    // Museums (3)
    { id: 'national-museum', name: 'National Museum of China', time: '2-3 hours', category: 'museum' },
    { id: 'capital-museum', name: 'Capital Museum', time: '2-3 hours', category: 'museum' },
    { id: 'guanfu-museum', name: 'Guanfu Museum', time: '1-2 hours', category: 'museum' },
    // City Landmarks (10)
    { id: 'birds-nest', name: "Bird's Nest (National Stadium)", time: '1-2 hours', category: 'landmark' },
    { id: 'water-cube', name: 'Water Cube (National Aquatics Center)', time: '1-2 hours', category: 'landmark' },
    { id: '798-art', name: '798 Art District', time: '2-3 hours', category: 'landmark' },
    { id: 'cctv-headquarters', name: 'CCTV Headquarters', time: '1-2 hours', category: 'landmark' },
    { id: 'ncpa', name: 'National Centre for the Performing Arts', time: '1 hour', category: 'landmark' },
    { id: 'galaxy-soho', name: 'Galaxy SOHO', time: '1-2 hours', category: 'landmark' },
    { id: 'red-brick-art', name: 'Red Brick Art Museum', time: '1-2 hours', category: 'landmark' },
    { id: 'cctv-tower', name: 'CCTV Tower', time: '1-2 hours', category: 'landmark' },
    { id: 'song-art-museum', name: 'Song Art Museum', time: '1-2 hours', category: 'landmark' },
    { id: 'shougang-park', name: 'Shougang Park', time: '2-3 hours', category: 'landmark' },
    // Temples (6)
    { id: 'lama-temple', name: 'Yonghe Temple (Lama Temple)', time: '1-2 hours', category: 'temple' },
    { id: 'hongluo-temple', name: 'Hongluo Temple', time: '1-2 hours', category: 'temple' },
    { id: 'tanzhe-temple', name: 'Tanzhe Temple', time: '1-2 hours', category: 'temple' },
    { id: 'white-cloud-temple', name: 'Baiyun Guan (White Cloud Temple)', time: '1-2 hours', category: 'temple' },
    { id: 'fayuan-temple', name: 'Fayuan Temple', time: '1-2 hours', category: 'temple' },
    { id: 'five-pagoda', name: 'Five Pagoda Temple (Wuta Si)', time: '1-2 hours', category: 'temple' },
    // Hiking Spots (4)
    { id: 'fangshan-shidu', name: 'Fangshan Shidu Scenic Area', time: '3-4 hours', category: 'hiking' },
    { id: 'yudu-mountain', name: 'Yudu Mountain Scenic Area', time: '3-4 hours', category: 'hiking' },
    { id: 'phoenix-ridge', name: 'Beijing Phoenix Ridge Scenic Area', time: '3-4 hours', category: 'hiking' },
    { id: 'longqingxia', name: 'Longqingxia', time: '3-4 hours', category: 'hiking' },
    // Entertainment (5)
    { id: 'beijing-happy-valley', name: 'Beijing Happy Valley', time: '3-4 hours', category: 'entertainment' },
    { id: 'universal-beijing', name: 'Universal Beijing Resort', time: '4-5 hours', category: 'entertainment' },
    { id: 'houhai-bar', name: 'Houhai Bar Street', time: '2-3 hours', category: 'entertainment' },
    { id: 'sanlitun-nightclubs', name: 'Sanlitun Nightclubs', time: '2-3 hours', category: 'entertainment' },
    { id: 'qushuilanting', name: 'Qushuilanting Bathhouse', time: '1-2 hours', category: 'entertainment' }
  ],
  villages: [
    { id: 'cuandixia', name: 'Cuandixia Village', time: '4-5 hours', category: 'village' },
    { id: 'lingshui', name: 'Lingshui Village', time: '3-4 hours', category: 'village' },
    { id: 'gubei', name: 'Gubei Water Town', time: '4-5 hours', category: 'village' },
    { id: 'liuliqu', name: 'Liuliqu Village', time: '3-4 hours', category: 'village' }
  ]
};

// Food data
const foodData = {
  'food-specialties': [
    { id: 'hotpot', name: '老北京涮羊肉 Beijing Hot Pot' },
    { id: 'peking-duck', name: '北京烤鸭 Peking Duck' },
    { id: 'zhajiang', name: '炸酱面 Zhajiang Noodles' },
    { id: 'zhizi', name: '炙子烤肉 Zhizi Roast Meat' }
  ],
  'food-desserts': [
    { id: 'almond-tofu', name: '杏仁豆腐 Almond Tofu' },
    { id: 'lvdagun', name: '驴打滚 Rolling Donkey' },
    { id: 'wandouhuang', name: '豌豆黄 Pea Cake' },
    { id: 'aiwowowo', name: '艾窝窝 Ai Wo Wo' }
  ],
  'food-snacks': [
    { id: 'douzhi', name: '豆汁 Douzhi' },
    { id: 'baodu', name: '爆肚儿 Bao Dur' },
    { id: 'luzhu', name: '卤煮 Lu Zhu' },
    { id: 'chaogan', name: '炒肝 Chao Gan' }
  ],
  'food-michelin': [
    { id: 'chaoshangchao', name: '潮上潮 Chao Shang Chao' },
    { id: 'xinrongji', name: '新荣记 Xin Rong Ji' },
    { id: 'jingji', name: '京季 Jing Ji' },
    { id: 'kingjoy', name: '京兆尹 King Joy' },
    { id: 'lushanglu', name: '鲁上鲁 Lu Shang Lu' },
    { id: 'wulixiang', name: '屋里厢 Wu Li Xiang' }
  ]
};

// Selected items
let selectedAttractions = [];
let selectedFood = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderAttractions('imperial');
  renderFood('food-specialties');
  setDefaultDates();
  setupCategoryButtons();
  setupSelectionCards();
});

// Set default dates
function setDefaultDates() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  document.getElementById('departureDate').value = today.toISOString().split('T')[0];
  document.getElementById('returnDate').value = nextWeek.toISOString().split('T')[0];
}

// Setup category buttons
function setupCategoryButtons() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      const parent = this.closest('.mb-8');
      
      // Update active state
      parent.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Render corresponding list
      if (category === 'villages') {
        renderAttractions('villages');
      } else if (category === 'attractions') {
        renderAttractions('imperial');
      } else if (category.startsWith('food-')) {
        renderFood(category);
      } else {
        renderAttractions(category);
      }
    });
  });
}

// Render attractions
function renderAttractions(category) {
  const container = document.getElementById('attractionsList');
  let items;
  
  if (category === 'villages') {
    items = attractionsData.villages;
  } else {
    items = attractionsData.attractions.filter(item => item.category === category);
  }
  
  container.innerHTML = items.map(item => `
    <div class="selection-card relative p-3 border-2 border-gray-200 rounded-xl cursor-pointer ${selectedAttractions.includes(item.id) ? 'selected' : ''}" data-id="${item.id}" data-type="attraction">
      <div class="text-sm font-medium text-center">${item.name}</div>
      <span class="check-icon"><i class="iconfont icon-duigou" style="font-size: 12px;"></i></span>
    </div>
  `).join('');
  
  setupSelectionCards();
}

// Render food
function renderFood(category) {
  const container = document.getElementById('foodList');
  const items = foodData[category] || [];
  
  container.innerHTML = items.map(item => `
    <div class="selection-card relative p-3 border-2 border-gray-200 rounded-xl cursor-pointer ${selectedFood.includes(item.id) ? 'selected' : ''}" data-id="${item.id}" data-type="food">
      <div class="text-sm font-medium text-center">${item.name}</div>
      <span class="check-icon"><i class="iconfont icon-duigou" style="font-size: 12px;"></i></span>
    </div>
  `).join('');
  
  setupSelectionCards();
}

// Setup selection cards
function setupSelectionCards() {
  document.querySelectorAll('.selection-card').forEach(card => {
    card.onclick = function() {
      const id = this.dataset.id;
      const type = this.dataset.type;
      
      if (type === 'attraction') {
        if (selectedAttractions.includes(id)) {
          selectedAttractions = selectedAttractions.filter(i => i !== id);
          this.classList.remove('selected');
        } else {
          selectedAttractions.push(id);
          this.classList.add('selected');
        }
      } else {
        if (selectedFood.includes(id)) {
          selectedFood = selectedFood.filter(i => i !== id);
          this.classList.remove('selected');
        } else {
          selectedFood.push(id);
          this.classList.add('selected');
        }
      }
    };
  });
}

// Generate itinerary - using local rules-based logic (no AI API)
function generateItinerary() {
  const departureDate = document.getElementById('departureDate').value;
  const returnDate = document.getElementById('returnDate').value;
  
  if (!departureDate || !returnDate) {
    alert('Please select travel dates');
    return;
  }

  if (selectedAttractions.length === 0 && selectedFood.length === 0) {
    alert('Please select at least one attraction or food');
    return;
  }

  // Show loading
  document.getElementById('formSection').classList.add('hidden');
  document.getElementById('loadingSection').classList.remove('hidden');
  
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;

  // Use local rules-based itinerary generation
  displayFallbackItinerary(departureDate, returnDate);

  btn.disabled = false;
}

// Display itinerary
function displayItinerary(data) {
  document.getElementById('loadingSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  
  // Parse Markdown table to HTML table
  const markdown = data.itinerary;
  const lines = markdown.split('\n').filter(line => line.trim());
  const rows = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && !line.includes('|---')) {
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length >= 5 && i > 1 && !cells[0].includes('Day') && !cells[0].includes('day')) {
        rows.push({
          day: cells[0] || '',
          theme: cells[1] || '',
          morning: cells[2] || '',
          afternoon: cells[3] || '',
          evening: cells[4] || '',
          remark: ''
        });
      }
    }
  }
  
  const resultSection = document.getElementById('resultSection');
  resultSection.innerHTML = `
    <div class="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">Your Beijing Itinerary</h2>
          <p class="text-slate-600">${data.departureDate} - ${data.returnDate}</p>
        </div>
        <button onclick="resetForm()" class="px-4 py-2 bg-gray-200 text-slate-700 rounded-lg hover:bg-gray-300 transition-colors">
          Create New Itinerary
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-amber-50">
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Day</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Morning</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Afternoon</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Evening</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Remark</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td class="border border-amber-200 px-4 py-3 font-medium">Day ${row.day}<br><span class="text-sm font-normal">${row.theme}</span></td>
                <td class="border border-amber-200 px-4 py-3">${row.morning}</td>
                <td class="border border-amber-200 px-4 py-3">${row.afternoon}</td>
                <td class="border border-amber-200 px-4 py-3">${row.evening}</td>
                <td class="border border-amber-200 px-4 py-3 text-red-600 text-sm">${row.remark}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Calculate required days based on combo rules
function calculateRequiredDays(selectedAttractionDetails, availableDays) {
  // Rule 1: Line1 Core - max 5 items/day (2 morning + 2 afternoon + 1 evening)
  const line1Core = ['tiananmen-square', 'forbidden-city', 'jingshan-park','beihai-park', 'wangfujing'];
  const line1Count = selectedAttractionDetails.filter(a => line1Core.includes(a.id)).length;
  const line1Days = Math.ceil(line1Count / 5);

  // Rule 2: Line3 Culture - max 3 items/day
  const line3 = ['lama-temple', 'confucius-temple','ditan-park'];
  const line3Count = selectedAttractionDetails.filter(a => line3.includes(a.id)).length;
  const line3Days = Math.ceil(line3Count / 3);

  // Rule 3: Summer Palace - 2 items = 1 day
  const summerCombo = ['summer-palace', 'yuanmingyuan'];
  const summerCount = selectedAttractionDetails.filter(a => summerCombo.includes(a.id)).length;
  const summerDays = Math.ceil(summerCount / 2);

  // Rule 4: Museum+Park - max 3 items/day with NCPA
  const museumBeihai = ['temple-of-heaven', 'national-museum'];
  const museumCount = selectedAttractionDetails.filter(a => museumBeihai.includes(a.id)).length;
  const museumDays = Math.ceil(museumCount / 2);

  // Rule 5: Olympic - 4 items = 1 days (each is half-day)
  const olympicLine = ['olympic-forest-park', 'birds-nest', 'water-cube', 'yuandadu'];
  const olympicCount = selectedAttractionDetails.filter(a => olympicLine.includes(a.id)).length;
  const olympicDays = Math.ceil(olympicCount / 4);

  // Rule 6: Chaoyang Night - 1 day for all 3 items
  const chaoyangLine = ['chaoyang-park', 'blue-harbor', 'sanlitun-taikoo'];
  const chaoyangCount = selectedAttractionDetails.filter(a => chaoyangLine.includes(a.id)).length;
  const chaoyangDays = chaoyangCount > 0 ? 1 : 0;

  // Rule 7: Ritan CBD - 1 day for all 3 items
  const ritanCBD = ['ritan-park', 'cctv-headquarters', 'galaxy-soho','the-place'];
  const ritanCount = selectedAttractionDetails.filter(a => ritanCBD.includes(a.id)).length;
  const ritanDays = Math.ceil(ritanCount / 3);

  // Rule 8: Yuyuantan Area - max 2 items/day
  const yuyuantanArea = ['yuyuantan-park', 'cctv-tower', 'capital-museum','white-cloud-temple'];
  const yuyuantanCount = selectedAttractionDetails.filter(a => yuyuantanArea.includes(a.id)).length;
  const yuyuantanDays = Math.ceil(yuyuantanCount / 2);

  // Rule 9: Xidan Area - max 2 items/day
  const xidanArea = ['yuetan-park', 'xidan-commercial', 'ncpa','fayuan-temple'];
  const xidanCount = selectedAttractionDetails.filter(a => xidanArea.includes(a.id)).length;
  const xidanDays = Math.ceil(xidanCount / 2);

  // Rule 10: Xiannongtan+ - 2 items = 1 day
  const xiannongtanPlus = ['xiannongtan', 'grand-view-garden','zhongshan-park'];
  const xiannongtanCount = selectedAttractionDetails.filter(a => xiannongtanPlus.includes(a.id)).length;
  const xiannongtanDays = Math.ceil(xiannongtanCount / 2);

  // Rule 11: 798 Art Zone - max 2 items/day
  const artZone = ['guanfu-museum', '798', 'song-art-museum', 'red-brick-art'];
  const artCount = selectedAttractionDetails.filter(a => artZone.includes(a.id)).length;
  const artDays = Math.ceil(artCount / 2);

  // Full-day attractions: Great Wall + others (each takes 1 full day)
  const fullDayAttractions = ['great-wall', 'ming-tombs', 'hongluo-temple', 'tanzhe-temple', 'fangshan-shidu', 'yudu-mountain', 'phoenix-ridge', 'longqingxia', 'beijing-happy-valley', 'universal-beijing', 'cuandixia', 'lingshui', 'gubei', 'liuliqu', 'zhoukoudian', 'fragrant-hills', 'national-botanical', 'badachu-park', 'garden-expo-park', 'shougang-park'];
  const fullDayCount = selectedAttractionDetails.filter(a => fullDayAttractions.includes(a.id)).length;

  // Classic night activities (don't take full day)
  const classicNight = ['sanlitun-nightclubs', 'houhai-bar', 'qushuilanting'];

  // Single attractions pool
  const comboIds = [...line1Core, ...line3, ...summerCombo, ...museumBeihai, ...olympicLine, ...chaoyangLine, ...ritanCBD, ...yuyuantanArea, ...xidanArea, ...xiannongtanPlus, ...artZone, ...fullDayAttractions];
  const singlePool = selectedAttractionDetails.filter(a => !comboIds.includes(a.id) && !classicNight.includes(a.id));
  const singleDays = Math.ceil(singlePool.length / 2);

  const totalRequired = line1Days + line3Days + summerDays + museumDays + olympicDays + chaoyangDays + ritanDays + yuyuantanDays + xidanDays + xiannongtanDays + artDays + fullDayCount + singleDays;

  return totalRequired;
}

// New itinerary builder based on user's rules
// Rule: ≥2 items in a combo = trigger combo schedule; otherwise pair attractions (morning + afternoon) with food in evening
function buildItinerary(days, imperialRelics, greatWallAndLongTrips, landmarksAndShopping, otherAttractions, nightActivities, foods, selectedForbiddenCityRelated, selectedSummerPalaceCombo, selectedFoodVideos = false) {
  const allDays = [];
  
  // Rule 1: Line1 Core - max 5 items/day (2 morning + 2 afternoon + 1 evening)
  const line1Core = ['tiananmen-square', 'forbidden-city', 'jingshan-park','beihai-park', 'wangfujing'];
  const line1Wangfujing = 'wangfujing';

  // Rule 2: Line3 Culture - max 3 items/day
  const line3 = ['lama-temple', 'confucius-temple','ditan-park'];

  // Rule 3: Summer Palace - 2 items = 1 day
  const summerCombo = ['summer-palace', 'yuanmingyuan'];

  // Rule 4: Museum+Park - max 3 items/day with NCPA
  const museumBeihai = ['temple-of-heaven', 'national-museum'];

  // Rule 5: Olympic - 4 items = 1 days (each is half-day)
  const olympicLine = ['olympic-forest-park', 'birds-nest', 'water-cube', 'yuandadu'];

  // Rule 6: Chaoyang Night - 1 day for all 3 items
  const chaoyangLine = ['chaoyang-park', 'blue-harbor', 'sanlitun-taikoo'];

  // Rule 7: Ritan CBD - 1 day for all 3 items
  const ritanCBD = ['ritan-park', 'cctv-headquarters', 'galaxy-soho','the-place'];

  // Rule 8: Yuyuantan Area - 1 day for all 3 items
  const yuyuantanArea = ['yuyuantan-park', 'cctv-tower', 'capital-museum','white-cloud-temple'];

  // Rule 9: Xidan Area - max 3 items/day
  const xidanArea = ['yuetan-park', 'xidan-commercial', 'ncpa','fayuan-temple'];

  // Rule 10: Xiannongtan+ - 2 items = 1 day
  const xiannongtanPlus = ['xiannongtan', 'grand-view-garden','zhongshan-park'];

  // Rule 11: 798 Art Zone - max 2 items/day
  const artZone = ['guanfu-museum', '798', 'song-art-museum', 'red-brick-art'];
  
  // Full-day attractions: Great Wall + others (each takes 1 full day)
  const fullDayAttractions = ['great-wall', 'ming-tombs', 'hongluo-temple', 'tanzhe-temple', 'fangshan-shidu', 'yudu-mountain', 'phoenix-ridge', 'longqingxia', 'beijing-happy-valley', 'universal-beijing', 'cuandixia', 'lingshui', 'gubei', 'liuliqu', 'zhoukoudian', 'fragrant-hills', 'national-botanical', 'badachu-park', 'garden-expo-park', 'shougang-park'];

  // Classic night activities (don't take full day)
  const classicNight = ['sanlitun-nightclubs', 'houhai-bar', 'qushuilanting'];
  
  // Get selected items with details
  const allAttractions = [...attractionsData.attractions, ...attractionsData.villages];
  // Include all selected attractions including those from special combos
  const selectedAttractionDetails = [
    ...imperialRelics, 
    ...greatWallAndLongTrips, 
    ...landmarksAndShopping, 
    ...otherAttractions,
    ...(selectedForbiddenCityRelated || []),
    ...(selectedSummerPalaceCombo || [])
  ];
  
  // Separate attractions into categories
  // Note: selectedForbiddenCityRelated contains forbidden-city, jingshan-park which are part of Line1
  const selectedLine1Core = selectedAttractionDetails.filter(a => line1Core.includes(a.id));
  const forbiddenCityIds = selectedForbiddenCityRelated ? selectedForbiddenCityRelated.map(a => a.id) : [];
  const line1FromForbidden = selectedForbiddenCityRelated ? selectedForbiddenCityRelated.filter(a => ['forbidden-city', 'jingshan-park'].includes(a.id)) : [];
  // Remove duplicates by id
  const allLine1Core = [...new Map([...selectedLine1Core, ...line1FromForbidden].map(a => [a.id, a])).values()];
  const selectedWangfujing = selectedAttractionDetails.find(a => a.id === line1Wangfujing);
  const selectedLine3 = selectedAttractionDetails.filter(a => line3.includes(a.id));
  const selectedSummerCombo = selectedAttractionDetails.filter(a => summerCombo.includes(a.id));
  const selectedMuseumBeihai = selectedAttractionDetails.filter(a => museumBeihai.includes(a.id));
  const selectedOlympic = selectedAttractionDetails.filter(a => olympicLine.includes(a.id));
  
  // Full day attractions (each takes 1 full day: morning + evening)
  const selectedFullDay = selectedAttractionDetails.filter(a => 
    fullDayAttractions.includes(a.id)
  );
  
  // Shopping attractions (to be placed on last day)
  // Exclude shopping attractions already included in triggered combos (Rule 1-6)
  const selectedChaoyang = selectedAttractionDetails.filter(a => chaoyangLine.includes(a.id));
  const comboIdsUsed = [
    ...(allLine1Core.length >= 2 ? line1Core : []),
    ...(selectedLine3.length >= 2 ? line3 : []),
    ...(selectedSummerCombo.length >= 2 ? summerCombo : []),
    ...(selectedMuseumBeihai.length >= 2 ? museumBeihai : []),
    ...(selectedOlympic.length >= 2 ? olympicLine : []),
    ...(selectedChaoyang.length >= 2 ? chaoyangLine : [])
  ];
  
  const shoppingAttractions = selectedAttractionDetails.filter(a => 
    a.category === 'shopping' && !comboIdsUsed.includes(a.id)
  );
  
  // Standalone attractions pool (not in any combo)
  let standalonePool = [];
  
  // Track scheduled attraction IDs to prevent duplicates
  const scheduledIds = new Set();
  
  // Helper to mark attractions as scheduled
  const markAsScheduled = (attractions) => {
    attractions.forEach(a => scheduledIds.add(a.id));
  };
  
  // Helper to get food recommendations for remark (3.9.2-3.9.3: desserts and snacks)
  // Only applies when user selected food videos AND remark contains Hutong recommendation
  const getFoodRecommendations = () => {
    // Filter for desserts and snacks (3.9.2-3.9.3) - suitable for morning hutong exploration
    const morningFoods = foods.filter(f => ['food-desserts', 'food-snacks'].includes(f.category));
    if (selectedFoodVideos && morningFoods.length > 0) {
      const foodNames = morningFoods.map(f => f.name).join('、');
      return '<br>✨ During your Hutong walk, you might enjoy: ' + foodNames;
    }
    return '';
  };
  
  // Helper to get evening with food
  // Logic:
  // 1. 3.9.2-3.9.3 (desserts/snacks): if Hutong Walk in remark → morning, else → evening (all in one day)
  // 2. 3.9.1 (specialties) and 3.9.4 (michelin): each food item gets one evening
  let eveningIndex = 0;
  let dessertsUsedInEvening = false;
  
  const getEvening = (hasHutongWalk = false) => {
    // Get dinner-only foods (3.9.1 specialties + 3.9.4 michelin)
    const dinnerOnlyFoods = foods.filter(f => ['food-specialties', 'food-michelin'].includes(f.category));
    // Get desserts/snacks (3.9.2-3.9.3)
    const dessertsAndSnacks = foods.filter(f => ['food-desserts', 'food-snacks'].includes(f.category));
    
    // If no Hutong Walk and desserts/snacks not used yet, put all desserts/snacks in one evening
    if (!hasHutongWalk && dessertsAndSnacks.length > 0 && !dessertsUsedInEvening) {
      dessertsUsedInEvening = true;
      const allDesserts = dessertsAndSnacks.map(f => f.name).join(', ');
      return `${allDesserts} for dinner`;
    }
    
    // Otherwise, distribute dinner-only foods one per evening
    if (eveningIndex < dinnerOnlyFoods.length) {
      const food = dinnerOnlyFoods[eveningIndex];
      eveningIndex++;
      return `${food.name} for dinner`;
    }
    
    return '-';
  };
  
  // Helper to add a day
  const addDay = (theme, morning, afternoon, evening, remark = '') => {
    // Add food recommendations to remark if remark contains Hutong recommendation and food videos are selected
    // If no Hutong recommendation, food will be placed in evening via getEvening()
    if (remark.includes('Hutong Walk') && selectedFoodVideos) {
      remark += getFoodRecommendations();
      // Mark desserts/snacks as used so they won't appear again in evening
      dessertsUsedInEvening = true;
    }
    
    if (allDays.length < days) {
      allDays.push({ theme, morning, afternoon, evening, remark });
      return true;
    }
    return false;
  };
  
  // Helper to add day with single attraction (full day)
  const addFullDayAttraction = (attraction) => {
    if (allDays.length < days) {
      allDays.push({
        theme: 'Full Day Adventure',
        morning: `Full day: Explore ${attraction.name}`,
        afternoon: '-',
        evening: getEvening(),
        remark: ''
      });
      return true;
    }
    return false;
  };
  
  // Helper to pair attractions (morning + afternoon)
  const pairAttractions = (pool) => {
    const paired = [];
    for (let i = 0; i < pool.length; i += 2) {
      const morning = pool[i] ? `Visit ${pool[i].name}` : '-';
      const afternoon = pool[i + 1] ? `Explore ${pool[i + 1].name}` : '-';
      paired.push({ morning, afternoon });
    }
    return paired;
  };
  
  // ============ COMBO RULES (trigger only if ≥2 items) ============
  
  // Rule 1: Line1 Core - max 5 items/day (2 morning + 2 afternoon + 1 evening)
  // Evening must be Wangfujing if selected, otherwise max 4 items/day
  if (allLine1Core.length >= 2 && allDays.length < days) {
    // Remove Wangfujing from allLine1Core since it's evening-only
    const line1WithoutWangfujing = allLine1Core.filter(a => a.id !== 'wangfujing');
    
    // Max 4 items for morning+afternoon
    const day1Line1 = line1WithoutWangfujing.slice(0, 4);
    const remainingLine1 = line1WithoutWangfujing.slice(4);
    
    // Distribute attractions: 2+2 if >=4 items, 1+1 if 2-3 items, 1+remaining if 1 item
    const morningCount = day1Line1.length >= 3 ? 2 : 1;
    const morning = day1Line1.slice(0, morningCount).map(a => `Visit ${a.name}`).join(', ');
    const afternoon = day1Line1.slice(morningCount).map(a => `Explore ${a.name}`).join(', ') || '-';
    
    // Evening: Build evening schedule based on selected items
    // Order: dinner > Wangfujing > Houhai Bar
    
    // Get dinner using getEvening helper (which tracks used dinners via eveningIndex)
    const dinner = getEvening(true); // true = has Hutong Walk
    
    // Check for Houhai Bar
    const houhai = nightActivities.find(a => a.id === 'houhai-bar' && !scheduledIds.has('houhai-bar'));
    
    // Build evening string based on available items
    const eveningParts = [];
    if (dinner !== '-') eveningParts.push(dinner);
    if (selectedWangfujing) eveningParts.push(`Visit ${selectedWangfujing.name}`);
    if (houhai) eveningParts.push(`Explore ${houhai.name}`);
    
    const evening = eveningParts.length > 0 ? eveningParts.join(', ') : '-';
    
    // Mark scheduled items
    if (selectedWangfujing) markAsScheduled([selectedWangfujing]);
    if (houhai) markAsScheduled([houhai]);
    
    // Set remark with Hutong Walk recommendation
    const remark = '✨ Consider taking Hutong Walk Line 1 or Line 6 to experience authentic Beijing culture';
    
    markAsScheduled(day1Line1);
    addDay('Explore Central Axis', morning, afternoon, evening, remark);
    // Shopping attractions go to shopping day, not standalone pool
    remainingLine1.forEach(a => {
      if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
        shoppingAttractions.push(a);
      } else if (a.category !== 'shopping') {
        standalonePool.push(a);
      }
    });
  }
  
  // Rule 2: Line3 Culture - max 3 items/day
  if (selectedLine3.length >= 2 && allDays.length < days) {
    const day1Line3 = selectedLine3.slice(0, 3);
    const remainingLine3 = selectedLine3.slice(3);
    
    // Distribute attractions: 1 in morning, 1 in afternoon, 1 in both if 3 items
    const morning = day1Line3.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
    const afternoon = day1Line3.slice(1, 3).map(a => `Explore ${a.name}`).join(', ') || '-';
    
    markAsScheduled(day1Line3);
    addDay('Explore Ancient Temples', morning, afternoon, getEvening(true), 
      '✨ Consider taking Hutong Walk Line 2 or Line 3 to experience authentic Beijing culture');
    
    // Shopping attractions go to shopping day, not standalone pool
    remainingLine3.forEach(a => {
      if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
        shoppingAttractions.push(a);
      } else if (a.category !== 'shopping') {
        standalonePool.push(a);
      }
    });
  }
  
  // Rule 3: Summer Palace - 2 items = 1 day
  if (selectedSummerCombo.length >= 2 && allDays.length < days) {
    const summerPalace = selectedSummerCombo.find(a => a.id === 'summer-palace');
    const yuanmingyuan = selectedSummerCombo.find(a => a.id === 'yuanmingyuan');
    const morning = summerPalace ? `Visit ${summerPalace.name}` : '-';
    const afternoon = yuanmingyuan ? `Explore ${yuanmingyuan.name}` : '-';
    
    let evening = getEvening();
    const sanlitun = nightActivities.find(a => a.id === 'sanlitun-nightclubs');
    if (sanlitun) {
      evening = evening === '-' ? `Then: Explore Sanlitun` : `${evening}, Then: Explore Sanlitun`;
    }
    markAsScheduled(selectedSummerCombo);
    addDay('Summer Palace Day', morning, afternoon, evening);
  }
  
  // Rule 4: Museum+Park - max 3 items/day
  if (selectedMuseumBeihai.length >= 2 && allDays.length < days) {
    const day1Museum = selectedMuseumBeihai.slice(0, 3);
    const remainingMuseum = selectedMuseumBeihai.slice(3);
    
    // Distribute attractions: 1 in morning, 1-2 in afternoon
    const morning = day1Museum.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
    const afternoon = day1Museum.slice(1, 3).map(a => `Explore ${a.name}`).join(', ') || '-';
    
    markAsScheduled(day1Museum);
    addDay('Museum & Park Day', morning, afternoon, getEvening());
    
    // Shopping attractions go to shopping day, not standalone pool
    remainingMuseum.forEach(a => {
      if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
        shoppingAttractions.push(a);
      } else if (a.category !== 'shopping') {
        standalonePool.push(a);
      }
    });
  }
  
  // Rule 5: Olympic - 4 items = 1 day (each is half-day)
  // olympic-forest-park, birds-nest, water-cube must be bundled together
  if (selectedOlympic.length >= 2 && allDays.length < days) {
    // Group olympic-forest-park, birds-nest, water-cube together
    const bundledOlympic = selectedOlympic.filter(a => 
      ['olympic-forest-park', 'birds-nest', 'water-cube'].includes(a.id)
    );
    const yuandadu = selectedOlympic.find(a => a.id === 'yuandadu');
    
    let morning, afternoon;
    
    if (yuandadu) {
      // If yuandadu is selected, put all bundled olympic in morning, yuandadu in afternoon
      morning = bundledOlympic.map(a => `Visit ${a.name}`).join(', ');
      afternoon = `Explore ${yuandadu.name}`;
    } else {
      // If no yuandadu, distribute bundled olympic: 1 in morning, 1-2 in afternoon
      morning = bundledOlympic.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
      afternoon = bundledOlympic.slice(1).map(a => `Explore ${a.name}`).join(', ') || '-';
    }
    
    markAsScheduled(selectedOlympic);
    addDay('Olympic Zone Day', morning, afternoon, getEvening());
  }
  
  // Rule 6: Chaoyang Night - max 3 items/day (min 2 to trigger)
  if (selectedChaoyang.length >= 2) {
    for (let i = 0; i < selectedChaoyang.length && allDays.length < days; i += 3) {
      const dayChaoyang = selectedChaoyang.slice(i, i + 3);
      
      // Only process if we have 2+ items, otherwise add to shoppingAttractions (for shopping) or standalonePool
      if (dayChaoyang.length >= 2) {
        // Distribute attractions: 1 in morning, 1-2 in afternoon
        const morning = dayChaoyang.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
        const afternoon = dayChaoyang.slice(1, 3).map(a => `Explore ${a.name}`).join(', ') || '-';
        
        // Check for night activities in Chaoyang District (only if not already scheduled)
        let evening = getEvening();
        let remark = '';
        
        // Check if Sanlitun Taikoo Li is in today's attractions (for bundling with nightclubs)
        const hasSanlitunTaikoo = dayChaoyang.some(a => a.id === 'sanlitun-taikoo');
        // Check for Sanlitun Nightclubs
        const sanlitun = nightActivities.find(a => a.id === 'sanlitun-nightclubs' && !scheduledIds.has('sanlitun-nightclubs'));
        // Check for Qushuilanting (special handling - replaces dinner)
        const qushuilanting = nightActivities.find(a => a.id === 'qushuilanting' && !scheduledIds.has('qushuilanting'));
        
        // If Sanlitun Taikoo Li is selected, bundle with Sanlitun Nightclubs in the evening
        if (hasSanlitunTaikoo && sanlitun) {
          // Add dinner first, then nightclubs
          evening = evening === '-' ? `Explore ${sanlitun.name}` : `${evening}, Then: Explore ${sanlitun.name}`;
          markAsScheduled([sanlitun]);
        } else if (qushuilanting) {
          // Qushuilanting replaces dinner entirely
          evening = `Relax at ${qushuilanting.name} (No dinner planned)`;
          remark = '⚠️ No dinner on this day due to Qushuilanting visit';
          markAsScheduled([qushuilanting]);
        } else if (sanlitun) {
          // Sanlitun Nightclubs without Taikoo Li
          evening = evening === '-' ? `Then: Explore ${sanlitun.name}` : `${evening}, Then: Explore ${sanlitun.name}`;
          markAsScheduled([sanlitun]);
        }
        
        markAsScheduled(dayChaoyang);
        addDay('Chaoyang District Tour', morning, afternoon, evening, remark);
      } else {
        // Shopping attractions go to shopping day, not standalone pool
        dayChaoyang.forEach(a => {
          if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
            shoppingAttractions.push(a);
          } else if (a.category !== 'shopping') {
            standalonePool.push(a);
          }
        });
      }
    }
  } else if (selectedChaoyang.length === 1) {
    // Shopping attractions go to shopping day, not standalone pool
    selectedChaoyang.forEach(a => {
      if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
        shoppingAttractions.push(a);
      } else if (a.category !== 'shopping') {
        standalonePool.push(a);
      }
    });
  }
  
  // Rule 7: Ritan CBD - max 3 items/day (min 2 to trigger)
  const selectedRitan = selectedAttractionDetails.filter(a => ritanCBD.includes(a.id));
  if (selectedRitan.length >= 2) {
    for (let i = 0; i < selectedRitan.length && allDays.length < days; i += 3) {
      const dayRitan = selectedRitan.slice(i, i + 3);
      
      // Only process if we have 2+ items, otherwise add to shoppingAttractions (for shopping) or standalonePool
      if (dayRitan.length >= 2) {
        // Distribute attractions: 1 in morning, 1-2 in afternoon
        const morning = dayRitan.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
        const afternoon = dayRitan.slice(1, 3).map(a => `Explore ${a.name}`).join(', ') || '-';
        markAsScheduled(dayRitan);
        addDay('Ritan CBD Tour', morning, afternoon, getEvening());
      } else {
        // Shopping attractions go to shopping day, not standalone pool
        dayRitan.forEach(a => {
          if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
            shoppingAttractions.push(a);
          } else if (a.category !== 'shopping') {
            standalonePool.push(a);
          }
        });
      }
    }
  } else if (selectedRitan.length === 1) {
    // Shopping attractions go to shopping day, not standalone pool
    selectedRitan.forEach(a => {
      if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
        shoppingAttractions.push(a);
      } else if (a.category !== 'shopping') {
        standalonePool.push(a);
      }
    });
  }
  
  // Rule 8: Yuyuantan Area - max 2 items/day (min 2 to trigger)
  const selectedYuyuantan = selectedAttractionDetails.filter(a => yuyuantanArea.includes(a.id));
  if (selectedYuyuantan.length >= 2) {
    for (let i = 0; i < selectedYuyuantan.length && allDays.length < days; i += 2) {
      const dayYuyuantan = selectedYuyuantan.slice(i, i + 2);
      
      // Only process if we have 2 items, otherwise add to standalone pool
      if (dayYuyuantan.length >= 2) {
        // Distribute attractions: 1 in morning, 1 in afternoon
        const morning = dayYuyuantan.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
        const afternoon = dayYuyuantan.slice(1, 2).map(a => `Explore ${a.name}`).join(', ') || '-';
        markAsScheduled(dayYuyuantan);
        addDay('Yuyuantan Area Tour', morning, afternoon, getEvening());
      } else {
        // Less than 2 items, add to standalone pool for pairing
        dayYuyuantan.forEach(a => standalonePool.push(a));
      }
    }
  } else if (selectedYuyuantan.length === 1) {
    selectedYuyuantan.forEach(a => standalonePool.push(a));
  }
  
  // Rule 9: Xidan Area - max 2 items/day (min 2 to trigger)
  const selectedXidan = selectedAttractionDetails.filter(a => xidanArea.includes(a.id));
  if (selectedXidan.length >= 2) {
    for (let i = 0; i < selectedXidan.length && allDays.length < days; i += 2) {
      const dayXidan = selectedXidan.slice(i, i + 2);
      
      // Only process if we have 2 items, otherwise add to shoppingAttractions (for shopping) or standalonePool
      if (dayXidan.length >= 2) {
        // Distribute attractions: 1 in morning, 1 in afternoon
        const morning = dayXidan.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
        const afternoon = dayXidan.slice(1, 2).map(a => `Explore ${a.name}`).join(', ') || '-';
        markAsScheduled(dayXidan);
        addDay('Xidan Area Tour', morning, afternoon, getEvening(true),
          '✨ Consider taking Hutong Walk Line 4 to experience authentic Beijing culture');
      } else {
        // Shopping attractions go to shopping day, not standalone pool
        dayXidan.forEach(a => {
          if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
            shoppingAttractions.push(a);
          } else if (a.category !== 'shopping') {
            standalonePool.push(a);
          }
        });
      }
    }
  } else if (selectedXidan.length === 1) {
    // Shopping attractions go to shopping day, not standalone pool
    selectedXidan.forEach(a => {
      if (a.category === 'shopping' && !shoppingAttractions.some(s => s.id === a.id)) {
        shoppingAttractions.push(a);
      } else if (a.category !== 'shopping') {
        standalonePool.push(a);
      }
    });
  }
  
  // Rule 10: Xiannongtan+ - max 2 items/day (min 2 to trigger)
  const selectedXiannongtan = selectedAttractionDetails.filter(a => xiannongtanPlus.includes(a.id));
  if (selectedXiannongtan.length >= 2) {
    for (let i = 0; i < selectedXiannongtan.length && allDays.length < days; i += 2) {
      const dayXiannongtan = selectedXiannongtan.slice(i, i + 2);
      
      // Only process if we have 2 items, otherwise add to standalone pool
      if (dayXiannongtan.length >= 2) {
        const morning = dayXiannongtan.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
        const afternoon = dayXiannongtan.slice(1).map(a => `Explore ${a.name}`).join(', ') || '-';
        markAsScheduled(dayXiannongtan);
        addDay('Xiannongtan Tour', morning, afternoon, getEvening());
      } else {
        dayXiannongtan.forEach(a => standalonePool.push(a));
      }
    }
  } else if (selectedXiannongtan.length === 1) {
    selectedXiannongtan.forEach(a => standalonePool.push(a));
  }
  
  // Rule 11: 798 Art Zone - max 2 items/day (min 1 to trigger, each can be standalone)
  const selectedArtZone = selectedAttractionDetails.filter(a => artZone.includes(a.id));
  for (let i = 0; i < selectedArtZone.length && allDays.length < days; i += 2) {
    const dayArtZone = selectedArtZone.slice(i, i + 2);
    
    const morning = dayArtZone.slice(0, 1).map(a => `Visit ${a.name}`).join(', ');
    const afternoon = dayArtZone.slice(1).map(a => `Explore ${a.name}`).join(', ') || '-';
    markAsScheduled(dayArtZone);
    addDay('798 Art Zone Tour', morning, afternoon, getEvening());
  }
  
  // ============ SINGLE ITEMS FROM COMBOS (add to standalone pool) ============
  // For Line3, Summer Palace combo, Museum+Beihai - only add to pool if < 2 items AND not already scheduled
  if (allLine1Core.length === 1 && !scheduledIds.has(allLine1Core[0].id)) standalonePool.push(allLine1Core[0]);
  
  // Line3 - only add single items if not triggering combo AND not already scheduled
  if (selectedLine3.length === 1 && !scheduledIds.has(selectedLine3[0].id)) standalonePool.push(selectedLine3[0]);
  
  // Museum+Beihai - only add single items if not triggering combo AND not already scheduled
  if (selectedMuseumBeihai.length === 1 && !scheduledIds.has(selectedMuseumBeihai[0].id)) standalonePool.push(selectedMuseumBeihai[0]);
  
  // Summer Palace combo - only add single items if not triggering combo AND not already scheduled
  if (selectedSummerCombo.length === 1 && !scheduledIds.has(selectedSummerCombo[0].id)) standalonePool.push(selectedSummerCombo[0]);
  
  // Wangfujing - if not already scheduled as part of Line1 combo, it will be handled in shopping day (at the end)
  // Do NOT add to standalonePool - shopping attractions should go to last day
  
  // Olympic items standalone (if not triggering combo)
  // Skip classic night attractions - they should only be scheduled in the evening
  if (selectedOlympic.length < 2) {
    selectedOlympic.forEach(a => {
      if (!classicNight.includes(a.id) && !scheduledIds.has(a.id)) {
        standalonePool.push(a);
      }
    });
  }
  
  // Forbidden City related items that didn't trigger any combo - add to pool
  if (selectedForbiddenCityRelated) {
    selectedForbiddenCityRelated.forEach(a => {
      // Skip if already in allLine1Core (forbidden-city, jingshan-park) or already scheduled
      if (!allLine1Core.some(l => l.id === a.id) && !standalonePool.some(p => p.id === a.id) && !scheduledIds.has(a.id)) {
        standalonePool.push(a);
      }
    });
  }
  
  // Other attractions not in any combo - add to standalone pool for pairing
  const comboIds = [
    ...line1Core, line1Wangfujing, ...line3, ...summerCombo, ...museumBeihai, ...olympicLine,
    ...chaoyangLine, ...ritanCBD, ...yuyuantanArea, ...xidanArea, ...xiannongtanPlus, ...artZone,
    ...fullDayAttractions
  ];
  
  // Add otherAttractions that are not in any combo and not classic night activities AND not already scheduled
  // NOTE: Shopping attractions should NOT be added to standalonePool - they go to shopping day at the end
  otherAttractions.forEach(a => {
    if (a.category !== 'shopping' && !comboIds.includes(a.id) && !classicNight.includes(a.id) && !scheduledIds.has(a.id)) {
      standalonePool.push(a);
    }
  });
  
  // Add remaining imperial relics and landmarks that weren't handled and not classic night activities
  imperialRelics.forEach(a => {
    if (!comboIds.includes(a.id) && !standalonePool.some(p => p.id === a.id) && !classicNight.includes(a.id) && !scheduledIds.has(a.id)) {
      standalonePool.push(a);
    }
  });
  
  // Add remaining landmarks that weren't handled and not classic night activities
  // NOTE: Shopping attractions are NOT added to standalonePool - they go to shopping day at the end
  landmarksAndShopping.forEach(a => {
    if (a.category !== 'shopping' && !comboIds.includes(a.id) && !standalonePool.some(p => p.id === a.id) && !classicNight.includes(a.id) && !scheduledIds.has(a.id)) {
      standalonePool.push(a);
    }
  });
  
  // ============ FULL DAY ATTRACTIONS ============
  selectedFullDay.forEach(attraction => {
    if (allDays.length < days && !scheduledIds.has(attraction.id)) {
      markAsScheduled([attraction]);
      addFullDayAttraction(attraction);
    }
  });
  
  // ============ PAIR REMAINING STANDALONE ATTRACTIONS (by Category Groups) ============
  // Define 6 major categories for pairing:
  // Group 1: rule1 + rule2 + rule4 + rule10
  // Group 2: rule8 + rule9
  // Group 3: rule6 + rule7
  // Group 4: rule5
  // Group 5: rule3
  // Group 6: rule11 (not paired)
  
  const pairingPool = [...standalonePool];
  const pairedIds = new Set();
  
  // Define the 6 groups + 1 fallback group
  const group1 = [...line1Core, ...line3, ...museumBeihai, ...xiannongtanPlus];
  const group2 = [...yuyuantanArea, ...xidanArea];
  const group3 = [...chaoyangLine, ...ritanCBD];
  const group4 = [...olympicLine];
  const group5 = [...summerCombo];
  const group6 = ['guanfu-museum', '798', 'song-art-museum', 'red-brick-art']; // rule11 - not paired
  const fallbackGroup = ['lugou-bridge', 'five-pagoda']; // fallback pairing options
  
  // Helper: Get which group an attraction belongs to
  const getGroup = (attraction) => {
    if (group1.includes(attraction.id)) return 1;
    if (group2.includes(attraction.id)) return 2;
    if (group3.includes(attraction.id)) return 3;
    if (group4.includes(attraction.id)) return 4;
    if (group5.includes(attraction.id)) return 5;
    if (group6.includes(attraction.id)) return 6;
    if (fallbackGroup.includes(attraction.id)) return 7; // fallback group
    return 0; // uncategorized
  };
  
  // Helper: Get the group's priority order for cross-group pairing
  // Returns array of group numbers in order of preference
  const getCrossGroupPriority = (groupNum) => {
    switch(groupNum) {
      case 1: return [2, 3, 4, 5]; // group1 -> group2 -> group3 -> group4 -> group5
      case 2: return [1, 3, 4, 5]; // group2 -> group1 -> group3 -> group4 -> group5
      case 3: return [2, 1, 4, 5]; // group3 -> group2 -> group1 -> group4 -> group5
      case 4: return [3, 2, 1, 5]; // group4 -> group3 -> group2 -> group1 -> group5
      case 5: return [4, 3, 2, 1]; // group5 -> group4 -> group3 -> group2 -> group1
      default: return [];
    }
  };
  
  // Helper: Get all members of a group that are available for pairing
  const getAvailableGroupMembers = (groupNum) => {
    const groupMembers = groupNum === 1 ? group1 :
                        groupNum === 2 ? group2 :
                        groupNum === 3 ? group3 :
                        groupNum === 4 ? group4 :
                        groupNum === 5 ? group5 : [];
    return pairingPool.filter(a => groupMembers.includes(a.id) && !pairedIds.has(a.id));
  };
  
  // Helper: Try to pair an attraction with another from target group(s)
  const tryPairWithGroups = (attraction, targetGroups) => {
    for (const targetGroup of targetGroups) {
      const targetGroupMembers = getAvailableGroupMembers(targetGroup);
      const partner = targetGroupMembers.find(a => a.id !== attraction.id);
      if (partner) {
        pairedIds.add(attraction.id);
        pairedIds.add(partner.id);
        return partner;
      }
    }
    return null;
  };
  
  // Phase 1: Pair within the same group first
  const allGroups = [1, 2, 3, 4, 5]; // exclude group6 (not paired)
  allGroups.forEach(groupNum => {
    const groupMembers = getAvailableGroupMembers(groupNum);
    for (let i = 0; i < groupMembers.length && allDays.length < days; i++) {
      const attraction = groupMembers[i];
      if (pairedIds.has(attraction.id)) continue;
      
      // Try to pair with another member of the same group
      const partner = groupMembers.find((a, idx) => idx !== i && !pairedIds.has(a.id));
      if (partner) {
        pairedIds.add(attraction.id);
        pairedIds.add(partner.id);
        const remark = groupNum === 2 && (xidanArea.includes(attraction.id) || xidanArea.includes(partner.id)) 
          ? '✨ Consider taking Hutong Walk Line 5 to experience authentic Beijing culture' : '';
    addDay('Paired Exploration', `Visit ${attraction.name}`, `Explore ${partner.name}`, getEvening(!!remark), remark);
      }
    }
  });
  
  // Phase 2: Cross-group pairing according to priority
  const unpairedAttractions = pairingPool.filter(a => !pairedIds.has(a.id) && getGroup(a) !== 6);
  
  unpairedAttractions.forEach(attraction => {
    if (pairedIds.has(attraction.id) || allDays.length >= days) return;
    
    const attractionGroup = getGroup(attraction);
    const crossGroupPriority = getCrossGroupPriority(attractionGroup);
    
    // Try to pair with other groups in priority order
    const partner = tryPairWithGroups(attraction, crossGroupPriority);
    if (partner) {
      const remark = (attractionGroup === 2 || getGroup(partner) === 2) && 
                    (xidanArea.includes(attraction.id) || xidanArea.includes(partner.id))
        ? '✨ Consider taking Hutong Walk Line 5 to experience authentic Beijing culture' : '';
      addDay('Paired Exploration', `Visit ${attraction.name}`, `Explore ${partner.name}`, getEvening(!!remark), remark);
    }
  });
  
  // Phase 3: Try to pair remaining unpaired with fallback group (Lugou Bridge, Five Pagoda Temple)
  const unpairedBeforeFallback = pairingPool.filter(a => !pairedIds.has(a.id) && getGroup(a) !== 6 && getGroup(a) !== 7);
  const availableFallback = pairingPool.filter(a => fallbackGroup.includes(a.id) && !pairedIds.has(a.id));
  
  unpairedBeforeFallback.forEach(attraction => {
    if (pairedIds.has(attraction.id) || allDays.length >= days) return;
    
    const fallbackPartner = availableFallback.find(a => a.id !== attraction.id);
    if (fallbackPartner) {
      pairedIds.add(attraction.id);
      pairedIds.add(fallbackPartner.id);
      addDay('Paired Exploration', `Visit ${attraction.name}`, `Explore ${fallbackPartner.name}`, getEvening());
    }
  });
  
  // Phase 4: Add remaining unpaired attractions as single-day items
  const finalUnpaired = pairingPool.filter(a => !pairedIds.has(a.id) && getGroup(a) !== 6);
  finalUnpaired.forEach(attraction => {
    if (allDays.length < days) {
      addDay('Single Attraction Day', `Visit ${attraction.name}`, '-', getEvening());
    }
  });
  
  // Handle Rule11 artZone attractions (each gets its own day)
  const artRemaining = pairingPool.filter(a => artZone.includes(a.id));
  artRemaining.forEach(attraction => {
    if (allDays.length < days) {
      addDay('798 Art Zone', `Visit ${attraction.name}`, '-', getEvening());
    }
  });
  
  // ============ REMAINING NIGHT ACTIVITIES ============
  const remainingNight = nightActivities.filter(a => !scheduledIds.has(a.id));
  
  // Track which night activities were successfully scheduled in the evening
  const scheduledNightActivities = [];
  
  remainingNight.forEach(nightAct => {
    let dayWithoutNight;
    
    // Qushuilanting: only take empty evening, don't replace dinner
    if (nightAct.id === 'qushuilanting') {
      dayWithoutNight = allDays.find(d => d.evening === '-');
    } 
    // Sanlitun Nightclubs: try to pair with Sanlitun Taikoo Li first
    else if (nightAct.id === 'sanlitun-nightclubs') {
      // Find the day with Sanlitun Taikoo Li in morning/afternoon
      const dayWithTaikoo = allDays.find(d => 
        (d.morning.includes('Sanlitun Taikoo') || d.afternoon.includes('Sanlitun Taikoo')) &&
        d.evening !== '-'
      );
      if (dayWithTaikoo) {
        dayWithoutNight = dayWithTaikoo;
      } else {
        // Fallback to normal logic
        dayWithoutNight = allDays.find(d => {
          if (d.evening === '-') return true;
          const hasNightActivity = d.evening.includes('Visit') || d.evening.includes('Explore') || d.evening.includes('Relax');
          return !hasNightActivity && d.evening.includes('for dinner');
        });
      }
    }
    else {
      // Other night activities: can take empty evening or evening with only dinner
      dayWithoutNight = allDays.find(d => {
        if (d.evening === '-') return true;
        const hasNightActivity = d.evening.includes('Visit') || d.evening.includes('Explore') || d.evening.includes('Relax');
        return !hasNightActivity && d.evening.includes('for dinner');
      });
    }
    
    if (dayWithoutNight) {
      if (nightAct.id === 'qushuilanting') {
        dayWithoutNight.evening = `Relax at ${nightAct.name} (No dinner planned)`;
        if (!dayWithoutNight.remark.includes('Qushuilanting')) {
          dayWithoutNight.remark = dayWithoutNight.remark 
            ? dayWithoutNight.remark + '<br>⚠️ No dinner on this day due to Qushuilanting visit'
            : '⚠️ No dinner on this day due to Qushuilanting visit';
        }
      } else {
        dayWithoutNight.evening = dayWithoutNight.evening === '-' 
          ? `Evening: Visit ${nightAct.name}` 
          : `${dayWithoutNight.evening}, Then: Visit ${nightAct.name}`;
      }
      scheduledNightActivities.push(nightAct.id);
      markAsScheduled([nightAct]);
    }
  });
  
  // If any classic night activities couldn't be scheduled in the evening, add them to standalone pool for daytime
  const unscheduledNight = remainingNight.filter(a => !scheduledNightActivities.includes(a.id));
  unscheduledNight.forEach(nightAct => {
    if (!standalonePool.some(p => p.id === nightAct.id)) {
      standalonePool.push(nightAct);
    }
  });
  
  // Re-pair standalone attractions including unscheduled night activities
  const finalPairs = pairAttractions(standalonePool);
  let pairIndex = 0;
  allDays.forEach(day => {
    if (day.morning === '-' && pairIndex < finalPairs.length) {
      day.morning = finalPairs[pairIndex].morning;
      day.afternoon = finalPairs[pairIndex].afternoon;
      pairIndex++;
    }
  });
  
  // ============ SHOPPING ON LAST DAY ============
  // Also add Wangfujing to shopping attractions if it wasn't scheduled
  const wangfujing = selectedAttractionDetails.find(a => a.id === 'wangfujing');
  if (wangfujing && !scheduledIds.has('wangfujing')) {
    if (!shoppingAttractions.some(s => s.id === 'wangfujing')) {
      shoppingAttractions.push(wangfujing);
    }
  }
  
  // Filter out shopping attractions that have already been scheduled (in morning, afternoon, or evening)
  const scheduledShopping = [];
  allDays.forEach(day => {
    shoppingAttractions.forEach(shop => {
      if ((day.morning && day.morning.includes(shop.name)) ||
          (day.afternoon && day.afternoon.includes(shop.name)) ||
          (day.evening && day.evening.includes(shop.name))) {
        scheduledShopping.push(shop.id);
      }
    });
  });
  
  const remainingShopping = shoppingAttractions.filter(a => !scheduledShopping.includes(a.id));
  
  // Add shopping day ONLY if there are remaining shopping attractions and we have space
  if (remainingShopping.length > 0 && allDays.length < days) {
    const shoppingNames = remainingShopping.map(a => a.name).join(', ');
    addDay('Shopping Day', `Shopping at ${shoppingNames}`, 'Continue shopping', getEvening());
  }
  
  // ============ FILL REMAINING DAYS WITH LEISURE ============
  // Only add leisure days if we still have space
  while (allDays.length < days) {
    addDay('Leisure Day', 'Free time for relaxation', 'Optional activities', getEvening());
  }
  
  return allDays;
}

// Display fallback itinerary
function generateFallbackItinerary(departureDate, returnDate) {
  // Calculate number of days
  const start = new Date(departureDate);
  const end = new Date(returnDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
  // Get selected attractions with details
  const allAttractions = [...attractionsData.attractions, ...attractionsData.villages];
  const selectedAttractionDetails = selectedAttractions.map(id => 
    allAttractions.find(a => a.id === id)
  ).filter(Boolean);
  
  // Get selected food
  // Build allFood with category info
  const allFood = [];
  Object.entries(foodData).forEach(([category, items]) => {
    items.forEach(item => {
      allFood.push({ ...item, category });
    });
  });
  const selectedFoodDetails = selectedFood.map(id =>
    allFood.find(f => f.id === id)
  ).filter(Boolean);
  
  // Forbidden City related attractions - must be scheduled together
  const forbiddenCityRelated = ['forbidden-city', 'jingshan-park', 'beihai-park', 'lama-temple', 'confucius-temple'];
  const selectedForbiddenCityRelated = selectedAttractionDetails.filter(a => forbiddenCityRelated.includes(a.id));
  
  // Summer Palace and Yuanmingyuan combination
  const summerPalaceCombo = ['summer-palace', 'yuanmingyuan'];
  const selectedSummerPalaceCombo = selectedAttractionDetails.filter(a => summerPalaceCombo.includes(a.id));
  
  // Categorize attractions
  const imperialRelics = selectedAttractionDetails.filter(a => 
    a.category === 'imperial' && a.id !== 'great-wall' && 
    !forbiddenCityRelated.includes(a.id) && 
    !summerPalaceCombo.includes(a.id)
  );
  const greatWallAndLongTrips = selectedAttractionDetails.filter(a => 
    a.id === 'great-wall' || a.category === 'hiking' || a.category === 'village' ||
    a.id === 'tanzhe-temple' || a.id === 'hongluo-temple'
  );
  const landmarksAndShopping = selectedAttractionDetails.filter(a => 
    a.category === 'landmark' || a.category === 'shopping'
  );
  const otherAttractions = selectedAttractionDetails.filter(a => 
    !imperialRelics.includes(a) && 
    !greatWallAndLongTrips.includes(a) && 
    !landmarksAndShopping.includes(a) &&
    !forbiddenCityRelated.includes(a.id) &&
    !summerPalaceCombo.includes(a.id) &&
    !a.id.includes('nightclubs') && !a.id.includes('houhai') && !a.id.includes('qushuilanting')
  );
  
  // Night activities
  const selectedNightActivities = selectedAttractionDetails.filter(a => 
    ['sanlitun-nightclubs', 'houhai-bar', 'qushuilanting'].includes(a.id) || 
    a.id.includes('nightclubs') || a.id.includes('houhai') || a.id.includes('qushuilanting')
  );
  
  // Check if user selected food-related videos (3.9.1-3.9.3)
  const selectedFoodVideos = selectedFoodDetails.length > 0;
  
  // Build itinerary and return as Markdown table
  const itinerary = buildItinerary(days, imperialRelics, greatWallAndLongTrips, landmarksAndShopping, otherAttractions, selectedNightActivities, selectedFoodDetails, selectedForbiddenCityRelated, selectedSummerPalaceCombo, selectedFoodVideos);
  
  // Convert to Markdown table format
  let markdown = `| Day | Theme | Morning | Afternoon | Dinner |\n|-----|-------|---------|-----------|--------|\n`;
  itinerary.forEach((day, index) => {
    markdown += `| ${index + 1} | ${day.theme} | ${day.morning} | ${day.afternoon} | ${day.evening} |\n`;
  });
  
  return markdown;
}

function displayFallbackItinerary(departureDate, returnDate) {
  document.getElementById('loadingSection').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  
  // Calculate number of days
  const start = new Date(departureDate);
  const end = new Date(returnDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
  // Get selected attractions with details
  const allAttractions = [...attractionsData.attractions, ...attractionsData.villages];
  const selectedAttractionDetails = selectedAttractions.map(id => 
    allAttractions.find(a => a.id === id)
  ).filter(Boolean);
  
  // Get selected food
  // Build allFood with category info
  const allFood = [];
  Object.entries(foodData).forEach(([category, items]) => {
    items.forEach(item => {
      allFood.push({ ...item, category });
    });
  });
  const selectedFoodDetails = selectedFood.map(id =>
    allFood.find(f => f.id === id)
  ).filter(Boolean);
  
  // Forbidden City related attractions - must be scheduled together
  const forbiddenCityRelated = ['forbidden-city', 'jingshan-park', 'beihai-park', 'lama-temple', 'confucius-temple'];
  const selectedForbiddenCityRelated = selectedAttractionDetails.filter(a => forbiddenCityRelated.includes(a.id));
  
  // Summer Palace and Yuanmingyuan combination
  const summerPalaceCombo = ['summer-palace', 'yuanmingyuan'];
  const selectedSummerPalaceCombo = selectedAttractionDetails.filter(a => summerPalaceCombo.includes(a.id));
  
  // Categorize attractions
  const imperialRelics = selectedAttractionDetails.filter(a => 
    a.category === 'imperial' && a.id !== 'great-wall' && 
    !forbiddenCityRelated.includes(a.id) && 
    !summerPalaceCombo.includes(a.id)
  );
  const greatWallAndLongTrips = selectedAttractionDetails.filter(a => 
    a.id === 'great-wall' || a.category === 'hiking' || a.category === 'village' ||
    a.id === 'tanzhe-temple' || a.id === 'hongluo-temple'
  );
  const landmarksAndShopping = selectedAttractionDetails.filter(a => 
    a.category === 'landmark' || a.category === 'shopping'
  );
  const otherAttractions = selectedAttractionDetails.filter(a => 
    !imperialRelics.includes(a) && 
    !greatWallAndLongTrips.includes(a) && 
    !landmarksAndShopping.includes(a) &&
    !forbiddenCityRelated.includes(a.id) &&
    !summerPalaceCombo.includes(a.id) &&
    !a.id.includes('nightclubs') && !a.id.includes('houhai') && !a.id.includes('qushuilanting')
  );
  
  // Night activities
  const selectedNightActivities = selectedAttractionDetails.filter(a =>
    ['sanlitun-nightclubs', 'houhai-bar', 'qushuilanting'].includes(a.id) ||
    a.id.includes('nightclubs') || a.id.includes('houhai') || a.id.includes('qushuilanting')
  );

  // Calculate required days based on rules
  const requiredDays = calculateRequiredDays(selectedAttractionDetails, days);
  const exceedsDays = requiredDays > days;

  // Check if user selected food-related videos (3.9.1-3.9.3)
  // For now, we check if user selected any food items as proxy
  const selectedFoodVideos = selectedFoodDetails.length > 0;
  
  // Build itinerary
  const itinerary = buildItinerary(days, imperialRelics, greatWallAndLongTrips, landmarksAndShopping, otherAttractions, selectedNightActivities, selectedFoodDetails, selectedForbiddenCityRelated, selectedSummerPalaceCombo, selectedFoodVideos);
  
  const resultSection = document.getElementById('resultSection');
  resultSection.innerHTML = `
    <div class="bg-white rounded-2xl shadow-lg p-8 mb-6">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">Your Beijing Itinerary</h2>
          <p class="text-slate-600">${departureDate} - ${returnDate} (${days} days)</p>
        </div>
        <button onclick="resetForm()" class="px-4 py-2 bg-gray-200 text-slate-700 rounded-lg hover:bg-gray-300 transition-colors">
          Create New Itinerary
        </button>
      </div>
      
      ${exceedsDays ? `
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-700 text-sm">
          <strong>⚠️ Notice:</strong> Unable to arrange all selected attractions within ${days} days. Some attractions may need to be visited on another trip.
        </p>
      </div>
    ` : `
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p class="text-amber-700 text-sm">
          <strong>Note:</strong> Your personalized itinerary has been expertly curated by our AI travel planner.
        </p>
      </div>
    `}
      
      <div class="overflow-x-auto">
        <table id="itineraryTable" class="w-full border-collapse">
          <thead>
            <tr class="bg-amber-50">
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Day</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Morning</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Afternoon</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Evening</th>
              <th class="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-800">Remark</th>
            </tr>
          </thead>
          <tbody>
            ${itinerary.map((day, index) => `
              <tr>
                <td class="border border-amber-200 px-4 py-3 font-medium">Day ${index + 1}<br><span class="text-sm font-normal">${day.theme}</span></td>
                <td class="border border-amber-200 px-4 py-3">${day.morning}</td>
                <td class="border border-amber-200 px-4 py-3">${day.afternoon}</td>
                <td class="border border-amber-200 px-4 py-3">${day.evening}</td>
                <td class="border border-amber-200 px-4 py-3 text-red-600 text-sm">${day.remark || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Download Button -->
      <div class="mt-6 flex justify-center">
        <button onclick="downloadExcel()" class="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium flex items-center">
          <i class="iconfont icon-xiazai mr-2"></i>
          Download Excel
        </button>
      </div>
    </div>
  `;
}

// Reset form
function resetForm() {
  document.getElementById('resultSection').classList.add('hidden');
  document.getElementById('formSection').classList.remove('hidden');
  selectedAttractions = [];
  selectedFood = [];
  setDefaultDates();
  renderAttractions('imperial');
  renderFood('food-specialties');
  
  // Reset category button active states to Imperial Relics
  const attractionSection = document.querySelector('#formSection > div:nth-child(3)');
  if (attractionSection) {
    attractionSection.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    const imperialBtn = attractionSection.querySelector('.category-btn[data-category="imperial"]');
    if (imperialBtn) imperialBtn.classList.add('active');
  }
  
  const foodSection = document.querySelector('#formSection > div:nth-child(4)');
  if (foodSection) {
    foodSection.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    const foodBtn = foodSection.querySelector('.category-btn[data-category="food-specialties"]');
    if (foodBtn) foodBtn.classList.add('active');
  }
}

// Download itinerary as Excel (XLSX)
function downloadExcel() {
  const table = document.getElementById('itineraryTable');
  if (!table) return;
  
  // Create worksheet data
  const data = [];
  
  // Header row
  const headers = table.querySelectorAll('th');
  data.push(Array.from(headers).map(th => cleanText(th.innerText)));
  
  // Data rows
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    data.push(Array.from(cells).map(cell => cleanText(cell.innerText)));
  });
  
  // Create workbook and worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Beijing Itinerary');
  
  // Auto-size columns
  const maxColWidths = data[0].map((_, colIndex) => 
    Math.max(...data.map(row => row[colIndex]?.length || 0)) * 1.2
  );
  worksheet['!cols'] = maxColWidths.map(w => ({ wch: Math.min(w, 50) }));
  
  // Get date for filename
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // Download
  XLSX.writeFile(workbook, `Beijing_Itinerary_${dateStr}.xlsx`);
}

// Helper function to clean text
function cleanText(text) {
  // Replace newlines with spaces, remove extra whitespace
  return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}
    
