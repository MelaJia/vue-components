const routes = [
  {
    path: '/admin',
    component: () =>
      import('@/layout/Admin'),
    children: [{
      path: '/',
      redirect: 'fenbo'
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
      path: 'fenbo',
      name: 'fenbo',
      component: () => import(/* webpackChunkName: 'admin' */ '@/page/admin/ArFenBoList'),
      meta: {
        title: 'AR分拨', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'regcmp',
      name: 'regcmp',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/admin/managers/regCMP'),
      meta: {
        title: '注册企业管理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'ordersearch',
      name: 'ordersearchAdminAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/OrderSearch'),
      meta: {
        title: '我的订单', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'acceptsearch',
      name: 'acceptsearchAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/AcceptanceSearch'),
      meta: {
        title: '我的验收单', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mybill',
      name: 'mybillAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyBill'),
      meta: {
        title: '我的对账单', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mypayer',
      name: 'mypayerAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyPayer'),
      meta: {
        title: '我的付款单', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myinvoice',
      name: 'myinvoiceAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyInvoice'),
      meta: {
        title: '我的发票', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mysubmit',
      name: 'mysubmitAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MySubmit'),
      meta: {
        title: '我的结报', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myarrear',
      name: 'myarrearAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyArrear'),
      meta: {
        title: '我的欠款', // 名称
        requireAuth: true // 需要登录验证
      }
    }
    ]
  }
]
export default routes
