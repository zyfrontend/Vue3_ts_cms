/**
 * 网络请求
 * */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'

import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { RequestConfig, RequestHook } from '@/utils/types'

// 加载中
const DEFAULT_LOADING = true
const isLoading = DEFAULT_LOADING

class request {
  // 实例类型
  instance: AxiosInstance
  // 响应拦截器类型
  interceptors?: RequestHook
  // loading 类型
  loading?: ILoadingInstance
  showLoading: boolean
  constructor(config: RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)

    // 加载中？
    this.showLoading = config.showLoading ?? isLoading
    this.interceptors = config.interceptors
    // 提取对应实例的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 为所有实例添加拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 响应拦截
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
  // 请求封装
  httpRequest<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve) => {
      // 请求实例?
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }
      // 不在加载中？
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.showloading = true, 不会影响像一个请求
          this.showLoading = DEFAULT_LOADING
          // 3.返回结果
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
  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.httpRequest<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.httpRequest<T>({ ...config, method: 'PATCH' })
  }
}

export default request
