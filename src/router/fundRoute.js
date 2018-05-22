const routes = [
  {
    path: '/fund',
    component: () =>
      import('@/layout/Fund'),
    children: [{
      path: '/',
      redirect: 'loan'
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
      path: 'loan',
      name: '放款处理',
      component: () => import(/* webpackChunkName: 'AR' */ '@/page/funder/LoanList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loanreject',
      name: '拒绝放款查询',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/LoanRejectList')
    },
    {
      path: 'loaned',
      name: '已放款查询',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/LoanedList')
    },
    {
      path: 'loanfinish',
      name: '已完结查询',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/suplier/HistoryAr')
    },
    {
      path: 'cstLoanFee',
      name: '客户利率维护',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/LoanFeeList')
    },
    {
      path: 'lolanuserinfo',
      name: '个基础信息',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/UserInfo')
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
