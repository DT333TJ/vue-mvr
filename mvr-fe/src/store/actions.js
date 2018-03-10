import { requestGetUserInfo } from 'api/user'
import { sessionStorageUtil } from 'lib/util'

/** 
 * 获得用户信息 
 */
export function getUserInfo({ commit }, loginName) {
  return new Promise((resolve, reject) => {
    requestGetUserInfo(loginName)
      .then( response => {
        resolve(response)
      })
      .catch( error => {
        reject(error)
      })
  }) 
}


/** 
 * 从存储中获取用户相关的数据放到vuex中
*/
export function Flash_User({ commit }) {
  let value = sessionStorageUtil.getItem('state_user')
  value && commit('SET_USER', value)
}

/** 
 * 从存储中获取登录标识数据放到vuex中
*/
export function Flash_Prefix({ commit }) {
  let value = sessionStorageUtil.getItem('state_prefix')
  value && commit('SET_PREFIX', value)
}
