<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
    <el-form ref="ruleForm" :model="getForm" :rules="rule" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号" class="textPhone">
            <span>{{phone}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="验证码" prop="verificationCode">
            <el-input v-model="getForm.verificationCode" auto-complete="off" :maxlength="6"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button :type="btntype" @click="sendMessage">{{word}}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="8">
          <el-form-item>
            <el-button type="primary" @click="confirm">确认</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
// import { debounce } from '@/util/util' // 防抖函数
// import * as types from '@/store/types' // 存储类型
/* 合同确认 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
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
      btntype: 'primary',
      phone: this.$store.state.user.userinfos.legalPhone, // 手机号
      getForm: {
        verificationCode: '' // 验证码
      },
      rule: {
        verificationCode: [
          { validator: verifyCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendMessage: sendMessage,
    confirm: confirm
  }
}
// 获取验证码
function sendMessage () {
  if (this.phone.length <= 0) {
    this.$message.error('请选择需要验证的手机')
    return
  }
  if (this.isOvertime) {
    return
  }
  this.axios.post('/commonCust/getContractPlatformVerificationCode.do').then(res => {
    if (res.data.status) {
      let that = this
      let time = 60
      this.btntype = 'default'
      var sendTimer = setInterval(function () {
        that.isOvertime = true
        time--
        that.word = '重新发送' + time + 's'
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
// 确认
function confirm () {
  this.$refs.ruleForm.validate((valid) => {
    if (valid) {
      this.axios.post('/loan2/confirmInitiateSigning.do', {masterChainId: this.detailsP.masterChainId, verificationCode: this.getForm.verificationCode}).then(res => {
        let type = res.data.status ? 'success' : 'error'
        if (res.data.status) {
          if (typeof res.data.data === 'string') {
            this.$message({
              showClose: true,
              message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
              type: type
            })
          } else {
            this.$message({
              showClose: true,
              message: res.data.data.message ? res.data.data.message : res.data.msg,
              type: type
            })
          }
          this.$parent.fresh()
          this.handleClose()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  })
}
</script>
