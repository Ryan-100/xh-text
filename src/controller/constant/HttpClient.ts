import axios from 'axios';
import { getLocalStorageData, getRefreshToken, getToken, setRefreshToken, setToken} from '../../service/auth'

const client = axios.create();

client.interceptors.request.use(
  async config => {
    const token = getToken();
    config.baseURL = 'http://64.23.137.248:2850/api/';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${token ? token : ''}`;
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
    if(error.response.status===401){
      const refreshToken = async () => {
        const user_id = await getLocalStorageData("user_id");
        let refresh_token = await getRefreshToken();
          
        const res = await axios.get(
          `http://64.23.137.248:2850/api/auth/refresh-token?id=${user_id}&refresh_token=${refresh_token}&app_type=adminUser`,
          {
            headers: {
              Authorization: `Bearer ${refresh_token}`,
            },
          }
        );
        if (res?.status === 200) {
          setToken({
            j_token: res?.data?.data?.accessToken,
          });
          setRefreshToken({
            r_token: res?.data?.data?.refreshToken,
          });
        }
      };
        refreshToken();
    }
    return Promise.reject(error);
  }
);

export default client;
