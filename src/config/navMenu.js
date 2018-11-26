const navs = {
  suplier: {
    navItems: [{
      menuId: '0',
      menuName: '新功能',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'myartrans',
        menuUrl: 'myartrans',
        menuName: '我要转让',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myardisc',
        menuUrl: 'myardisc',
        menuName: '我要贴现',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'fundapply',
        menuUrl: 'fundapply',
        menuName: '保理方分配申请',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'waitrepay',
        menuUrl: 'waitrepay',
        menuName: '待还款单据',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'finishedbill',
        menuUrl: 'finishedbill',
        menuName: '已完结单据',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'getarapi',
        menuUrl: 'getarapi',
        menuName: '转入单据',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'transferapi',
        menuUrl: 'transferapi',
        menuName: '转出单据',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'financingbill',
        menuUrl: 'financingbill',
        menuName: '融资中单据',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '1',
      menuName: 'AR管理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'myar',
        menuUrl: 'myar',
        menuName: 'AR详情汇总',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'getar',
        menuUrl: 'getar',
        menuName: '购入AR管理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'transfer',
        menuUrl: 'transfer',
        menuName: '转让AR管理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'historyar',
        menuUrl: 'historyar',
        menuName: '历史AR',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '2',
      menuName: '其它融资',
      disabled: false,
      lClass: 'line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: '2-1',
        menuName: '信用融资',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle',
        children: [{
          menuId: 'creditLoanSituation',
          menuUrl: 'creditLoanSituation',
          menuName: '融资情况',
          disabled: false,
          lClass: 'line',
          menuParent: 'circle'
        },
        {
          menuId: 'creditRepaySituation',
          menuUrl: 'creditRepaySituation',
          menuName: '还款情况',
          disabled: false,
          lClass: 'line',
          menuParent: 'circle'
        }
        ]
      },
      {
        menuId: '2-2',
        menuName: '订单融资',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle',
        children: [{
          menuId: 'orderLoanAble',
          menuUrl: 'orderLoanAble',
          menuName: '可用订单',
          disabled: false,
          lClass: 'line',
          menuParent: 'circle'
        },
        {
          menuId: 'orderLoanSituation',
          menuUrl: 'orderLoanSituation',
          menuName: '融资情况',
          disabled: false,
          lClass: 'line',
          menuParent: 'circle'
        },
        {
          menuId: 'orderRepaySituation',
          menuUrl: 'orderRepaySituation',
          menuName: '还款情况',
          disabled: false,
          lClass: 'line',
          menuParent: 'circle'
        }
        ]
      }
      ]
    },
    {
      menuId: '3',
      menuUrl: '3',
      menuName: '资金管理',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2'
    },
    {
      menuId: '4',
      menuName: '辅助查询',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      children: [{
        menuId: 'index',
        menuUrl: 'index',
        menuName: '登录首页',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'ordersearch',
        menuUrl: 'ordersearch',
        menuName: '我的订单',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'acceptsearch',
        menuUrl: 'acceptsearch',
        menuName: '我的验收单',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }, {
        menuId: 'mybill',
        menuUrl: 'mybill',
        menuName: '我的对账单',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myinvoice',
        menuUrl: 'myinvoice',
        menuName: '我的发票',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mysubmit',
        menuUrl: 'mysubmit',
        menuName: '我的结报',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mypayer',
        menuUrl: 'mypayer',
        menuName: '我的付款单',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myarrear',
        menuUrl: 'myarrear',
        menuName: '我的欠款',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '5',
      menuName: '账户管理',
      disabled: false,
      lClass: 'end-line',
      hClass: 'header-circle bg-icon-3',
      children: [{
        menuId: 'userinfo',
        menuUrl: 'userinfo',
        menuName: '基础信息',
        disabled: false,
        lClass: 'end-line',
        menuParent: 'circle'
      }
      ]
    }
    ]
  },
  fund: {
    navItems: [{
      menuId: '1',
      menuName: '业务处理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'loan',
        menuUrl: 'loan',
        menuName: '放款处理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'loanreject',
        menuUrl: 'loanreject',
        menuName: '拒绝放款查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }, {
        menuId: 'loaned',
        menuUrl: 'loaned',
        menuName: '已放款查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'loanfinish',
        menuUrl: 'loanfinish',
        menuName: '已完结查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '6',
      menuName: '信用融资',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      children: [{
        menuId: 'creditloan',
        menuUrl: 'creditloan',
        menuName: '信用放款处理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'creditreject',
        menuUrl: 'creditreject',
        menuName: '信用拒绝查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'creditloaned',
        menuUrl: 'creditloaned',
        menuName: '信用已放款处理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'creditend',
        menuUrl: 'creditend',
        menuName: '信用已完结查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '2',
      menuName: '客户资料',
      disabled: false,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      children: [{
        menuId: 'cstLoanFee',
        menuUrl: 'cstLoanFee',
        menuName: '客户利率维护',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }]
    },
    {
      menuId: '3',
      menuName: '辅助查询',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      children: [{
        menuId: 'ordersearch',
        menuUrl: 'ordersearch',
        menuName: '订单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'acceptsearch',
        menuUrl: 'acceptsearch',
        menuName: '验收单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mybill',
        menuUrl: 'mybill',
        menuName: '对账单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myinvoice',
        menuUrl: 'myinvoice',
        menuName: '发票查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mysubmit',
        menuUrl: 'mysubmit',
        menuName: '结报查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mypayer',
        menuUrl: 'mypayer',
        menuName: '付款单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myarrear',
        menuUrl: 'myarrear',
        menuName: '欠款查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '4',
      menuName: '账户管理',
      disabled: false,
      lClass: 'line',
      hClass: 'header-circle bg-icon-3',
      children: [{
        menuId: 'lolanuserinfo',
        menuUrl: 'lolanuserinfo',
        menuName: '基础信息',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }
      ]
    },
    {
      menuId: '5',
      menuName: '外部资料',
      disabled: false,
      lClass: 'end-line',
      hClass: 'header-circle bg-icon-3',
      children: [{
        menuId: 'index',
        menuUrl: 'index',
        menuName: '登录首页',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'crc',
        menuUrl: 'crc',
        menuName: '中征网查询',
        disabled: false,
        lClass: 'end-line',
        menuParent: 'circle'
      }
      ]
    }
    ]
  },
  admin: {
    navItems: [{
      menuId: '1',
      menuName: '企业/用户管理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'regcmp',
        menuUrl: 'regcmp',
        menuName: '资金需求方管理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'fundcmp',
        menuUrl: 'fundcmp',
        menuName: '资金提供方管理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }]
    },
    {
      menuId: '2',
      menuName: '设置',
      disabled: false,
      lClass: 'line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'rolemanage',
        menuUrl: 'rolemanage',
        menuName: '角色管理',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'authmanage',
        menuUrl: 'authmanage',
        menuName: '权限配置',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }]
    },
    {
      menuId: '3',
      menuName: '业务处理',
      disabled: false,
      lClass: 'line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'fenbo',
        menuUrl: 'fenbo',
        menuName: '资金方分拨',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }]
    },
    {
      menuId: '4',
      menuName: '辅助查询',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      children: [{
        menuId: 'ordersearch',
        menuUrl: 'ordersearch',
        menuName: '订单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'acceptsearch',
        menuUrl: 'acceptsearch',
        menuName: '验收单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mybill',
        menuUrl: 'mybill',
        menuName: '对账单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myinvoice',
        menuUrl: 'myinvoice',
        menuName: '发票查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mysubmit',
        menuUrl: 'mysubmit',
        menuName: '结报查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'mypayer',
        menuUrl: 'mypayer',
        menuName: '付款单查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      },
      {
        menuId: 'myarrear',
        menuUrl: 'myarrear',
        menuName: '欠款查询',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }]
    }, {
      menuId: '5',
      menuUrl: '5',
      menuName: '区块链',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      children: [{
        menuId: 'blockChain',
        menuUrl: 'blockChain',
        menuName: '区块链演示',
        disabled: false,
        lClass: 'line',
        menuParent: 'circle'
      }]
    }]
  }
}
module.exports = navs
