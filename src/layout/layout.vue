<template>
  <div>
    <el-container style="background: #f0f0f0;">
      <el-header height="70px" style="position: fixed;width: 100%;z-index: 9;top:0px;">
        <header>
          <header-section @pwd-chage="pwdChange"></header-section>
        </header>
      </el-header>
      <el-container style="margin-top: 70px;">
        <!-- 密码修改 -->
        <dialog-pass-update :visible-p.sync="dialogPassVisible"></dialog-pass-update>
        <template v-if="navItems!==null&&navItems.length>0&&!interfaceTransSerial">
          <i
            class="nav-icon"
            :class="width===65?'nav-icon_right':'nav-icon_left'"
            style="position: fixed;font-size:24px;z-index: 99;top: 50%; transition: all 1s;color:#409EFF;cursor:pointer;"
            :style="{'left': width===65 ? width+'px' : width-12+'px'}"
            @click="width=width===65?180:65"
          ></i>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutLeft"
          >
            <el-aside
              style="position: fixed;height: 100%;overflow-y: auto;z-index:9;background: #fff;transition: all 1s;"
              :style="{'width':width+'px'}"
            >
              <nav-t :nav-items="navItems" :is-collapse="width===65"></nav-t>
            </el-aside>
          </transition>
        </template>
        <el-main style="padding-top:0px; transition: all 1s;overflow: hidden;" :style="{'margin-left': width +'px'}">
          <tags v-if="navItems!==null&&navItems.length>0&&!interfaceTransSerial" ref="nav" class="nav"></tags>
          <section :style="'height:auto;margin-top: 47px;'">
            <slot></slot>
          </section>
        </el-main>
      </el-container>
    </el-container>
    <footer></footer>
  </div>
</template>
<style lang="scss">
@import "../assets/css/common";
.nav-icon{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAzCAYAAACjWemfAAAAGXRFW…BkNHwmVcMZUjX0k6phMxC3kurpGiD2B+L9QPwVnwaAAAMAFHwqsX7ho60AAAAASUVORK5CYII=) no-repeat;
    background-size: contain;
    width: 12px;
    height: 51px;
}
.nav-icon_left{
  background: url('~@/assets/img/images/icon_left.png')
}
.nav-icon_right{
  background: url('~@/assets/img/images/icon_right.png')
}
</style>

<script>
import Nav from './Nav'
import HeaderSection from '@/components/HeaderSection' // 头部
import Tags from './tags'
import {GetQueryString} from '@/util/util'
export default {
  name: 'suplier',
  data () {
    return {
      height: '900',
      interfaceTransSerial: null, // 外部标识
      dialogPassVisible: false, // 密码修改
      navItems: this.$store.state.user.navitems, // 获取菜单
      width: 180 // 左边导航栏宽度
    }
  },
  components: {
    'nav-t': Nav,
    Tags,
    HeaderSection,
    'dialog-pass-update': () =>
      import(/* webpackChunkName: 'DialogCommon' */ '@/components/pwdUpdate') // 密码修改窗
  },
  created () {
    this.interfaceTransSerial = GetQueryString('interfaceTransSerial')
    this.width = this.navItems !== null && this.navItems.length > 0 && !this.interfaceTransSerial ? getElWidth() < 1400 ? 65 : 180 : 0
  },
  methods: {
    pwdChange: pwdChange
  }
}
// 密码修改
function pwdChange () {
  console.log('修改密码')
  this.dialogPassVisible = true
}
function getElWidth () {
  return document.documentElement.clientWidth
}
</script>
