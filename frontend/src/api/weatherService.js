import apiClient from './client';

export const getWeather = async ({ lat, lon, city }) => {
  const params = {};
  if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  } else if (city) {
    params.city = city;
  }

  const response = await apiClient.get('/weather', { params });
  return response.data;
};

export const analyzeWeather = async (weatherData) => {
  const response = await apiClient.post('/weather/analyze', { weatherData });
  return response.data;
};
