<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card search-box-card" :class="{'hideBox':!searchShow}">
        <div slot="header" class="clearfix" style="position:relative">
          <i class="el-icon-search"></i>
          <span>查询条件</span>
          <el-tooltip class="item" effect="dark" content="点我收起" placement="right-start">
            <i class="el-icon-arrow-down" v-show="searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;color:#409EFF;top:3px;cursor:pointer;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="点我展开" placement="right-start">
            <i class="el-icon-arrow-right" v-show="!searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;color:#409EFF;top:3px;cursor:pointer;"></i>
          </el-tooltip>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <search v-show="searchShow" @handle-search="searchSubmit"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <ar-table :data-loading="loading" :data-table="tableData5"></ar-table>
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
import ArTable from '@/components/Fund/Work/LoanFinish/LoanFinishListTable'
import Search from '@/components/Fund/Work/Loaned/LoanedSearch'
import Table from '@/mixins/suplier/Ar/Table'
// import { LoanedDatas } from '@/monitorDatas/Fund/loanDatas.js'
export default {
  name: 'loanfinish', // 已完结页面
  mixins: [Table],
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
    this.getdata(1, this.psize)
      .then(function (response) {
        console.log(response)
        if (response.data.status) {
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
        masterChainId: val.masterChainId, // ar单号
        custFromName: val.custFromName, // 贴现客户
        companyName: val.companyName, // 付款单位
        billBookCurr: val.billBookCurr, // 币别
        invoiceNo: val.invoiceNo, // 发票号
        discountAmtScopeFrom: val.discountAmtScopeFrom, // 贴现金额起始
        discountAmtScopeTo: val.discountAmtScopeTo, // 贴现金额结束
        from: form, // 日期
        to: to
      }
      this.startSearch()
    }
  }
}

</script>
