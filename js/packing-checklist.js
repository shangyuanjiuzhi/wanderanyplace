// Season-specific clothing items
const seasonItems = {
  spring: ["Light jacket", "Raincoat/Windbreaker","Hoodie","Long pants"],
  summer: ["Hat","Raincoat/Windbreaker","T-shirt","Shorts","Rain boots","Sandals","Skirt"],
  autumn: ["Light jacket", "Windbreaker","Windproof jacket","Long pants","Hoodie"],
  winter: ["Heavy coat", "Scarf","Gloves","Warm clothes"]
};

// Destination names
const packingData = {
  beijing: { name: "Beijing" },
  shanghai: { name: "Shanghai" },
  xian: { name: "Xi'an" },
  chengdu: { name: "Chengdu" },
  hangzhou: { name: "Hangzhou" },
  guilin: { name: "Guilin" },
  lijiang: { name: "Lijiang" },
  zhangjiajie: { name: "Zhangjiajie" }
};

// Basic items for all trips
const basicItems = {
  documents: ["Passport / ID Card", "Visa (if required)","Student ID (if applicable)", "Flight tickets", "Hotel reservations", "Travel insurance", "Driver's license (if renting car)"],
  toiletries: ["Toothbrush & toothpaste", "Shampoo & conditioner", "Soap / body wash", "Deodorant", "Sunscreen(Summer)", "Moisturizer", "Toilet paper/tissues/disposable towels", "Feminine products", "Razor", "Hairbrush / comb","Dental floss","Facial cleanser","Cotton pads","Hair ties","Antiperspirant","Perfume","Cosmetics","Body lotion/Face mask/Hand cream/Lip balm","Curling iron/Straightener","Disposable toilet seat cover/Disposable bed sheet"],
  medications: ["Prescription medications", "Pain relievers", "Cold medicine", "Diarrhea medicine", "Band-aids", "Motion sickness pills","Vitamins (if needed)","Eye drops","Digestion tablets"],
  electronics: ["Phone & charger", "Power bank", "Universal adapter", "Camera & accessories(memory card, SD card, card reader)", "Headphones", "Laptop/Pad (optional)","Data cable/Selfie stick/Tripod","USB drive"],
  clothing: ["Underwear", "Socks",  "Sleepwear", "Swimsuit (if needed)", "Comfortable shoes", "Formal wear (optional)"],
  other: ["Wallet & cash", "Credit cards", "Umbrella / raincoat", "Water bottle", "Snacks", "Reusable tote bag", "Lock for luggage","Cotton swabs","Contact lenses & solution","Face masks","Eco-friendly chopsticks & spoon","SIM card ejector tool","Watch","Sunglasses","Insulated water bottle","Insect repellent (Spring/Summer)"]
};

