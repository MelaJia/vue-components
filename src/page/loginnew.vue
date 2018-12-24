<template>
  <article>
    <!--亿签网弹框-->
    <third-login :visi.sync="dialogVisible" @thirdLogin="getThirdLogin"></third-login>
      <header class="top-container flex-between">
          <img src="@/assets/img/img/PCindex_03.png" />
          <ul class="nav flex-self">
            <li class="nav-item">
                <a class="nav-link" href="#">首页</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">平台优势</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">平台业务</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">平台特点</a>
              </li>
          </ul>
        </header>
        <div>
          <div class="content-one">
            <div class="content-container">
              <div class="login-box">
                <form>
                  <!--登录失败提示-->
                  <section>
                    <el-alert class="loginError" v-if="loginError"
                        :title="loginErrorInfo"
                        type="error"
                        :closable="false"
                        show-icon>
                    </el-alert>
                  </section>
                  <section>
                    <div class="ipt-group">
                      <!-- <i class="icon-ipt-phone iconfont icon-yonghuming" :class="iptPhoneLight?'light': ''"></i> -->
                      <input type="text" autocomplete="off" v-model="ruleForm.phone" class="text iptphone" placeholder="用户名" @focus="iptPhoneLight=true" @blur="loginError=iptPhoneLight=false">
                    </div>
                    <div class="ipt-group">
                      <!-- <i class="icon-ipt-pwd iconfont icon-mimaicon" :class="iptPWDLight?'light': ''"></i> -->
                      <input type="password" autocomplete="new-password" maxlength="20" v-model="ruleForm.pass" class="text iptpassword" ref="input" placeholder="8-20位数字与字母组合的密码" @focus="iptPWDLight=true" @blur="loginError=iptPWDLight=false">
                    </div>
                    <div class="ipt-group picture">
                      <input type="text" autocomplete="off" class="text iptviste" name="ipt_renewal" v-model="verify" id="ipt_renewal" onKeyDown="if(event.keyCode===32) return false" @keyup.enter="submitForm('ruleForm')"  placeholder="验证码" maxlength="4" @input="visteChange">
                      <i class="icon-viste" :class="getVisteClass" @click="handleDelete"></i>
                      <div class="imgviste" @click="visteFresh">
                        <i hidden :src="getImgUrl"></i>
                        <img class="renewal" :src="verImgUrl" id="imgCode" alt="点击刷新">
                        <span class="renewal">看不清，换一张</span>
                      </div>
                      <em class="error">{{visteError}}</em>
                    </div>
                    <div class="btnGroup">
                      <el-button type="button" id="register" class="btnRed" @click.stop="submitForm()" :loading="loginLoading">立即登录</el-button>
                    </div>
                    <p class="account">
                      <router-link to="/forget" class="gray forgetPassword">忘记密码</router-link>
                      <router-link to="/register" class="gray register">注册</router-link>
                    </p>
                    <p class="cooperation">
                      <span class="gray" style="color:#666;">&gt;使用合作账号登录:</span>
                      <a href="javascript:;"><img src="@/assets/img/login/1.png" width="45" height="30" alt="" @click="thirdLogin"></a>
                    </p>
                  </section>
                </form>
              </div>
            </div>
          </div>
          <div class="content-two">
            <div class="center-container flex-between">
              <div class="info">
                <img src="@/assets/img/img/PCindex22_08.png" />
                <div class="scroll">
                  <span>钜信网新版上线啦  钜信网(供应链金融)是以商业银行...</span>
                </div>
              </div>
              <div class="info-more"><a href="#">更多></a></div>
            </div>
          </div>
          <div class="content-three center-container">
            <div class="flex-around">
              <div class="flex-left">
                <img class="img-total" src="@/assets/img/img/PCindex_08.png" />
                <div>
                  <div class="num-total">133亿+</div>
                  <div class="text-total">累计成交</div>
                </div>
              </div>
              <div class="flex-left">
                <img class="img-total" src="@/assets/img/img/PCindex_08.png" />
                <div>
                  <div class="num-total">48万+</div>
                  <div class="text-total">累计注册人数</div>
                </div>
              </div>
              <div class="flex-left">
                <img class="img-total" src="@/assets/img/img/PCindex_08.png" />
                <div>
                  <div class="num-total">1450天+</div>
                  <div class="text-total">运营天数</div>
                </div>
              </div>
            </div>
            <div class="text-info">
              <p>钜信网(供应链金融)是以商业银行根据产业特点，围绕供应链上核心企业，<br/>
                基于交易过程向核心企业和其上下游相关企业提供的综合金融服务。<br/>
                以核心企业为基准创建"１＋Ｎ"或"Ｍ＋１＋Ｎ"的金融服务模式；<br/>
                关注交易过程，整合物流、信息流和资金流；根据产业特点，跨行业的提供金融服务。</p>
            </div>
          </div>
          <div class="content-four">
            <div class="center-container">
              <div class="flex-between">
                <img src="@/assets/img/img/PCindex_18.jpg" />
                <img src="@/assets/img/img/PCindex_20.jpg" />
                <img src="@/assets/img/img/PCindex_22.jpg" />
              </div>
            </div>
          </div>
          <div class="content-five">
            <div class="center-container">
              <div class="title-item">平台业务
                <div class="underline">__</div>
              </div>
              <div class="flex-between-start">
                <div class="item">
                  <img src="@/assets/img/img/PCindex_28.png" />
                  <div class="text-introduce">信用融资</div>
                  <div class="text-info">根据供应商历史交易数据大数据分析对供应商进行评级，由资金方确认后给予该公司一定的授信额度，供应商可根据额度进行融资申请，资金方审核后放款。</div>
                </div>
                <div class="item">
                  <img src="@/assets/img/img/PCindex_30.png" />
                  <div class="text-introduce">订单融资</div>
                  <div class="text-info">与信用融资类似，根据供应商历史交易数据大数据分析对供应商进行评级，由资金方确认后给予该公司一定的授信额度，供应商可根据额度进行融资申请，资金方审核后放款。</div>
                </div>
                <div class="item">
                  <img src="@/assets/img/img/index_32.png" />
                  <div class="text-introduce">结报融资</div>
                  <div class="text-info">使用应收账款进行融资申请，钜信网提供应收账款凭证并出具对应信用报告，资金方根据系统数据对供应商融资申请进行核实放款，并在线签署合约。</div>
                </div>
                <div class="item">
                  <img src="@/assets/img/img/PCindex_34.png" />
                  <div class="text-introduce">票据转让</div>
                  <div class="text-info">传统供应链金融仅勉强解决一级供应商融资需求，所以其它供应商怎么办？钜信网可实现债权转让付款承诺，分别是可拆分、可流转、可融资、可持有到期。</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-six">
            <div class="center-container">
              钜信网引入区块链&nbsp;共同维护&nbsp;多中心 &nbsp;不可篡改 &nbsp;安全可信  &nbsp;可编程
            </div>
          </div>
          <div class="content-seven">
            <div class="center-container">
              为什么选择我们
              <div class="underline">__</div>
            </div>
          </div>
        </div>
        <footer>
          <div class="center-container flex-between">
            <div>
                <h2>钜信网 让企业融资更高效</h2>
                <h3>财富热线：13424348719</h3>
                <h4>联系我们： 广东省 深圳市 龙华新区东环二路富士康园区</h4>
                <h4>Phone:   +86 186-1719-5438</h4>
                <h4>Email:   joe.kj.ho@minmaxtec.com</h4>
            </div>
            <div class="right"><img src="@/assets/img/img/PCindex_44.jpg" /></div>
          </div>
          <div class="last-footer">
            <div class="center-container">
              <img class="logo" src="@/assets/img/img/iconJY.png" />钜亿科技(深圳)有限公司 版权所有 © Copyright 2018. All Rights Reserved. 粤ICP备13021698号 深圳市龙华新区 服务热线：0755-66838888-25806
            </div>
          </div>
        </footer>
  </article>
