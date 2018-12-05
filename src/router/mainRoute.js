const routes = [{
  path: '/suplier',
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
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/arManager/MyAr'),
    meta: {
      title: 'AR详情汇总', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'getar',
    name: 'getar',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arManager/GetAr'),
    meta: {
      title: '购入AR管理', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'getarapi',
    name: 'getarapi',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/GetArApi'),
    meta: {
      title: '转入单据', // 名称
      requireAuth: false // 需要登录验证
    },
    props: (route) => ({query: {interfaceTransSerial: route.query.interfaceTransSerial, type: route.query.type}})
  },
  {
    path: 'myarapi',
    name: 'myarapi',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/MyArApi'),
    meta: {
      title: 'AR管理', // 名称
      requireAuth: false // 需要登录验证
    },
    props: (route) => ({query: {interfaceTransSerial: route.query.interfaceTransSerial}})
  },
  {
    path: 'myartrans',
    name: 'myartrans',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/MyArTransAndDisc'),
    meta: {
      title: '我要转让', // 名称
      requireAuth: false // 需要登录验证
    },
    props: (route) => ({query: {interfaceTransSerial: route.query.interfaceTransSerial, operateType: 1}})
  },
  {
    path: 'myardisc',
    name: 'myardisc',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/MyArTransAndDisc'),
    meta: {
      title: '我要贴现', // 名称
      requireAuth: false // 需要登录验证
    },
    props: (route) => ({query: {interfaceTransSerial: route.query.interfaceTransSerial, operateType: 2}})
  },
  {
    path: 'fundapply',
    name: 'fundapply',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/FundApply'),
    meta: {
      title: '保理方分配申请', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'waitrepay',
    name: 'waitrepay',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/WaitRepay'),
    meta: {
      title: '待还款单据', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'finishedbill',
    name: 'finishedbill',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/FinishedBill'),
    meta: {
      title: '已完结单据', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'transfer',
    name: 'transfer',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arManager/TransferAr'),
    meta: {
      title: '转让AR管理', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'transferapi',
    name: 'transferapi',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/TransArApi'),
    meta: {
      title: '转出单据', // 名称
      requireAuth: false // 需要登录验证
    },
    props: (route) => ({query: {interfaceTransSerial: route.query.interfaceTransSerial, type: route.query.type}})
  },
  {
    path: 'historyar',
    name: 'historyar',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/suplier/arManager/HistoryAr'),
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
      title: '登录首页', // 名称
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
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/OrderSearch'),
    meta: {
      title: '我的订单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'acceptsearch',
    name: 'acceptsearch',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/AcceptanceSearch'),
    meta: {
      title: '我的验收单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mybill',
    name: 'mybill',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyBill'),
    meta: {
      title: '我的对账单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mypayer',
    name: 'mypayer',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyPayer'),
    meta: {
      title: '我的付款单', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'myinvoice',
    name: 'myinvoice',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyInvoice'),
    meta: {
      title: '我的发票', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'mysubmit',
    name: 'mysubmit',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MySubmit'),
    meta: {
      title: '我的结报', // 名称
      requireAuth: true // 需要登录验证
    }
  },
  {
    path: 'myarrear',
    name: 'myarrear',
    component: () =>
      import(/* webpackChunkName: 'AR' */ '@/page/funder/auxiliarySelect/MyArrear'),
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
    path: 'myschedule',
    name: 'myschedule',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/myschedule'),
    meta: {
      title: '我的待办', // 名称
      requireAuth: false // 需要登录验证
    }
  },
  {
    path: 'financingbill',
    name: 'financingbill',
    component: () => import(/* webpackChunkName: 'AR' */ '@/page/suplier/arApi/FinancingBill'),
    meta: {
      title: '融资中的单据', // 名称
      requireAuth: false // 需要登录验证
    }
  }
  ]
}
]
export default routes
