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
    }
    ]
  }
]
export default routes
