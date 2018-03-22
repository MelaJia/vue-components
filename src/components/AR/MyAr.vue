<template>
<div class="main">
  <div class="header">
  </div>
  <div class="body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img src="~@/assets/img/juxin_06.png" alt="查询条件"><span>查询条件</span>
      </div>        
      <search></search>
    </el-card> 
  </div>
  <div class="body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img src="~@/assets/img/juxin_11.png" alt="我的AR"><span>我的AR</span>
      </div>
      <ar-table></ar-table>
    </el-card>
  </div>
</div>
 
</template>
<style>

</style>

  <script>
  import ArTable from "./components/arTable"
  import Search from "./components/SearchMyAr"
  import ComponentsInit from "@/mixins/Ar/ComponentsInit"
    export default {
      mixins:[ComponentsInit],
      components:{
      'ar-table':ArTable,
      'search':Search
  }
    }
  </script>
  