export default {
  data () {
    return {
      selectData: {
        origin: [{
          lable: '自有AR',
          value: 1
        }, {
          lable: '购入AR',
          value: 0
        }],
        status: [{
          lable: '貼現审核成功',
          value: 21
        }, {
          lable: '可用',
          value: 2
        }, {
          lable: '不可用',
          value: 99
        }],
        moneyType: [{
          lable: '人民币',
          value: '人民币'
        }, {
          lable: '台币',
          value: '台币'
        }, {
          lable: '港币',
          value: '港币'
        }, {
          lable: '美元',
          value: '美元'
        }]
      },
      formInline: {
        masterChainId: '', // ar单号
        isMasterAr: '', // ar来源
        custFromName: '', // 转让单位
        status: '', // 状态
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        moneyDate: null, // 日期
        transSerialNo: '' // 交易流水号
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.$emit('handle-search', this.formInline)
    }
  }
}
