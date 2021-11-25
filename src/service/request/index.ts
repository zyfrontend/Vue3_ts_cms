import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { RequestHook, RequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
const DEFAULT_LOADING = true
const isLoading = DEFAULT_LOADING
class request {
  instance: AxiosInstance
  interceptors?: RequestHook
  loading?: ILoadingInstance
  showLoading: boolean
  constructor(config: RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? isLoading
    this.interceptors = config.interceptors
    // 使用拦截器
    // 从config中提取的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        this.loading?.close()
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return res.data
        }
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }
  //请求测试
  httpRequest<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2. 将showloading 设置为true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 3. 将结果返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          return err
        })
    })
  }
  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.httpRequest<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.httpRequest<T>({ ...config, method: 'POST' })
  }
  DELETE<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.httpRequest<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.httpRequest<T>({ ...config, method: 'PATCH' })
  }
}

export default request
