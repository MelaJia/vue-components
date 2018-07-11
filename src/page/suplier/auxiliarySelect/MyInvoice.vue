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
        <myinvoice-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></myinvoice-table>
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
import MyinvoiceTable from '@/components/suplier/auxiliarySelect/MyinvoiceTable'
import Search from '@/components/suplier/auxiliarySelect/MyinvoiceSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'myinvoice', // 我的发票
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/auxiliaryFunction/searchSupplierInvoiceList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'myinvoice-table': MyinvoiceTable,
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
      let entryfrom = val.entryDate ? val.entryDate[0].Format('yyyy-MM-dd') : ''
      let entryto = val.entryDate ? val.entryDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        invoiceNo: val.invoiceNo, // 发票单号
        statementNo: val.statementNo, // 对账单号
        buyerName: val.buyerName, // 购方名称
        sellerName: val.sellerName, // 销方名称
        status: val.status, // 状态
        invoiceType: val.invoiceType, // 发票类型
        entryDateStart: entryfrom, // 录入日期开始
        entryDateEnd: entryto, // 录入日期结束
        taxTotalStart: val.taxTotalStart, // 开始金额
        taxTotalEnd: val.taxTotalEnd // 结束金额
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, 10).then(res => {
          if (res.data.status) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
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
