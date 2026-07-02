function getSeason(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getWeatherDescription(destination, season) {
  const weatherData = {
    beijing: {
      spring: 'Spring in Beijing is pleasant with temperatures ranging from 10-25°C. Occasional windy days. Light jacket recommended.',
      summer: 'Hot and humid summer with temperatures 25-35°C. Thunderstorms common. Light clothing.',
      autumn: 'Cool and dry autumn with temperatures 5-22°C. Sunny days. Jacket or sweater.',
      winter: 'Cold winter with temperatures -10 to 5°C. Occasional snow. Heavy coat needed.'
    },
    shanghai: {
      spring: 'Mild spring with temperatures 10-22°C. Rainy season starts. Umbrella recommended.',
      summer: 'Hot and humid with temperatures 28-35°C. Thunderstorms. Light cotton clothing.',
      autumn: 'Cool autumn with temperatures 12-25°C. Sunny days. Light jacket.',
      winter: 'Cold and damp with temperatures 0-10°C. Windy. Warm coat.'
    },
    xian: {
      spring: 'Dry spring with temperatures 8-22°C. Windy. Light jacket.',
      summer: 'Hot with temperatures 26-35°C. Dry heat. Light clothing.',
      autumn: 'Cool autumn with temperatures 5-20°C. Sunny. Jacket.',
      winter: 'Very cold with temperatures -10 to 5°C. Snow. Heavy coat.'
    },
    chengdu: {
      spring: 'Mild spring with temperatures 12-22°C. Overcast. Light jacket.',
      summer: 'Hot and humid with temperatures 25-32°C. Rainy. Light clothing.',
      autumn: 'Mild autumn with temperatures 10-22°C. Cool. Light sweater.',
      winter: 'Cool with temperatures 4-12°C. Foggy. Warm jacket.'
    },
    hangzhou: {
      spring: 'Mild spring with temperatures 12-22°C. Rainy. Umbrella.',
      summer: 'Hot and humid with temperatures 28-35°C. Thunderstorms. Light clothing.',
      autumn: 'Cool autumn with temperatures 12-25°C. Sunny. Light jacket.',
      winter: 'Cold and damp with temperatures 2-12°C. Rainy. Warm coat.'
    },
    guilin: {
      spring: 'Mild spring with temperatures 15-25°C. Rainy. Light jacket.',
      summer: 'Hot and humid with temperatures 28-35°C. Thunderstorms. Light clothing.',
      autumn: 'Warm autumn with temperatures 18-28°C. Sunny. Light shirt.',
      winter: 'Cool with temperatures 8-16°C. Overcast. Jacket.'
    },
    lijiang: {
      spring: 'Cool spring with temperatures 8-20°C. Dry. Jacket.',
      summer: 'Mild summer with temperatures 16-26°C. Rainy season. Light jacket.',
      autumn: 'Cool autumn with temperatures 6-18°C. Dry. Jacket.',
      winter: 'Cold with temperatures -5-8°C. Sunny. Heavy coat.'
    },
    zhangjiajie: {
      spring: 'Mild spring with temperatures 10-22°C. Misty. Light jacket.',
      summer: 'Hot and humid with temperatures 24-32°C. Rainy. Light clothing.',
      autumn: 'Cool autumn with temperatures 8-22°C. Sunny. Jacket.',
      winter: 'Cool with temperatures 0-10°C. Occasional snow. Warm coat.'
    }
  };
  
  return weatherData[destination] && weatherData[destination][season] 
    ? weatherData[destination][season] 
    : 'Variable weather conditions. Check forecast before traveling.';
}

function getPackingList(destination, season, tripDays) {
  const baseItems = {
    clothing: [
      'Comfortable walking shoes',
      'Weather-appropriate clothing',
      'Extra socks and underwear',
      'Light jacket or sweater',
      'Rain jacket or umbrella'
    ],
    toiletries: [
      'Toothbrush and toothpaste',
      'Shampoo and conditioner',
      'Soap or body wash',
      'Deodorant',
      'Sunscreen',
      'Insect repellent',
      'Medications'
    ],
    essentials: [
      'Passport or ID',
      'Travel documents',
      'Credit cards and cash',
      'Mobile phone and charger',
      'Power adapter',
      'Travel insurance'
    ]
  };

  const destinationSpecific = {
    beijing: {
      spring: ['Light jacket', 'Scarf for wind'],
      summer: ['Hat', 'Sunglasses', 'Fan'],
      autumn: ['Warm jacket', 'Scarf'],
      winter: ['Heavy coat', 'Gloves', 'Hat', 'Thermal underwear']
    },
    shanghai: {
      spring: ['Umbrella', 'Waterproof shoes'],
      summer: ['Hat', 'Sunglasses', 'Mosquito repellent'],
      autumn: ['Light jacket'],
      winter: ['Warm coat', 'Waterproof shoes']
    },
    xian: {
      spring: ['Windproof jacket', 'Mask'],
      summer: ['Hat', 'Sunglasses', 'Sunblock'],
      autumn: ['Warm jacket'],
      winter: ['Heavy coat', 'Hat', 'Gloves']
    },
    chengdu: {
      spring: ['Light jacket', 'Umbrella'],
      summer: ['Light clothing', 'Umbrella'],
      autumn: ['Light sweater'],
      winter: ['Warm jacket', 'Moisturizer']
    },
    hangzhou: {
      spring: ['Umbrella', 'Waterproof shoes'],
      summer: ['Hat', 'Sunglasses', 'Fan'],
      autumn: ['Light jacket'],
      winter: ['Warm coat', 'Umbrella']
    },
    guilin: {
      spring: ['Rain jacket', 'Waterproof shoes'],
      summer: ['Hat', 'Sunglasses', 'Insect repellent'],
      autumn: ['Light shirt'],
      winter: ['Jacket', 'Umbrella']
    },
    lijiang: {
      spring: ['Jacket', 'Sunscreen'],
      summer: ['Light jacket', 'Rain gear'],
      autumn: ['Jacket', 'Sunscreen'],
      winter: ['Heavy coat', 'Hat', 'Gloves']
    },
    zhangjiajie: {
      spring: ['Rain jacket', 'Comfortable hiking shoes'],
      summer: ['Light clothing', 'Insect repellent'],
      autumn: ['Jacket', 'Comfortable hiking shoes'],
      winter: ['Warm coat', 'Waterproof shoes']
    }
  };

  const seasonItems = destinationSpecific[destination] && destinationSpecific[destination][season] 
    ? destinationSpecific[destination][season] 
    : [];

  return {
    ...baseItems,
    destinationSpecific: seasonItems
  };
}

const packingData = {
  beijing: { name: 'Beijing', nameCN: '北京', icon: 'icon-beijing' },
  shanghai: { name: 'Shanghai', nameCN: '上海', icon: 'icon-shanghai' },
  xian: { name: "Xi'an", nameCN: '西安', icon: 'icon-xian' },
  chengdu: { name: 'Chengdu', nameCN: '成都', icon: 'icon-chengdu' },
  hangzhou: { name: 'Hangzhou', nameCN: '杭州', icon: 'icon-hangzhou' },
  guilin: { name: 'Guilin', nameCN: '桂林', icon: 'icon-guilin' },
  lijiang: { name: 'Lijiang', nameCN: '丽江', icon: 'icon-lijiang' },
  zhangjiajie: { name: 'Zhangjiajie', nameCN: '张家界', icon: 'icon-zhangjiajie' }
};

function formatWeatherText(weatherData) {
  if (!weatherData) return '';
  
  let weatherText = weatherData;
  
  if (weatherData.clothing && weatherData.clothing.length > 0) {
    weatherText += '<br><br><strong>Recommended Clothing:</strong><ul>';
    weatherData.clothing.forEach(item => {
      weatherText += `<li>${item}</li>`;
    });
    weatherText += '</ul>';
  }
  
  return weatherText;
}

function printChecklist() {
  const printDiv = document.createElement('div');
  printDiv.style.cssText = 'width:100%;min-height:100%;background:white;padding:20px;font-family:Arial,sans-serif;font-size:14px;box-sizing:border-box;';
  const checklistContent = document.getElementById('checklistResult').innerHTML;
  const cleanContent = checklistContent.replace(/iconfont[^"]*"/g, '');
  printDiv.innerHTML = cleanContent;
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.appendChild(printDiv);
  window.print();
  location.reload();
}

// Debounce function - Fixed implementation
function debounce(func, wait) {
  let timeout = null;
  return function executedFunction(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  const destinationBtns = document.querySelectorAll('.destination-btn');
  let selectedDestination = null;
  let isLoading = false;

  destinationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      destinationBtns.forEach(b => b.classList.remove('border-rose-500', 'bg-rose-50'));
      btn.classList.add('border-rose-500', 'bg-rose-50');
      selectedDestination = btn.dataset.destination;
    });
  });

  // Generate checklist with debounce to prevent rapid repeated calls
  const generateChecklistDebounced = debounce(async () => {
    if (isLoading) {
      console.log('Already loading, ignoring request');
      return;
    }

    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;

    if (!selectedDestination) {
      alert('Please select a destination');
      return;
    }

    if (!departureDate || !returnDate) {
      alert('Please select departure and return dates');
      return;
    }

    if (new Date(departureDate) > new Date(returnDate)) {
      alert('Return date must be after departure date');
      return;
    }

    isLoading = true;
    const btn = document.getElementById('generateChecklistBtn');
    const btnContent = document.getElementById('btnContent');
    const loadingSpinner = document.getElementById('loadingSpinner');

    btn.disabled = true;
    btnContent.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    try {
      const departDate = new Date(departureDate);
      const returnDt = new Date(returnDate);
      const season = getSeason(departureDate);
      const destName = packingData[selectedDestination]?.name || selectedDestination;
      const tripDays = Math.ceil((returnDt - departDate) / (1000 * 60 * 60 * 24)) || 3;

      let aiSuggestions = null;
      try {
        const apiUrl = '/api/packing-suggestions';
        console.log('Calling API:', apiUrl);
        console.log('Request body:', { destination: selectedDestination, departureDate, returnDate });
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination: selectedDestination,
            departureDate,
            returnDate
          })
        });
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          aiSuggestions = data.suggestions;
          
          if (data.fromCache) {
            console.log('Response from cache');
          }
        } else {
          console.log('API request failed, using fallback data');
        }
      } catch (apiError) {
        console.log('API call failed:', apiError.message);
        console.log('Using fallback packing list');
      }

      const packingList = getPackingList(selectedDestination, season, tripDays);
      const weatherDesc = aiSuggestions?.weather || getWeatherDescription(selectedDestination, season);

      let checklistHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-800">Your Packing Checklist</h2>
            <button onclick="printChecklist()" class="flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
              <span class="iconfont icon-print mr-2"></span>
              Print
            </button>
          </div>
          
          <div class="bg-gradient-to-r from-rose-50 to-orange-50 rounded-lg p-4 mb-6">
            <div class="flex items-center mb-2">
              <span class="iconfont ${packingData[selectedDestination]?.icon || 'icon-map'} text-3xl text-rose-600 mr-3"></span>
              <div>
                <h3 class="font-bold text-gray-800">${destName}</h3>
                <p class="text-sm text-gray-600">${departureDate} - ${returnDate} (${tripDays} days)</p>
              </div>
            </div>
            <div class="mt-3 p-3 bg-white rounded-lg">
              <p class="text-sm text-gray-700">${formatWeatherText(aiSuggestions) || weatherDesc}</p>
            </div>
          </div>
      `;

      const categories = [
        { key: 'clothing', title: 'Clothing', icon: 'icon-shirt' },
        { key: 'toiletries', title: 'Toiletries', icon: 'icon-toiletries' },
        { key: 'essentials', title: 'Essentials', icon: 'icon-bag' },
        { key: 'destinationSpecific', title: 'Destination Specific', icon: 'icon-map' }
      ];

      categories.forEach(cat => {
        if (packingList[cat.key] && packingList[cat.key].length > 0) {
          checklistHTML += `
            <div class="mb-6">
              <h3 class="flex items-center text-lg font-semibold text-gray-800 mb-3">
                <span class="iconfont ${cat.icon} mr-2 text-rose-600"></span>
                ${cat.title}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          `;

          packingList[cat.key].forEach((item, index) => {
            checklistHTML += `
              <label class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer group">
                <input type="checkbox" class="w-5 h-5 text-rose-600 rounded focus:ring-rose-500 mr-3" id="${cat.key}-${index}">
                <span class="text-gray-700 group-hover:text-gray-900">${item}</span>
              </label>
            `;
          });

          checklistHTML += `
              </div>
            </div>
          `;
        }
      });

      checklistHTML += `
        </div>
        <p class="text-center text-gray-500 text-sm">Check items as you pack! Have a great trip!</p>
      `;

      document.getElementById('checklistResult').innerHTML = checklistHTML;
      document.getElementById('checklistResult').classList.remove('hidden');
      
      document.getElementById('checklistResult').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error generating checklist:', error);
      alert('Failed to generate checklist. Please try again.');
    } finally {
      isLoading = false;
      btn.disabled = false;
      btnContent.classList.remove('hidden');
      loadingSpinner.classList.add('hidden');
    }
  }, 500);

  document.getElementById('generateChecklistBtn').addEventListener('click', generateChecklistDebounced);
});
