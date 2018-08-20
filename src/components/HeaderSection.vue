<template>
  <div class="header-section">
    <div class="width-50">
      <div class="header-left">
        <img src="@/assets/img/juxin_03.png" alt="">
      </div>
    </div>
    <div class="width-50">
      <div class="header-right">
        <el-button v-if="this.$store.getters.roles=='2'" type="danger" size="medium" :class="'process'" icon="el-icon-caret-right" @click="goPage">我的待办</el-button>
        <el-dropdown @command="handleCommand">
          <span style="color:#fff">你好，{{this.$store.state.user.userinfos.nickName}}<img src="@/assets/img/juxin_18.png" alt=""></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="pwdChange">密码修改</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
}

.header-left {
}

.header-right img {
  width: 60px;
  height: 60px;
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
</style>
<script>
import * as types from '@/store/types'
export default {
  data () {
    return {
      dialogPassVisible: false
    }
  },
  methods: {
    pwdChange: pwdChange,
    logout: logout,
    handleCommand (command) {
      if (command === 'logout') {
        this.logout()
      } else {
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
  this.axios.post('/login/logout2', param).then(res => {
    if (res.data.status) {
      this.$message({
        message: '恭喜你，登出成功',
        type: 'success'
      })
    } else {
      this.$message({
        message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
        type: 'success'
      })
    }
  }).catch(err => {
    console.log(err)
  })
  this.$store.commit(types.LOGOUT)
  this.$store.commit('DEL_ALL_TAG')
  this.$router.replace({
    path: '/login',
    query: { redirect: this.$router.currentRoute.fullPath }
  })
}
function pwdChange () {
  this.$emit('pwd-chage')
}
</script>
