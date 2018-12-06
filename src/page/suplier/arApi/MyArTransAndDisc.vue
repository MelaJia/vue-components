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
        <search ref="search" v-show="searchShow" @handle-search="searchSubmit" :operate-type="this.query.operateType"></search>
        </transition>
      </el-card>
    </article>
    <article class="body">
      <el-card class="box-card">
        <ar-list :data-table="tableData5" :data-loading="loading" :operate-type="this.query.operateType" @refresh="handleRefresh"></ar-list>
        <el-pagination class="text-align-center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizesArr" :page-size="psize"
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
    // 获取url中参数
    this.param.interfaceTransSerial = this.query.interfaceTransSerial
    if (this.query.interfaceTransSerial) {
      // 模拟登陆
      await this.monitorLogin(this.query.interfaceTransSerial)
    }
    // 获取url地址 operateType:1 转让，2 贴现
    console.log('初始值', this.getOperateType)
    this.initData(this.getOperateType)
  },
  computed: {
    getOperateType () {
      return this.query.operateType
    }
  },
  watch: {
    getOperateType: function (val) {
      this.postUrl = val === 1 ? 'multiArManager/getMultiArTransferListTable.do' : 'multiArManager/getMultiArDiscountListTable.do'
      this.initData(val)
      this.$refs.search.resetForm('formInline')
    }
  },
  methods: {
    // 条件查询
    searchSubmit (val) {
      console.log('chongzhi')
      let form = val.moneyDate && val.moneyDate[0] ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
      let to = val.moneyDate && val.moneyDate[1] ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
      try {
        let param = {
          masterChainId: val.masterChainId, // ar单号
          isMasterAr: val.isMasterAr, // ar来源
          factoringCustName: val.factoringCustName, // 供应商
          companyName: val.companyName, // 付款单位
          checkedStatus: val.status, // 状态
          billBookCurr: val.billBookCurr, // 币别
          invoiceNo: val.invoiceNo, // 发票号
          billId: val.billId, // 结报单号
          from: form, // 日期
          to: to,
          transSerialNo: val.transSerialNo // 交易流水号
        }
        this.param = this.getOperateType === 1 ? Object.assign(param, {factoringCustName: val.factoringCustName}) : param
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
    },
    initData: initData
  }
}
function initData (type) {
  this.postUrl = type === 1 ? 'multiArManager/getMultiArTransferListTable.do' : 'multiArManager/getMultiArDiscountListTable.do'
  this.psize = 10
  this.currentPage = 1
  this.getdata(1, this.psize)
    .then((response) => {
      console.log(response)
      if (response) {
        this.tableData5 = response.data[this.dataStr]
        this.total = response.data[this.totalStr]
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>
