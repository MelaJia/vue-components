<template>
  <div>
    <header>
    </header>
    <el-container>
      <el-header height="auto" style="position: fixed;width: 100%;z-index: 9;top:0px;">
        <header>
          <header-section @pwd-chage="pwdChange"></header-section>

        </header>
      </el-header>
      <el-container style="margin-top: 84px;">
        <!-- 密码修改 -->
        <dialog-pass-update :visible-p.sync="dialogPassVisible"></dialog-pass-update>
        <el-aside style="width: 220px;position: fixed;height: 100%;overflow-y: auto;z-index:9;">
          <nav-t :nav-items="navItems"></nav-t>
        </el-aside>
        <el-main style="margin-left: 200px;padding-top:0px;">
          <tags ref="nav" class="nav"></tags>
         <section :style="'background-color:#fff;height:auto;margin-top: 40px;'">
            <router-view></router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
    <footer>
      <!-- <div class="jt">
            <span>导航</span>
        </div> -->
    </footer>
  </div>
</template>
<style lang="scss">
@import "../assets/css/common";
</style>

<script>
import Nav from './Nav'
import ComponentsInit from '@/mixins/ComponentsInit'
import Tags from './tags'
export default {
  name: 'fund',
  mixins: [ComponentsInit],
  data () {
    return {
      height: '900'
    }
  },
  components: {
    'nav-t': Nav,
    Tags
  },
  created () {
    // console.log(this.navItems)
    // var winHeight = 0
    // if (window.innerHeight) {
    //   winHeight = window.innerHeight
    // } else if ((document.body) && (document.body.clientHeight)) {
    //   winHeight = document.body.clientHeight
    // }
    // this.height = winHeight
    // window.onresize = () => {
    //   this.height = document.body.clientHeight
    // }
  }
}

</script>
