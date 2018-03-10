/**
 * @Desc: 教师端axios请求实例
 */

import axios from 'axios'
import router from 'router'
import { baseURL } from 'config/config'
import cookie from 'js-cookie'
import { ChannelId } from 'config/constant' 
 
// 创建实例
let instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'api': '',
    'version': '2.0.0',
    'channel_code': ChannelId,
    'sign': ''
  },
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    if (cookie.get('mvr_Token')) {
      config.headers.Authorization = `bearer ${cookie.get('mvr_Token')}`
		}
		// token失效
		else {
      confirm('请求提示：登陆过期，为您跳转到登陆页面？') && router.replace('/login')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// instance.interceptors.response.use(
//   response => {
//     // 对响应数据做点什么
//     console.log('response:', response)
//     return response
//   }, 
//   error => {
//     // 对响应错误做点什么
//     console.log('error:', error)
//     return Promise.reject(error)
//   })

export default instance


