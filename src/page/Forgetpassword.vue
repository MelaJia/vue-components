<template>
  <section class="reg-style">
  <section class="header">
    <div class="wrapper clearfix">
        <a href="#" class="logo">
          <img src="@/assets/img/login/pread_03.png" alt="">
        </a>
        <div class="phone">
          <!--<a href="#" class="backhome">返回首页</a>-->
          <p>已有账号？ 立即
             <router-link to="/login" class="red">登录</router-link>
          </p>
        </div>
      </div>
  </section>
  <section class="register-style main">
    <article>
      <header>
        <el-steps :active="step" finish-status="success" simple style="margin-top: 20px">
          <el-step title="第一步"></el-step>
          <el-step title="第二步"></el-step>
          <el-step title="第三步"></el-step>
        </el-steps>
      </header>
      <main class="section">
        <section class="reg-step-1" v-show="step==0">
          <el-form ref="form-1" :model="getForm" :rules="rulesOne" label-width="130px">
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="注册手机号: " prop="contactPhone">
                  <el-input v-model.trim="getForm.contactPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-col :span="16">
                  <el-form-item label="验证码: " prop="verificationCode">
                    <el-input v-model.trim="getForm.verificationCode" :maxlength="6"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :push="2"><el-button :disabled="showCheckBtn" :type="btntype" @click="sendMessage">{{word}}</el-button></el-col>
              </el-col>
            </el-row>
          </el-form>
        </section>
        <section class="reg-step-2" v-show="step==1">
          <el-form ref="form-2" :model="getForm" :rules="rulesTwo" label-width="150px">
            <el-row>
              <el-col :span="24">
                <div v-show="isPassShow" class="text-error">提示：密码必须是由数字、大写字母、小写字母、特殊符号(包括!&quot;#$%&amp;&#x27;()*+,-./:;&lt;=&gt;?@[]^_&#x60;{|}~)四者组成,且长度为8~32位的字符串.</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="登录名: " prop="custUsername">
                  <el-input v-model.trim="getForm.custUsername" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="新密码: " prop="custPassword">
                  <el-input :type="pShow?'text':'password'" v-model.trim="getForm.custPassword" @blur="passBlur" @focus="passFocus">
                    <a slot="suffix" :class="`iconfont ${pShow?'icon-yanjing_xianshi':'icon-yanjing_yincang'}`" @click="handlePShowChange('pShow')"></a>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="6">
                <el-form-item label="密码确认: " prop="confirmPassword">
                  <el-input :type="pcShow?'text':'password'" v-model.trim="getForm.confirmPassword" auto-complete="off">
                    <a slot="suffix" :class="`iconfont ${pcShow?'icon-yanjing_xianshi':'icon-yanjing_yincang'}`" @click="handlePShowChange('pcShow')"></a>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </section>
        <section class="reg-step-3" v-show="step==2">
          <el-form ref="form-3" :model="getForm" label-width="150px">
            <el-row>
              <el-col :span="14" :offset="5">
                  <span><span class="green">修改成功</span>，将于{{backTime}}秒后跳转至登陆界面，如没有跳转请直接点击完成按钮</span>
              </el-col>
            </el-row>
          </el-form>
        </section>
      </main>
      <footer>
        <el-row>
          <el-col :span="6" :offset="10">
            <el-button v-if="step!=0&&step<2" type="primary" size="mini" @click="prevHandle()">上一步</el-button>
            <el-button v-if="step<1" type="primary" size="mini" @click="nextHandle(`form-${step+1}`)">下一步</el-button>
            <el-button v-if="step==1" type="primary" size="mini" @click="subHandle('form-3')" style="width:68px;">提 交</el-button>
            <el-button v-if="step==2" type="primary" size="mini" @click="goLogin">完成</el-button>
          </el-col>
        </el-row>
      </footer>
    </article>
  </section>
  <section class="footer"></section>
  </section>
</template>
<style lang="scss">
.section{
  margin-top: 40px;
}
.reg-style {
  .header {
    background-color: white;
    height: 100px;
    line-height: 100px;
    min-height: 100px;
  }

  .header .logo,
  .header .phone {
    display: inline-block;
  }

  .header .logo {
    float: left;
    margin-left: 70px;
  }

  .header .logo img {
    vertical-align: middle;
  }

  .header .phone {
    float: right;
    color: #666;
    font-size: 16px;
    height: 100px;
    line-height: 100px;
    margin-right: 70px;
  }
  a {
    text-decoration: none;
  }

  a.red {
    color: #ff7832;
  }

  a.red:hover {
    text-decoration: underline;
  }
}
.green{
  color: green;
}
// ie10步骤条兼容处理
.ie10 {
  .el-steps {
    display: block;
  }
  .el-step {
    display: inline-block;
    width: 43%;
  }
  .el-step:last-of-type.is-flex {
    width: 10%;
  }
  .el-step.is-simple .el-step__head {
    float: left;
  }
}
// ie10步骤条兼容处理
.register-style {
  padding-bottom: 20px;
  min-width: 960px;
  width: 65%;
  border: solid 1px #bbb;
  margin: auto;
  height: auto;
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-select .el-input {
    width: 130px;
  }
  .el-cascader {
    width: 100%;
  }
}
.loginLine {
  color: #8ec1f4;
}
.reg-step-3{
  margin-bottom: 40px;
}
// 密码提示信息样式
.text-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding: 4px;
  text-align: center;
}
// 服务协议样式
.iptChoose {
  padding: 20px 50px;
}
</style>

