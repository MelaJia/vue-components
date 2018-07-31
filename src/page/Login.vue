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
          <div class="register" id="div_register1" v-show="!showReg">
            <p class="title">登录</p>
            <div class="iptContext">
              <div class="ipt-group">
                <input type="text" v-model="ruleForm.phone" class="text iptphone">
              </div>
              <div class="ipt-group">
                <input type="password" maxlength="20" v-model="ruleForm.pass" class="text iptpassword" ref="input" placeholder="8-20位数字与字母组合的密码">
              </div>
              <div class="ipt-group picture">
                <verify ref="verifyC" :is-sure="isVerify" @verify-ok="handleVerify"></verify>
                <el-alert v-if="sliderShow"
                  title="请拖动滑块进行验证"
                  type="error">
                </el-alert>
              </div>
              <div class="btnGroup">
                <el-button type="button" id="register" class="btnRed" @click.stop="submitForm('ruleForm')" :loading="loginLoading">登录</el-button>
              </div>
              <p class="account">如果没有账号，请
                <router-link to="/register" class="red">注册</router-link>
              </p>
              <!--登录失败提示-->
              <el-alert v-if="loginError"
                  :title="loginErrorInfo"
                  type="error"
                  show-icon>
              </el-alert>
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
</style>

<script>
import * as types from '@/store/types'
import InputPhone from '@/components/Items/InputPhone'
import InputPass from '@/components/Items/InputPass'
import Verify from '@/components/Items/Verify'
import Roles from '@/config/roles'
export default {
  data () {
    return {
      showReg: false,
      isVerify: false,
      sliderShow: false, // 滑块验证错误信息显示
      loginLoading: false, // 登录加载中
      loginError: false, // 登录失败显示
      loginErrorInfo: '', // 登录信息失败提示
      ruleForm: {
        phone: '',
        pass: ''
      }
    }
  },
  components: {
    InputPhone,
    InputPass,
    Verify
  },
  computed: {
    // 获取年
    getYear () {
      let time = new Date()
      return time.getFullYear()
    }
  },
  methods: {
    submitForm (formName) {
      if (!this.isVerify) {
        this.sliderShow = true
        return
      }
      // 登录前清除信息
      this.$store.commit(types.LOGOUT)
      this.$store.commit('DEL_ALL_TAG')
      this.loginLoading = true // 登录中
      let param = {
        phone: this.ruleForm.phone,
        password: this.ruleForm.pass
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
            this.isVerify = false
            this.$refs.verifyC.reset()
          }
        }).catch(err => {
          this.loginLoading = false // 登录失败
          this.loginError = true
          this.loginErrorInfo = err
          // 重置验证码
          this.isVerify = false
          this.$refs.verifyC.reset()
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 验证条
    handleVerify () {
      this.isVerify = true
      this.sliderShow = false
    }
  }
}

</script>
