export default{
  methods: {
    // 输入金额框
    getDetail: getDetail
  }
}

function getDetail (url, val) {
  var param = {
    masterChainId: val
  }
  // 获取数据
  this.getLoanDetail(url, param).then((res) => {
    if (res) {
      this.details = res
      this.dialogInfoVisible = true
    }
  }).catch(function (error) {
    console.log(error)
  })
}
