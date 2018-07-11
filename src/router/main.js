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
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/Index'),
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
  },
  {
    path: 'ordersearch',
    name: '我的订单',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/OrderSearch'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'acceptsearch',
    name: '我的验收单',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/AcceptanceSearch'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mybill',
    name: '我的对账单',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyBill'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mypayer',
    name: '我的付款单',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyPayer'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'myinvoice',
    name: '我的发票',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyInvoice'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mysubmit',
    name: '我的结报',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MySubmit'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'myarrear',
    name: '我的欠款',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyArrear'),
    meta: {
      requireAuth: true // 需要登录验证
    }
  }
  ]
}
]
export default routes
