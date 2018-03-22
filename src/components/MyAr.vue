<template>
<div class="main">
  <div class="header">
    <el-tag>AR管理--我的AR</el-tag>
    <search></search>
  </div>
  <div class="body">
    <ar-table></ar-table>
  </div>
</div>
 
</template>

  <script>
  import ArTable from "./AR/arTable"
  import Search from "./AR/SearchMyAr"
    export default {
      components:{
      'ar-table':ArTable,
      'search':Search
  }
    }
  </script>
  