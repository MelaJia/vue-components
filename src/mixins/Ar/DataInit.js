export default {
  data () {
    return {
      Options: [{
        value: '大吉制造',
        label: '大吉制造'
      }, {
        value: '大诚制造',
        label: '大诚制造'
      }, {
        value: '大利制造',
        label: '大利制造'
      }],
      //  宽度控制
      widthArr: {
        id: '100',
        come: '',
        company: '150',
        status: '',
        moneyType: '',
        money: '',
        money_can: '',
        money_cash: '',
        arriveDate: '120'
      },
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
        disabled: false,
        lClass: 'line',
        hClass: 'header-circle bg-icon-2'
      },
      {
        idx: 'data',
        text: '消息中心',
        disabled: false,
        lClass: 'line',
        hClass: 'header-circle bg-icon-2'
      },
      {
        idx: '4',
        text: '账户管理',
        disabled: false,
        lClass: 'end-line',
        hClass: 'header-circle bg-icon-3',
        childrens: [{
          idx: '4-1',
          text: '基本信息',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: '4-2',
          text: '银行卡管理',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        }, {
          idx: '4-3',
          text: '密码修改',
          disabled: false,
          lClass: 'end-line',
          hClass: 'circle'
        }
        ]
      }
      ],
      tableData5: [{
        pend: false, // 父节点展开属性 默认false
        id: '12987122',
        come: '自有',
        company: '大诚制造',
        status: '待确认',
        moneyType: '人民币',
        money: '20000',
        money_can: '20000',
        money_cash: '20000',
        arriveDate: '2017-9-26',
        bankAccount: '2000300040005000',
        bankCompaney: '招商',
        tableData: [{ // 子节点
          id: '12987122-1',
          come: '自有',
          company: '大吉制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount: '2000300040005000',
          bankCompaney: '招商'
        }, {
          id: '12987122-2',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount: '2000300040005000',
          bankCompaney: '招商'
        }, {
          id: '12987122-3',
          come: '自有',
          company: '大诚制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount: '2000300040005000',
          bankCompaney: '招商'
        }]
      }, {
        pend: false, // 父节点展开属性
        id: '12987123',
        come: '自有',
        company: '大诚制造',
        status: '待确认',
        moneyType: '人民币',
        money: '30000',
        money_can: '20000',
        money_cash: '20000',
        arriveDate: '2017-9-26',
        bankAccount: '2000300040005000',
        bankCompaney: '招商',
        tableData: [{ //  子节点
          id: '12987122-1',
          come: '自有',
          company: '大吉制造',
          status: '待确认',
          moneyType: '人民币',
          money: '20000',
          money_can: '20000',
          money_cash: '20000',
          arriveDate: '2017-9-26',
          bankAccount: '2000300040005000',
          bankCompaney: '招商'
        }]
      }]
    }
  }
}
