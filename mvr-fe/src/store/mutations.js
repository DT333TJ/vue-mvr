import { sessionStorageUtil } from 'lib/util'

const mutations = {
  SET_USER: (state, userInfo) => {
    state.user = userInfo
    sessionStorageUtil.setItem('state_user', userInfo)
  },
  SET_PREFIX: (state, prefix) =>{
    state.prefix = prefix
    sessionStorageUtil.setItem('state_prefix', prefix)
  }
}

export default mutations