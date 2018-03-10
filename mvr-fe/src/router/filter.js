/**
 * 路由校验
 */
import router from 'router'
import cookie from 'js-cookie'

router.beforeEach((to, from, next) => {
  // 页面title
  document.title = to.meta.title
  
  // 登出
  if (to.path === '/login') {
    cookie.get('mvr_Token') && cookie.remove('mvr_Token')  
    next()
  }
  // 权限校验
  if (to.meta && to.meta.requireAuth) {
    if (cookie.get('mvr_Token')) {
      next()
    } else {
      confirm('信息提示：登录过期，为您跳转到登陆页面？') ? next('/login') : next()
    }
  }

  next() 
})