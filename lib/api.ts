import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor — attach auth tokens if needed in the future
apiClient.interceptors.request.use(
  (config) => {
    // Example: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — central error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('[API Error]', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('[Network Error]', error.request);
    } else {
      console.error('[Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
