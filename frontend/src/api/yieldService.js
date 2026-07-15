import apiClient from './client';

export const predictYield = async (data) => {
  const response = await apiClient.post('/yield/predict', data);
  return response.data;
};
