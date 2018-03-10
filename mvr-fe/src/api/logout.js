/** 
 * @description 登出相关api
 */
import instance from 'config/instance'
import { getHeadersValue } from 'lib/util'

/** 
* 登出 
*/
export function requestLogout(prefix) {
  const url = 'logout'
  const params = {
    prefix
  }
  instance.defaults.headers['sign'] = getHeadersValue('logout').sign
  instance.defaults.headers['api'] = getHeadersValue('logout').api
  return instance.request({ url, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

