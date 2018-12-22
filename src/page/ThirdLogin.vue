<template>
  <el-dialog :visible.sync="visi" :before-close="handleClose" :close-on-click-modal="false" class="contractDialog">
     <!--登录界面信息-->
     <section v-if="step==1">
       <header class="title">
        <img src="@/assets/img/login/2.png" alt="">
      </header>
      <section>
        <div class="ipt-group">
            <input type="text" autocomplete="off" v-model="thirdPhone" class="text iptphone" placeholder="用户名">
          </div>
          <div class="ipt-group">
            <input type="password" autocomplete="new-password" v-model="thirdPass" maxlength="20"  class="text iptpassword" ref="input" placeholder="密码">
          </div>
      </section>
      <footer>
        <el-button type="danger" class="thirdLogin" :loading="loginLoading" @click="thirdLoginBtn">授权并登陆</el-button>
      </footer>
     </section>
     <!--登录成功的信息-->
     <section v-if="step==2" class="loginInfo">
       <header class="title">
         <h4>登录成功</h4>
       </header>
       <section>
         <div class="list">
           <p>已自动为您产生钜信网账号密码:</p>
           <p>账号:<span>{{returnThirdPhone}}</span></p>
           <p>密码:<span>{{returnThirdPass}}</span></p>
         </div>
         <div class="protocol">
           <label for="agree">
              <el-checkbox v-model="checked" @change="selectCheck">我已阅读并同意</el-checkbox>
            </label>
            <a :href="pdfUrl" target="_pdf" id="agreement">《用户注册协议》</a>
         </div>
         <div class="modify">
           <p>请记住该密码或立即<span @click="goToModifyPass">修改密码</span></p>
         </div>
       </section>
       <footer>
        <el-button type="danger" class="thirdLogin" :loading="loginLoading1" @click="knowBtn">我知道了</el-button>
      </footer>
     </section>

     <!--协议弹框-->
     <el-dialog :visible.sync="innerVisible" append-to-body class="protocolAlert">
        <p><strong>【审慎阅读】</strong>您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。<strong>请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。</strong>如您对协议有任何疑问，可向钜信网平台客服咨询。</p>
        <p><strong>【签约动作】</strong>当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与平台达成一致，成为钜信平台“用户”。<strong>阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</strong></p>
        <el-button type="primary" class="confirm" @click="confirmBtn">确定</el-button>
     </el-dialog>
  </el-dialog>
</template>
<style scoped lang="scss">
.title{
  text-align:center;
  margin-bottom:20px;
  img{
    display:block;
    margin:0 auto;
    width:70px;
    height:70px;
  }
}
/* 登录区样式 */
.ipt-group {
  position: relative;
  margin-bottom: 30px;
}
.ipt-group input.text {
  padding: 13px 15px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  height: 15px;
  line-height: 15px;
  color: #666;
  width: 276px;
  text-indent: 35px;
  background-color: #e8e8e8;
}
/* 用户名 */
.ipt-group .iptphone {
  background: url("~@/assets/img/img/username-img.png") no-repeat;
  background-position: 10px 8px;
}
.icon-ipt-phone {
  font-size: 24px;
  position: absolute;
  left: 10px;
  top: 10px;
}
/* 密码 */
.ipt-group .iptpassword {
  background: url("~@/assets/img/img/password-img.png") no-repeat;
  background-position: 10px 8px;
}
.icon-ipt-pwd {
  font-size: 24px;
  position: absolute;
  left: 10px;
  top: 10px;
}
/**登陆按钮**/
.thirdLogin {
  width:96%;
  margin-left:2%;
}

/**登录成功信息**/
.loginInfo{
  .title{
    h4{
      color:#FA5C58;
      font-size:20px;
    }
  }
  .list{
    text-align:center;
    border-bottom:1px dashed #7E7E7E;
  }
  .protocol{
    text-align:center;
    margin:10px 0;
    a{
      color:#666;
    }
  }
  .modify {
    text-align:center;
    span{
      color:#FA6B68;
      text-decoration: underline;
      cursor:pointer;
    }
  }
}
.protocolAlert{
  width:60%;
  margin-left:20%;
  .confirm{
    display:block;
    width:40%;
    margin:0 auto;
  }
}
</style>
<style lang="scss">
.contractDialog{
  .el-dialog{
    width:350px;
    border-radius:14px;
    .el-dialog__body{
      padding: 0 20px 10px;
    }
  }
}
.protocolAlert{
  .el-dialog__body{
    padding: 0 20px 10px;
  }
}
</style>

<script>
// import DialogClose from '@/mixins/suplier/Ar/DialogClose'
/* 合同确认 */
export default {
  // mixins: [DialogClose],
  props: ['visi'],
  data () {
    return {
      thirdPhone: '', // 第三方登陆输入手机
      thirdPass: '', // 第三方登陆输入密码
      returnThirdPhone: '', // 第三方登陆返回的手机
      returnThirdPass: '', // 第三方登陆返回的密码
      flags: '',
      exists: '',
      loginLoading: false, // 登陆状态
      loginLoading1: false, // 登陆状态
      checked: false, // 协议是否选中
      innerVisible: false, // 点击我已阅读协议的弹框s
      dataInfo: {},
      step: 1,
      pdfUrl: `/upload/pdf/JuXinProtocol/JuXinProtocolService.pdf` // 服务协议文件地址
    }
  },
  methods: {
    // 点击我已同意阅读弹框
    selectCheck () {
      this.innerVisible = true
    },
    // 点击协议弹框
    confirmBtn () {
      this.innerVisible = false
    },
    // 关闭弹窗
    handleClose () {
      this.$emit('update:visibleP', false)
      this.$emit('update:visi', false)
      this.step = 1
      this.thirdPhone = ''
      this.thirdPass = ''
      this.checked = false
    },
    // 点击修改密码跳到修改页面
    goToModifyPass () {
      if (this.checked) {
        this.visibleP = false
        this.$router.push({
          name: 'Forgetpassword' // 跳到修改密码页面
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请阅读并同意《用户注册协议》，否则无法使用系统。'
        })
      }
    },
    // 第三方授权登录
    thirdLoginBtn () {
      if (this.thirdPhone === '' || this.thirdPass === '') {
        this.$message.error('用户名或者密码不能为空')
      } else {
        this.loginLoading = true
        this.axios.post('/login/easySignLogin', {
          phone: this.thirdPhone,
          password: this.thirdPass
        }).then(res => {
          if (res.status) {
            if (res.data.data.exist) {
              this.dataInfo = {
                phone: this.thirdPhone,
                password: this.thirdPass,
                flag: res.data.data.flag
              }
              this.$emit('thirdLogin', this.dataInfo)
            } else {
              this.step = 2
              this.returnThirdPhone = res.data.data.phone
              this.returnThirdPass = res.data.data.password
              this.flags = res.data.data.flag
              this.exists = res.data.data.exist
            }
            this.loginLoading = false
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          this.loginLoading = false
          this.$message({
            type: 'error',
            message: err.response === undefined ? '服务器错误，请联系管理员' : err.response.status
          })
        })
      }
    },
    // 我知道了点击跳转到首页
    knowBtn () {
      if (this.checked) {
        this.visibleP = false
        this.loginLoading1 = true
        this.dataInfo = {
          phone: this.returnThirdPhone,
          password: this.returnThirdPass,
          flag: this.flags,
          exist: this.exists
        }
        this.$emit('thirdLogin', this.dataInfo)
      } else {
        this.$message({
          type: 'warning',
          message: '请阅读并同意《用户注册协议》，否则无法使用系统。'
        })
      }
    }
  }
}
</script>
