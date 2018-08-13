<template>
  <section>
    <!-- 页头 start -->
    <div class="header">
      <div class="wrapper clearfix">
        <a href="#" class="logo">
          <img src="@/assets/img/login/pread_03.png" alt="">
        </a>
        <div class="phone">
          <!--<a href="#" class="backhome">返回首页</a>-->
          <p>财富热线：
            <span class="hotLine">13424348719</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 页头 end -->

    <div class="bigPicture">
      <!-- index_focus end -->
        <form action="" ref="ruleForm" id="register_form">
          <div class="register" id="div_register1">
            <!--登录失败提示-->
            <el-alert class="loginError" v-if="loginError"
                :title="loginErrorInfo"
                type="error"
                show-icon>
            </el-alert>
            <p class="title">登录</p>
            <div class="iptContext">
              <div class="ipt-group">
                <i class="icon-ipt-phone iconfont icon-yonghuming" :class="iptPhoneLight?'light': ''"></i>
                <input type="text" autocomplete="off" v-model="ruleForm.phone" class="text iptphone" @focus="iptPhoneLight=true" @blur="iptPhoneLight=false">
              </div>
              <div class="ipt-group">
                <i class="icon-ipt-pwd iconfont icon-mimaicon" :class="iptPWDLight?'light': ''"></i>
                <input type="password" autocomplete="off" maxlength="20" v-model="ruleForm.pass" class="text iptpassword" ref="input" placeholder="8-20位数字与字母组合的密码" @focus="iptPWDLight=true" @blur="iptPWDLight=false">
              </div>
              <div class="ipt-group picture">
                <input type="text" autocomplete="off" class="text iptviste" name="ipt_renewal" v-model="verify" id="ipt_renewal" onKeyDown="if(event.keyCode===32) return false" placeholder="图形验证" maxlength="4" @input="visteChange">
                <i class="icon-viste" :class="getVisteClass"></i>
                <div class="imgviste" @click="visteFresh">
                  <i hidden :src="getImgUrl"></i>
                  <img class="renewal" :src="verImgUrl" id="imgCode" alt="点击刷新">
                  <span class="renewal">看不清，换一张</span>
                </div>
                <em class="error">{{visteError}}</em>
              </div>
              <div class="btnGroup">
                <el-button type="button" id="register" class="btnRed" @click.stop="submitForm('ruleForm')" :loading="loginLoading">登录</el-button>
              </div>
              <p class="account">如果没有账号，请
                <router-link to="/register" class="red">注册</router-link>
              </p>
            </div>
          </div>
        </form>
    </div>

    <!-- 数据总览 start -->
    <div class="dataTotal dataCase clearfix">
      <div class="wrapper clearfix">

        <div class="detailGroup clearfix">
          <div class="dataGroup clearfix">
            <div class="img img1"></div>
            <div class="data">
              <i>累计成交(元)</i>
              <!--<h3><big>122亿</big>795万4196元</h3>-->
              <h3 id="pf_money">
                <big>132亿</big>9241万6998.09元</h3>
            </div>
          </div>
          <div class="dataGroup dataGroup2 clearfix">
            <div class="img img2"></div>
            <div class="data">
              <i>累计注册人数(人)</i>
              <!--<h3><big>483万</big>5981人</h3>-->
              <h3 id="pf_user">
                <big>47万</big>8071人</h3>
            </div>
          </div>
          <div class="dataGroup dataGroup3 clearfix">
            <div class="img img3"></div>
            <div class="data">
              <i>运营天数(天)</i>
              <!--<h3><big>1492天</big></h3>-->
              <h3 id="pf_day">
                <big>1450天</big>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 数据总览 end -->
    <div class="activeFotter" style="background: #03022e ">
      <p class="daBG">
        <span><img src="@/assets/img/login/iconJY.png" />Copyright © {{getYear}} 钜亿科技(深圳)有限公司</span>
        <span>深圳市龙华新区</span>
      <span>服务热线：0755-66838888-25806</span>
      </p>

    </div>
  </section>

