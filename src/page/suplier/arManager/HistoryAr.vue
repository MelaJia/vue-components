<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card search-box-card">
        <div slot="header" class="clearfix" style="position:relative">
          <i class="el-icon-search"></i>
          <span>查询条件</span>
          <el-tooltip class="item" effect="dark" content="点我收起" placement="right-start">
            <i class="el-icon-arrow-down" v-show="searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="点我展开" placement="right-start">
            <i class="el-icon-arrow-right" v-show="!searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;"></i>
          </el-tooltip>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <search v-show="searchShow" @handle-search="searchSubmit"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card">
        <ar-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></ar-table>
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

<script>
import ArTable from '@/components/suplier/Ar/history/ArTableHistory'
import Search from '@/components/suplier/Ar/history/Search'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/historyAr/getHistoryArListTable.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'ar-table': ArTable,
    'search': Search
  },
  mounted () {
    const that = this
    this.getdata(1, this.psize)
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
    searchSubmit (val) {
      let form = val.moneyDate ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
      let to = val.moneyDate ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
      let payFromDate = val.payDate ? val.payDate[0].Format('yyyy-MM-dd') : ''
      let payToDate = val.payDate ? val.payDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        masterChainId: val.masterChainId, // ar单号
        isMasterAr: val.isMasterAr, // ar来源
        companyName: val.companyName, // 付款单位
        billBookCurr: val.billBookCurr, // 币别
        invoiceNo: val.invoiceNo, // 发票号
        from: form, // 日期
        to: to,
        payFromDate: payFromDate, // 还款时期起始
        payToDate: payToDate // 还款时期结束
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, this.psize).then(res => {
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
