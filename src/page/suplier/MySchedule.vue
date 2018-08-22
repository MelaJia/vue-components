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
        <schedule-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></schedule-table>
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
import ScheduleTable from '@/components/suplier/Ar/ScheduleTable'
import Search from '@/components/suplier/Ar/ScheduleSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'loanPage', // 我的待办
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/myAr/getOnDealARListTable.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'schedule-table': ScheduleTable,
    'search': Search
  },
  mounted () {
    // this.param = Object.assign({checkedStatus: 23}, this.param)
    this.getdata(1, this.psize)
      .then(res => {
        if (res.data.status) {
          this.tableData5 = res.data[this.dataStr]
          this.total = res.data[this.totalStr]
          // console.log(this.tableData5.length)
          // this.$store.commit('getScheduleNumber', this.total)
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
      let billPayDatefrom = val.billPayDate ? val.billPayDate[0].Format('yyyy-MM-dd') : ''
      let billPayDateto = val.billPayDate ? val.billPayDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        isMasterAr: val.isMasterAr,
        companyName: val.companyName,
        checkedStatus: val.checkedStatus,
        billBookCurr: val.billBookCurr,
        masterChainId: val.masterChainId,
        invoiceNo: val.invoiceNo,
        billId: val.billId,
        from: billPayDatefrom,
        to: billPayDateto
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
