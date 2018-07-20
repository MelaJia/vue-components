<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <search @handle-search="searchSubmit"></search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <myarrear-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></myarrear-table>
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
import MyarrearTable from '@/components/Admin/auxiliarySelect/MyarrearTable'
import Search from '@/components/Admin/auxiliarySelect/MyarrearSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'myarrear', // 我的欠款
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/auxiliaryFunction/searchCustomerQiankuanList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'myarrear-table': MyarrearTable,
    'search': Search
  },
  mounted () {
    this.getdata(1, this.psize)
      .then(res => {
        if (res.data.status) {
          this.tableData5 = res.data[this.dataStr]
          this.total = res.data[this.totalStr]
        } else {
          this.tableData5 = []
          this.total = 0
          this.$message.error(res.data.msg)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    // 查询
    searchSubmit (val) {
      let agingDatefrom = val.agingDate ? val.agingDate[0].Format('yyyy-MM-dd') : ''
      let agingDateto = val.agingDate ? val.agingDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        BGCode: val.BGCode, // 事业群代码
        BUCode: val.BUCode, // 事业处代码
        BMCode: val.BMCode, // 生产单位代码
        corpCode: val.corpCode, // 管报代码
        currency: val.currency, // 状态
        agingDateStart: agingDatefrom, // 录入日期开始
        agingDateEnd: agingDateto // 录入日期结束
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, this.psize).then(res => {
          if (res.data.status) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
          } else {
            this.tableData5 = []
            this.total = 0
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 刷新
    handleRefresh () {
      const that = this
      this.getdata(that.currentPage, that.psize)
        .then(res => {
          if (res.data.status) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
          } else {
            this.tableData5 = []
            this.total = 0
            this.$message.error(res.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
