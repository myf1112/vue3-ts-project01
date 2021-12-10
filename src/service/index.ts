import { MyRequest } from './request';
import { BASE_URL, TIME_OUT } from './config';
import myStorage from '@/utils/my-storage';
// 我们在这里创建实例，设置默认的属性和拦截器，并导出。
const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = myStorage.getItem('token') ?? '';
      if (token && config.headers) {
        config.headers.Authorization = ` ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});

export { myRequest };
