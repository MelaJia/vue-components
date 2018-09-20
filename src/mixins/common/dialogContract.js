import Verify from '@/components/Items/Verify'
export default {
  components: {
    Verify
  },
  data () {
    return {
      checkList: [],
      isLoading: false,
      captcha: '', // 验证码
      step: 1 // 步骤
    }
  },
  methods: {
    beforeSubmit: beforeSubmit,
    handleNext: handleNext,
    init: Init
  }
}
// 点击我知道了跳到下一步
function handleNext () {
  this.step = 2
}
function beforeSubmit () {
  if (this.checkList.length !== this.detailsP.contractList.length) {
    this.$message({
      type: 'error',
      message: '有未勾选合同'
    })
    return
  }
  this.step = 3
}
// 初始化
function Init () {
  this.checkList = []
  this.captcha = ''
  this.step = 1
}
