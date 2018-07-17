const routes = [
  {
    path: '/fund',
    component: () =>
      import('@/layout/Fund'),
    children: [{
      path: '/',
      redirect: 'index'
    },
    {
      path: 'index',
      name: 'indexFund',
      meta: {
        title: '首页', // 名称
        requireAuth: true // 需要登录验证
      },
      component: () => import(/* webpackChunkName: 'Fund' */ '@/page/funder/outSource/Index')
    },
    {
      path: 'loan',
      name: 'loan',
      component: () => import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanList'),
      meta: {
        title: '放款处理', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loanreject',
      name: 'loanreject',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanRejectList'),
      meta: {
        title: '拒绝放款查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loaned',
      name: 'loaned',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanedList'),
      meta: {
        title: '已放款查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'loanfinish',
      name: 'loanfinish',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanFinishList'),
      meta: {
        title: '已完结查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'cstLoanFee',
      name: 'cstLoanFee',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/LoanFeeList'),
      meta: {
        title: '客户利率维护', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'lolanuserinfo',
      name: 'lolanuserinfo',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/UserInfo'),
      meta: {
        title: '个基础信息', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'ordersearch',
      name: 'ordersearchFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/OrderSearch'),
      meta: {
        title: '订单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'acceptsearch',
      name: 'acceptsearchFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/AcceptanceSearch'),
      meta: {
        title: '验收单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mybill',
      name: 'mybillFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/MyBill'),
      meta: {
        title: '对账单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mypayer',
      name: 'mypayerFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/MyPayer'),
      meta: {
        title: '付款单查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myinvoice',
      name: 'myinvoiceFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/MyInvoice'),
      meta: {
        title: '发票查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'mysubmit',
      name: 'mysubmitFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/MySubmit'),
      meta: {
        title: '结报查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'myarrear',
      name: 'myarrearFund',
      component: () =>
        import(/* webpackChunkName: 'Fund' */ '@/page/funder/auxiliarySelect/MyArrear'),
      meta: {
        title: '欠款查询', // 名称
        requireAuth: true // 需要登录验证
      }
    },
    {
      path: 'crc',
      name: 'crc',
      meta: {
        title: '中证网查询', // 名称
        requireAuth: true // 需要登录验证
      },
      component: () => import(/* webpackChunkName: 'Fund' */ '@/page/funder/outSource/CRC')
    }
    ]
  }
]
export default routes
