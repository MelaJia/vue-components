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
        <ar-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></ar-table>
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
import ArTable from '@/components/suplier/Ar/arTable'
import Search from '@/components/suplier/Ar/SearchMyAr'
import ComponentsInit from '@/mixins/ComponentsInit'
import DataInit from '@/mixins/suplier/Ar/DataInit'
import Table from '@/mixins/suplier/Ar/Table'
export default {
  mixins: [ComponentsInit, DataInit, Table],
  data () {
    return {
      loading: false,
      postUrl: '/myAr2/getMyArListTable.do',
      dataStr: 'aaData',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'ar-table': ArTable,
    'search': Search
  },
  mounted () {
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
    searchSubmit (val) {
      let form = val.moneyDate ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
      let to = val.moneyDate ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
      /* 修改请求参数 */
      this.param = {
        masterChainId: val.masterChainId, // ar单号
        isMasterAr: val.isMasterAr, // ar来源
        companyName: val.companyName, // 付款单位
        checkedStatus: val.status, // 状态
        billBookCurr: val.billBookCurr, // 币别
        invoiceNo: val.invoiceNo, // 发票号
        from: form, // 日期
        to: to,
        transSerialNo: val.transSerialNo // 交易流水号
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
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
        .then(function (response) {
          if (response) {
            that.tableData5 = response.data[this.dataStr]
            that.total = response.data[this.totalStr]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>
