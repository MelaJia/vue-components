<template>
  <div>
    <!--修改密码-->
    <modify-pass :visibleP.sync="modifyVisible" :tel="tel" :pass="pass"></modify-pass>
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
      <!--公司信息弹框-->
      <section v-if="step==2" class="logininfo">
        <header class="title">
          <h4>登录成功,请选择您要登录的公司</h4>
        </header>
        <div class="cmpList">
          <el-radio-group v-model="singleCompany" v-for="(item, index) in companyList" :key="index" @change="singelCheck(item)">
            <el-radio :label="item.Name"></el-radio>
          </el-radio-group>
        </div>
      </section>
      <!--用户供应商名不存在弹出框创建账号密码-->
      <section v-if="step==3" class="loginInfo">
        <p>未查到供应商代码,请输入账号名称,为您创建账号</p>
        <div class="ipt-group">
          <label for="">账号:</label><input type="text" autocomplete="off" v-model="inputUser" class="text" placeholder="请输入账户">
        </div>
        <footer>
          <el-button type="danger" class="thirdLogin" :loading="loginLoading2" @click="confirmButton">确定</el-button>
        </footer>
      </section>
      <!--登录成功弹出我知道了的信息-->
      <section v-if="step==4" class="loginInfo">
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
  </div>
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

.loginInfo .ipt-group input.text {
  padding: 17px 15px;
  margin-left: 4px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  height: 15px;
  line-height: 15px;
  color: #666;
  width: 230px;
  text-indent: 0;
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
.cmpList {
  .el-radio {
    margin-bottom: 10px;
  }
  .el-radio-group{
    display:block;
  }
}
</style>

<script>
// import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import ModifyPass from '@/page/ModifyPass'
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
      loginLoading2: false,
      checked: false, // 协议是否选中
      innerVisible: false, // 点击我已阅读协议的弹框
      modifyVisible: false,
      userInfo: {}, // 用户信息
      companyInfo: {}, // 公司信息
      singleCompany: '',
      companyList: [],
      inputUser: '', // 输入的账号
      dataInfo: {},
      secretPwd: '', // 加密密码
      details: {},
      tel: null, // 账号
      pass: null, // 密码
      step: 1,
      company: {
        corp: '',
        custName: '',
        user: '',
        vendorCode: ''
      },
      pdfUrl: `/upload/pdf/JuXinProtocol/JuXinProtocolService.pdf` // 服务协议文件地址
    }
  },
  components: {
    ModifyPass
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
      this.singleCompany = ''
      this.inputUser = ''
    },
    showModity () {
      this.modifyVisible = true
    },
    // 点击修改密码跳到修改页面
    goToModifyPass () {
      if (this.checked) {
        let dataInfo = {
          flag: this.flags,
          phone: this.returnThirdPhone,
          secretPwd: this.secretPwd
        }
        this.$emit('thirdLogin', dataInfo, true)
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
          if (res.data.status) {
            if (res.data.data.thirdLoginRes.length === 0) { // 返回的公司信息是0,则报弹框信息
              this.$message.error(res.data.msg)
            } else if (res.data.data.thirdLoginRes.length === 1) { // 返回的公司为一，则获取公司信息
              let companylist = res.data.data.thirdLoginRes
              this.companyInfo = companylist[0]
              this.userInfo = res.data.data.user
              this.checkCompany(this.companyInfo, this.userInfo)
            } else {
              this.companyList = res.data.data.thirdLoginRes
              this.userInfo = res.data.data.user
              this.step = 2
            }
            this.loginLoading = false
          } else {
            this.$message.error(res.data.msg)
            this.loginLoading = false
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
    // 点击单选,选择公司
    singelCheck (item) {
      this.companyInfo = item
      this.checkCompany(this.companyInfo, this.userInfo)
    },
    // 调用检查供应商代码是否存在接口
    checkCompany (company, user) {
      this.axios.post('/login/checkVendorCode', {
        user: user,
        corp: company
      }).then(res => {
        if (res.data.status) {
          if (res.data.data.custName === '' || res.data.data.custName === null || res.data.data.custName === undefined) {
            this.step = 3
            this.company.corp = res.data.data.corp
            this.company.user = res.data.data.user
            this.company.vendorCode = res.data.data.vendorCode
          } else {
            let corp2 = res.data.data.corp
            let custName2 = res.data.data.custName
            let user2 = res.data.data.user
            let vendorCode2 = res.data.data.vendorCode
            this.establishUser(corp2, custName2, user2, vendorCode2)
          }
          this.details = res.data.data.user
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击确定
    confirmButton () {
      if (this.inputUser === '') {
        this.$message({
          type: 'warning',
          message: '账号不能为空'
        })
      } else {
        this.company.custName = this.inputUser
        this.axios.post('/cust/check', {
          key: 'custUsername',
          value: this.inputUser
        }).then(res => {
          if (res.data.status) {
            this.establishUser(this.company.corp, this.company.custName, this.company.user, this.company.vendorCode)
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 创建账号密码
    establishUser (corp, custName, user, vendorCode) {
      this.loginLoading2 = true
      this.axios.post('/login/choosedCompanyLogin', {
        corp: corp,
        custName: custName,
        user: user,
        vendorCode: vendorCode
      }).then(res => {
        if (res.data.status) {
          if (res.data.data.exist) {
            this.dataInfo = {
              flag: res.data.data.flag,
              phone: res.data.data.phone,
              secretPwd: res.data.data.secretPwd
            }
            this.$emit('thirdLogin', this.dataInfo)
          } else {
            this.step = 4
            this.returnThirdPhone = res.data.data.phone
            this.returnThirdPass = res.data.data.password
            this.flags = res.data.data.flag
            this.secretPwd = res.data.data.secretPwd
            this.exists = res.data.data.exist
            this.tel = Object.assign(this.details, res.data.data).tel
            this.pass = Object.assign(this.details, res.data.data).password
          }
          this.loginLoading2 = false
        } else {
          this.loginLoading2 = false
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.loginLoading2 = false
        console.log(err)
      })
    },
    // 我知道了点击跳转到首页
    knowBtn () {
      if (this.checked) {
        this.visibleP = false
        this.loginLoading1 = true
        this.dataInfo = {
          flag: this.flags,
          phone: this.returnThirdPhone,
          secretPwd: this.secretPwd
        }
        this.$emit('thirdLogin', this.dataInfo)
        this.loginLoading1 = false
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
