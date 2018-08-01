<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <search  @handle-search="handleSearch"></search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <ar-list :data-table="tableData5" :data-loading="loading"  @refresh="handleRefresh"></ar-list>
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
import ArList from '@/components/Fund/Work/LoanRejectListTable'
import Search from '@/components/Fund/Work/LoanRejectSearch'
import Table from '@/mixins/suplier/Ar/Table'
// import {Datas} from '@/monitorDatas/Fund/loanDatas'
export default {
  // 拒绝放款列表页面
  mixins: [Table],
  data () {
    return {
      postUrl: '/loanQuery/loanQueryREJECTManage.do', // 列表请求地址
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
    // 条件查询
    handleSearch (val) {
      console.log('内容')
      this.param = {
        masterChainId: val.masterChainId, // ar单号
        custFromName: val.custFromName, // 贴现客户
        companyName: val.companyName, // 付款单位
        billBookCurr: val.billBookCurr, // 币别
        invoiceNo: val.invoiceNo, // 发票号
        discountAmtScopeFrom: val.discountAmtScopeFrom, // 贴现金额起始
        discountAmtScopeTo: val.discountAmtScopeTo // 贴现金额结束
      }
      console.log(this.param)
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, this.psize).then(res => {
          if (res.data.status) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
          }
        })
      }
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
