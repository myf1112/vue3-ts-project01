/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface IMyInterceptors<T = AxiosResponse> {
  // 请求的函数类型,其实就是拿配置做操作，再返回配置
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  // 相应的拦截器类型,注意此时我们拿到了数据了。
  // (由于我们会在拦截器中获取它的data，所以还是用T)
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}
interface IMyAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IMyInterceptors<T>;
  isShowLoading?: boolean;
}

export { IMyInterceptors, IMyAxiosRequestConfig };
