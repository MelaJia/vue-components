<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose" :close-on-click-modal="false">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section style="padding-left:200px">
      <verify ref="verify" :captcha.sync="captcha"></verify>
    </section>
    <footer slot="footer">
        <el-button round @click="handleSubmit" type="primary" >确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
footer {
  text-align: center;
}
.textPhone {
  text-align: left;
}
/* 密码提示信息样式 */
.text-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding: 4px;
  text-align: center;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
import mixVerify from '@/mixins/common/dialogContract'
// import { debounce } from '@/util/util' // 防抖函数
// import * as types from '@/store/types' // 存储类型
/* 合同确认 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common, mixVerify],
  data () {
    let verifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`验证码不能为空`))
      } else {
        callback()
      }
    }
    return {
      word: '发送验证码',
      isOvertime: false,
      showCheckBtn: false,
      btntype: 'primary',
      showInput: true,
      phone: this.$store.state.user.userinfos.contactPhone, // 手机号
      getForm: {
        verificationCode: '' // 验证码
      },
      rule: {
        verificationCode: [
          { validator: verifyCode, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, {
      'leading': true,
      'trailing': false
    }),
    init: Init
  },
  computed: {
    getTitle () {
      return this.detailsP.loanId + '确认'
    }
  }
}
function submit () {
  if (this.captcha.length === 0) {
    this.$message({
      type: 'error',
      message: '验证码不能为空'
    })
    return
  }
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/factoringCreditLoan/confirmInitiateSigning.do', { loanId: this.detailsP.loanId, verificationCode: this.captcha }).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 操作成功 关闭弹窗
    if (res.data.status) {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    } else {
      loading.close()
    }
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 初始化
function Init () {
  this.captcha = ''
  if (this.$refs.verify) {
    this.$refs.verify.init()
  }
}
</script>
