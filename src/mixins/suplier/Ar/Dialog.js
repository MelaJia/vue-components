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
    getDetail (val) {
      return this.axios.post('/myAr/queryAr', { masterChainId: val.masterChainId }).then(res => {
        // 处理数据
        if (res.data.status) {
          let details = this.handleInvoiceListFormat(res.data.data)
          details.masterChainId = val.masterChainId
          return details
        } else {
          this.$message({
            type: 'info',
            message: `请求出错`
          })
          return false
        }
      })
    },
    handleInfo (idx, val) {
      console.log(val)
      val.infoLoading = true
      this.getDetail(val).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
        }
        val.infoLoading = false
      }).catch(err => {
        this.$alert(err, '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `网络错误`
            })
          }
        })
        val.infoLoading = false
      })
    },
    /* 发票已选未选分离 */
    handleInvoiceListFormat (oData) {
      const data = oData
      const list = []
      const listSelected = []
      data.invoiceCustomList.forEach(element => {
        if (element.invoiceIsSelected) {
          element.invoiceIsSelected = true
          listSelected.push(element)
        } else {
          list.push(element)
        }
      })
      data.invoiceList = list
      data.invoiceListSelected = listSelected
      return data
    }
  }
}
