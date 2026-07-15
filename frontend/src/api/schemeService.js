import apiClient from './client';

export const getSchemes = async () => {
  const response = await apiClient.get('/schemes');
  return response.data;
};
