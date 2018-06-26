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
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/GetAr'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'cancelar',
    name: '取消转让',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/CancelAr'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'historyar',
    name: '历史AR',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/HistoryAr'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'data',
    name: '数据信息',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/data'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'userinfo',
    name: '基础信息',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/UserInfo'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  }
  ]
}
]
export default routes
