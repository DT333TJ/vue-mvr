/**
 * @description 路由定义
 */
import Vue from 'vue'
import Router from 'vue-router'

// 登入
import Login from 'page/login/login'

// 机构
import Organization from 'page/organization/organization'
import OrganizationList from 'page/organization/organization-list/organization-list'
import SchoolList from 'page/organization/school-list/school-list'

// 用户
import Administrator from 'page/administrator/administrator'
import AdministratorList from 'page/administrator/administrator-list/administrator-list'

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
    path: '/organization',
    name: 'organization',
    component: Organization,
    redirect: '/organization/organization-list',
    meta: {
      title: '机构管理',
      requireAuth: true
    },
    children: [
      {
        path: 'organization-list',
        name: 'organization-list',
        component: OrganizationList,
        meta: {
          title: '机构管理',
          requireAuth: true
        }
      },
      {
        path: 'school-list',
        name: 'school-list',
        component: SchoolList,
        meta: {
          title: '学校列表',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/administrator',
    name: 'administrator',
    component: Administrator,
    redirect: '/administrator/administrator-list',
    meta: {
      title: '用户管理',
      requireAuth: true
    },
    children: [
      {
        path: 'administrator-list',
        name: 'administrator-list',
        component: AdministratorList,
        meta: {
          title: '用户管理',
          requireAuth: true
        }
      }
    ]
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