<script>
// import validConf from '@/config/validateConfig'
// import { getStore, setStore } from '@/util/store'
// import { baseUrl } from '@/config/env.js'
// import { postDataBase } from '@/util/util'
export default {
  data () {
    // 验证手机号码
    let verifyPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`手机号不能为空`))
      }
      let re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      setTimeout(() => {
        if (!re.test(value)) {
          callback(new Error('手机号格式错误'))
          this.showCheckBtn = true
        } else {
          // 校验手机接口
          this.axios.post('/cust/validContactPhone.do', {contactPhone: this.getForm.contactPhone}).then(res => {
            if (res.data.status) {
              this.showCheckBtn = false
              callback()
            } else {
              this.showCheckBtn = true
              callback(new Error(res.data.data))
            }
          }).catch(err => {
            console.log(err)
            callback(new Error(`手机号验证失败`))
          })
        }
      }, 1000)
    }
    // 验证校验码
    // let verifyCode = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error(`验证码不能为空`))
    //   } else {
    //     // 请求校验验证码接口获取登录名
    //     this.axios.post('/cust/validVerificationCode.do', {contactPhone: this.getForm.contactPhone, verificationCode: value}).then(res => {
    //       let type = res.data.status ? 'success' : 'error'
    //       if (res.data.status) {
    //         this.showNext = false
    //         if (typeof res.data.data === 'string') {
    //           this.$message({
    //             showClose: true,
    //             message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
    //             type: type
    //           })
    //         } else {
    //           this.getForm.custUsername = res.data.data.custUsername
    //           this.getForm.custId = res.data.data.custId
    //           this.$message({
    //             showClose: true,
    //             message: res.data.data.message ? res.data.data.message : res.data.msg,
    //             type: type
    //           })
    //         }
    //         callback()
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     }).catch(err => {
    //       console.log(err)
    //       callback(new Error(err))
    //     })
    //     callback()
    //   }
    // }

    // 验证验证码
    let verifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`验证码不能为空`))
      } else {
        console.log(value.length)
        callback()
      }
    }

    // 验证新密码函数
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`新密码不能为空`))
      } else {
        this.axios.post('/cust/check', {
          key: 'custPassword',
          value: value
        }).then(res => {
          if (res.data.status) {
            if (this.getForm.confirmPassword !== '') {
              this.$refs.getForm.validateField('confirmPassword')
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
    // 验证确认密码函数
    let validatePass2 = (rule, value, callback) => {
      let _this = this
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== _this.getForm.custPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      step: 0,
      word: '发送验证码',
      btntype: 'primary',
      showCheckBtn: true, // 显示发送验证码按钮
      // showNext: true, // 显示下一步
      isOvertime: false,
      isPassShow: false, // 密码提示信息显示
      pShow: false, // 密码是否可见
      pcShow: false, // 密码确认是是否可见
      note: '修改成功', // 修改成功或失败信息提示
      times: null, // 定时器
      // time: 60,
      backTime: 60, // 倒计时
      textColor: true,
      getForm: {
        contactPhone: '', // 手机号码
        verificationCode: '', // 验证码
        custId: '', // 用户ID
        custUsername: '', // 登录名
        custPassword: '', // 新密码
        confirmPassword: '' // 确认密码
      },
      rulesOne: {
        // 手机号校验
        contactPhone: [
          {required: true, message: '手机号不能为空', trigger: 'change'},
          {validator: verifyPhone, trigger: 'change'}
        ],
        // 验证码校验
        verificationCode: [
          {required: true, message: '请输入验证码', trigger: 'change'},
          {validator: verifyCode, trigger: 'change'}
        ]
      },
      rulesTwo: {
        custPassword: [
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          {required: true, message: '密码确认不能为空', trigger: 'blur'},
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 上一页
    prevHandle: prevHandle,
    // 下一页
    nextHandle: nextHandle,
    // 可见修改
    handlePShowChange: handlePShowChange,
    // 显示密码提示信息
    passFocus: passFocus,
    //  隐藏密码提示信息
    passBlur: passBlur,
    // 提交
    subHandle: subHandle,
    sendMessage: sendMessage,
    // 验证码失去焦点调用接口
    // verifyCode: verifyCode,
    // 验证手机号是否存在
    // verifyPhone: verifyPhone,
    // 发送验证码
    // 路由跳转,跳转到登录页面
    goLogin () {
      this.$router.push({
        name: 'Login' // 跳转到登录
      })
    }
  }
}
// 发送验证码
function sendMessage () {
  let phoneRegExp = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  if (this.isOvertime || !phoneRegExp.test(this.getForm.contactPhone)) {
    this.$message.error('请输入正确的手机号')
    return false
  }
  this.axios.post('/cust/toverificationCode.do', { contactPhone: this.getForm.contactPhone }).then(res => {
    let type = res.data.status ? 'success' : 'error'
    if (res.data.status) {
      let that = this
      let time = 60
      this.btntype = 'default'
      // 发送验证码成功弹出提示用户
      this.$message({
        showClose: true,
        message: res.data.data,
        type: type
      })
      var sendTimer = setInterval(function () {
        that.isOvertime = true
        time--
        that.word = '重新发送' + time + 's'
        that.showCheckBtn = true
        if (time < 0) {
          // that.time = 60
          that.isOvertime = false
          that.btntype = 'primary'
          clearInterval(sendTimer)
          that.showCheckBtn = false
          that.word = '获取验证码'
        }
      }, 1000)
    } else {
      this.$message.error(res.data.msg)
    }
  })
}
// 上一页函数
function prevHandle (formName) {
  this.step = this.step > 0 ? this.step - 1 : this.step
}
// 下一页函数
function nextHandle (formName) {
  // 校验操作
  this.$refs[formName].validate((valid) => {
    if (valid) {
      // 校验码去调接口获取登录名
      this.axios.post('/cust/validVerificationCode.do', {contactPhone: this.getForm.contactPhone, verificationCode: this.getForm.verificationCode}).then(res => {
        let type = res.data.status ? 'success' : 'error'
        if (res.data.status) {
          // 校验成功显示下一步骤
          this.step = this.step < 2 ? this.step + 1 : this.step
          if (typeof res.data.data === 'string') {
            this.getForm.custUsername = res.data.data.custUsername
            this.getForm.custId = res.data.data.custId
            this.$message({
              showClose: true,
              message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
              type: type
            })
          } else {
            this.getForm.custUsername = res.data.data.custUsername
            this.getForm.custId = res.data.data.custId
            this.$message({
              showClose: true,
              message: res.data.data.message ? res.data.data.message : res.data.msg,
              type: type
            })
          }
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  })
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
// 提交
function subHandle (formName) {
  clearInterval(this.times)
  this.$refs[formName].validate((valid) => {
    if (valid) {
      let param = {
        custId: this.getForm.custId,
        verificationCode: this.getForm.verificationCode,
        custPassword: this.getForm.custPassword,
        confirmPassword: this.getForm.confirmPassword
      }
      this.axios.post('/cust/updatePassword.do', param).then(res => {
        let type = res.data.status ? 'success' : 'error'
        // this.textColor = res.data.status ? 'true' : 'false'
        if (res.data.status) {
          this.step = 2
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
          // 定时器60秒后返回到登录页面
          this.times = setInterval(() => {
            this.backTime--
            if (this.backTime === 0) {
              this.backTime = 0
              clearInterval(this.times)
              this.$router.push({
                name: 'Login' // 跳转到登录
              })
            }
          }, 1000)
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
