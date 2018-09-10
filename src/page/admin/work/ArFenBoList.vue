<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-search"></i>
          <span>查询条件</span>
        </div>
        <search @handle-search="searchSubmit"></search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <ar-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></ar-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizesArr"
      :page-size="psize"
      :current-page.sync="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </el-card>
    </div>
  </div>
</template>
<style scope>
.text-align-center {
  text-align: center;
}
</style>

<script>
import ArTable from '@/components/Admin/Work/ArListTable'
import Search from '@/components/Admin/Work/ArSearch'
import Table from '@/mixins/suplier/Ar/Table'
// import { auditList } from '@/monitorDatas/Admin/arDatas.js'
export default {
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/discountAudit/getDiscountAuditListTable.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'ar-table': ArTable,
    'search': Search
  },
  mounted () {
    this.getdata(1, this.psize)
      .then(res => {
        if (res) {
          this.tableData5 = res.data[this.dataStr]
          this.total = res.data[this.totalStr]
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    // 搜索
    searchSubmit: searchSubmit,
    // 刷新
    handleRefresh: handleRefresh
  }
}
// 搜索
function searchSubmit (val) {
  /* 修改请求参数 */
  this.param = {
    custFromName: val.custFromName, // 贴现客户
    companyNameOfL1: val.companyNameOfL1, // 一级供应商
    companyName: val.companyName, // 付款单位
    custToName: val.custToName, // 保理方
    auditedTypeId: val.auditedTypeId // 状态
  }
  if (this.total && this.currentPage !== 1) {
    this.total = 0 // 分页的当前页数变动会触发 从而获取数据
  } else {
    this.getdata(1, this.psize).then(res => {
      if (res) {
        this.tableData5 = res.data[this.dataStr]
        this.total = res.data[this.totalStr]
      }
    })
  }
}
// 刷新数据
function handleRefresh () {
  this.getdata(this.currentPage, this.psize)
    .then(res => {
      if (res) {
        this.tableData5 = res.data[this.dataStr]
        this.total = res.data[this.totalStr]
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

</script>
