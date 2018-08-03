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
import ArTable from '@/components/suplier/loan/orderLoan/loan/LoanList'
import Search from '@/components/suplier/loan/orderLoan/loan/LoanSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/supplierOrderLoan/supplierCreditLoanManageList.do',
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
    searchSubmit: searchSubmit,
    handleRefresh: handleRefresh
  }
}
function searchSubmit (val) {
  let repayDateBegin = val.repayDate ? val.repayDate[0].Format('yyyy-MM-dd') : ''
  let repayDateEnd = val.repayDate ? val.repayDate[1].Format('yyyy-MM-dd') : ''
  let contractSignedDateBegin = val.contractDate ? val.contractDate[0].Format('yyyy-MM-dd') : ''
  let contractSignedDateEnd = val.contractDate ? val.contractDate[1].Format('yyyy-MM-dd') : ''
  /* 修改请求参数 */
  this.param = {
    loanId: val.loanId, // 融资编号
    currency: val.currency, // 币别
    amountBegin: val.amountBegin, // 金额范围开始
    amountEnd: val.amountEnd, // 金额范围结束
    status: val.status, // 状态
    repayDateBegin: repayDateBegin, // 还款日期开始
    repayDateEnd: repayDateEnd, // 还款日期结束
    contractSignedDateBegin: contractSignedDateBegin, // 合同签署日期开始
    contractSignedDateEnd: contractSignedDateEnd // 合同签署日期结束
  }
  if (this.total && this.currentPage !== 1) {
    this.total = 0// 分页的当前页数变动会触发 从而获取数据
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
}
function handleRefresh () {
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
</script>
