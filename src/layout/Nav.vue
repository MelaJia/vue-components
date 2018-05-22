<template>
  <nav class="nav-menu">
    <el-menu :default-active="activeidx" :router="true" text-color="#fff" active-text-color="#000" class="el-menu-demo" mode="vertical"
      @select="handleSelect">
      <section v-for="item in navItems" :key="item.idx">
        <el-submenu v-if="item.childrens" :index="item.idx">
          <template slot="title">
            <div :class="item.lClass"></div>
            <div :class="item.hClass"></div>
            <span>{{item.text}}</span>
          </template>
          <el-menu-item v-for="item in item.childrens" :key="item.idx" :index="item.idx">
            <template slot="title">
              <div :class="item.lClass"></div>
              <div :class="item.hClass"></div>
              <span>{{item.text}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.idx" :disabled="item.disabled">
          <template slot="title">
            <div :class="item.lClass"></div>
            <div :class="item.hClass"></div>
            <span>{{item.text}}</span>
          </template>
        </el-menu-item>
      </section>
    </el-menu>
  </nav>
</template>
<style lang="scss">
@import "../assets/css/base";
.nav-menu {
  li i[class*="el-icon-arrow-down"]:before {
    content: none;
  }
  ul {
    background: $navbg;
    border-right: none;
  }
  ul li.el-menu-item.is-active {
    background: $navbg-item-active;
    > .circle {
      -webkit-animation-name: custom-rubberBand;
      animation-name: custom-rubberBand;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
  }
  .el-submenu__title::before,
  .el-menu-item::before {
    content: " ";
    background: $navbg-item-hover;
    height: 100%;
    width: 3px;
    position: absolute;
    left: 0;
    top: 0;
    transition: width 0.2s;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent;
  }
  .el-submenu__title:hover::before,
  .el-menu-item:hover::before {
    width: 100%;
  }
  .el-submenu__title,
  .el-menu-item {
    padding-left: 55px !important;
    span {
      position: relative;
    }
  }
  .el-submenu .el-menu-item {
    min-width: 100px;
  }
  .line {
    width: 1px;
    top: 0;
    bottom: 0;
    left: 32px;
    position: absolute;
    border-color: inherit;
    background-color: $navbg-line-color;
  }
  .start-line {
    @extend .line;
    top: 20px;
  }
  .end-line {
    @extend .line;
    bottom: 25px;
  }
  .is-opened > div > .end-line {
    @extend .line;
    bottom: 0px;
  }
  .circle {
    border: 1px solid white;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    left: 26px;
    top: 50%;
    margin-top: -5px;
    background: $navbg-circle;
  }
  .header-circle {
    @extend .circle;
    left: 20px;
    width: 20px;
    height: 20px;
    margin-top: -11px;
  }
  .bg-icon-1 {
    background: url(~@/assets/img/juxin_13.png) center no-repeat;
    background-color: $navbg-circle;
  }
  .bg-icon-2 {
    background: url(~@/assets/img/juxin_14.png) center no-repeat;
    background-color: $navbg-circle;
  }
  .bg-icon-3 {
    background: url(~@/assets/img/juxin_15.png) center no-repeat;
    background-color: $navbg-circle;
  }
}
</style>

<script>
import {mapGetters} from 'Vuex'
export default {
  name: 'Nav',
  props: ['navItems'],
  data () {
    return {
      activeIndex: 'myar'

    }
  },
  computed: {
    ...mapGetters(['activeidx'])
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}

</script>
