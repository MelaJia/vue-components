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
        <accept-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></accept-table>
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
import AcceptTable from '@/components/Fund/auxiliarySelect/AcceptTable'
import Search from '@/components/Fund/auxiliarySelect/AcceptSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'acceptsearch', // 验收单查询
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/auxiliaryFunction/searchSupplierGRNList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'accept-table': AcceptTable,
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
      let sendfrom = val.deliveryDate ? val.deliveryDate[0].Format('yyyy-MM-dd') : ''
      let sendto = val.deliveryDate ? val.deliveryDate[1].Format('yyyy-MM-dd') : ''
      let checkfrom = val.confirmDate ? val.confirmDate[0].Format('yyyy-MM-dd') : ''
      let checkto = val.confirmDate ? val.confirmDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        vendorCode: val.vendorCode, // 供应商代码
        corpCode: val.corpCode, // 法人代码
        corpName: val.corpName, // 法人单位
        grnNumber: val.grnNumber, // 进货验收单编号
        poNumber: val.poNumber, // 订单号
        currency: val.currency, // 币别
        deliveryDateBegin: sendfrom, // 约定交货日期开始
        deliveryDateEnd: sendto, // 约定交货日期结束
        confirmDateBegin: checkfrom, // 验收日期开始
        confirmDateEnd: checkto, // 验收日期结束
        dataType: val.dataType, // 类型
        amountBegin: val.amountBegin, // 开始金额
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
