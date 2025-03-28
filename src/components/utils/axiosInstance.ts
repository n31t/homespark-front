import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://138.197.114.153:3838/api/v1', // Make sure this matches your backend base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;