</template>
<style  scoped>
/* 顶部导航 */
ul.nav.flex-self li {
  display: inline-block;
}
.nav-link {
  padding: 0.5rem 1rem;
  color: #000;
  text-decoration: none;
  font-weight: 330;
  font-size: 22px;
}
.center-container {
  width: 1200px;
  margin: 0 auto;
}
.top-container {
  width: 1200px;
  margin: 0 auto;
  height: 100px;
}
.content-one {
  margin: 0 auto;
  background-image: url("~@/assets/img/img/PCindex_05.jpg");
  background-position-x: center;
  height: 600px;
}
.login-box {
  width: 305px;
  background-color: #ffffff;
  margin: 85px 50px 75px 0px;
  padding: 60px 30px 30px 30px;
  border-radius: 5px;
}
.content-container {
  display: flex;
  justify-content: flex-end;
  width: 1200px;
  margin: 0 auto;
}
/* 喇叭区域 */
.info img {
  float: left;
}
.info-more {
  float: right;
  margin-top: -23px;
}
.info-more a {
  color: #6c757d;
  text-decoration: none;
}
.flex-self {
  margin: -50px 0 0 680px;
}
.img-code {
  width: 85px;
  height: 38px;
  margin-left: 15px;
  border-radius: 5px;
}
.btn-primary {
  width: 70%;
  border-radius: 25px;
  margin-left: 15%;
  margin-top: 15px;
  margin-bottom: 10px;
}
.img-code-barter {
  text-align: right;
  font-size: 0.7rem;
  margin-top: -18px;
}
.form-control {
  border: 0px solid #ced4da;
  background-color: #e9ecef;
}
.input-group-text {
  border: 0px solid #ced4da;
}
.input-group > .custom-select:not(:last-child),
.input-group > .form-control:not(:last-child) {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.mb-3,
.my-3 {
  margin-bottom: 1.2rem !important;
}
.content-two {
  background-color: #f5f6f8;
  padding-top: 5px;
  padding-bottom: 5px;
}
.flex-left {
  display: flex;
  justify-content: center;
  border-right: 1px solid #d6d6d9;
  width: 33%;
}
.flex-left .img-total {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.num-total {
  font-size: 36px;
  color: #3e6599;
  font-weight: 500;
}
.text-total {
  font-size: 24px;
  color: #868686;
}
.flex-around {
  display: flex;
  justify-content: space-around;
}
.content-three .flex-around {
  margin: 50px 0px;
}
.content-three .flex-left:last-child {
  border-right: 0px solid #d6d6d9;
}
.content-three .text-info {
  text-align: center;
  color: #747474 !important;
  margin-bottom: 50px;
}
.content-four {
  background-image: url("~@/assets/img/img/PCindex_17.jpg");
  background-size: 1920px 100%;
  background-position-x: center;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 35px;
}
.content-four .flex-between {
  margin-top: 160px;
  margin-bottom: 50px;
}
.content-five .item {
  text-align: center;
  width: 250px;
}
.content-five .text-info {
  width: 250px;
  color: #808080 !important;
  line-height: 30px;
  text-align: left;
}
.content-five .text-introduce {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 10px 0;
}
.content-five .title-item {
  text-align: center;
  margin: 70px 0px;
  font-size: 2rem;
}
.underline {
  margin-top: -30px;
}
.flex-between-start {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.content-five .center-container {
  margin-bottom: 50px;
}
.content-six {
  background-image: url("~@/assets/img/img/PCindex_40.jpg");
  background-size: 1920px 100%;
  background-position-x: center;
  height: 120px;
  max-height: 139px;
  display: flex;
  align-items: center;
}
.content-six .center-container {
  text-align: center;
  font-size: 2rem;
  color: #ffffff;
}
.content-seven {
  background-image: url("~@/assets/img/img/PCindex_41.jpg");
  background-size: 1920px 100%;
  background-position-x: center;
  height: 500px;
  max-height: 588px;
}
.content-seven .center-container {
  text-align: center;
  font-size: 2rem;
  padding-top: 70px;
}
footer {
  background-color: #33383b;
  color: #ffffff;
  padding-top: 30px;
}
/* 底部布局 */
footer .flex-between > div {
  display: inline-block;
  width: 440px;
  color: #aaacab;
  margin-bottom: 30px;
}
footer h2 {
  margin-bottom: 20px;
  padding-bottom: 30px;
  color: #fff;
  border-bottom: 1px solid #787979;
  font-size: 34px;
  font-weight: 400;
}
footer h3 {
  font-size: 28px;
  color: #aaacab;
  font-weight: 500;
  margin-bottom: 10px;
}
footer h4 {
  margin: 0;
  margin-bottom: 5px;
}
footer .flex-between .right {
  margin-left: 300px;
}
footer .flex-between .right img {
  margin-bottom: -40px;
}
.last-footer {
  text-align: center;
  background-color: #202125;
  padding-top: 15px;
  padding-bottom: 15px;
}
.last-footer .center-container {
  color: #515254;
  font-size: 16px;
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
  width: 270px;
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
/* 验证码 */
.ipt-group .iptviste {
  width: 156px !important;
  background: url("~@/assets/img/img/code-img.png") no-repeat;
  background-position: 10px 8px;
}
.ipt-group .imgviste img {
  width: 100px;
  height: 41px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}
.ipt-group .imgviste {
  display: inline-block;
  float: right;
  cursor: pointer;
}
.ipt-group .imgviste span {
  font-size: 12px;
  color: #666;
  cursor: pointer;
  display: block;
}
.btnGroup {
  text-align: center;
  margin-top: 40px;
}
.btnGroup button {
  background: #3f97f8;
  width: 200px;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  border-radius: 50px;
}
a.gray {
  color: #6c757d;
}
a.gray.register {
  float: right;
}
/* 底部logo */
.logo {
  margin: 0 0 -7px 0;
}
.scroll {
  width: 400px;
  height: 23px;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 40px;
  position: relative;
}
.scroll > span {
  position: absolute;
}
</style>
<script>
import * as types from '@/store/types'
import InputPhone from '@/components/Items/InputPhone'
import InputPass from '@/components/Items/InputPass'
import ThirdLogin from '@/page/ThirdLogin'
import Roles from '@/config/roles'
import { apiUrl } from '@/config/env.js'
import { randomLenNum, debounce } from '@/util/util'
export default {
  data () {
    return {
      verImgUrl: `${apiUrl}/kaptcha/getKaptchaImage`,
      verify: '',
      isVerify: -1, // -1 未输出 0 验证失败 1 验证成功
      visteError: '', // 滑块验证错误信息显示
      loginLoading: false, // 登录加载中
      loginError: false, // 登录失败显示
      loginErrorInfo: '', // 登录信息失败提示
      iptPhoneLight: false, // 用户名高亮
      iptPWDLight: false, // 密码高亮
      dialogVisible: false, // 亿签网弹框
      ruleForm: {
        phone: '',
        pass: ''
      }
    }
  },
  components: {
    InputPhone,
    InputPass,
    ThirdLogin
  },
  computed: {
    // 获取年
    getYear () {
      let time = new Date()
      return time.getFullYear()
    },
    // 验证码
    getVisteClass () {
      return {
        'el-icon-success': this.isVerify === 1,
        'el-icon-error': this.isVerify === 0
      }
    },
    getImgUrl: getImgUrl
  },
  mounted () {
    // 滚动字幕
    bindMouseEvent()
    roll()
    // 协议生成
    this.axios.post('/login/juXinProtocol').then(res => {
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    submitForm: debounce(submitForm, 1000, true),
    // 验证码验证
    handleCheckViste: handleCheckViste,
    // 刷新验证码
    visteFresh: visteFresh,
    // 验证码编辑
    visteChange: visteReset,
    // 删除验证码
    handleDelete: visteDelete,
    // 亿签网登陆
    thirdLogin () {
      this.dialogVisible = true
    },
    getThirdLogin (dataInfo) {
      console.log(dataInfo)
      this.submitForm(dataInfo)
    }
  }
}
let menuArr = [] // 菜单数组
let menuNameArr = [] // 菜单名称数组
function getImgUrl () {
  let random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, 4)
  random = random + Date.now()
  this.verImgUrl = `${apiUrl}/kaptcha/getKaptchaImage?${random}`
  return `${apiUrl}/kaptcha/getKaptchaImage?${random}`
}
async function handleCheckViste () {
  if (this.verify.length !== 4) {
    // 长度不够
    this.isVerify = 0
    this.visteError = this.verify.length === 0 ? '验证码不能为空' : '验证码错误,请重新输入'
    return
  }
  try {
    let res = await this.axios.post('/kaptcha/getinspectKaptchaImage', { kaptcha: this.verify })
    if (res.data.status) {
      // 验证成功
      this.isVerify = 1
      this.visteError = ''
    } else {
      // 验证失败
      this.isVerify = 0
      this.visteError = res.data.msg
    }
  } catch (error) {
    console.log(error)
  }
}
async function submitForm (formData = null) {
  if (this.loginLoading === true) {
    return
  }
  this.loginLoading = true // 登录中
  // if (this.isVerify !== 1) {
  //   await this.handleCheckViste()
  //   // 验证失败
  //   if (this.isVerify !== 1) {
  //     return
  //   }
  // }
  // 验证成功
  // 登录前清除信息
  this.$store.commit(types.LOGOUT)
  this.$store.commit('DEL_ALL_TAG')
  let param = formData && typeof formData === 'object' ? formData : {
    phone: this.ruleForm.phone,
    password: this.ruleForm.pass,
    kaptcha: this.verify
  }
  console.log('登录', param)
  if (process.env.NODE_ENV === 'development') { // 调试环境
    let res = {
      data: { status: 1, msg: '验证码错误', token: 'af49abde71a27624164324aedf29f8d4f2de915c2ebff6b214db9ee34c215abd', custType: 2, custNickname: '阿拉斯加大型犬', legalPhone: '+86-15112663977', contactPhone: '15112663977' }
    }
    let nav = require('@/config/navMenu')[Roles[res.data.custType].model].navItems
    // 菜单处理-开始
    menuArr = []
    menuNameArr = []
    nav = dealMenuDev(nav, Roles[res.data.custType].layout, res.data.custType)
    nav[0].lClass = 'start-line'
    nav[nav.length - 1].lClass = 'end-line'
    console.log(Roles[res.data.custType].layout)
    console.log(nav)
    // 菜单处理-结束
    if (res.data.status === 1) {
      let datas = Object.assign({}, res.data, res.data.data, { navItems: nav })
      this.$store.commit(types.LOGIN, datas.token)
      this.$store.commit(types.SETROLE, datas.custType)
      this.$store.commit('SET_UINFO', datas) // 保存用户信息
      this.$store.commit('SET_NAVITEM', datas.navItems) // 保存菜单
      this.$store.commit('SET_MENU', menuArr) // 保存菜单权限配置 SET_MENU
      this.$store.commit('SET_MENUNAME', menuNameArr) // 保存菜单名称配置 SET_MENUNAME
      this.$store.commit('SET_TAG_WEL', {
        label: '首页',
        value: Roles[datas.custType].layout
      })
      console.log(Roles[datas.custType].layout)
      let redirect = decodeURIComponent(Roles[datas.custType].layout || '/')
      this.$router.push({
        path: redirect
      })
    } else if (res.data.status === 3) {
      // 验证失败
      this.isVerify = 0
      this.visteError = res.data.msg
    } else {
      this.$message({
        showClose: true,
        message: res.data.msg,
        type: 'error'
      })
    }
    this.loginLoading = false // 登录完成
  } else { // 正式环境
    this.axios.post('/login/checkLogin2', param).then(res => {
      if (res.data.status === 1) {
        /** 菜单处理 */
        let navItems = res.data.data.navItems
        menuArr = []
        navItems = dealMenu(navItems)
        navItems[0].lClass = 'start-line'
        navItems[navItems.length - 1].lClass = 'end-line'
        let datas = Object.assign({}, res.data, res.data.data)
        this.$store.commit(types.LOGIN, datas.token)
        this.$store.commit(types.SETROLE, datas.custType)
        this.$store.commit('SET_UINFO', datas) // 保存用户信息
        this.$store.commit('SET_NAVITEM', navItems) // 保存菜单 SET_MENU
        this.$store.commit('SET_MENU', menuArr) // 保存菜单权限配置 SET_MENU
        this.$store.commit('SET_TAG_WEL', {
          label: '首页',
          value: Roles[datas.custType].layout
        })
        let redirect = decodeURIComponent(Roles[datas.custType].layout || '/')
        console.log(redirect)
        this.$router.push({
          path: redirect
        })
      } else if (res.data.status === 3) {
        // 验证失败
        this.isVerify = 0
        this.visteError = res.data.msg
      } else {
        this.loginError = true
        this.loginErrorInfo = res.data.msg
        // 重置验证码
        this.isVerify = -1
      }
      this.loginLoading = false // 登录完成
    }).catch(err => {
      var t = Object.keys(err)
      console.log(err)
      console.log(t)
      console.log(err.response)
      this.loginLoading = false // 登录失败
      this.loginError = true
      this.loginErrorInfo = err.response === undefined ? '服务器错误，请联系管理员' : err.response.status
      // 重置验证码
      this.isVerify = -1
    })
  }
}
function visteFresh () {
  // 刷新验证码
  this.verImgUrl = `${apiUrl}/kaptcha/getKaptchaImage?${randomLenNum(4, true)}`
  // 重置验证码
  visteReset.call(this)
}
// 重置验证码
function visteReset () {
  if (this.isVerify !== -1) {
    this.isVerify = -1
    this.visteError = ''
  }
}
// 删除已输验证码
function visteDelete () {
  this.isVerify = -1
  this.verify = ''
  this.visteError = ''
}
function dealMenu (array, type) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    /** 头部样式 */
    if (!element.menuParent) {
      element.hClass = 'header-circle bg-icon-' + type + '_' + index
    } else {
      element.hClass = 'circle'
    }
    element.lClass = 'line'
    if (element.children) {
      element.children = dealMenu(element.children)
    }
    array[index] = element
    // 存储菜单地址
    if (element.menuUrl && element.menuUrl.length > 0) {
      menuArr.push(element.menuUrl)
    }
  }
  return array
}
// 开发环境
function dealMenuDev (array, prev, type) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    const oelement = Object.assign({}, array[index])
    /** 头部样式 */
    if (!element.menuParent) {
      element.hClass = 'header-circle bg-icon-' + type + '_' + index
    } else {
      element.hClass = 'circle'
    }
    element.lClass = 'line'
    if (element.children) {
      element.children = dealMenuDev(element.children, prev)
    }
    array[index] = element
    // 存储菜单地址
    if (element.menuUrl && element.menuUrl.length > 0) {
      if (element.menuUrl.indexOf('/') === -1) {
        element.menuUrl = `${prev}/${element.menuUrl}`
      }
      menuArr.push(element.menuUrl)
      menuNameArr.push(oelement)
    }
  }
  return array
}
// 字幕滚动变量
var scrollTime = null
var LEN = 400 // 一个完整滚动条的长度
var x = 0
// 启动滚动定时器
function roll () {
  console.log('启动')
  var tag1 = document.querySelector('.scroll>span')
  var tag2 = tag1.nextSibling
  var fun = function () {
    tag1.style.left = x + 'px'
    tag2.style.left = (x + LEN) + 'px'
    x = x - 5
    if ((x + LEN) <= 0) {
      x = 0
    }
  }
  if (scrollTime) {
    clearInterval(scrollTime)
  }
  scrollTime = setInterval(fun, 300)
}
// 绑定鼠标事件
function bindMouseEvent () {
  var el = document.querySelector('.scroll>span')
  var el2 = el.cloneNode(true)
  LEN = el.clientWidth + 100 // 动态修改滚动条的长度
  console.log(LEN)
  el2.style.left = (x + LEN) + 'px'
  el.parentElement.appendChild(el2)
  el.addEventListener('mouseenter', function (e) {
    clearInterval(scrollTime)
  })
  el.addEventListener('mouseleave', function (e) {
    roll()
  })
}
</script>
