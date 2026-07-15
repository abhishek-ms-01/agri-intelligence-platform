import apiClient from './client';

export const chatWithAdvisor = async (message, history = [], language = 'English', location = 'Mangalore, Karnataka') => {
  const response = await apiClient.post('/advisor/chat', { message, history, language, location });
  return response.data;
};
