<template>
  <el-dialog :class="'up-pass-style'" :visible.sync="visibleP" :before-close="handleClose" :close-on-click-modal="false">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <div class="text-error">提示：密码必须是由数字、大写字母、小写字母、特殊符号(包括!&quot;#$%&amp;&#x27;()*+,-./:;&lt;=&gt;?@[]^_&#x60;{|}~)四者组成,且长度为8~20位的字符串.</div>
        <el-form-item label="注册手机号">
              <span>{{getContactPhone}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
            <el-col :span="10" >
              <el-input v-model.trim="ruleForm2.verificationCode" auto-complete="off" :maxlength="6" size="small"></el-input>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-button :type="btntype" size="small" @click="sendMessage">{{word}}</el-button>
            </el-col>
        </el-form-item>
        <el-form-item label="原密码" prop="originalCustPassword">
          <el-input :type="opShow?'text':'password'" v-model.trim="ruleForm2.originalCustPassword" auto-complete="new-password">
            <eye slot="suffix" :item-show.sync="opShow"></eye>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="custPassword">
          <el-input :type="pShow?'text':'password'" v-model.trim="ruleForm2.custPassword" @blur="passBlur" @focus="passFocus" auto-complete="off">
            <eye slot="suffix" :item-show.sync="pShow"></eye>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input :type="pcShow?'text':'password'" v-model.trim="ruleForm2.confirmPassword" auto-complete="off">
            <eye slot="suffix" :item-show.sync="pcShow"></eye>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
.up-pass-style {
  > .el-dialog {
    max-width: 600px;
  }
  .el-input.el-input--suffix {
    width: 300px;
  }
  .el-select.el-select--small.el-input--suffix,
  .el-input.el-input--small {
    width: 190px;
  }
}
</style>

<style scoped>
footer {
  text-align: center;
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
import { debounce, postDataBase, erroShow } from '@/util/util' // 防抖函数
import * as types from '@/store/types' // 存储类型
import Eye from '@/components/Items/eye'
/* 合同确认 */
export default {
  props: ['visibleP', 'info'],
  mixins: [DialogClose],
  components: {
    Eye
  },
  watch: {
    visibleP: function () {
      this.init()
    }
  },
  data () {
    // 密码校验规则
    /**
 * 密码校验
 * @param {string} key 字段名
 * @param {string} smsg 提示信息
 * @param {str} url 地址
 */
    let validateVerify = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`验证码不能为空`))
      } else {
        this.axios.post('/cust/validVerificationCode.do', {
          contactPhone: this.getContactPhone,
          verificationCode: value
        }).then(res => {
          if (res.data.status) {
            callback()
          } else {
            callback(new Error(res.data.msg))
          }
        }).catch(err => {
          console.log(err)
          callback(new Error(`验证失败请联系管理员`))
        })
      }
    }
    let validateOriginPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`原密码不能为空`))
      } else {
        this.axios.post('/cust/validPassword.do', {
          originalCustPassword: value
        }).then(res => {
          if (res.data.status) {
            if (this.ruleForm2.custPassword !== '') {
              if (this.$refs.ruleForm2) {
                this.$refs.ruleForm2.validateField('custPassword')
              }
            }
            callback()
          } else {
            callback(new Error(res.data.msg))
          }
        }).catch(err => {
          console.log(err)
          callback(new Error(`验证失败请联系管理员`))
        })
      }
    }
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`新密码不能为空`))
      } else if (value === this.ruleForm2.originalCustPassword) {
        callback(new Error('新密码不能与原密码相同!'))
      } else {
        this.axios.post('/cust/check', {
          key: 'custPassword',
          value: value
        }).then(res => {
          if (res.data.status) {
            if (this.ruleForm2.confirmPassword !== '') {
              if (this.$refs.ruleForm2) {
                this.$refs.ruleForm2.validateField('confirmPassword')
              }
            }
            callback()
          } else {
            callback(new Error(res.data.msg))
          }
        }).catch(err => {
          console.log(err)
          callback(new Error(`验证失败请联系管理员`))
        })
      }
    }
    let validatePass2 = (rule, value, callback) => {
      let _this = this
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== _this.ruleForm2.custPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isPassShow: false, // 密码提示信息显示
      opShow: false, // 原密码是否可见
      pShow: false, // 密码是否可见
      pcShow: false, // 密码确认是是否可见
      passWord: '',
      ruleForm2: {
        originalCustPassword: '', // 原密码
        custPassword: '',
        confirmPassword: '',
        verificationCode: ''
      },
      rules2: {
        verificationCode: [
          { validator: validateVerify, trigger: 'blur' }
        ],
        originalCustPassword: [
          { validator: validateOriginPass, trigger: 'blur' }
        ],
        custPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      word: '获取验证码',
      isOvertime: false,
      btntype: 'primary' // 验证码按钮样式
    }
  },
  computed: {
    getContactPhone () {
      return this.$store.state.user.userinfos ? this.$store.state.user.userinfos.contactPhone : ''
    }
  },
  methods: {
    handleSubmit: debounce(submitForm, 1000, true),
    logout: logout,
    init: Init,
    // 密码框获取焦点时显示提示信息
    passFocus: passFocus,
    // 密码框失去焦点时隐藏提示信息
    passBlur: passBlur,
    // 可见修改
    handlePShowChange: handlePShowChange,
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    sendMessage: debounce(sendMessage, 1000, true)
  }
}
var sendTimer
function submitForm (formName) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      let param = Object.assign({}, this.ruleForm2, {contactPhone: this.getContactPhone})
      // 提交数据
      postDataBase.call(this, '/cust/updatePassword.do', param, true, true).then(res => {
        // 密码修改成功 登出
        if (res.data.status) {
          this.logout()
        }
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
// 退出
function logout () {
  let param = {
    ssoId: this.$store.getters.token
  }
  this.axios.post('/login/logout2', param).then(res => {
    if (res.data.status) {
      this.$message({
        message: '登出成功',
        type: 'success'
      })
      this.$store.commit(types.LOGOUT)
      this.$store.commit('DEL_ALL_TAG')
      this.$router.replace({
        path: '/login',
        query: { redirect: this.$router.currentRoute.fullPath }
      })
    } else {
      this.$message({
        message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
        type: 'error'
      })
    }
  }).catch(err => {
    console.log(err)
  })
}
// 初始化
function Init () {
  if (this.$refs['ruleForm2']) {
    this.$refs['ruleForm2'].resetFields()
  }
  this.isOvertime = false
  this.btntype = 'primary'
  clearInterval(sendTimer)
  this.word = '获取验证码'
}
// 显示密码提示信息
function passFocus () {
  this.isPassShow = true
}
//  隐藏密码提示信息
function passBlur () {
  this.isPassShow = false
}
// 可见修改
function handlePShowChange (val) {
  this[val] = !this[val]
}
// 获取验证码
function sendMessage () {
  if (this.getContactPhone.length <= 0) {
    this.$message.error('请选择需要验证的手机')
    return
  }
  if (this.isOvertime) {
    return
  }
  this.isOvertime = true // 验证码获取中
  this.axios.post('/cust/toverificationCode.do', {
    operationType: 2,
    contactPhone: this.getContactPhone
  }).then(res => {
    if (res.data.status) {
      this.$message({
        message: res.data.msg,
        type: 'success'
      })
      let that = this
      let time = 60
      this.btntype = ''
      sendTimer = setInterval(function () {
        time--
        that.word = `${time}秒后重新发送`
        if (time < 0) {
          that.isOvertime = false // 重置可发送验证码
          that.btntype = 'primary'
          clearInterval(sendTimer)
          that.word = '重新获取验证码'
        }
      }, 1000)
    } else {
      this.isOvertime = false // 重置可发送验证码
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    this.isOvertime = false // 重置可发送验证码
    console.log(err)
    erroShow.call(this, err)
  })
}
</script>
