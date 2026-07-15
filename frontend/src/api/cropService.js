import apiClient from './client';

export const analyzeCropImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await apiClient.post('/crop/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
