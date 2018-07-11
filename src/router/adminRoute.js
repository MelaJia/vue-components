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
      name: 'AR分拨',
      component: () => import(/* webpackChunkName: 'admin' */ '@/page/admin/ArFenBoList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'regcmp',
      name: '注册企业管理',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/admin/managers/regCMP')
    },
    {
      path: 'loaned',
      name: '已放款查询',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/funder/LoanedList')
    },
    {
      path: 'loanfinish',
      name: '已完结查询',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/funder/LoanFinishList')
    },
    {
      path: 'cstLoanFee',
      name: '客户利率维护',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/funder/LoanFeeList')
    },
    {
      path: 'lolanuserinfo',
      name: '个基础信息',
      component: () =>
        import(/* webpackChunkName: 'admin' */ '@/page/funder/UserInfo')
    },
    {
      path: 'ordersearch',
      name: '我的订单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/OrderSearch'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'acceptsearch',
      name: '我的验收单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/AcceptanceSearch'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mybill',
      name: '我的对账单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyBill'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mypayer',
      name: '我的付款单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyPayer'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myinvoice',
      name: '我的发票',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyInvoice'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mysubmit',
      name: '我的结报',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MySubmit'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myarrear',
      name: '我的欠款',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/admin/auxiliarySelect/MyArrear'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    }
    ]
  }
]
export default routes
