import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596502176387264316178433","bc":"310100"}' }
})

// axios 拦截器？？？
// http.interceptors.request()
// http.interceptors.response()
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent

  // 启动loading
  // 显示一个loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    loadingType: 'spinner',
    duration: 0
  })

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default http
