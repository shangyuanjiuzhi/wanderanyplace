require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
const https = require('https');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const deepseekClient = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

// WeatherAPI configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '';
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

// Fetch weather data from WeatherAPI
function fetchWeatherData(city, date) {
  return new Promise((resolve, reject) => {
    if (!WEATHER_API_KEY) {
      reject(new Error('WEATHER_API_KEY not configured'));
      return;
    }

    const targetDate = new Date(date);
    const today = new Date();
    const daysDiff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    const url = daysDiff <= 14
      ? `${WEATHER_API_BASE}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=${Math.min(daysDiff, 14)}&aqi=no&alerts=no`
      : `${WEATHER_API_BASE}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=14&aqi=no&alerts=no`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error.message));
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Format weather data for AI prompt
function formatWeatherForPrompt(weatherData, tripStartDate, tripEndDate) {
  const forecast = weatherData.forecast?.forecastday || [];
  
  if (forecast.length === 0) {
    return null;
  }

  const startDate = new Date(tripStartDate);
  const endDate = new Date(tripEndDate);
  
  let dayTemps = [];
  let nightTemps = [];
  let hasRain = false;
  let hasWind = false;
  let hasSunny = false;

  forecast.forEach(day => {
    const date = new Date(day.date);
    if (date >= startDate && date <= endDate) {
      dayTemps.push(day.day.maxtemp_c);
      nightTemps.push(day.day.mintemp_c);
      if (day.day.daily_will_it_rain) hasRain = true;
      if (day.day.maxwind_kph > 25) hasWind = true;
      if (day.day.condition.text.toLowerCase().includes('sunny') || day.day.condition.text.toLowerCase().includes('clear')) hasSunny = true;
    }
  });

  if (dayTemps.length === 0) {
    dayTemps = forecast.slice(0, Math.min(forecast.length, 7)).map(d => d.day.maxtemp_c);
    nightTemps = forecast.slice(0, Math.min(forecast.length, 7)).map(d => d.day.mintemp_c);
  }

  const avgDayTemp = Math.round(dayTemps.reduce((a, b) => a + b, 0) / dayTemps.length);
  const avgNightTemp = Math.round(nightTemps.reduce((a, b) => a + b, 0) / nightTemps.length);
  const maxTemp = Math.round(Math.max(...dayTemps));
  const minTemp = Math.round(Math.min(...nightTemps));

  const conditions = [];
  if (hasRain) conditions.push('rainy');
  if (hasWind) conditions.push('windy');
  if (hasSunny) conditions.push('sunny');

  return {
    tempRange: `Temperature ranges from ${minTemp}°C to ${maxTemp}°C during the day, dropping to ${avgNightTemp}°C to ${avgDayTemp}°C at night`,
    avgDayTemp,
    avgNightTemp,
    conditions: conditions.join(', '),
    weatherDescription: conditions.length > 0 ? `Expect ${conditions.join(', ')} conditions` : 'Clear weather expected'
  };
}

const destinationInfo = {
  beijing: { name: 'Beijing', nameCN: '北京' },
  shanghai: { name: 'Shanghai', nameCN: '上海' },
  xian: { name: "Xi'an", nameCN: '西安' },
  chengdu: { name: 'Chengdu', nameCN: '成都' },
  hangzhou: { name: 'Hangzhou', nameCN: '杭州' },
  guilin: { name: 'Guilin', nameCN: '桂林' },
  lijiang: { name: 'Lijiang', nameCN: '丽江' },
  zhangjiajie: { name: 'Zhangjiajie', nameCN: '张家界' }
};

// Standard weather data for each destination and season
const standardWeather = {
  beijing: {
    spring: 'Temperature ranges from 15°C to 28°C during the day, dropping to 8°C to 15°C at night',
    summer: 'Temperature ranges from 25°C to 35°C during the day, dropping to 18°C to 25°C at night',
    autumn: 'Temperature ranges from 10°C to 25°C during the day, dropping to 2°C to 12°C at night',
    winter: 'Temperature ranges from -5°C to 5°C during the day, dropping to -15°C to -5°C at night'
  },
  shanghai: {
    spring: 'Temperature ranges from 12°C to 22°C during the day, dropping to 6°C to 12°C at night',
    summer: 'Temperature ranges from 28°C to 35°C during the day, dropping to 22°C to 28°C at night',
    autumn: 'Temperature ranges from 15°C to 25°C during the day, dropping to 8°C to 15°C at night',
    winter: 'Temperature ranges from 2°C to 10°C during the day, dropping to -2°C to 5°C at night'
  },
  xian: {
    spring: 'Temperature ranges from 12°C to 25°C during the day, dropping to 5°C to 12°C at night',
    summer: 'Temperature ranges from 26°C to 35°C during the day, dropping to 18°C to 25°C at night',
    autumn: 'Temperature ranges from 8°C to 22°C during the day, dropping to 0°C to 10°C at night',
    winter: 'Temperature ranges from -8°C to 5°C during the day, dropping to -15°C to -5°C at night'
  },
  chengdu: {
    spring: 'Temperature ranges from 12°C to 22°C during the day, dropping to 8°C to 14°C at night',
    summer: 'Temperature ranges from 25°C to 32°C during the day, dropping to 20°C to 25°C at night',
    autumn: 'Temperature ranges from 13°C to 22°C during the day, dropping to 8°C to 14°C at night',
    winter: 'Temperature ranges from 5°C to 12°C during the day, dropping to 2°C to 8°C at night'
  },
  hangzhou: {
    spring: 'Temperature ranges from 12°C to 22°C during the day, dropping to 6°C to 12°C at night',
    summer: 'Temperature ranges from 28°C to 35°C during the day, dropping to 23°C to 28°C at night',
    autumn: 'Temperature ranges from 15°C to 25°C during the day, dropping to 10°C to 16°C at night',
    winter: 'Temperature ranges from 4°C to 12°C during the day, dropping to 1°C to 7°C at night'
  },
  guilin: {
    spring: 'Temperature ranges from 15°C to 25°C during the day, dropping to 10°C to 16°C at night',
    summer: 'Temperature ranges from 28°C to 35°C during the day, dropping to 23°C to 28°C at night',
    autumn: 'Temperature ranges from 18°C to 28°C during the day, dropping to 12°C to 18°C at night',
    winter: 'Temperature ranges from 8°C to 16°C during the day, dropping to 4°C to 10°C at night'
  },
  lijiang: {
    spring: 'Temperature ranges from 10°C to 22°C during the day, dropping to 2°C to 10°C at night',
    summer: 'Temperature ranges from 18°C to 26°C during the day, dropping to 12°C to 18°C at night',
    autumn: 'Temperature ranges from 8°C to 20°C during the day, dropping to 0°C to 8°C at night',
    winter: 'Temperature ranges from -5°C to 8°C during the day, dropping to -12°C to -3°C at night'
  },
  zhangjiajie: {
    spring: 'Temperature ranges from 12°C to 22°C during the day, dropping to 6°C to 12°C at night',
    summer: 'Temperature ranges from 24°C to 32°C during the day, dropping to 18°C to 24°C at night',
    autumn: 'Temperature ranges from 10°C to 22°C during the day, dropping to 4°C to 12°C at night',
    winter: 'Temperature ranges from 2°C to 10°C during the day, dropping to -5°C to 3°C at night'
  }
};

function getSeason(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getSeasonCN(season) {
  const names = { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' };
  return names[season];
}

function parseAIResponse(responseText) {
  const sections = responseText.split(/[\n\r]+/).filter(line => line.trim());
  const result = { weather: '', clothing: [], essentials: [], tips: '' };

  let currentSection = null;

  sections.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    if (trimmedLine.toLowerCase().includes('temperature') || trimmedLine.toLowerCase().includes('weather') || trimmedLine.toLowerCase().includes('climate') || trimmedLine.toLowerCase().includes('average')) {
      currentSection = 'weather';
      result.weather += trimmedLine + ' ';
    } else if (trimmedLine.toLowerCase().includes('practical gadgets') || trimmedLine.toLowerCase().includes('accessories')) {
      currentSection = 'essentials';
      if (!trimmedLine.match(/^(essential|list|items|packing|practical gadgets|accessories)/i)) {
        result.essentials.push(trimmedLine);
      }
    } else if (trimmedLine.toLowerCase().includes('top') || trimmedLine.toLowerCase().includes('pants') || trimmedLine.toLowerCase().includes('coat') || trimmedLine.toLowerCase().includes('shoes') || trimmedLine.toLowerCase().includes('clothing') || trimmedLine.toLowerCase().includes('outerwear')) {
      currentSection = 'clothing';
      if (!trimmedLine.match(/^(top|pants|coat|shoes|clothing|outerwear)/i)) {
        result.clothing.push(trimmedLine);
      }
    } else if (trimmedLine.toLowerCase().includes('essential') || trimmedLine.toLowerCase().includes('list') || trimmedLine.toLowerCase().includes('items') || trimmedLine.toLowerCase().includes('packing')) {
      currentSection = 'essentials';
      if (!trimmedLine.match(/^(essential|list|items|packing)/i)) {
        result.essentials.push(trimmedLine);
      }
    } else if (trimmedLine.toLowerCase().includes('tips') || trimmedLine.toLowerCase().includes('suggestions') || trimmedLine.toLowerCase().includes('advice')) {
      currentSection = 'tips';
      result.tips += trimmedLine + ' ';
    } else if (currentSection === 'weather') {
      result.weather += trimmedLine + ' ';
    } else if (currentSection === 'clothing' && trimmedLine) {
      result.clothing.push(trimmedLine);
    } else if (currentSection === 'essentials' && trimmedLine) {
      result.essentials.push(trimmedLine);
    } else if (currentSection === 'tips') {
      result.tips += trimmedLine + ' ';
    } else if (trimmedLine.length > 5 && trimmedLine.length < 100) {
      if (result.clothing.length === 0 && result.essentials.length === 0) {
        result.clothing.push(trimmedLine);
      } else {
        result.essentials.push(trimmedLine);
      }
    }
  });

  return result;
}

app.post('/api/packing-suggestions', async (req, res) => {
  try {
    const { destination, departureDate, returnDate } = req.body;

    if (!destination || !departureDate || !returnDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const destInfo = destinationInfo[destination];
    if (!destInfo) {
      return res.status(400).json({ error: 'Invalid destination' });
    }

    const season = getSeason(departureDate);
    const seasonCN = getSeasonCN(season);
    
    // Get weather description based on season
    const weatherDescription = (standardWeather[destination] && standardWeather[destination][season]) 
      ? standardWeather[destination][season]
      : `Temperature ranges from 15°C to 25°C during the day, dropping to 10°C to 18°C at night`;

    const prompt = `You are a professional historical weather data analyst. Only output data statistics, no extra explanations or introductions.

Input: A user plans to travel to ${destInfo.name} from ${departureDate} to ${returnDate}.

Output format (English only, one single sentence):
Based on historical weather data from the past 2 years for ${destInfo.name} during this period: Average temperature ranges from {min}°C to {max}°C. Recommended clothing: {1-5 specific clothing items}. Historical weather conditions are mainly {dominant weather pattern}.

Requirements:
1. Min temperature: Average minimum from past 2 years during ${departureDate} to ${returnDate}
2. Max temperature: Average maximum from past 2 years during ${departureDate} to ${returnDate}
3. Clothing: List 1-5 specific clothing items based on the temperature range
4. Weather conditions: The most common weather pattern (e.g., sunny, cloudy, rainy, humid)
5. Reply in English only, one single sentence`;

    const completion = await deepseekClient.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a professional historical weather data analyst. Only output data statistics in the exact format requested. No explanations, no introductions, no multiple lines.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    const aiResponse = completion.choices[0].message.content;
    const parsedResponse = { weather: aiResponse, clothing: [], essentials: [] };

    res.json({
      success: true,
      destination: destInfo,
      season: seasonCN,
      departureDate,
      returnDate,
      suggestions: parsedResponse
    });

  } catch (error) {
    console.error('DeepSeek API Error:', error);
    res.status(500).json({ error: 'Failed to get suggestions from AI', details: error.message });
  }
});

// Tour suggestions endpoint
const attractionsInfo = {
  'great-wall': { name: 'Great Wall of China', duration: '4-6 hours' },
  'forbidden-city': { name: 'Forbidden City', duration: '3-4 hours' },
  'summer-palace': { name: 'Summer Palace', duration: '3-4 hours' },
  'temple-of-heaven': { name: 'Temple of Heaven', duration: '2-3 hours' },
  'tiananmen-square': { name: 'Tiananmen Square', duration: '1-2 hours' },
  'yuanmingyuan': { name: 'Yuanmingyuan Ruins', duration: '2-3 hours' },
  'jingshan-park': { name: 'Jingshan Park', duration: '1 hour' },
  'ming-tombs': { name: 'Ming Tombs', duration: '2-3 hours' },
  'beihai-park': { name: 'Beihai Park', duration: '2-3 hours' },
  'confucius-temple': { name: 'Confucius Temple', duration: '1-2 hours' },
  'cuandixia': { name: 'Cuandixia Village', duration: '4-5 hours' },
  'peking-duck': { name: 'Peking Duck Restaurant', duration: '1-2 hours' },
  'hotpot': { name: 'Beijing Hot Pot Restaurant', duration: '1-2 hours' }
};

const foodInfo = {
  'hotpot': { name: '老北京涮羊肉 (Beijing Hot Pot)', type: 'main' },
  'peking-duck': { name: '北京烤鸭 (Peking Duck)', type: 'main' },
  'zhajiang': { name: '炸酱面 (Zhajiang Noodles)', type: 'main' },
  'almond-tofu': { name: '杏仁豆腐 (Almond Tofu)', type: 'dessert' },
  'lvdagun': { name: '驴打滚 (Rolling Donkey)', type: 'dessert' }
};

app.post('/api/tour-suggestions', async (req, res) => {
  try {
    const { destination, departureDate, returnDate, attractions, food, existingItinerary } = req.body;

    if (!destination || !departureDate || !returnDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const destInfo = { name: 'Beijing', nameCN: '北京' };

    // Get selected attractions names
    const selectedAttractions = (attractions || [])
      .map(id => attractionsInfo[id])
      .filter(Boolean)
      .map(a => `${a.name} (${a.duration})`);

    // Get selected food names
    const selectedFood = (food || [])
      .map(id => foodInfo[id])
      .filter(Boolean)
      .map(f => f.name);

    const attractionsList = selectedAttractions.length > 0 
      ? selectedAttractions.join(', ') 
      : 'Not specified';
    
    const foodList = selectedFood.length > 0 
      ? selectedFood.join(', ') 
      : 'Not specified';

    const prompt = `You are a professional Beijing travel planner. Create a detailed day-by-day itinerary for a trip to Beijing.

Input Information:
- Destination: ${destInfo.name}
- Travel Dates: ${departureDate} to ${returnDate}
- Selected Attractions: ${attractionsList}
- Selected Food: ${foodList}

Requirements:
1. Create a detailed itinerary organized by day
2. For each day, include morning, lunch, afternoon, and dinner activities
3. Consider travel time between locations
4. Suggest realistic timing for each activity
5. Include practical tips
6. Reply in English only

Output Format:
Day 1: [Title]
- Morning: [Activities]
- Lunch: [Recommendation]
- Afternoon: [Activities]
- Dinner: [Recommendation]
- Tips: [Practical advice]

Day 2: ...etc`;

    const completion = await deepseekClient.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `You are a professional Beijing travel planner with extensive knowledge of Chinese history, culture, and local customs. Your task is to optimize the existing itinerary based on the distances between attractions.

【IMPORTANT】The following rules CANNOT be modified:

### Basic Rules
- Combo Trigger: If a combo has ≥2 items → trigger combo schedule
- Otherwise: Pair attractions (morning + afternoon), arrange dinner in evening

### Combo Rules (Trigger: ≥2 items in same combo)
| Rule | Combo Name | Attractions | Effect |
|------|------------|-------------|--------|
| Rule 1 | Line1 Core | Tiananmen Square, Forbidden City, Jingshan Park, Beihai Park, Zhongshan Park, Wangfujing, National Museum, NCPA | Max 5 items/day: 2 morning + 2 afternoon + 1 evening (Wangfujing); if >5, remaining on another day |
| Rule 2 | Line3 Culture | Lama Temple, Confucius Temple, Temple of Heaven, Ditan Park, Xiannongtan | Max 3 items/day; recommend trying Hutong Tour Line 2 or Line 3 |
| Rule 3 | Summer Palace | Summer Palace + Yuanmingyuan | ≥2 items = same day |
| Rule 4 | Museum+Park | National Museum, Beihai Park, Zhongshan Park, NCPA | Max 3 items/day, NCPA must be one of them |
| Rule 5 | Olympic Axis | Olympic Forest Park, Bird's Nest, Water Cube, Yuandadu | All same day: Olympic/Bird's Nest/Water Cube (half day) + Yuandadu (half day) |
| Rule 6 | Chaoyang Night | Chaoyang Park, Blue Harbor, Sanlitun Taikoo Li | All same day; if Sanlitun Nightclub selected, schedule in evening |
| Rule 7 | Ritan CBD | Ritan Park, CCTV Headquarters, Galaxy SOHO | All same day |
| Rule 8 | Yuyuantan Area | Yuyuantan Park, CCTV Tower, Capital Museum | All same day |
| Rule 9 | Xidan Area | Yuetan Park, Xidan Commercial, NCPA, Capital Museum | Max 3 items/day (morning + afternoon) |
| Rule 10 | Xiannongtan+ | Xiannongtan, Grand View Garden | 2 items/day |
| Rule 11 | 798 Art Zone | Guanfu Museum (Guanfu/M观复博物馆), 798 Art District, Song Art Museum, Red Brick Art | Max 2 items/day |

### Other Rules
1. Great Wall: Always full day, evening can pair with Olympic attractions (Bird's Nest, Water Cube)
2. Full-day Attractions: The following attractions also require a full day (morning + afternoon): Ming Tombs, Hongluo Temple, Tanzhe Temple, White Cloud Temple, Fayuan Temple, Five Pagoda Temple, Fangshan Shidu, Yudu Mountain, Phoenix Ridge, Longqingxia, Beijing Happy Valley, Universal Beijing, Cuandixia Village, Lingshui Village, Gubei Water Town, Liuliqu, Zhoukoudian, Fragrant Hills, National Botanical Garden, Badachu Park, Garden Expo Park, Shougang Park
3. Single Attractions: Pairing Priority - First: Rule 1/Rule 2/Rule 10/Rule 4/Rule 7 attractions → Second: Rule 8/Rule 9 → Third: Rule 6/Rule 11 → Finally: pair with Rule 3
4. Night Activities: MUST be preserved and scheduled - prioritize arranging on days with dinner; if no daytime plan, can be daytime activity
   - Classic Night Activities (MUST schedule in evening): Houhai Bar Street, Sanlitun Nightclubs, Qushui Lanting
5. Shopping: If shopping attractions are already covered by combo/single/activity rules, arrange remaining shopping on LAST day
6. Remaining Days: Fill with "Leisure Day", morning free, afternoon optional activities

### Key Attraction Distances (in km) - Based on CSV Data
| Attraction 1 | Attraction 2 | Distance |
|--------------|--------------|----------|
| Tiananmen Square | Forbidden City | 1 km |
| Forbidden City | Jingshan Park | 0.5 km |
| Tiananmen Square | Wangfujing | 0.7 km |
| Jingshan Park | Wangfujing | 0.7 km |
| Beihai Park | Zhongshan Park | 1.3 km |
| Beihai Park | Forbidden City | 2 km |
| Tiananmen Square | Beihai Park | 2 km |
| Jingshan Park | Beihai Park | 2 km |
| National Museum | Zhongshan Park | 2.2 km |
| Temple of Heaven | Lama Temple | 3 km |
| National Museum | Beihai Park | 3.5 km |
| National Museum | Tiananmen Square | 3.5 km |
| National Museum | Forbidden City | 3.5 km |
| National Museum | Jingshan Park | 3.5 km |
| NCPA | Beihai Park | 3 km |
| Lama Temple | Confucius Temple | 2.1 km |
| Lama Temple | Ditan Park | 0.7 km |
| Confucius Temple | Ditan Park | 1.8 km |
| Confucius Temple | Beihai Park | 4.4 km |
| Temple of Heaven | Xiannongtan | 4.7 km |
| Summer Palace | Yuanmingyuan | 4.5 km |
| Temple of Heaven | National Museum | 5.2 km |
| Temple of Heaven | Ming Tombs | 25 km |
| Great Wall (Badaling) | City Center | 70 km |
| Olympic Park | Sanlitun | 5 km |
| Olympic Park | Bird's Nest | 0.1 km |
| Olympic Park | Water Cube | 0.1 km |
| Bird's Nest | Water Cube | 0.1 km |
| Yuandadu | Olympic Park | 2.4 km |
| Yuandadu | Bird's Nest | 2.4 km |
| Yuandadu | Water Cube | 2.4 km |
| Chaoyang Park | Blue Harbor | 1 km |
| Blue Harbor | Sanlitun Taikoo Li | 3.2 km |
| Chaoyang Park | Sanlitun Taikoo Li | 4.6 km |
| Ritan Park | Galaxy SOHO | 1 km |
| The Place | Ritan Park | 2.1 km |
| The Place | CCTV Headquarters | 2 km |
| The Place | Galaxy SOHO | 3.2 km |
| Sanlitun Taikoo Li | The Place | 3.1 km |
| Sanlitun Taikoo Li | CCTV Headquarters | 5 km |
| Yuyuantan Park | CCTV Tower | 1 km |
| Yuyuantan Park | Capital Museum | 5.5 km |
| CCTV Tower | Capital Museum | 5.5 km |
| Yuetan Park | Capital Museum | 2.1 km |
| Yuetan Park | Xidan Commercial | 2.8 km |
| Xidan Commercial | NCPA | 1.9 km |
| Xidan Commercial | Capital Museum | 4.3 km |
| Xiannongtan | Grand View Garden | 4.7 km |
| Guanfu Museum | 798 Art District | 7.3 km |
| Guanfu Museum | Song Art Museum | 7.6 km |
| Guanfu Museum | Red Brick Art | 7.8 km |
| 798 Art District | Song Art Museum | 8 km |
| 798 Art District | Red Brick Art | 8 km |

### Optimization Rules
1. ONLY use attractions that are in the user's selection list - DO NOT add any new attractions
2. DO NOT duplicate attractions - each attraction can only appear once
3. MUST preserve ALL selected attractions including night activities - DO NOT remove any
4. STRICTLY follow distance rule: attractions MORE THAN 5km apart CANNOT be on the same day
5. Only adjust the timing and grouping of existing attractions based on distance`
        },
        {
          role: 'user',
          content: `Please optimize the following itinerary based on the rules:

【User's Selected Attractions】: ${attractionsList}

【User's Selected Food】: ${foodList}

【Input Itinerary (Generated by rules)】
${existingItinerary || `
- Destination: Beijing
- Travel Dates: ${departureDate} to ${returnDate}
`}

【Your Task】
1. Review the existing itinerary
2. Fine-tune ONLY the combination and timing of the selected attractions
3. DO NOT add any new attractions that are not in the user's selection
4. DO NOT duplicate any attractions
5. Consider distances between attractions (attractions within 5km should be on the same day)
6. Maximum 3 attractions per day
7. Follow the combo rules strictly

【Output Format - Reply in English Only】
Please modify the table directly, ONLY using attractions from user's selection:

| Day | Theme | Morning | Afternoon | Dinner |
|-----|-------|---------|-----------|--------|
| 1 | [Title] | [Attractions from selection] | [Attractions from selection] | [Food from selection or "Free"] |
| 2 | ... | ... | ... | ... |

Please provide your optimized itinerary table:`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const itinerary = completion.choices[0].message.content;

    res.json({
      success: true,
      destination: destInfo,
      departureDate,
      returnDate,
      itinerary: itinerary
    });

  } catch (error) {
    console.error('DeepSeek API Error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary', details: error.message });
  }
});

// Validate weather data - check if temperature ranges are reasonable
function isValidWeather(weatherText) {
  const tempMatch = weatherText.match(/Temperature ranges from (\d+)\s*°?C?\s*to\s*(\d+)\s*°?C?/i);
  if (!tempMatch) return false;
  
  const lowTemp = parseInt(tempMatch[1]);
  const highTemp = parseInt(tempMatch[2]);
  
  // Check if temperatures are within reasonable range (-40°C to 50°C)
  if (lowTemp < -40 || lowTemp > 50 || highTemp < -40 || highTemp > 50) {
    return false;
  }
  
  // Check if range makes sense (high should be >= low)
  if (highTemp < lowTemp) {
    return false;
  }
  
  // Check if range is reasonable (at least 2°C difference, at most 30°C difference)
  if (highTemp - lowTemp < 2 || highTemp - lowTemp > 30) {
    return false;
  }
  
  return true;
}

// Send booking email API endpoint
app.post('/api/send-booking-email', async (req, res) => {
  try {
    const { name, passengers, phone, wechat, whatsapp, email, services, others } = req.body;

    if (!name || !passengers || !services || services.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // At least one contact method required
    if (!phone && !wechat && !whatsapp && !email) {
      return res.status(400).json({ error: 'At least one contact method is required' });
    }

    // Create email content
    const emailSubject = `New Booking Request from ${name}`;
    const servicesList = services.map((s, i) => `${i + 1}. ${s}`).join('\n');
    
    let emailBody = `New Booking Request\n\n`;
    emailBody += `-------------------------\n`;
    emailBody += `Personal Information:\n`;
    emailBody += `Name: ${name}\n`;
    emailBody += `Number of People: ${passengers}\n`;
    if (phone) emailBody += `Phone: ${phone}\n`;
    if (wechat) emailBody += `WeChat: ${wechat}\n`;
    if (whatsapp) emailBody += `WhatsApp: ${whatsapp}\n`;
    if (email) emailBody += `Email: ${email}\n`;
    emailBody += `-------------------------\n\n`;
    emailBody += `Selected Services:\n`;
    emailBody += `${servicesList}\n\n`;
    if (others) {
      emailBody += `Additional Requirements:\n${others}\n\n`;
    }
    emailBody += `-------------------------\n`;
    emailBody += `Request received at: ${new Date().toLocaleString()}\n`;

    // Configure email transporter
    // For testing, you can use Ethereal (https://ethereal.email/)
    // For production, use your actual email provider's SMTP
    let transporter;
    
    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use configured SMTP
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        family: 4,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // Fallback: use Ethereal for testing (emails not actually sent, just preview)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'booking@wanderanyplace.com',
      to: 'wanderanyplace@gmail.com',
      subject: emailSubject,
      text: emailBody
    };

    const info = await transporter.sendMail(mailOptions);
    
    let response = {
      success: true,
      message: 'Booking request sent successfully!'
    };

    // If using Ethereal, provide preview URL
    if (!process.env.SMTP_HOST) {
      response.previewUrl = nodemailer.getTestMessageUrl(info);
      response.message += ' (Preview: ' + response.previewUrl + ')';
    }

    res.json(response);

  } catch (error) {
    console.error('Email Send Error:', error);
    res.status(500).json({ error: 'Failed to send booking request', details: error.message });
  }
});

// Send feedback email API endpoint
app.post('/api/send-feedback', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const emailSubject = `Feedback: ${subject || 'General Feedback'}`;
    
    let emailBody = `New Feedback Received\n\n`;
    emailBody += `-------------------------\n`;
    if (name) emailBody += `Name: ${name}\n`;
    if (email) emailBody += `Email: ${email}\n`;
    emailBody += `Subject: ${subject || 'General Feedback'}\n`;
    emailBody += `-------------------------\n\n`;
    emailBody += `Message:\n${message}\n\n`;
    emailBody += `-------------------------\n`;
    emailBody += `Received at: ${new Date().toLocaleString()}\n`;

    let transporter;
    
    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        family: 4,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'feedback@wanderanyplace.com',
      to: 'shangyuanjiuzhi@126.com',
      subject: emailSubject,
      text: emailBody
    };

    const info = await transporter.sendMail(mailOptions);
    
    let response = {
      success: true,
      message: 'Feedback sent successfully!'
    };

    if (!process.env.SMTP_HOST) {
      response.previewUrl = nodemailer.getTestMessageUrl(info);
      response.message += ' (Preview: ' + response.previewUrl + ')';
    }

    res.json(response);

  } catch (error) {
    console.error('Feedback Send Error:', error);
    res.status(500).json({ error: 'Failed to send feedback', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Wander Anyplace API Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (!process.env.DEEPSEEK_API_KEY) {
    console.warn('Warning: DEEPSEEK_API_KEY is not set in environment variables');
  }
});