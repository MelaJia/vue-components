<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="position:relative;">
          <i class="el-icon-search"></i>
          <span>查询条件</span>
          <el-tooltip class="item" effect="dark" content="点击我展开查询条件" placement="left">
            <i class="el-icon-arrow-down" v-show="!boxshow" @click="togglebox" style="cursor:pointer;position:absolute;right:0;top:3px"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="点击我收缩查询条件" placement="left">
            <i class="el-icon-arrow-up" v-show="boxshow" @click="togglebox" style="cursor:pointer;position:absolute;right:0;top:3px;"></i>
          </el-tooltip>
        </div>
        <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
          <search @handle-search="searchSubmit" v-show="boxshow"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <schedule-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></schedule-table>
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
import ScheduleTable from '@/components/suplier/Ar/ScheduleTable'
import Search from '@/components/suplier/Ar/ScheduleSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  // name: 'loanPage', // 我的待办
  mixins: [Table],
  data () {
    return {
      loading: false,
      boxshow: true, // 查询条件显示隐藏
      postUrl: '/myAr/getOnDealARListTable.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'schedule-table': ScheduleTable,
    'search': Search
  },
  mounted () {
    this.param = {
      iDisplayStart: 1,
      iDisplayLength: 10,
      isMasterAr: '',
      companyName: '',
      checkedStatus: 23,
      billBookCurr: '',
      masterChainId: '',
      invoiceNo: '',
      billId: '',
      from: '',
      to: ''
    }
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
        isMasterAr: val.isMasterAr,
        companyName: val.companyName,
        checkedStatus: val.checkedStatus,
        billBookCurr: val.billBookCurr,
        masterChainId: val.masterChainId,
        invoiceNo: val.invoiceNo,
        billId: val.billId,
        from: billPayDatefrom,
        to: billPayDateto
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
    },
    // 查询条件显示和隐藏
    togglebox: function () {
      this.boxshow = !this.boxshow
    }
  }
}
</script>
