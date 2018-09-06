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
        <mybill-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></mybill-table>
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
import MybillTable from '@/components/Admin/auxiliarySelect/MybillTable'
import Search from '@/components/Admin/auxiliarySelect/MybillSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'mybill', // 我的对账单
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/auxiliaryFunction/searchSupplierStatementList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'mybill-table': MybillTable,
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
      let entryfrom = val.entryDate ? val.entryDate[0].Format('yyyy-MM-dd') : ''
      let entryto = val.entryDate ? val.entryDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        vendorCode: val.vendorCode, // 供应商代码
        statementNo: val.statementNo, // 对账单号
        grnNumber: val.grnNumber, // 进货验收单编号
        buyerName: val.buyerName, // 购方名称
        sellerName: val.sellerName, // 销方名称
        status: val.status, // 状态
        postStatus: val.postStatus, // 发送状态
        entryDateStart: entryfrom, // 录入日期开始
        entryDateEnd: entryto, // 录入日期结束
        amountStart: val.amountStart, // 开始金额
        amountEnd: val.amountEnd // 结束金额
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
