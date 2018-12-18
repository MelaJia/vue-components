<template>
<section>
  <section v-for="item in list" :key="item.menuId">
        <!-- root -->
        <el-submenu v-if="item.children&&item.children.length>0" :index="item.menuId">
          <template slot="title">
            <div class="line">
              <div :class="item.hClass"></div>
              <span>{{item.menuName}}</span>
            </div>
          </template>
          <!-- child-1 -->
          <tree-menu :list="item.children"></tree-menu>
        </el-submenu>
        <!-- root -->
        <el-menu-item v-else :index="item.menuUrl" :disabled="item.disabled">
          <template slot="title">
            <div class="line">
              <div :class="item.hClass"></div>
              <span><span class="iconfont icon-yuanhuan tag-item-icon"></span> {{item.menuName}}</span>
            </div>
          </template>
        </el-menu-item>
  </section>
</section>
</template>
<script>
import treeMenu from '@/components/Items/navItem'
export default {
  name: 'treeMenu',
  props: ['list'],
  components: {
    treeMenu
  },
  mounted () {
    console.log(this.list)
  }
}
</script>
