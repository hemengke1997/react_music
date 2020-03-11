import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios"

export const baseURL = "http://192.168.0.104:3000"

class AxiosInterceptor {
  axiosInstance: AxiosInstance
  axiosConfig: AxiosRequestConfig = {
    baseURL: baseURL,
    timeout: 10000
  }
  constructor() {
    this.axiosInstance = this.getAxiosInstance()
  }
  handleError(error: any) {
    console.error(error)
  }
  request({ url, data, method = "GET", ...rest }: AxiosRequestConfig) {
    return this.axiosInstance({
      url,
      data,
      method,
      ...rest
    })
      .then((res: AxiosResponse) => {
        return res
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          return res.data
        }
      })
      .catch((error: any) => {
        this.handleError(error)
      })
      .finally(() => {})
  }
  getAxiosInstance() {
    let axiosInstance= axios.create(this.axiosConfig)
    // 响应拦截器
    axiosInstance.interceptors.response.use(
      res => {
        return Promise.resolve(res)
      },
      err => {
        return Promise.reject(err)
      }
    )
    // 请求拦截器。可以配置token之类的请求过滤条件
    axiosInstance.interceptors.request.use()
    return axiosInstance
  }
}

const request = new AxiosInterceptor().request
const axiosInstance = new AxiosInterceptor().axiosInstance

export {
  request,
  axiosInstance
}

export default new AxiosInterceptor()