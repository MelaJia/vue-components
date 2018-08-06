<template>
  <nav class="nav-menu">
    <el-menu :default-active="activeidx" :router="true" unique-opened text-color="#000" active-text-color="#005ac8" class="el-menu-demo" mode="vertical"
      @select="handleSelect">
      <tree-menu :list="navItems"></tree-menu>
      <!-- <section v-for="item in navItems" :key="item.idx">
        <el-submenu v-if="item.childrens" :index="item.idx">
          <template slot="title">
            <div :class="item.lClass"></div>
            <div :class="item.hClass"></div>
            <span>{{item.text}}</span>
          </template>
          <el-menu-item v-for="item in item.childrens" :key="item.idx" :index="item.idx" :disabled="item.disabled">
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
      </section> -->
    </el-menu>
  </nav>
</template>
<style lang="scss">
@import "../assets/css/base";
.nav-menu {
  height: 100%;
  // li i[class*="el-icon-arrow-down"]:before {
  //   content: none;
  // }
  ul {
    background: $navbg;
    border-right: none;
    height: 100%;
  }
  ul li.el-menu-item.is-active {
    &::before{
      background: $navbg-item-hover;
      width: 136px;
    }
    .circle {
      border: 1px solid white;
      width: 3px;
      height: 100%;
      position: absolute;
      left: 3px;
      background: $navbg-circle;
    }
  }
  >ul>section{
    padding-left: 10px;
  }
  .el-submenu__title::before,
  .el-menu-item::before {
    content: " ";
    height: 100%;
    width: 3px;
    position: absolute;
    left: 3px;
    top: 0;
    transition: width 0.2s;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover{
    &::before {
      background: $navbg-item-hover;
      width: 136px;
    }
    .circle {
      border: 1px solid white;
      width: 3px;
      height: 100%;
      position: absolute;
      left: 3px;
      background: $navbg-circle;
    }
  }
  .el-submenu__title,
  .el-menu-item {
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
    left: 5px;
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
  .header-circle {
    border: 1px solid white;
    width: 10px;
    height: 10px;
    position: absolute;
    left: -5px;
    top: 50%;
    margin-top: -5px;
    background: $navbg-circle;
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
import {mapGetters} from 'vuex'
import treeMenu from '@/components/Items/navItem'
export default {
  name: 'Nav',
  props: ['navItems'],
  data () {
    return {
      activeIndex: 'myar'

    }
  },
  components: {
    treeMenu
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
