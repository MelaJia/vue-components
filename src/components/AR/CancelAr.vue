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
            <img src="~@/assets/img/juxin_11.png" alt="取消转让"><span>取消转让</span>
        </div>
        <ar-list></ar-list>
        </el-card>
    </div>
</div>
 
</template>

  <script>
    import ArList from "./components/ArListCancel"
    import Search from "./components/SearchCancel"
    export default {
      components:{
      'ar-list':ArList,
      'search':Search
  }
    }
  </script>
  