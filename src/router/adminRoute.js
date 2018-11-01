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
      component: () => import(/* webpackChunkName: 'chunkAdmin' */ '@/page/admin/work/ArFenBoList'),
      meta: {
        title: '资金方分拨', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'regcmp',
      name: 'regcmp',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/admin/managers/regCMP'),
      meta: {
        title: '资金需求方管理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'fundcmp',
      name: 'fundcmp',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/admin/managers/fundCMP'),
      meta: {
        title: '资金提供方管理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'rolemanage',
      name: 'rolemanage',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/admin/set/RoleManage'),
      meta: {
        title: '角色管理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'authmanage',
      name: 'authmanage',
      props: (route) => ({ query: {roleTypeId: Number(route.query.roleType), roleId: Number(route.query.roleId)} }),
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/admin/set/AuthorityManage'),
      meta: {
        title: '权限配置', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'ordersearch',
      name: 'ordersearchAdminAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/OrderSearch'),
      meta: {
        title: '订单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'acceptsearch',
      name: 'acceptsearchAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/AcceptanceSearch'),
      meta: {
        title: '验收单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mybill',
      name: 'mybillAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/MyBill'),
      meta: {
        title: '对账单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mypayer',
      name: 'mypayerAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/MyPayer'),
      meta: {
        title: '付款单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myinvoice',
      name: 'myinvoiceAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/MyInvoice'),
      meta: {
        title: '发票查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mysubmit',
      name: 'mysubmitAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/MySubmit'),
      meta: {
        title: '结报查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myarrear',
      name: 'myarrearAdmin',
      component: () =>
        import(/* webpackChunkName: 'chunkAdmin' */ '@/page/funder/auxiliarySelect/MyArrear'),
      meta: {
        title: '欠款查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'blockChain',
      name: 'blockChain',
      component: () => import(/* webpackChunkName: 'chunkAdmin' */ '@/page/admin/blockChain/index'),
      meta: {
        title: '区块链', // 名称
        requireAuth: true // 需要登录验证
      }
    }
    ]
  }
]
export default routes
