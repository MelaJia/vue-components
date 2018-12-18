<template>
  <nav class="nav-menu" style="padding-bottom: 100px">
    <el-menu
      :default-active="activeidx"
      :router="true"
      unique-opened
      text-color="#000"
      active-text-color="#005ac8"
      class="el-menu-demo"
      mode="vertical"
      :collapse="isCollapse"
      @select="handleSelect"
    >
      <tree-menu :list="navItems"></tree-menu>
    </el-menu>
  </nav>
</template>
<style lang="scss">
@import "../assets/css/base";
.nav-menu {
  // height: 100%;
  // li i[class*="el-icon-arrow-down"]:before {
  //   content: none;
  // }
  ul {
    background: $navbg;
    border-right: none;
    // height: 100%;
  }
  ul li.el-menu-item.is-active {
    color:#3F99F7 !important;
    &::before {
      background: $navbg-item-hover;
      width: 165px;
    }
    .circle {
      width: 8px;
      height: 100%;
      position: absolute;
      left: 0px;
      background: $navbg-circle;
    }
  }
  .el-submenu__title::before {
    content: " ";
    height: 1px;
    width: calc(100% - 20px);
    background: #e1e1e1;
    position: absolute;
    left: 0px;
    bottom: 0;
    transition: width 0.2s;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover {
    .circle {
      width: 8px;
      height: 100%;
      position: absolute;
      left: 0px;
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
  .header-circle {
    display: inline-block;
    background: $navbg-circle;
    width: 20px;
    height: 20px;
  }
  // 默认图标
  .header-circle{
    background: url(~@/assets/img/juxin_11.png) center
      no-repeat;
  }
  .bg-icon-1 {
    background: url(~@/assets/img/images/left_bar_icon01_default.png) center
      no-repeat;
  }
  .bg-icon-2 {
    background: url(~@/assets/img/images/left_bar_icon02_default.png) center
      no-repeat;
  }
  .bg-icon-3 {
    background: url(~@/assets/img/images/left_bar_icon03_default.png) center
      no-repeat;
  }
  .bg-icon-4 {
    background: url(~@/assets/img/images/left_bar_icon04_default.png) center
      no-repeat;
  }
  // 激活图标
  .is-active {
    .el-submenu__title>.line>span{
      color:#61a9ff;
    }
    .bg-icon-1 {
      background: url(~@/assets/img/images/left_bar_icon01_highlight.png) center
        no-repeat;
    }
    .bg-icon-2 {
      background: url(~@/assets/img/images/left_bar_icon02_highlight.png) center
        no-repeat;
    }
    .bg-icon-3 {
      background: url(~@/assets/img/images/left_bar_icon03_highlight.png) center
        no-repeat;
    }
    .bg-icon-4 {
      background: url(~@/assets/img/images/left_bar_icon04_highlight.png) center
        no-repeat;
    }
  }
}
// 隐藏样式
.el-menu--collapse .header-circle {
  display: block;
}
// 缩放隐藏右箭头
.el-menu--collapse .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
// 包裹层
.el-menu--collapse .line {
  line-height: 30px;
  display: block;
  margin-top: 10px;
}
// 菜单标题居中
.el-menu--collapse .line > span {
  margin-left: -50%;
}
// 底部线
.el-menu--collapse .el-submenu__title::before {
  width: 100%;
}
</style>

<script>
import { mapGetters } from 'vuex'
import treeMenu from '@/components/Items/navItem'
export default {
  name: 'Nav',
  props: {
    navItems: Array,
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
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
      console.log(this.activeidx)
    }
  }
}

</script>
