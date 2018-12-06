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
      <el-card class="box-card">
        <ar-list :data-table="tableData5" :data-loading="loading" @refresh="handleRefresh"></ar-list>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizesArr" :page-size="psize"
          :current-page.sync="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-card>
    </article>
  </section>

</template>

<script>
import ArList from '@/components/suplier/arApi/transAndDisc/ArTable'
import Search from '@/components/suplier/arApi/transAndDisc/SearchMyAr'
import Table from '@/mixins/suplier/Ar/Table' // handleCurrentChange
export default {
  mixins: [Table],
  props: ['query'],
  data () {
    return {
      postUrl: '/multiArManager/getMultiMyArListTable.do', // 请求地址
      totalStr: 'recordsTotal', // 服务器返回总数参数名
      dataStr: 'data' // 服务器返回数据参数名
    }
  },
  components: {
    'ar-list': ArList,
    'search': Search
  },
  async mounted () {
    const _this = this
    // 获取url中参数
    this.param.interfaceTransSerial = this.query.interfaceTransSerial
    if (this.query.interfaceTransSerial) {
      // 模拟登陆
      await this.monitorLogin(this.query.interfaceTransSerial)
    }
    this.getdata(1, this.psize)
      .then(function (response) {
        console.log(response)
        if (response) {
          _this.tableData5 = response.data[_this.dataStr]
          _this.total = response.data[_this.totalStr]
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
          custFromName: val.custFromName, // 转让单位
          checkedStatus: val.status, // 状态
          billBookCurr: val.billBookCurr, // 币别
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
