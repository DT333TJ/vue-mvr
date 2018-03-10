const getters = {
  nickName: state => state.user.nickname,
  userId: state => state.user.userId,
  headUrl: state => state.user.headUrl,
  prefix: state => state.prefix
}

export default getters