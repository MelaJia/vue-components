const routes = [{
  path: '/',
  redirect: '/main/myar'
},
{
  path: '/main',
  component: () =>
    import('@/layout/Main'),
  children: [{
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
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/MyAr'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'getar',
    name: '待收AR',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/GetAr')
  },
  {
    path: 'cancelar',
    name: '取消转让',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/CancelAr')
  },
  {
    path: 'historyar',
    name: '历史AR',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/HistoryAr')
  },
  {
    path: 'data',
    name: '数据信息',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/data')
  },
  {
    path: 'userinfo',
    name: '基础信息',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/UserInfo')
  }
  ]
},
{
  path: '/login',
  name: 'Login',
  component: () =>
    import('@/page/Login')
}
]
export default routes
