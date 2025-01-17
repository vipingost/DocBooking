import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});


instance.interceptors.request.use(
  (config) => {
    
    let token = null;

    if (config.url.startsWith('/admin')) {
      token = localStorage.getItem('ADMIN_TOKEN'); 
    } else if (config.url.startsWith('/doctor')) {
      token = localStorage.getItem('DOCTOR_TOKEN'); 
    } else if (config.url.startsWith('/user')) {
      token = localStorage.getItem('USER_TOKEN'); 
    }

    
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
