export default {
  components: {
    // 还款计划表
    'dialog-repay-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/common/DialogRepayInfo')
  },
  data () {
    return {
      dialogRepayInfoVisible: false,
      detailsRepay: {} // 还款详情数据
    }
  },
  methods: {
    // 还款计划表
    handleShowRepayPlan: handleShowRepayPlan,
    // 还款表
    handleShowRepay: handleShowRepay

  }
}

function handleShowRepayPlan (val) {
  getData.call(this, '/loan/loanTrialRepaymentScheduleInfo.do', val.loanId, '还款计划表')
}

function handleShowRepay (val) {
  getData.call(this, '/loan/loanTrialRepaymentScheduleInfo.do', val.loanId, '还款表')
}

function getData (url, id, title) {
  this.getLoanDetail(url, {
    loanId: id
  }).then(res => {
    if (res) {
      this.detailsRepay = res
      this.detailsRepay.title = title
      this.dialogRepayInfoVisible = true
    }
  })
}
