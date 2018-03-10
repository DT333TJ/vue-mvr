/** 
 * @description 教师端登录token相关
 */
import axios from 'axios'
import { baseURL, auth } from 'config/config'
import { ChannelId } from 'config/constant'
import { getHeadersValue } from 'lib/util'


/** 
* 获取token
* @param {Object} param: 参数对象
*/
export function requestGetToken(param) {
  const url = 'oauth/token'
  const method = 'post'
  const params = {
    username: param.username,
    password: param.password,
    grant_type: 'password'
  }
  const headers = {
    'api': getHeadersValue('oauth/token').api,
    'version': '2.0.0',
    'channel_code': ChannelId,
    'sign': getHeadersValue('oauth/token').sign
  }
  return axios.request({baseURL, params, method, url, headers, auth})
    .then( response => {
      return Promise.resolve(response)
    })
    .catch( error => {
      return Promise.reject(error.response)
    })
}


/**
 * 刷新token
 * @param  {string} refresh_token: 刷新token
 */ 
export function requestRefreshToken(refresh_token) {
  const method = 'post'
  const url = 'oauth/token'
  const params = {
    grant_type: 'refresh_token',
    refresh_token
  }
  const headers = {
    'api': getHeadersValue('oauth/token').api,
    'version': '2.0.0',
    'channel_code': ChannelId,
    'sign': getHeadersValue('oauth/token').sign,
  }
  return axios.request({ method, baseURL, url, auth, params, headers })
    .then(response => { 
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
