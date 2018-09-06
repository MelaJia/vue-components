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
        <mypayer-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></mypayer-table>
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
import MypayerTable from '@/components/Admin/auxiliarySelect/MypayerTable'
import Search from '@/components/Admin/auxiliarySelect/MypayerSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'mypayer', // 我的付款单
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/auxiliaryFunction/searchSupplierPaymentList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'mypayer-table': MypayerTable,
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
      let payfrom = val.payDate ? val.payDate[0].Format('yyyy-MM-dd') : ''
      let payto = val.payDate ? val.payDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        vendorCode: val.vendorCode, // 供应商代码
        payNo: val.payNo, // 付款编号
        corpCode: val.corpCode, // 法人代码
        corpName: val.corpName, // 法人单位
        billNo: val.billNo, // 结报单号
        currency: val.currency, // 币别
        payDateStart: payfrom, // 录入日期开始
        payDateEnd: payto, // 录入日期结束
        rcvAmtOriginStart: val.rcvAmtOriginStart, // 开始金额
        rcvAmtOriginEnd: val.rcvAmtOriginEnd // 结束金额
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
