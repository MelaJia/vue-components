<template>
<section>
  <section v-for="item in list" :key="item.idx">
        <!-- root -->
        <el-submenu v-if="item.childrens" :index="item.idx">
          <template slot="title">
            <div :class="item.lClass"></div>
            <div :class="item.hClass"></div>
            <span>{{item.text}}</span>
          </template>
          <!-- child-1 -->
          <tree-menu :list="item.childrens"></tree-menu>
        </el-submenu>
        <!-- root -->
        <el-menu-item v-else :index="item.idx" :disabled="item.disabled">
          <template slot="title">
            <div :class="item.lClass"></div>
            <div :class="item.hClass"></div>
            <span>{{item.text}}</span>
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
  }
}
</script>
