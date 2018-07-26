const routes = [{
  path: '/',
  redirect: '/main/index'
},
{
  path: '/main',
  component: () =>
    import('@/layout/Main'),
  children: [{
    path: '/',
    redirect: 'index'
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
    name: 'myar',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/MyAr'),
    meta: {
      title: '我的AR', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'getar',
    name: 'getar',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/GetAr'),
    meta: {
      title: '待收AR', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'cancelar',
    name: 'cancelar',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/CancelAr'),
    meta: {
      title: '取消转让', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'historyar',
    name: 'historyar',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/HistoryAr'),
    meta: {
      title: '历史AR', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'index',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/Index'),
    meta: {
      title: '首页', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'userinfo',
    name: 'userinfo',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/UserInfo'),
    meta: {
      title: '基础信息', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'ordersearch',
    name: 'ordersearch',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/OrderSearch'),
    meta: {
      title: '我的订单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'acceptsearch',
    name: 'acceptsearch',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/AcceptanceSearch'),
    meta: {
      title: '我的验收单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mybill',
    name: 'mybill',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyBill'),
    meta: {
      title: '我的对账单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mypayer',
    name: 'mypayer',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyPayer'),
    meta: {
      title: '我的付款单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'myinvoice',
    name: 'myinvoice',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyInvoice'),
    meta: {
      title: '我的发票', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mysubmit',
    name: 'mysubmit',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MySubmit'),
    meta: {
      title: '我的结报', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'myarrear',
    name: 'myarrear',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/auxiliarySelect/MyArrear'),
    meta: {
      title: '我的欠款', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'creditLoanSituation',
    name: 'creditLoanSituation',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/loan/creditLoan/loanPage'),
    meta: {
      title: '融资情况', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'creditRepaySituation',
    name: 'creditRepaySituation',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/loan/creditLoan/repayPage'),
    meta: {
      title: '还款情况', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'orderLoanAble',
    name: 'orderLoanAble',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/loan/orderLoan/loanAblePage'),
    meta: {
      title: '可用订单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'orderLoanSituation',
    name: 'orderLoanSituation',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/loan/orderLoan/loanPage'),
    meta: {
      title: '融资情况', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'orderRepaySituation',
    name: 'orderRepaySituation',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/loan/orderLoan/repayPage'),
    meta: {
      title: '还款情况', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'blockChain',
    name: 'blockChain',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/blockChain/index'),
    meta: {
      title: '区块链', // 名称
      requireAuth: false // 需要登录验证
    }
  }
  ]
}
]
export default routes
