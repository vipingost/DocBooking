import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

// Add a request interceptor to dynamically set the Authorization header
instance.interceptors.request.use(
  (config) => {
    // Logic to determine which token to use
    let token = null;

    if (config.url.startsWith('/admin')) {
      token = localStorage.getItem('ADMIN_TOKEN'); // Use admin token
    } else if (config.url.startsWith('/doctor')) {
      token = localStorage.getItem('DOCTOR_TOKEN'); // Use doctor token
    } else if (config.url.startsWith('/user')) {
      token = localStorage.getItem('USER_TOKEN'); // Use user token
    }

    // Add the token to the Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
