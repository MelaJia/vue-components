<template>
  <el-form label-width="100px" >
        <el-form-item label="手机号">
            <el-col :span="8">
              {{getPhones}}
            </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
            <el-col :span="8">
              <el-input v-model.trim="verify" auto-complete="off" :maxlength="6" size="small" :disabled="isInput"></el-input>
            </el-col>
            <el-button :type="btntype" size="small" @click="sendMessage">{{word}}</el-button>
        </el-form-item>
  </el-form>
</template>
<style scoped>
form.el-form {
  text-align: left;
}
</style>

<script>
export default {
  data () {
    return {
      phone: '', // 手机号
      word: '发送验证码',
      isOvertime: false,
      btntype: 'primary', // 验证码按钮样式
      verify: '', // 验证码
      isInput: true // 是否可输入
    }
  },
  props: ['captcha'],
  watch: {
    verify: function (newValue, oldValue) {
      this.$emit('update:captcha', newValue)
    }
  },
  computed: {
    getPhones () {
      return this.$store.state.user.userinfos.legalPhone
    }
  },
  methods: {
    sendMessage: sendMessage,
    init: Init
  }
}
var sendTimer
// 获取验证码
function sendMessage () {
  if (this.getPhones.length <= 0) {
    this.$message.error('请选择需要验证的手机')
    return
  }
  if (this.isOvertime) {
    return
  }
  this.axios.post('/commonCust/getContractPlatformVerificationCode.do', {
    contactPhone: this.getPhones
  }).then(res => {
    if (res.data.status) {
      this.isInput = false
      let that = this
      let time = 60
      this.btntype = ''
      sendTimer = setInterval(function () {
        that.isOvertime = true
        time--
        that.word = '重新发送' + time
        if (time < 0) {
          that.isOvertime = false
          this.btntype = 'primary'
          clearInterval(sendTimer)
          that.word = '获取验证码'
        }
      }, 1000)
    } else {
      this.$message.error(res.data.msg)
    }
  })
}
function Init () {
  this.verify = '' // 验证码
  this.isInput = true // 是否可输入
  this.isOvertime = false
  this.btntype = 'primary'
  clearInterval(sendTimer)
  this.word = '获取验证码'
}
</script>
