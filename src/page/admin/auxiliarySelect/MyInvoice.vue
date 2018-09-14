<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card search-box-card">
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
          <search @handle-search="searchSubmit" v-show="searchShow"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <myinvoice-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></myinvoice-table>
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
.body:first-child .el-card__header {
  padding: 8px 20px;
}
.body:first-child .el-card__body {
  padding: 0 20px;
}
</style>

<script>
import MyinvoiceTable from '@/components/Admin/auxiliarySelect/MyinvoiceTable'
import Search from '@/components/Admin/auxiliarySelect/MyinvoiceSearch'
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
      .catch(function (err) {
        throw new Error(err)
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
        vendorCode: val.vendorCode, // 供应商代码
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
