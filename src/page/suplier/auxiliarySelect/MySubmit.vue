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
        <mysubmit-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></mysubmit-table>
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
import MysubmitTable from '@/components/suplier/auxiliarySelect/MysubmitTable'
import Search from '@/components/suplier/auxiliarySelect/MysubmitSearch'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  name: 'mysubmit', // 我的结报
  mixins: [Table],
  data () {
    return {
      loading: false,
      boxshow: true, // 查询条件显示隐藏
      postUrl: '/auxiliaryFunction/searchSupplierJieBaoList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'mysubmit-table': MysubmitTable,
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
      let dueDatefrom = val.dueDate ? val.dueDate[0].Format('yyyy-MM-dd') : ''
      let dueDateto = val.dueDate ? val.dueDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        billNo: val.billNo, // 结报单号
        invoiceNo: val.invoiceNo, // 发票单号
        corpCode: val.corpCode, // 法人代码
        corpName: val.corpName, // 法人单位
        currency: val.currency, // 币别
        dueDateBegin: dueDatefrom, // 录入日期开始
        dueDateEnd: dueDateto, // 录入日期结束
        oriAmtBegin: val.oriAmtBegin, // 应付开始金额
        oriAmtEnd: val.oriAmtEnd, // 应付结束金额
        oriPaidAmtBegin: val.oriPaidAmtBegin, // 已付开始金额
        oriPaidAmtEnd: val.oriPaidAmtEnd, // 已付结束金额
        oriUnPaidAmtBegin: val.oriUnPaidAmtBegin, // 未付开始金额
        oriUnPaidAmtEnd: val.oriUnPaidAmtEnd // 未付结束金额
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
