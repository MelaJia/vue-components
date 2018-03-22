import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import * as types from '@/store/types'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import MyAr from '@/components/AR/MyAr'
import GetAr from '@/components/AR/GetAr'
import CancelAr from '@/components/AR/CancelAr'
import HistoryAr from '@/components/AR/HistoryAr'

Vue.use(Router)

const routes=[
  {
    path: '/',
    redirect:'/main/myar'
  },
  {
    path: '/main',
    component: Main,
    children:[
      {
        path: '/',
        redirect:'myar'
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
        component: MyAr
      },
      {
        path: 'getar',
        name: '待收AR',
        component: GetAr
      },
      {
        path: 'cancelar',
        name: '取消转让',
        component: CancelAr
      },
      {
        path: 'historyar',
        name: '历史AR',
        component: HistoryAr
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];
//页面刷新，重新设置token
if(window.localStorage.getItem('token')){
  store.commit(types.LOGIN,window.localStorage.getItem('token'))
}
const router=new Router({
  routes
});
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){ //是否需要登录权限
    if(store.state.token){
      next()
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
});
export default router;
