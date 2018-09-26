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
      component: () => import(/* webpackChunkName: 'admin' */ '@/page/admin/work/ArFenBoList'),
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
      path: 'fundcmp',
      name: 'fundcmp',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/admin/managers/fundCMP'),
      meta: {
        title: '保理企业管理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'rolemanage',
      name: 'rolemanage',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/set/RoleManage'),
      meta: {
        title: '角色管理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'ordersearch',
      name: 'ordersearchAdminAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/OrderSearch'),
      meta: {
        title: '订单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'acceptsearch',
      name: 'acceptsearchAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/AcceptanceSearch'),
      meta: {
        title: '验收单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mybill',
      name: 'mybillAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyBill'),
      meta: {
        title: '对账单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mypayer',
      name: 'mypayerAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyPayer'),
      meta: {
        title: '付款单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myinvoice',
      name: 'myinvoiceAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyInvoice'),
      meta: {
        title: '发票查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mysubmit',
      name: 'mysubmitAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MySubmit'),
      meta: {
        title: '结报查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myarrear',
      name: 'myarrearAdmin',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyArrear'),
      meta: {
        title: '欠款查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'blockChain',
      name: 'blockChain',
      component: () => import(/* webpackChunkName: 'AR' */ '@/page/admin/blockChain/index'),
      meta: {
        title: '区块链', // 名称
        requireAuth: true // 需要登录验证
      }
    }
    ]
  }
]
export default routes
