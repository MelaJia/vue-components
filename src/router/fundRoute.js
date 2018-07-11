const routes = [
  {
    path: '/fund',
    component: () =>
      import('@/layout/Fund'),
    children: [{
      path: '/',
      redirect: 'loan'
    },
    {
      path: 'index',
      name: 'PlanTable',
      meta: {
        requireAuth: false // 需要登录验证
      },
      component: () => import(/* webpackChunkName: 'Fund' */ '@/page/funder/Index')
    },
    {
      path: 'loan',
      name: '放款处理',
      component: () => import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loanreject',
      name: '拒绝放款查询',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanRejectList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loaned',
      name: '已放款查询',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanedList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loanfinish',
      name: '已完结查询',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanFinishList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'cstLoanFee',
      name: '客户利率维护',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanFeeList'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'lolanuserinfo',
      name: '个基础信息',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/UserInfo'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'ordersearch',
      name: '我的订单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/OrderSearch'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'acceptsearch',
      name: '我的验收单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/AcceptanceSearch'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mybill',
      name: '我的对账单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyBill'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mypayer',
      name: '我的付款单',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyPayer'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myinvoice',
      name: '我的发票',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyInvoice'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mysubmit',
      name: '我的结报',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MySubmit'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myarrear',
      name: '我的欠款',
      component: () =>
        import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyArrear'),
      meta: {
        requireAuth: true // 需要登录验证
      }
    }
    ]
  }
]
export default routes
