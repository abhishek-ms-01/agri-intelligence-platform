const axios = require('axios');
const NodeCache = require('node-cache');
const { analyzeWeatherData } = require('../services/geminiService');

const myCache = new NodeCache({ stdTTL: 600 }); // 10 minutes caching

const getWeather = async (req, res, next) => {
  try {
    const { lat, lon, city } = req.query;
    
    if (!process.env.OPENWEATHERMAP_API_KEY) {
       return res.status(500).json({ message: "OpenWeatherMap API Key is not configured." });
    }

    const cacheKey = city ? `weather_${city}` : `weather_${lat}_${lon}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    let url = '';
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
    } else {
      return res.status(400).json({ message: 'Please provide lat/lon or city' });
    }

    const response = await axios.get(url);
    const weatherData = {
        name: response.data.name ? `${response.data.name}, ${response.data.sys.country}` : 'Current Location',
        currentWeather: response.data.weather[0].description,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        windDeg: response.data.wind.deg,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        rain: response.data.rain ? response.data.rain['1h'] : 0,
        icon: response.data.weather[0].icon,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset
    };

    // Assuming we need forecast, let's fetch it too (simplified for now)
    let forecastUrl = city 
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;
        
    const forecastResponse = await axios.get(forecastUrl);
    
    // Simplistic daily forecast extraction
    const forecast = forecastResponse.data.list.filter((item, index) => index % 8 === 0).map(item => ({
        date: item.dt_txt,
        temp: item.main.temp,
        condition: item.weather[0].description,
        icon: item.weather[0].icon
    }));

    const finalData = { ...weatherData, forecast };
    
    myCache.set(cacheKey, finalData);

    res.status(200).json(finalData);
  } catch (error) {
    if (error.response && error.response.status === 401) {
        return res.status(401).json({ message: "Invalid OpenWeatherMap API Key."});
    }
    next(error);
  }
};

const analyzeWeather = async (req, res, next) => {
  try {
    const { weatherData } = req.body;

    if (!weatherData) {
      return res.status(400).json({ message: 'Weather data is required' });
    }

    const analysis = await analyzeWeatherData(weatherData);
    res.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
};

module.exports = { getWeather, analyzeWeather };
