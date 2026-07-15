import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle common errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can add global error handling here (e.g., toast notification)
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
