const OpenAI = require('openai');
const { createClient } = require('redis');

// Multi-cache strategy: Redis, then memory fallback
let redis = null;
let redisReady = false;
let memoryCache = {};
const CACHE_TTL = 24 * 60 * 60; // 24 hours in seconds

// Initialize Redis connection
async function initRedis() {
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.log('❌ REDIS_URL environment variable not configured');
      console.log('Falling back to memory cache');
      return;
    }
    redis = createClient({ url: redisUrl });
    await redis.connect();
    redisReady = true;
    console.log('✅ Redis connection successful');
  } catch (e) {
    console.log(`❌ Redis connection failed: ${e.message}`);
    console.log('Falling back to memory cache');
  }
}

// Initialize Redis on module load
initRedis().catch(console.error);

function generateCacheKey(destination, departureDate, returnDate) {
  return `packing:${destination}:${departureDate}:${returnDate}`;
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

const standardWeather = {
  beijing: {
    spring: 'Temperature: 15-28°C · Day: 22°C · Night: 10°C · Occasional rain · Windy · Low humidity',
    summer: 'Temperature: 25-35°C · Day: 30°C · Night: 22°C · Rainy season · Humid · Thunderstorms',
    autumn: 'Temperature: 10-25°C · Day: 20°C · Night: 8°C · Sunny · Cool breeze · Low humidity',
    winter: 'Temperature: -5-5°C · Day: 0°C · Night: -10°C · Cold · Dry · Occasional snow'
  },
  shanghai: {
    spring: 'Temperature: 12-22°C · Day: 18°C · Night: 10°C · Rainy · Humid · Mild winds',
    summer: 'Temperature: 28-35°C · Day: 32°C · Night: 25°C · Hot · Humid · Thunderstorms',
    autumn: 'Temperature: 15-25°C · Day: 22°C · Night: 12°C · Sunny · Cool · Low humidity',
    winter: 'Temperature: 2-10°C · Day: 6°C · Night: 0°C · Cold · Damp · Occasional rain'
  },
  xian: {
    spring: 'Temperature: 12-25°C · Day: 20°C · Night: 8°C · Dry · Windy · Sunny',
    summer: 'Temperature: 26-35°C · Day: 30°C · Night: 22°C · Hot · Dry · Thunderstorms',
    autumn: 'Temperature: 8-22°C · Day: 18°C · Night: 6°C · Cool · Dry · Sunny',
    winter: 'Temperature: -8-5°C · Day: -2°C · Night: -12°C · Very cold · Dry · Snow'
  },
  chengdu: {
    spring: 'Temperature: 12-22°C · Day: 18°C · Night: 10°C · Mild · Humid · Overcast',
    summer: 'Temperature: 25-32°C · Day: 28°C · Night: 23°C · Hot · Humid · Rainy',
    autumn: 'Temperature: 13-22°C · Day: 19°C · Night: 11°C · Mild · Cool · Sunny',
    winter: 'Temperature: 5-12°C · Day: 9°C · Night: 4°C · Cool · Humid · Foggy'
  },
  hangzhou: {
    spring: 'Temperature: 12-22°C · Day: 18°C · Night: 10°C · Rainy · Humid · Mild',
    summer: 'Temperature: 28-35°C · Day: 32°C · Night: 26°C · Hot · Humid · Thunderstorms',
    autumn: 'Temperature: 15-25°C · Day: 21°C · Night: 13°C · Cool · Sunny · Low humidity',
    winter: 'Temperature: 4-12°C · Day: 8°C · Night: 2°C · Cold · Damp · Rainy'
  },
  guilin: {
    spring: 'Temperature: 15-25°C · Day: 21°C · Night: 12°C · Mild · Humid · Rainy',
    summer: 'Temperature: 28-35°C · Day: 32°C · Night: 26°C · Hot · Humid · Thunderstorms',
    autumn: 'Temperature: 18-28°C · Day: 24°C · Night: 16°C · Warm · Sunny · Low humidity',
    winter: 'Temperature: 8-16°C · Day: 12°C · Night: 6°C · Cool · Humid · Overcast'
  },
  lijiang: {
    spring: 'Temperature: 10-22°C · Day: 18°C · Night: 6°C · Dry · Sunny · Big temperature difference',
    summer: 'Temperature: 18-26°C · Day: 23°C · Night: 15°C · Mild · Rainy season · Cool',
    autumn: 'Temperature: 8-20°C · Day: 16°C · Night: 4°C · Cool · Dry · Sunny',
    winter: 'Temperature: -5-8°C · Day: 3°C · Night: -8°C · Cold · Dry · Sunny'
  },
  zhangjiajie: {
    spring: 'Temperature: 12-22°C · Day: 18°C · Night: 8°C · Mild · Rainy · Misty',
    summer: 'Temperature: 24-32°C · Day: 28°C · Night: 21°C · Hot · Humid · Thunderstorms',
    autumn: 'Temperature: 10-22°C · Day: 18°C · Night: 8°C · Cool · Sunny · Low humidity',
    winter: 'Temperature: 2-10°C · Day: 6°C · Night: -2°C · Cold · Dry · Occasional snow'
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
  const result = { weather: responseText, clothing: [], essentials: [] };
  
  const clothingMatch = responseText.match(/Recommended clothing:\s*([^.]+)/i);
  if (clothingMatch) {
    const clothingStr = clothingMatch[1].trim();
    result.clothing = clothingStr.split(/[,，]/).map(item => item.trim()).filter(item => item.length > 0);
  }
  
  return result;
}

async function getFromCache(cacheKey) {
  // Try Redis first if ready
  if (redisReady && redis) {
    try {
      const data = await redis.get(cacheKey);
      if (data) {
        console.log(`✅ Redis cache hit for ${cacheKey}`);
        return JSON.parse(data);
      }
    } catch (e) {
      console.log(`❌ Redis get error: ${e.message}`);
    }
  }
  
  // Memory cache fallback
  if (memoryCache[cacheKey] && Date.now() - memoryCache[cacheKey].timestamp < CACHE_TTL * 1000) {
    console.log(`✅ Memory cache hit for ${cacheKey}`);
    return memoryCache[cacheKey].data;
  }
  
  console.log(`❌ Cache miss for ${cacheKey}`);
  return null;
}

async function setToCache(cacheKey, data) {
  // Try Redis first if ready
  if (redisReady && redis) {
    try {
      await redis.set(cacheKey, JSON.stringify(data), { EX: CACHE_TTL });
      console.log(`✅ Saved to Redis: ${cacheKey}`);
      return;
    } catch (e) {
      console.log(`❌ Redis set error: ${e.message}`);
    }
  }
  
  // Memory cache fallback
  memoryCache[cacheKey] = {
    timestamp: Date.now(),
    data: data
  };
  console.log(`✅ Saved to memory cache: ${cacheKey}`);
}

module.exports = async function handler(req, res) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] API called`);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { destination, departureDate, returnDate } = req.body;

    console.log(`[${new Date().toISOString()}] Params: ${destination}, ${departureDate}, ${returnDate}`);

    if (!destination || !departureDate || !returnDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const destInfo = destinationInfo[destination];
    if (!destInfo) {
      return res.status(400).json({ error: 'Invalid destination' });
    }

    // Check cache first
    const cacheKey = generateCacheKey(destination, departureDate, returnDate);
    const cachedData = await getFromCache(cacheKey);
    
    if (cachedData) {
      console.log(`[${new Date().toISOString()}] Returning cached result`);
      return res.json({
        success: true,
        fromCache: true,
        cacheType: redisReady ? 'redis' : 'memory',
        ...cachedData
      });
    }

    const season = getSeason(departureDate);
    const seasonCN = getSeasonCN(season);

    const standardWeatherDesc = (standardWeather[destination] && standardWeather[destination][season])
      ? standardWeather[destination][season]
      : 'Temperature: 15-25°C · Day: 20°C · Night: 12°C · Variable weather';

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

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekApiKey) {
      console.log('❌ DEEPSEEK_API_KEY environment variable not configured');
      // Fallback to standard weather data
      const responseData = {
        destination: destInfo,
        season: seasonCN,
        departureDate,
        returnDate,
        suggestions: { weather: standardWeatherDesc, clothing: [], essentials: [] }
      };
      setToCache(cacheKey, responseData).catch(console.error);
      return res.json({
        success: true,
        fromCache: false,
        cacheType: 'none',
        ...responseData
      });
    }

    const deepseekClient = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: deepseekApiKey
    });

    console.log(`[${new Date().toISOString()}] Calling DeepSeek API...`);

    const completion = await deepseekClient.chat.completions.create({
      model: 'deepseek-v4-flash',
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

    console.log(`[${new Date().toISOString()}] DeepSeek API response received`);

    const aiResponse = completion.choices[0].message.content;
    const parsedResponse = parseAIResponse(aiResponse);

    if (!parsedResponse.weather || parsedResponse.weather.length < 10) {
      console.log(`[${new Date().toISOString()}] Using standard weather data`);
      parsedResponse.weather = standardWeatherDesc;
    }

    const responseData = {
      destination: destInfo,
      season: seasonCN,
      departureDate,
      returnDate,
      suggestions: parsedResponse
    };

    // Store in cache (non-blocking)
    setToCache(cacheKey, responseData).catch(console.error);

    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] Request completed in ${duration}ms`);

    res.json({
      success: true,
      fromCache: false,
      cacheType: 'none',
      ...responseData
    });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error.message);
    console.error(`[${new Date().toISOString()}] Error stack:`, error.stack);
    console.error(`[${new Date().toISOString()}] Error type:`, error.constructor.name);
    if (error.response) {
      console.error(`[${new Date().toISOString()}] API response status:`, error.response.status);
      console.error(`[${new Date().toISOString()}] API response body:`, JSON.stringify(error.response.data));
    }
    res.status(500).json({ 
      error: 'Failed to get suggestions from AI', 
      details: error.message,
      type: error.constructor.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
