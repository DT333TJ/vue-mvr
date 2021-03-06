﻿/**
 * 网络请求相关配置
 */

let NODE_ENV = process.env.NODE_ENV
let baseURL = ''

// 生产环境
if (NODE_ENV === 'production') {
  baseURL = '@PROD.BASEURL@'
}

// 开发环境
if (NODE_ENV === 'development') {
  baseURL = '@DEV.BASEURL@'
}

const auth = {
  username: 'viewshare',
  password: '3tZAoxbQAEG2nyGlvq6fhSuMNp0jN1A5'
}

export {
  baseURL,
  auth
}