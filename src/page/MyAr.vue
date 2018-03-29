<template>
<div class="main">
  <div class="body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img src="~@/assets/img/juxin_06.png" alt="查询条件"><span>查询条件</span>
      </div>        
      <search @searchSubmit="searchSubmit"></search>
    </el-card> 
  </div>
  <div class="body">
    <el-card class="box-card text-align-center">
      <ar-table :data-loading="loading" :data-table="tableData5"></ar-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</div>
 
</template>
<style scope>
  .text-align-center{
    text-align:center;
  }
</style>

  <script>
  import ArTable from "@/components/Ar/arTable"
  import Search from "@/components/Ar/SearchMyAr"
  import ComponentsInit from "@/mixins/Ar/ComponentsInit"
  import DataInit from '@/mixins/Ar/DataInit'
    export default {
      mixins:[ComponentsInit,DataInit],
      data(){
        return{
          loading:false
        }
      },
      components:{
        'ar-table':ArTable,
        'search':Search
      },
      mounted(){
        
      },
      methods:{
        searchSubmit(val){
          console.log(val);
          this.loading=true;
          setTimeout(()=>{
          this.loading=false;
        },3000)
        }
      }
    }
  </script>
  