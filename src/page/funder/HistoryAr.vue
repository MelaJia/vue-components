<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <search></search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card">
        <ar-table></ar-table>
      </el-card>
    </div>
  </div>

</template>

<script>
import ArTable from '@/components/suplier/Ar/ArTableHistory'
import Search from '@/components/suplier/Ar/SearchMyAr'
export default {
  components: {
    'ar-table': ArTable,
    'search': Search
  }
}

</script>
