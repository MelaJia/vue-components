<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18" class="style-index-left">
        <index-left></index-left>
      </el-col>
      <el-col :span="6" class="style-index-right">
        <img src="@/assets/img/imagesfund/index-right.jpg" alt="" srcset="" style="">
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
@media only screen and (min-width: 960px) {
  .style-index-left {
    width: 90%;
  }
  .style-index-right {
    width: 90%;
    img{
      float: right;
    }
  }
}
@media only screen and (min-width: 1340px) {
  .style-index-left {
    width: 75%;
  }
  .style-index-right {
    width: 25%;
    >img {
      height: 550px;
      width: 100%;
    }
  }
}
</style>

<script>
export default {
  components: {
    'index-left': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/outSource/Index/index4')
  }
}
</script>
