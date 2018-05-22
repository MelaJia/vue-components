export default {
  data () {
    return {
      dialogConfirmVisible: false, // 控制确认窗
      dialogTransferVisible: false, // 控制转账窗
      dialogWithdrawVisible: false, // 控制提现窗
      dialogInfoVisible: false,
      multipleSelection: [], // 选择的数据
      details: {} // 详情
    }
  },
  methods: {
    handleInfo (idx, val) {
      this.details = val
      this.dialogInfoVisible = true
    }
  }
}
