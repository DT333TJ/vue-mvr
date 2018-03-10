/**
 * @description 路由定义，懒加载的方式
 */
import Vue from 'vue'
import Router from 'vue-router'

// 登入
import Login from 'page/login/login'

// 忘记密码
import ForgetPassword from 'page/forget-password/forget'
import Authentication from 'page/forget-password/component/authentication'
import NewPassword from 'page/forget-password/component/newpassword'
import CompletePassword from 'page/forget-password/component/completepassword'

// 资源
import Resource from 'page/resource/resource'
import ResourceList from 'page/resource/resource-list/resource-list'

// 我的收藏
import Collection from 'page/collection/collection'
import CollectionList from 'page/collection/collection-list/collection-list'

// 搜索
import Search from'page/search/search'
import SearchList from 'page/search/search-list/search-list'

// 资源详情
import Detail from 'page/detail/detail'

// 帮助
import Help from 'page/help/help'

Vue.use(Router)

const routers = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: ForgetPassword,
    redirect: '/forget-password/authentication',
    meta: {
      title: '忘记密码'
    },
    children: [
      {
        path: 'authentication',
        name: 'authentication',
        component: Authentication,
        meta: {
          title: '填写信息'
        }
      },
      {
        path: 'newpassword',
        name: 'newpassword',
        component: NewPassword,
        meta: {
          title: '设置新密码'
        }
      },
      {
        path: 'completepassword',
        name: 'completepassword',
        component: CompletePassword,
        meta: {
          title: '完成'
        }
      }
    ]
  },
  {
    path: '/resource',
    name: 'resource',
    component: Resource,
    redirect: '/resource/resource-list',
    meta: {
      title: '首页',
      requireAuth: true
    },
    children: [
      {
        path: 'resource-list',
        name: 'resource-list',
        component: ResourceList,
        meta: {
          title: '首页',
          requireAuth: true
        }
      },
      {
        path: 'resource-detail',
        name: 'resource-detail',
        component: Detail,
        meta: {
          title: '资源详情',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection,
    redirect: '/collection/collection-list',
    meta: {
      title: '我的收藏',
      requireAuth: true
    },
    children: [
      {
        path: 'collection-list',
        name: 'collection-list',
        component: CollectionList,
        meta: {
          title: '我的收藏',
          requireAuth: true
        }
      },
      {
        path: 'collection-detail',
        name: 'collection-detail',
        component: Detail,
        meta: {
          title: '收藏资源详情',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    redirect: '/search/search-list',
    meta: {
      title: '搜素',
      requireAuth: true
    },
    children: [
      {
        path: 'search-list',
        name: 'search-list',
        component: SearchList,
        meta:　{
          title: '搜索列表',
          requireAuth: true
        }
      },
      {
        path: 'search-detail',
        name: 'search-detail',
        component: Detail,
        meta: {
          title: '搜索资源详情',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/help',
    name: 'help',
    component: Help,
    redirect: '/search',
    meta: {
      title: '帮助',
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  },
]

const router = new Router({
  linkActiveClass: 'router-active',
  routes: routers
})

export default router
