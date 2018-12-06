<template>
  <section class="main">
    <article class="body">
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
        <search v-show="searchShow" @handle-search="searchSubmit"></search>
        </transition>
      </el-card>
    </article>
    <article class="body">
      <el-card class="box-card text-align-center">
        <ar-list :data-table="tableData5" :data-loading="loading" @refresh="handleRefresh"></ar-list>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizesArr" :page-size="psize"
          :current-page.sync="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-card>
    </article>
  </section>

</template>
<style scope>
.text-align-center {
  text-align: center;
}
</style>
<script>
import ArList from '@/components/suplier/arApi/fundApply/FundapplyTable'
import Search from '@/components/suplier/arApi/fundApply/FundapplySearch'
import Table from '@/mixins/suplier/Ar/Table' // handleCurrentChange
export default {
  mixins: [Table],
  props: ['query'],
  data () {
    return {
      postUrl: '/applyFactoringManager/getApplyFactoringListTable.do', // 请求地址
      totalStr: 'recordsTotal', // 服务器返回总数参数名
      dataStr: 'data' // 服务器返回数据参数名
    }
  },
  components: {
    'ar-list': ArList,
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
    // 条件查询
    searchSubmit (val) {
      let form = val.moneyDate && val.moneyDate[0] ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
      let to = val.moneyDate && val.moneyDate[1] ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
      try {
        this.param = {
          masterChainId: val.masterChainId, // ar单号
          isMasterAr: val.isMasterAr, // ar来源
          companyName: val.companyName, // 转让单位
          checkedStatus: val.checkedStatus, // 状态
          billBookCurr: val.billBookCurr, // 币别
          billId: val.billId, // 结报单号
          invoiceNo: val.invoiceNo, // 发票号
          from: form, // 日期
          to: to,
          transSerialNo: val.transSerialNo // 交易流水号
        }
      } catch (error) {
        console.log(error)
      }
      this.startSearch()
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