</template>
<style lang="scss" scoped>
@import "@/assets/css/_login.scss";
.section-login {
  margin: 100px 50px;
}
.el-button:focus,
.el-button:hover {
  color: white;
}
.loginError {
  height: 40px;
}
.ipt-group {
  position: relative;
}
.icon-ipt-phone {
  font-size: 24px;
  position: absolute;
  left: 10px;
  top: 10px;
}
.icon-ipt-pwd {
  font-size: 24px;
  position: absolute;
  left: 10px;
  top: 10px;
}
.icon-viste {
  position: absolute;
  top: 17px;
  left: 160px;
}
// 验证码错误
.el-icon-error {
  color: #ff0000;
}
// 验证码正确
.el-icon-success {
  color: #67c23a;
}
.iconfont.light {
  color: #81bcf9;
}
</style>

<script>
import * as types from '@/store/types'
import InputPhone from '@/components/Items/InputPhone'
import InputPass from '@/components/Items/InputPass'
import Roles from '@/config/roles'
import { apiUrl } from '@/config/env.js'
import { randomLenNum } from '@/util/util'
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
      ruleForm: {
        phone: '',
        pass: ''
      }
    }
  },
  components: {
    InputPhone,
    InputPass
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
  methods: {
    submitForm: submitForm,
    // 验证码验证
    handleCheckViste: handleCheckViste,
    // 刷新验证码
    visteFresh: visteFresh,
    // 验证码编辑
    visteChange: visteReset
  }
}
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
async function submitForm (formName) {
  if (this.isVerify !== 1) {
    await this.handleCheckViste()
    // 验证失败
    if (this.isVerify !== 1) {
      return
    }
  }
  // 验证成功
  // 登录前清除信息
  this.$store.commit(types.LOGOUT)
  this.$store.commit('DEL_ALL_TAG')
  this.loginLoading = true // 登录中
  let param = {
    phone: this.ruleForm.phone,
    password: this.ruleForm.pass,
    kaptcha: this.verify
  }
  if (process.env.NODE_ENV === 'development') { // 调试环境
    let res = {
      data: { status: 1, token: 'af49abde71a27624164324aedf29f8d4f2de915c2ebff6b214db9ee34c215abd', custType: 2, custNickname: '阿拉斯加大型犬' }
    }
    if (res.data.status) {
      this.$store.commit(types.LOGIN, res.data.token)
      this.$store.commit(types.SETROLE, res.data.custType)
      this.$store.commit('SET_UINFO', {
        nickName: res.data.custNickname
      }) // 保存用户信息
      this.$store.commit('SET_TAG_WEL', {
        label: '首页',
        value: Roles[res.data.custType].layout
      })
      let redirect = decodeURIComponent(this.$route.query.redirect || '/')
      this.$router.push({
        path: redirect
      })
    } else {
      this.$message({
        showClose: true,
        message: res.data.msg,
        type: 'error'
      })
    }
  } else { // 正式环境
    this.axios.post('/login/checkLogin2', param).then(res => {
      this.loginLoading = false // 登录完成
      if (res.data.status === '1') {
        this.$store.commit(types.LOGIN, res.data.token)
        this.$store.commit(types.SETROLE, res.data.custType)
        this.$store.commit('SET_UINFO', {
          nickName: res.data.custNickname
        }) // 保存用户信息
        this.$store.commit('SET_TAG_WEL', {
          label: '首页',
          value: Roles[res.data.custType].layout
        })
        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
        this.$router.push({
          path: redirect
        })
      } else {
        this.loginError = true
        this.loginErrorInfo = res.data.msg
        // 重置验证码
        this.isVerify = -1
      }
    }).catch(err => {
      this.loginLoading = false // 登录失败
      this.loginError = true
      this.loginErrorInfo = err
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
</script>
