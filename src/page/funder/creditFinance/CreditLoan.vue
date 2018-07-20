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
        <creditloan-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></creditloan-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 50, 100, 500]"
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
import CreditloanTable from '@/components/Fund/creditFinance/CreditloanTable'
import Search from '@/components/Fund/creditFinance/CreditloanSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'creditLoan', // 信用放款
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/factoringCreditLoan/factoringCreditLoanOnLoanManageList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'creditloan-table': CreditloanTable,
    'search': Search
  },
  mounted () {
    this.getdata(1, 10)
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
      let repayDatefrom = val.repayDate ? val.repayDate[0].Format('yyyy-MM-dd') : ''
      let repayDateto = val.repayDate ? val.repayDate[1].Format('yyyy-MM-dd') : ''
      let contractSignedDatefrom = val.contractSignedDate ? val.contractSignedDate[0].Format('yyyy-MM-dd') : ''
      let contractSignedDateto = val.contractSignedDate ? val.contractSignedDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        loanId: val.loanId, // 融资编号
        companyName: val.companyName, // 融资客户
        currency: val.currency, // 币别
        amountBegin: val.amountBegin, // 开始金额
        amountEnd: val.amountEnd, // 结束金额
        status: val.status, // 状态
        loanType: val.loanType, // 融资类型
        repayDateBegin: repayDatefrom, // 还款日期开始
        repayDateEnd: repayDateto, // 还款日期结束
        contractSignedDateBegin: contractSignedDatefrom, // 合同签署日期开始
        contractSignedDateEnd: contractSignedDateto // 合同签署日期结束
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, 10).then(res => {
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
