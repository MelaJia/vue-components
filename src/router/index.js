import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import * as types from '@/store/types'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
NProgress.configure({ showSpinner: false })// NProgress Configuration
// import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/Login'
// import Main from '@/components/Main'
// import MyAr from '@/components/AR/MyAr'
// import GetAr from '@/components/AR/GetAr'
// import CancelAr from '@/components/AR/CancelAr'
// import HistoryAr from '@/components/AR/HistoryAr'
Vue.use(Router)
const whiteList = ['/login', '/404', '/401', '/lock']
const routes = [
  {
    path: '/',
    redirect: '/main/myar'
  },
  {
    path: '/main',
    component: () => import('@/layout/Main'),
    children: [
      {
        path: '/',
        redirect: 'myar'
      },
      // {
      //   path: 'plan',
      //   name: 'PlanTable',
      //   meta:{
      //     requireAuth:true //需要登录验证
      //   },
      //   component: FormTable
      // },
      {
        path: 'myar',
        name: '我的AR',
        component: () => import(/* webpackChunkName: 'AR' */ '@/page/MyAr'),
        meta: {
          requireAuth: true // 需要登录验证
        }
      },
      {
        path: 'getar',
        name: '待收AR',
        component: () => import(/* webpackChunkName: 'AR' */ '@/page/GetAr')
      },
      {
        path: 'cancelar',
        name: '取消转让',
        component: () => import(/* webpackChunkName: 'AR' */ '@/page/CancelAr')
      },
      {
        path: 'historyar',
        name: '历史AR',
        component: () => import(/* webpackChunkName: 'AR' */ '@/page/HistoryAr')
      },
      {
        path: 'data',
        name: '数据信息',
        component: () => import(/* webpackChunkName: 'AR' */ '@/page/data')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/page/Login')
  }
]
// 页面刷新，重新设置token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  console.log(to.query.name)
  console.log(to.name)
  const value = to.query.src ? to.query.src : to.path
  const label = to.query.name ? to.query.name : to.name
  if (whiteList.indexOf(value) === -1) {
    store.commit('ADD_TAG', {
      label: label,
      value: value,
      query: to.query
    })
  }
  if (to.meta.requireAuth) { // 是否需要登录权限
    if (store.getters.token) { // determine if there has token
      /* has token */
      next()
      NProgress.done()
    } else {
      /* has no token */
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
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
