const navs = {
  suplier: {
    navItems: [{
      idx: '1',
      text: 'AR管理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      childrens: [{
        idx: 'myar',
        text: '我的AR',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'getar',
        text: '待收AR',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }, {
        idx: 'cancelar',
        text: '取消转让',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'historyar',
        text: '历史AR',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }
      ]
    },
    {
      idx: '2',
      text: '资金管理',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2'
    },
    {
      idx: '3',
      text: '辅助查询',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      childrens: [{
        idx: 'ordersearch',
        text: '我的订单',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'acceptsearch',
        text: '我的验收单',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }, {
        idx: 'mybill',
        text: '我的对账单',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'myinvoice',
        text: '我的发票',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mysubmit',
        text: '我的结报',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mypayer',
        text: '我的付款单',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'myarrear',
        text: '我的欠款',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }, {
        idx: 'index',
        text: '首页',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }
      ]
    },
    {
      idx: '4',
      text: '账户管理',
      disabled: false,
      lClass: 'end-line',
      hClass: 'header-circle bg-icon-3',
      childrens: [{
        idx: 'userinfo',
        text: '基本信息',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: '4-2',
        text: '银行卡管理',
        disabled: true,
        lClass: 'line',
        hClass: 'circle'
      }, {
        idx: '4-3',
        text: '密码修改',
        disabled: true,
        lClass: 'end-line',
        hClass: 'circle'
      }
      ]
    }
    ]
  },
  fund: {
    navItems: [{
      idx: '1',
      text: '业务处理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      childrens: [{
        idx: 'loan',
        text: '放款处理',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'loanreject',
        text: '拒绝放款查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }, {
        idx: 'loaned',
        text: '已放款查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'loanfinish',
        text: '已完结查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }
      ]
    },
    {
      idx: '2',
      text: '客户资料',
      disabled: false,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      childrens: [{
        idx: 'cstLoanFee',
        text: '客户利率维护',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }]
    },
    {
      idx: '3',
      text: '辅助查询',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      childrens: [{
        idx: 'ordersearch',
        text: '订单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'acceptsearch',
        text: '验收单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mybill',
        text: '对账单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'myinvoice',
        text: '发票查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mysubmit',
        text: '结报查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mypayer',
        text: '付款单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'myarrear',
        text: '欠款查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }
      ]
    },
    {
      idx: '4',
      text: '账户管理',
      disabled: false,
      lClass: 'end-line',
      hClass: 'header-circle bg-icon-3',
      childrens: [{
        idx: 'lolanuserinfo',
        text: '基本信息',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: '4-2',
        text: '银行卡管理',
        disabled: true,
        lClass: 'line',
        hClass: 'circle'
      }, {
        idx: '4-3',
        text: '密码修改',
        disabled: true,
        lClass: 'end-line',
        hClass: 'circle'
      }
      ]
    },
    {
      idx: '5',
      text: '外部资料',
      disabled: false,
      lClass: 'end-line',
      hClass: 'header-circle bg-icon-3',
      childrens: [{
        idx: 'index',
        text: '首页',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'crc',
        text: '中证网查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }
      ]
    }
    ]
  },
  admin: {
    navItems: [{
      idx: '1',
      text: '企业/用户管理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      childrens: [{
        idx: 'regcmp',
        text: '注册企业管理',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }]
    },
    {
      idx: '2',
      text: '业务处理',
      disabled: false,
      lClass: 'start-line',
      hClass: 'header-circle bg-icon-1',
      childrens: [{
        idx: 'fenbo',
        text: 'AR分拨',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }]
    },
    {
      idx: '3',
      text: '辅助查询',
      disabled: true,
      lClass: 'line',
      hClass: 'header-circle bg-icon-2',
      childrens: [{
        idx: 'ordersearch',
        text: '订单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'acceptsearch',
        text: '验收单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mybill',
        text: '对账单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'myinvoice',
        text: '发票查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mysubmit',
        text: '结报查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'mypayer',
        text: '付款单查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      },
      {
        idx: 'myarrear',
        text: '欠款查询',
        disabled: false,
        lClass: 'line',
        hClass: 'circle'
      }]
    }]
  }
}
export default navs
