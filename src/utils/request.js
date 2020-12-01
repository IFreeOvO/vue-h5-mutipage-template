import axios from 'axios'
// import store from '@/store'
import publicConfig from '@/config/request.config.js'
const CancelToken = axios.CancelToken

class Request {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取axios配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  // 设定拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        config.cancelToken = new CancelToken((c) => {
          // 判断是否是公共路径，公共路径不携带token
          // let isPublic = false
          // publicConfig.publicPath.map((path) => {
          //   isPublic = isPublic || path.test(config.url)
          // })
          // const token = store.state.token
          // if (!isPublic && token) {
          //   config.headers.Authorization = `Bearer ${token}`
          // }

          // const key = `${config.url}&${config.method}`
          // this.removePending(key, true)
          // this.pending[key] = c
        })
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      res => {
        const key = `${res.config.url}&${res.config.method}`
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      err => {
        return Promise.reject(err)
      }
    )
  }

  // 创建实例
  // instance等价于instance.request
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get (url, params, config) {
    const options = Object.assign(
      {
        method: 'get',
        url,
        params
      },
      config
    )
    return this.request(options)
  }

  post (url, data, config) {
    // return this.request({
    //   method: 'post',
    //   url,
    //   data
    // })
    const options = Object.assign(
      {
        method: 'post',
        url,
        data
      },
      config
    )
    return this.request(options)
  }
}

const baseUrl = process.env.NODE_ENV === 'development' ? publicConfig.baseUrl.dev : publicConfig.baseUrl.prod
const request = new Request(baseUrl)
export default request
