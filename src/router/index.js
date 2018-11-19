import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import * as types from '@/store/types'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Main from './mainRoute'
import Fund from './fundRoute'
import Admin from './adminRoute'
import ErrorRoute from './errorRoute'
import Roles from '@/config/roles'
import {
  getStore
} from '@/util/store'
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
// import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'
// import Main from '@/components/Main'
// import MyAr from '@/components/AR/MyAr'
// import GetAr from '@/components/AR/GetAr'
// import CancelAr from '@/components/AR/CancelAr'
// import HistoryAr from '@/components/AR/HistoryAr'
Vue.use(Router)
const whiteList = ['/login', '/register', '/404', '/403', '/401', '/lock']
const routes = [
  {
    path: '/login2',
    name: 'Login2',
    component: () =>
      import('@/page/Login')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('@/page/loginnew')
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import('@/page/Register')
  },
  {
    path: '/forget',
    name: 'Forgetpassword',
    component: () =>
      import('@/page/Forgetpassword')
  },
  {
    path: '/',
    redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
      // store.getters.roles有值代表已登录，否代表用户未登陆
      return store.getters.roles ? Roles[store.getters.roles].layout : '/login'
    }
  },
  ...Main, ...Fund, ...Admin, ...ErrorRoute
]
// 页面刷新，重新设置token
if (getStore({name: 'token'})) {
  store.commit(types.LOGIN, getStore({name: 'token'}))
}
// 页面刷新，重新设置角色
if (getStore({name: 'roles'}) !== undefined && getStore({name: 'roles'}) !== null) {
  store.commit(types.SETROLE, getStore({name: 'roles'}))
}
// 页面刷新，重新获取菜单
if (getStore({name: 'navitems'}) !== undefined && getStore({name: 'navitems'}) !== null) {
  store.commit('SET_NAVITEM', getStore({name: 'navitems'}))
}
// 页面刷新，重新获取菜单权限配置
if (getStore({name: 'menu'}) !== undefined && getStore({name: 'menu'}) !== null) {
  store.commit('SET_MENU', getStore({name: 'menu'}))
}
// 页面刷新，重新设置tag_wel
if (getStore({name: 'tagWel'})) {
  store.commit('SET_TAG_WEL', getStore({name: 'tagWel'}))
}
// 页面刷新，重新设置userinfo
if (getStore({name: 'userinfos'})) {
  store.commit('SET_UINFO', getStore({name: 'userinfos'}))
}
const router = new Router({
  // mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  const value = to.query.redirect ? to.query.redirect : to.path
  const label = to.query.name ? to.query.name : to.meta.title
  if (whiteList.indexOf(value) === -1 && store.getters.roles !== undefined && store.getters.roles !== null) {
    if (Roles[store.getters.roles].layout === to.matched[0].path) {
      // console.log('tag名称', store.getters.menuName[store.getters.menu.findIndex((n) => n === to.path)])
      store.commit('ADD_TAG', {
        label: label,
        value: value,
        query: to.query
      })
    }
  }
  if (to.meta.requireAuth) { // 是否需要登录权限
    if (store.getters.token && store.getters.roles !== undefined) { // determine if there has token
      /* has token */
      // 判断是否有权限
      console.log('当前', to.path)
      // 获取菜单数组中路径位置
      console.log(store.getters.menu.findIndex((n) => n === to.path))
      if (store.getters.menu.findIndex((n) => n === to.path) !== -1) {
        next()
        NProgress.done()
      } else {
        next({
          path: '/403'
        })
        NProgress.done()
      }
    } else {
      /* has no token */
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({
          path: '/login'
          // query: {
          //   redirect: to.fullPath
          // }
        })
        NProgress.done()
      }
    }
    // if(store.state.token){
    //   next()
    // }else{
    //   next({
    //     path:'/login',
    //     query:{redirect:to.fullPath}
    //   })
    // }
  } else {
    next()
    NProgress.done()
  }
})
export default router
