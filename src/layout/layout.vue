<template>
  <div>
    <el-container>
      <el-header height="84px" style="position: fixed;width: 100%;z-index: 9;top:0px;">
        <header>
          <header-section @pwd-chage="pwdChange"></header-section>
        </header>
      </el-header>
      <el-container style="margin-top: 84px;">
        <!-- 密码修改 -->
        <dialog-pass-update :visible-p.sync="dialogPassVisible"></dialog-pass-update>
        <template v-if="navItems!==null&&navItems.length>0&&!interfaceTransSerial">
          <i
            class="iconfont"
            :class="width===0?'icon-open':'icon-close'"
            style="position: fixed;font-size:24px;z-index: 99;top: 50%; transition: all 1s;color:#409EFF;cursor:pointer;"
            :style="{'left': width+'px'}"
            @click="width=width===0?180:0"
          ></i>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutLeft"
          >
            <el-aside
              v-show="width>0"
              style="position: fixed;width:180px;height: 100%;overflow-y: auto;z-index:9;"
            >
              <nav-t :nav-items="navItems"></nav-t>
            </el-aside>
          </transition>
        </template>
        <el-main style="padding-top:0px; transition: all 1s;" :style="{'margin-left': width +'px'}">
          <tags v-if="navItems!==null&&navItems.length>0&&!interfaceTransSerial" ref="nav" class="nav"></tags>
          <section :style="'background-color:#fff;height:auto;margin-top: 40px;'">
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
</style>

<script>
import Nav from './Nav'
import ComponentsInit from '@/mixins/ComponentsInit'
import Tags from './tags'
import {GetQueryString} from '@/util/util'
export default {
  name: 'suplier',
  mixins: [ComponentsInit],
  data () {
    return {
      height: '900',
      interfaceTransSerial: null
    }
  },
  components: {
    'nav-t': Nav,
    Tags
  },
  created () {
    this.interfaceTransSerial = GetQueryString('interfaceTransSerial')
    this.width = this.navItems !== null && this.navItems.length > 0 && !this.interfaceTransSerial ? 180 : 0
  }
}
</script>
