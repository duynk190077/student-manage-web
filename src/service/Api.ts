import axios from 'axios';
import { BASE_URL } from '../constant';
import LocalStorageService from './LocalStorage';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log(err);
    const originalConfig = err.config;
    if (originalConfig.url !== BASE_URL + '/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        localStorage.clear();
        window.location.reload();
        return instance(originalConfig);
      }
    }
    return Promise.reject(err);
  },
);
export default instance;
