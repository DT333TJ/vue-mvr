/**
 * @Desc: 管理员axios请求实例
 */

import axios from 'axios'
import router from 'router'
import { baseURL } from 'config/config'
import cookie from 'js-cookie'
 
// 创建实例
let requester = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

requester.interceptors.request.use(
  config => {
    if (cookie.get('mvr_Manager_Token')) {
      config.headers.Authorization = `bearer ${cookie.get('mvr_Manager_Token')}`
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

export default requester


