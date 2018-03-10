/** 
 * @description 教师端忘记密码相关api
 * @description 调用的是管理员端的接口
 * @description 直接用axios请求
 */
import axios from 'axios'
import { baseURL, auth } from 'config/config'
import { ChannelId } from 'config/constant'
import { getHeadersValue } from 'lib/util'

/** 
* 验证身份 
* @param {Object} param: 参数对象
*/
export function requestGetAuth(param) {
  const url = 'authentication'
  const params = param
  const headers = {
    'api': getHeadersValue('authentication').api,
    'version': '2.0.0',
    'channel_code': ChannelId,
    'sign': getHeadersValue('authentication').sign
  }
  return axios.request({ baseURL, params, url, headers, auth })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error.response)
    })
}

/** 
 * 修改密码 
 * @param {Object} param: 参数对象
 */
export function requestPatchPassword(param) {
  const url = `change/password/${param.id}`
  const method = 'patch'
  const params = {
    password: param.password
  }
  const headers = {
    'api': getHeadersValue('change/password').api,
    'version': '2.0.0',
    'channel_code': ChannelId,
    'sign': getHeadersValue('change/password').sign
  }
  return axios.request({ baseURL, params, method , url, headers, auth })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error.response)
    })
}

