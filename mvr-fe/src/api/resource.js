/** 
 * @description 视频资源相关api
 */
import instance from 'config/instance'
import { getHeadersValue } from 'lib/util'
import { baseURL } from 'config/config'


/** 
* 获取资源目录数据 
*/
export function requestGetFilterList() {
  const url = 'chapters'
  instance.defaults.headers['sign'] = getHeadersValue('chapters').sign
  instance.defaults.headers['api'] = getHeadersValue('chapters').api
  return instance.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 获取资源数据 
 * @param {Object} data: 参数对象
 */
export function requestGetResourceList(data) {
  const url = 'getCurrentResource'
  const params = {
    levelId: data.levelId,
    subjectId: data.subjectId,
    editionId: data.editionId,
    volumeId: data.volumeId,
    chapter1Id: data.chapter1Id,
    chapterId: data.chapterId,
    chapter3Id: data.chapter3Id,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    resourceType: data.resourceType    
  }
  instance.defaults.headers['sign'] = getHeadersValue('getCurrentResource').sign
  instance.defaults.headers['api'] = getHeadersValue('getCurrentResource').api
  return instance.request({ url, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
* 搜索获得资源 
* @param {Object} data: 参数对象
*/
export function requestGetSearchResource(data) {
  const url = 'getResource'
  const params = {
    pageSize: data.pageSize,
    pageNum: data.pageNum,
    keyWord: data.keyWord,
    resourceType: data.resourceType
  }
  instance.defaults.headers['sign'] = getHeadersValue('getResource').sign
  instance.defaults.headers['api'] = getHeadersValue('getResource').api
  return instance.request({ url, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
 * 通过ID获得资源的详情信息
 * @param {Number} resourceId: 资源ID
*/
export function requestGetResourceDetail(resourceId) {
  const url = 'getResourceDetail'
  const params = {
    resourceId
  }
  instance.defaults.headers['sign'] = getHeadersValue('getResourceDetail').sign
  instance.defaults.headers['api'] = getHeadersValue('getResourceDetail').api
  return instance.request({ url , params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
 * 展示收藏的资源数据
 * @param {Object} data: 参数对象 
 */
export function requestGetCollectList(data) {
  const url = `${data.resourceType}/collect`
  const params = {
    pageNum: data.pageNum,
    pageSize: data.pageSize
  }
  instance.defaults.headers['sign'] = getHeadersValue('collect').sign
  instance.defaults.headers['api'] = getHeadersValue('collect').api
  return instance.request({ url, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}


/** 
* 添加收藏
* @param {Object} data: 参数对象
*/
export function requestCollectResource(data) {
  const method = 'post'
  const url = `${data.resourceType}/collect`
  const params = {
    resourceId: data.resourceId
  }
  instance.defaults.headers['sign'] = getHeadersValue('collect').sign
  instance.defaults.headers['api'] = getHeadersValue('collect').api
  return instance.request({ method, url, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
* 取消收藏 
* @param {Object} data: 参数对象
*/
export function requestDeleteCollectResource(data) {
  const method = 'delete'
  const url = `${data.resourceType}/collect`
  const params = {
    resourceId: data.resourceId
  }
  instance.defaults.headers['sign'] = getHeadersValue('collect').sign
  instance.defaults.headers['api'] = getHeadersValue('collect').api
  return instance.request({ method, url, params})
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}
