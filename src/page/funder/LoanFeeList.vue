<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <search @handle-search="handleSearch"></search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card">
        <ar-list :data-table="tableData5" :data-loading="loading" @refresh="handleRefresh"></ar-list>
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

<script>
import ArList from '@/components/Fund/Work/LoanFeeListTable'
import Search from '@/components/Fund/Work/LoanFeeSearch'
import DataInit from '@/mixins/suplier/Ar/DataInit'
import Table from '@/mixins/suplier/Ar/Table'
// import {DataFee} from '@/monitorDatas/Fund/loanDatas'
export default {
  name: 'loanfee', // 费率页面
  mixins: [DataInit, Table],
  data () {
    return {
      postUrl: '/loanFee2/getCustLoanFeeListTable.do', // 列表请求地址
      totalStr: 'recordsTotal', // 服务器返回总数参数名
      dataStr: 'data' // 服务器返回数据参数名
    }
  },
  components: {
    'ar-list': ArList,
    'search': Search
  },
  mounted () {
    // this.tableData5 = DataFee.data
    // this.total = DataFee.recordsTotal
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
    // 条件查询
    handleSearch (val) {
      console.log(val)
      this.param = {
        companyName: val.companyName.trim(), // 客户名称
        vendorCode: val.vendorCode.trim() // 供应商代码
      }
      console.log(this.param)
      if (this.total && this.currentPage !== 1) {
        console.log('2')
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        console.log('3')
        this.getdata(1, 10).then(res => {
          if (res) {
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
          if (res) {
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
