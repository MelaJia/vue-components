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
          <search @handle-search="searchSubmit" v-show="searchShow"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <financing-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></financing-table>
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
import FinancingTable from '@/components/suplier/Ar/financingbill/FinancingbillTable'
import Search from '@/components/suplier/Ar/financingbill/FinancingbillSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  // name: 'loanPage', // 我的待办
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/multiArInFinancingManager/getInFinancingListTable.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'financing-table': FinancingTable,
    'search': Search
  },
  mounted () {
    this.getdata(1, this.psize)
      .then(res => {
        if (res.data.status) {
          this.tableData5 = res.data[this.dataStr]
          this.total = res.data[this.totalStr]
          // console.log(this.tableData5.length)
          // this.$store.commit('getScheduleNumber', this.total)
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
      let billPayDatefrom = val.billPayDate ? val.billPayDate[0].Format('yyyy-MM-dd') : ''
      let billPayDateto = val.billPayDate ? val.billPayDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        checkedStatus: val.checkedStatus,
        billBookCurr: val.billBookCurr,
        masterChainId: val.masterChainId,
        custToName: val.custToName,
        invoiceNo: val.invoiceNo,
        billId: val.billId,
        from: billPayDatefrom,
        to: billPayDateto,
        interfaceTransSerial: ''
      }
      this.startSearch()
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
