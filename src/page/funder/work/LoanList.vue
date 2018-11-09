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
        <ar-list :data-table="tableData5" :data-loading="loading" @refresh="handleRefresh"></ar-list>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizesArr"
          :page-size="psize" :current-page.sync="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
import ArList from '@/components/Fund/Work/Loan//LoanListTable'
import Search from '@/components/Fund/Work/Loan//LoanSearch'
import Table from '@/mixins/suplier/Ar/Table'
// import {Datas} from '@/monitorDatas/Fund/loanDatas'
export default {
  // 放款页面
  mixins: [Table],
  data () {
    return {
      postUrl: '/loan2/getLoanManagerListTable.do', // 列表请求地址
      totalStr: 'recordsTotal', // 服务器返回总数参数名
      dataStr: 'data' // 服务器返回数据参数名
    }
  },
  components: {
    'ar-list': ArList,
    'search': Search
  },
  mounted () {
    // this.tableData5 = Datas.data
    // this.total = Datas.recordsTotal
    const that = this
    this.getdata(1, this.psize)
      .then(function (response) {
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
    // 条件查询
    searchSubmit (val) {
      let from = val.moneyDate ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
      let to = val.moneyDate ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
      // 修改查询条件
      this.param = {
        masterChainId: val.masterChainId, // ar单号
        custFromName: val.custFromName, // 贴现客户
        checkedStatus: val.checkedStatus, // 状态
        billBookCurr: val.billBookCurr, // 币别
        invoiceNo: val.invoiceNo, // 发票号
        discountAmtScopeFrom: val.discountAmtScopeFrom, // 贴现金额起始
        discountAmtScopeTo: val.discountAmtScopeTo, // 贴现金额结束
        from: from, // 日期
        to: to
      }
      this.startSearch()
    },
    handleRefresh () {
      const that = this
      this.getdata(that.currentPage, that.psize)
        .then(res => {
          if (res.data.status) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
