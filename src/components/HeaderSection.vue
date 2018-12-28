<template>
  <div class="header-section" style="margin-top: 7px;">
    <div class="width-50">
      <div class="header-left">
        <img src="@/assets/img/images/header_logo.png" alt>
      </div>
    </div>
    <div class="width-50">
      <div v-if="!this.$store.getters.interfaceTransSerial" class="header-right">
        <span id="img" src="@/assets/img/juxin_18.png" alt></span>
        <div class="text-content">
          <p>
            你好，{{custNickname}}
          </p>
          <p>上次登录时间:YY/MM/DD</p>
        </div>
        <section>
          <img src="@/assets/img/images/header_icon01.png" alt="">
        <el-dropdown @command="handleCommand">
          <img src="@/assets/img/images/header_icon02.png" alt="">
          <el-dropdown-menu slot="dropdown">
            <template v-if="this.$store.getters.token">
              <el-dropdown-item v-if="this.$store.state.user.roles" command="pwdChange">密码修改</el-dropdown-item>
              <el-dropdown-item
                command="logout"
                v-loading.fullscreen.lock="fullscreenLoading"
                element-loading-text="登出中，请稍候"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
              >登出</el-dropdown-item>
            </template>
            <el-dropdown-item v-else command="login">登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <img src="@/assets/img/images/header_icon03.png" alt="登出" @click="logout">

        </section>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  border-radius: 5px;
}

.width-50 {
  display: inline-block;
  width: 49.8%;
}

.header-section {
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
  float: right;
  height: 100%;
  position: relative;
}

.header-left {
}

.header-right img {
  width: 28px;
  height: 28px;
}
.header-right #img {
  background: url("~@/assets/img/juxin_18.png");
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: block;
  /* position: absolute;
  left: 0;
  top: -5px; */
  background-position: -9px -12px;
  background-repeat: no-repeat;
  background-size: 70px 70px;
}
/* 文字区域 */
.header-right>.text-content{
  margin: 0 15px;
}
.header-right>.text-content p{
  color: #fff;
  margin: 0;
}
.header-right>.text-content p+p{
  color: #dee8fb;
  font-size: 12px;
}
.header-right > span {
  color: #fff;
}

.header-left > div > span {
  height: 17px;
  line-height: 17px;
}

.header-right .process {
  background: #ec960f;
  color: white;
  align-items: center;
  margin-right: 50px;
}

.header-right .process > img {
  width: 32px;
  height: 32px;
}
/* 右侧图标 */
.el-dropdown {
  padding-top: 5px;
  margin: 0 20px;
}
.el-dropdown > span {
  padding-right: 80px;
}
.el-dropdown > span + span {
  padding-right: 0px;
}
</style>
<script>
import * as types from '@/store/types'
import { GetQueryString } from '@/util/util'
export default {
  data () {
    return {
      dialogPassVisible: false,
      fullscreenLoading: false,
      interfaceTransSerial: null
    }
  },
  created () {
    this.interfaceTransSerial = GetQueryString('interfaceTransSerial')
  },
  computed: {
    custNickname () {
      return this.$store.state.user.userinfos && !this.interfaceTransSerial ? this.$store.state.user.userinfos.custNickname : '保理方'
    }
  },
  methods: {
    pwdChange: pwdChange,
    logout: logout,
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'login') {
        this.$router.replace({
          path: '/login'
        })
      } else {
        console.log('单击了修改密码')
        this.pwdChange()
      }
    },
    // 路由跳转
    goPage () {
      this.$router.push({
        name: 'myschedule' // 跳转到我的待办页面
      })
      // this.$store.commit('getScheduleNumber')
    }
  }
  // computed: {
  //   scheduleNumber () {
  //     return this.$store.getters.scheduleNumber
  //   }
  // }
}
function logout () {
  let param = {
    ssoId: this.$store.getters.token
  }
  this.fullscreenLoading = true
  this.axios.post('/login/logout2', param).then(res => {
    if (res.data.status) {
      this.$message({
        message: '登出成功',
        type: 'success'
      })
      this.$store.commit(types.LOGOUT)
      this.$store.commit('DEL_ALL_TAG')
      this.fullscreenLoading = false
      console.log('登出')
      this.$router.replace({
        path: '/login'
        // query: { redirect: this.$router.currentRoute.fullPath }
      })
    } else {
      this.fullscreenLoading = false
      this.$message({
        message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
        type: 'error'
      })
    }
  }).catch(err => {
    this.fullscreenLoading = false
    this.$message({
      message: '返回结果错误，请联系管理员',
      type: 'error'
    })
    console.log(err)
  })
}
function pwdChange () {
  this.$emit('pwd-chage')
}
</script>
