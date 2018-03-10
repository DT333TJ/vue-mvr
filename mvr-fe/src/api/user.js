/** 
 * @description 搜索相关api
 */
import instance from 'config/instance'
import { getHeadersValue } from 'lib/util'
import { ChannelId } from 'config/constant'

/** 
* 获取资源目录数据 
* @param {String} phone: 手机号
*/
export function requestGetUserInfo(loginName) {
  const url = 'getUser'
  const params = {
    loginName: loginName,
    channelId: ChannelId
  }
  instance.defaults.headers['sign'] = getHeadersValue('getUser').sign
  instance.defaults.headers['api'] = getHeadersValue('getUser').api
  return instance.request({ url, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}