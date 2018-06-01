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
            <span class="hotLine">0755-462315</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 页头 end -->

    <div class="bigPicture">
      <!-- index_focus start -->
      <div class="index_focus">

        <!-- substance start -->

        <!-- substance end -->
        <div class="bd">
          <ul style="position: relative;">
            <li style="height: 740px; position: absolute; left: 0px; top: 0px; ">
              <a href="https://www.iqianbang.com/Activity-getnewers?userfrom=sem%7cbaidu%7cpc%7c89171#?userfrom=sem%7cbaidu%7cpc%7c89171"
                target="_blank" class="pic"></a>
            </li>
          </ul>
        </div>

        <div class="slide_nav">
          <a href="javascript:;?userfrom=sem%7cbaidu%7cpc%7c89171" class="on">●</a>
        </div>
      </div>
      <!-- index_focus end -->
      <div class="wrapper">
        <form action="https://www.iqianbang.com/Activity-getnewers?userfrom=sem%7cbaidu%7cpc%7c89171#" ref="ruleForm" id="register_form">
          <div class="register" id="div_register1">
            <p class="title">登录</p>
            <div class="iptContext">
              <div class="ipt-group">
                <input type="text" v-model="ruleForm.phone" class="text iptphone">
                <!-- <input-phone v-model="ruleForm.phone" :classes="'text iptphone'"></input-phone> -->
              </div>
              <div class="ipt-group">
                <input type="password" maxlength="20" v-model="ruleForm.pass" class="text iptpassword" ref="input" placeholder="8-20位数字与字母组合的密码">
                <!-- <input-pass v-model="ruleForm.pass" :classes="'text iptpassword'"></input-pass> -->
              </div>
              <div class="ipt-group picture">
                <verify :is-sure="isVerify" @verify-ok="handleVerify"></verify>
                <el-alert v-if="sliderShow"
                  title="请拖动滑块进行验证"
                  type="error">
                </el-alert>
              </div>
              <div class="iptChoose">
                <label for="agree">
                  <el-checkbox v-model="checked"></el-checkbox>&nbsp;我已阅读并同意
                  <a href="javascript:void (0)?userfrom=sem%7cbaidu%7cpc%7c89171" id="agreement"
                    class="red">《钜信网服务协议》</a>
                <el-alert v-if="checkShow"
                  title="请同意相关协议"
                  type="error">
                </el-alert>
                </label>
              </div>
              <div class="btnGroup">
                <el-button type="button" id="register" class="btn btnRed" @click.stop="submitForm('ruleForm')" :loading="loginLoading">登录</el-button>
              </div>
              <p class="account">如果没有账号，请
                <a @click="showReg=true" class="red"> 注册</a>
              </p>
            </div>
          </div>

          <div class="register" v-show="showReg">
            <p class="title">注册</p>
            <p class="step step1">为了确保账号可用，请填写您收到的手机动态码。</p>
            <p class="step step2">如收不到短信验证码，可点击下面的获取语音验证码。</p>
            <div class="iptContext">
              <div class="ipt-group phone">

                <input type="text" id="viste" name="viste" class="text iptviste iptPhoneviste" onKeyDown="if(event.keyCode===32) return false"
                  placeholder="手机验证" maxlength="6">
                <button type="button" class="btn btnGray" id="getViste">获取手机验证码</button>
                <em class="error"> </em>
              </div>
              <p class="getSheepch" id="sheepch">
                <img src="@/assets/img/login/icon_03.png" alt="">获取语音验证码
              </p>
              <div class="btnGroup step2">
                <button type="submit" id="register2" class="btn btnRed">注册领取</button>
              </div>
            </div>
          </div>
          <input type="hidden" name="__hash__" value="ddb92acedd9bd8372428976866a2bf7d_d2469a6c836a041ad5df5fa5e4b42a9e">
        </form>
      </div>
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
        <span><img src="@/assets/img/login/iconJY.png" />深圳钜信科技有限公司</span>
        <span>深圳市龙华新区</span>
      <span>服务热线：4006-777-518</span>
      </p>

    </div>

    <div class="protocol-box" style="display:none;z-index: 999;"></div>
  </section>

</template>
<style lang="scss" scoped>
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
import '@/assets/css/pread.css'
import '@/assets/css/slide.css'
import '@/assets/css/style.css' // 引入全局less文件
import InputPhone from '@/components/Items/InputPhone'
import InputPass from '@/components/Items/InputPass'
import Verify from '@/components/Items/Verify'
// import Valid from '@/mixins/Login/Validate'
import Roles from '@/config/roles'
export default {
  data () {
    return {
      showReg: false,
      checked: true,
      isVerify: false,
      sliderShow: false, // 滑块验证错误信息显示
      checkShow: false, // 协议未勾选错误信息显示
      loginLoading: false, // 登录加载中
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
  methods: {
    submitForm (formName) {
      if (!this.isVerify) {
        this.sliderShow = true
        return
      }
      if (!this.checked) {
        this.checkShow = true
        return
      }
      // if (Valid.checkPass(this.ruleForm.pass)) {
      // *************************分割线*************************
      this.loginLoading = true // 登录中
      let param = {
        phone: this.ruleForm.phone,
        password: this.ruleForm.pass
      }
      if (process.env.NODE_ENV === 'development') { // 调试环境
        let res = {
          data: { status: 1, token: 'af49abde71a27624164324aedf29f8d4f2de915c2ebff6b214db9ee34c215abd', custType: 2 }
        }
        if (res.data.status) {
          this.$store.commit(types.LOGIN, res.data.token)
          this.$store.commit(types.SETROLE, res.data.custType)
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
        })
      }
      // *************************分割线*************************
      // } else {
      //   console.log('error submit!!')
      //   return false
      // }
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
