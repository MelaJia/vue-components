<template>
<div class="main index-style">
  <el-card class="box-card">
  <section>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="富金机" name="first"></el-tab-pane>
      <el-tab-pane label="钜信" name="second"></el-tab-pane>
      <el-tab-pane label="保理方" name="third"></el-tab-pane>
    </el-tabs>
    <!-- 内容区域 -->
    <component v-bind:is="activeName"></component>
  </section>
   </el-card>
</div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    'first': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/page/admin/blockChain/first'),
    'second': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/page/admin/blockChain/second'),
    'third': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/page/admin/blockChain/third')
  }
}
</script>