// Get season from date
function getSeason(date) {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

// Get season name in English
function getSeasonName(season) {
  const names = { spring: "Spring", summer: "Summer", autumn: "Autumn", winter: "Winter" };
  return names[season];
}

// Check if travel dates span multiple seasons
function getSeasonsSpanned(departureDate, returnDate) {
  const depart = new Date(departureDate);
  const returnD = new Date(returnDate);
  const seasons = new Set();
  
  const current = new Date(depart);
  while (current <= returnD) {
    seasons.add(getSeason(current));
    current.setDate(current.getDate() + 1);
  }
  
  return Array.from(seasons);
}

// Simplify weather text - English only with standardized format
function simplifyWeather(weatherText) {
  let tempRange = null;
  let dayTemp = null;
  let nightTemp = null;
  
  const dayNightPattern = /Temperature ranges from (\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?\s*during the day, dropping to (\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?\s*at night/i;
  const dayNightMatch = weatherText.match(dayNightPattern);
  
  if (dayNightMatch) {
    tempRange = `${dayNightMatch[1]}-${dayNightMatch[2]}°C`;
    dayTemp = dayNightMatch[2];
    nightTemp = dayNightMatch[4];
  } else {
    const tempPatterns = [
      /temperature\s*ranges?\s*from\s*(\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?/i,
      /(\d+)\s*[-~]\s*(\d+)\s*°?C/i,
      /temperature\s*[:\-]?\s*(\d+)\s*[-~]\s*(\d+)\s*°?C/i,
      /(\d+)\s*to\s*(\d+)\s*°?C/i
    ];
    
    let lowTemp = null;
    let highTemp = null;
    
    for (const pattern of tempPatterns) {
      const match = weatherText.match(pattern);
      if (match) {
        lowTemp = parseInt(match[1]);
        highTemp = parseInt(match[2]);
        tempRange = `${lowTemp}-${highTemp}°C`;
        break;
      }
    }
    
    if (lowTemp !== null && highTemp !== null) {
      dayTemp = highTemp.toString();
      nightTemp = lowTemp.toString();
    } else {
      const dayPatterns = [
        /from\s*(\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?\s*(?:during|in)\s*(?:the\s*)?day/i,
        /day(?:time)?\s*(?:temp|temperature)?\s*[:\-]?\s*(\d+)\s*°?C/i,
        /high\s*[:\-]?\s*(\d+)\s*°?C/i
      ];
      for (const pattern of dayPatterns) {
        const match = weatherText.match(pattern);
        if (match) {
          dayTemp = (match[2] || match[1]).toString();
          break;
        }
      }
      
      const nightPatterns = [
        /dropping\s*to\s*(\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?\s*(?:at|in)\s*(?:the\s*)?night/i,
        /to\s*(\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?\s*(?:at|in)\s*(?:the\s*)?night/i,
        /night(?:time)?\s*(?:temp|temperature)?\s*[:\-]?\s*(\d+)\s*°?C/i,
        /low\s*[:\-]?\s*(\d+)\s*°?C/i
      ];
      for (const pattern of nightPatterns) {
        const match = weatherText.match(pattern);
        if (match) {
          nightTemp = (match[1] || match[2]).toString();
          break;
        }
      }
    }
  }
  
  const parts = [];
  
  if (tempRange) {
    parts.push(`Temperature: ${tempRange}`);
  }
  
  if (dayTemp && nightTemp) {
    parts.push(`Average daytime temperature: ${dayTemp}°C, average nighttime temperature: ${nightTemp}°C`);
    
    const diff = Math.abs(parseInt(dayTemp) - parseInt(nightTemp));
    if (diff >= 10) {
      parts.push(`Temperature difference between day and night: ${diff}°C`);
    }
  } else if (dayTemp) {
    parts.push(`Average daytime temperature: ${dayTemp}°C`);
  } else if (nightTemp) {
    parts.push(`Average nighttime temperature: ${nightTemp}°C`);
  }
  
  const weatherFeatures = [];
  
  if (weatherText.match(/rain|shower|rainy/i)) {
    weatherFeatures.push('Rain expected');
  }
  
  if (weatherText.match(/wind|windy|breeze|gust/i)) {
    weatherFeatures.push('Windy conditions');
  }
  
  if (weatherText.match(/humid|humidity/i)) {
    const hm = weatherText.match(/(low|high|moderate)/i);
    if (hm && hm[1] === 'low') {
      weatherFeatures.push('Dry conditions');
    } else {
      weatherFeatures.push(hm ? `${hm[1]} humidity` : 'Humid');
    }
  }
  
  if (weatherText.match(/sunny|clear|bright/i)) {
    weatherFeatures.push('Sunny');
  }
  
  if (weatherText.match(/cloud|cloudy/i)) {
    weatherFeatures.push('Cloudy');
  }
  
  if (weatherFeatures.length > 0) {
    parts.push(weatherFeatures.join(' · '));
  }
  
  if (parts.length > 0) {
    return `Based on historical weather, during your trip period: ${parts.join(' · ')}`;
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

// Debounce function to prevent rapid repeated calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  const destinationBtns = document.querySelectorAll('.destination-btn');
  let selectedDestination = null;
  let isLoading = false; // Loading state flag

  destinationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      destinationBtns.forEach(b => b.classList.remove('border-rose-500', 'bg-rose-50'));
      btn.classList.add('border-rose-500', 'bg-rose-50');
      selectedDestination = btn.dataset.destination;
    });
  });

  // Generate checklist with debounce to prevent rapid repeated calls
  const generateChecklistDebounced = debounce(async () => {
    if (isLoading) return; // Prevent duplicate requests
    
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;

    if (!departureDate || !returnDate) {
      alert('Please select both departure and return dates');
      return;
    }

    const departDate = new Date(departureDate);
    const returnDt = new Date(returnDate);
    
    if (returnDt < departDate) {
      alert('Return date must be equal to or later than departure date');
      return;
    }

    if (!selectedDestination) {
      alert('Please select a destination');
      return;
    }

    const btn = document.getElementById('generateChecklistBtn');
    const btnContent = document.getElementById('btnContent');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Set loading state
    isLoading = true;
    btn.disabled = true;
    btnContent.innerHTML = '<span class="iconfont icon-loading text-xl mr-2 animate-spin"></span> Generating...';
    loadingSpinner.classList.remove('hidden');

    const season = getSeason(departDate);
    const destName = packingData[selectedDestination]?.name || selectedDestination;
    const tripDays = Math.ceil((returnDt - departDate) / (1000 * 60 * 60 * 24)) || 3;

    let aiSuggestions = null;
    try {
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3001/api/packing-suggestions'
        : '/api/packing-suggestions';
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
        
        // Show cache indicator
        if (data.fromCache) {
          console.log('Result from cache');
        }
      } else {
        console.log('API returned error:', await response.text());
      }
    } catch (error) {
      console.error('API Error:', error);
      console.log('API not available, using default data');
    } finally {
      // Reset loading state
      isLoading = false;
      btn.disabled = false;
      btnContent.innerHTML = '<span class="iconfont icon-search text-xl mr-2"></span> Generate My Checklist';
      loadingSpinner.classList.add('hidden');
    }

    const seasonsSpanned = getSeasonsSpanned(departureDate, returnDate);
    const isMultiSeason = seasonsSpanned.length > 1;
    const displaySeason = seasonsSpanned[0];

    let checklistHTML = `
      <div class="mb-6 p-4 bg-rose-50 rounded-lg">
        <div class="flex flex-wrap gap-4 text-slate-700">
          <span><strong>Destination:</strong> ${destName}</span>
          <span><strong>Season:</strong> ${getSeasonName(displaySeason)}</span>
          <span><strong>Dates:</strong> ${departureDate} to ${returnDate}</span>
        </div>
      </div>
    `;

    if (isMultiSeason && !aiSuggestions) {
      checklistHTML += `
        <div class="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-amber-700 text-sm">
            <strong>Note:</strong> Your travel dates span ${seasonsSpanned.length} seasons (${seasonsSpanned.map(s => getSeasonName(s)).join(', ')}). 
            Default clothing suggestions are based on the starting season (${getSeasonName(displaySeason)}).
          </p>
        </div>
      `;
    }

    if (aiSuggestions && aiSuggestions.weather) {
      checklistHTML += `
        <div class="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-semibold text-blue-800 mb-2 flex items-center">
            <span class="iconfont icon-weather text-blue-600 mr-2"></span>
            Weather Overview
          </h4>
          <p class="text-blue-700">${aiSuggestions.weather}</p>
        </div>
      `;
    }

    checklistHTML += `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    `;

    const iconMap = {
      documents: 'icon-idcard',
      toiletries: 'icon-shuiping',
      medications: 'icon-yaopin',
      electronics: 'icon-dianhua',
      clothing: 'icon-yiwu',
      other: 'icon-other'
    };
    
    const categoryNames = {
      documents: 'Documents',
      toiletries: 'Toiletries',
      medications: 'Medications',
      electronics: 'Electronics',
      clothing: 'Clothing',
      other: 'Other Essentials'
    };

    Object.keys(basicItems).forEach(category => {
      let items = basicItems[category];
      
      if (category === 'clothing') {
        let additionalItems = [];
        const nonClothingItems = ['umbrella', 'raincoat', 'rain coat', 'sunglasses', 'sunscreen', 'sunblock'];

        if (aiSuggestions && aiSuggestions.weather) {
          const weatherText = aiSuggestions.weather;
          console.log('AI Weather Text:', weatherText);
          const clothingMatch = weatherText.match(/Recommended clothing:\s*([^.]+)/i);
          if (clothingMatch) {
            const clothingStr = clothingMatch[1].trim();
            console.log('Clothing String:', clothingStr);
            additionalItems = clothingStr.split(/[,，]/).map(item => item.trim().replace(/^and\s+/i, '')).filter(item => {
              const itemLower = item.toLowerCase();
              const isNonClothing = nonClothingItems.some(nonItem => itemLower.includes(nonItem));
              console.log('Item:', item, '- Non-clothing:', isNonClothing);
              return item.length > 0 && !isNonClothing;
            });
            console.log('Filtered additionalItems:', additionalItems);
          }
        }
        
        if (additionalItems.length === 0) {
          const destSpecificItems = seasonItems[displaySeason] || [];
          additionalItems = destSpecificItems;
        }
        
        items = [...items, ...additionalItems];
      }

      checklistHTML += `
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-semibold text-slate-800 mb-3 flex items-center">
            <span class="iconfont ${iconMap[category]} text-rose-600 mr-2"></span>
            ${categoryNames[category]}
          </h4>
          <ul class="space-y-2">
      `;

      items.forEach((item) => {
        checklistHTML += `
          <li class="flex items-start text-slate-600">
            <input type="checkbox" class="mr-2 w-4 h-4 text-rose-600 rounded mt-0.5 flex-shrink-0">
            <span class="text-sm">${item}</span>
          </li>
        `;
      });

      checklistHTML += `
          </ul>
        </div>
      `;
    });

    checklistHTML += `
      </div>
    `;

    checklistHTML += `
      <div class="mt-8 text-center">
        <button onclick="printChecklist()" class="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors">
          <span class="flex items-center justify-center">
            <span class="iconfont icon-print mr-2"></span>
            Print Checklist
          </span>
        </button>
      </div>
    `;

    document.getElementById('checklistContent').innerHTML = checklistHTML;
    document.getElementById('checklistResult').classList.remove('hidden');
    
    document.getElementById('checklistResult').scrollIntoView({ behavior: 'smooth' });
  }, 500); // 500ms debounce delay

  document.getElementById('generateChecklistBtn').addEventListener('click', generateChecklistDebounced);
});
