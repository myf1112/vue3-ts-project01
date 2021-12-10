/* eslint-disable @typescript-eslint/no-explicit-any */
// 导入
import axios, { AxiosInstance } from 'axios';
import { ILoadingInstance } from 'element-plus';
import { IMyAxiosRequestConfig, IMyInterceptors } from './type';
import { ElLoading } from 'element-plus';

const DEFAULT_SHOW_LOADING = true;
// 创建类
class MyRequest {
  // axios实例
  instance: AxiosInstance;
  // 拦截器的类型得自己定，所谓的拦截器其实就是函数，调用实例的方法进行注册就可以了。
  // !由于设置的接口，所以我们在设置拦截器的时候可以将response的T传入。
  interceptors?: IMyInterceptors;
  isShowLoading?: boolean;
  loading?: ILoadingInstance;
  // 依据配置调用axios的方法，创建实例。
  // 这里我们最好还需要对axios的拦截器进行一波配置。
  // ?为了让我们可以传入拦截器函数，自定义一个接口。
  constructor(config: IMyAxiosRequestConfig) {
    this.instance = axios.create(config);
    // 我们需要从配置中获取拦截器啊！
    this.interceptors = config.interceptors;

    // 配置拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 对loading初始化
    this.isShowLoading = config.isShowLoading ?? DEFAULT_SHOW_LOADING;

    // 配置全员都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }
        return config;
      },
      (err) => {
        this.loading?.close();
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data;
        this.loading?.close();
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息');
        } else {
          return data;
        }
      },
      (err) => {
        this.loading?.close();

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~');
        }

        return err;
      }
    );
  }

  // 创建请求方法，注意get等其他方法都是基于request的基础的
  // 由于我们返回的类型得用户自己定，所以用<T>
  //!这里的类型写法请一定小心
  request<T>(config: IMyAxiosRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // !注意一下顺序，此时还没有开始请求，所以此时吧isShowLoading修改是完美的。
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading;
      }
      // 请求时判断是否有拦截器。如果有，把我们处理后的配置仍进去就好
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 此时我们调用实例的方法
      // 这里类型会报错，原因是因为我们还得设置一下res的类型:request<any, T>
      // !现在就开始请求了
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的拦截，说白了就是对res进行处理罢了。
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 将isShowLoading设置为默认值
          this.isShowLoading = DEFAULT_SHOW_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.isShowLoading = DEFAULT_SHOW_LOADING;
          reject(err);
        });
    });
  }
  post<T>(config: IMyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: IMyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: IMyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
  get<T>(config: IMyAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
}

export { MyRequest };
