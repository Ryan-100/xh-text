import axios from 'axios';
import {getToken} from '../../service/auth'
const client = axios.create();
const token = getToken();

client.interceptors.request.use(
  async config => {
    config.baseURL = process.env.REACT_APP_API_ENDPOINT;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${token ? token : ''}`;
    config.headers['X_API_TOKEN'] = process.env.X_API_TOKEN;
    return config;
  },
  error => {
    console.log('error => ', error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  async res => {
    if (!res.data) {
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    console.log('error => ', error);
    return Promise.reject(error);
  }
);

export default client;
