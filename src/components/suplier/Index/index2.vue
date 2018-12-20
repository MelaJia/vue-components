<template>
  <div>
    <el-row>
      <el-col :span="18">
        <index-left></index-left>
      </el-col>
      <el-col :span="6">
        <index-right></index-right>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
</style>

<script>
export default {
  components: {
    'index-left': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Index/index4'),
    'index-right': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Index/MySchedule')
  }
}
</script>
