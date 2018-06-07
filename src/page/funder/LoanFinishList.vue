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
        <ar-table :data-loading="loading" :data-table="tableData5"></ar-table>
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
import ArTable from '@/components/Fund/Work/LoanedListTable'
import Search from '@/components/Fund/Work/LoanedSearch'
import DataInit from '@/mixins/suplier/Ar/DataInit'
import Table from '@/mixins/suplier/Ar/Table'
// import { LoanedDatas } from '@/monitorDatas/Fund/loanDatas.js'
export default {
  name: 'loanfinish', // 已完结页面
  mixins: [DataInit, Table],
  data () {
    return {
      loading: false,
      postUrl: '/loanQuery/loanQueryPAYMENTSManage.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'ar-table': ArTable,
    'search': Search
  },
  mounted () {
    // this.tableData5 = LoanedDatas[this.dataStr]
    // this.total = LoanedDatas[this.totalStr]
    const that = this
    this.getdata(1, 10)
      .then(function (response) {
        console.log(response)
        if (response) {
          that.tableData5 = response.data[that.dataStr]
          that.total = response.data[that.totalStr]
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    searchSubmit (val) {
      let form = val.moneyDate ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
      let to = val.moneyDate ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        masterChainId: val.masterChainId.trim(), // ar单号
        custFromName: val.custFromName.trim(), // 贴现客户
        companyName: val.companyName.trim(), // 付款单位
        billBookCurr: val.billBookCurr, // 币别
        invoiceNo: val.invoiceNo.trim(), // 发票号
        discountAmtScopeFrom: val.discountAmtScopeFrom, // 贴现金额起始
        discountAmtScopeTo: val.discountAmtScopeTo, // 贴现金额结束
        from: form, // 日期
        to: to
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, 10).then(res => {
          if (res) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
          }
        })
      }
    }
  }
}

</script>
