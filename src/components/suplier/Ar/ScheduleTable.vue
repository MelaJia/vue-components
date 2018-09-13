<template>
  <div class="order-table">
    <!-- 详情 -->
    <dialog-schedule :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-schedule>
    <!--合同确认-->
    <dialog-contract :visible-p.sync="dialogContractVisible" :details-p="details"></dialog-contract>
    <section>
      <el-table ref="table" :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([6,7])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName"
        @mousedown.native="mouseDown"  >
        <el-table-column
          type="index"
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <el-table-column align="center" fixed label="AR单号" prop="masterChainId" width="150px">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="120px">
        </el-table-column>
        <!-- <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column> -->
        <el-table-column align="center" label="付款单位/对手单位" prop="transUnitName" width="180px">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName" width="120px">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="票面金额" prop="billBookAmt" width="100px" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实际放款金额" prop="loanAmt" width="100px" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="100px">
        </el-table-column>
        <el-table-column align="center" label="打款处理状态" prop="billPayStatus" width="140px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" placement="top-start">
              <div slot="content" class="status-tooltip">
                <ul>
                  <li :style="scope.row.signStatusId===0?'color:red':''">会计确认</li><span>-></span>
                  <li :style="scope.row.signStatusId===1?'color:red':''">财务确认</li><span>-></span>
                  <li :style="scope.row.signStatusId===2?'color:red':''">财务已付款</li><span>-></span>
                  <li :style="scope.row.signStatusId===3?'color:red':''">付款单确认</li>
                </ul>
                <ul>
                  <li :style="scope.row.signStatusId===0?'color:red':''">{{scope.row.signStatusId===0&&scope.row.signStatusName?`(${scope.row.signStatusName})`: ''}}</li>
                  <li :style="scope.row.signStatusId===1?'color:red':''">{{scope.row.signStatusId===1&&scope.row.signStatusName?`(${scope.row.signStatusName})`: ''}}</li>
                  <li :style="scope.row.signStatusId===2?'color:red':''">{{scope.row.signStatusId===2&&scope.row.signStatusName?`(${scope.row.signStatusName})`: ''}}</li>
                  <li :style="scope.row.signStatusId===3?'color:red':''">{{scope.row.signStatusId===3&&scope.row.signStatusName?`(${scope.row.signStatusName})`: ''}}</li>
                </ul>
              </div>
              <span>
                {{scope.row.billPayStatus}}
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" header-align="center" width='180px' fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button :disabled="scope.row.operateControllerStatus=='0'?true:false" size="mini" type="primary" @click="confirmContract(scope.$index, scope.row)">合同确认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<style scoped lang="scss">
.status-tooltip{
  ul{
    padding: 0;
  }
  li {
    list-style: none;
    display: inline-block;
  }
  ul:last-child {
    li{
      width: 63px;
    }
    li:nth-of-type(n+3){
      width: 75px;
    }
  }
}
</style>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-schedule': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogSchedule'),
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogContract')
  },
  data () {
    return {
      dialogInfoVisible: false,
      dialogContractVisible: false,
      details: {}, // 详情数据
      filedetails: {}
    }
  },
  computed: {
    // comDatas: function () {
    //   const datas = this.getOpera(this.dataTable)
    //   return datas
    // }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/myAr/queryAr.do', { masterChainId: val.masterChainId }).then(res => {
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      })
    },
    fresh () {
      this.$emit('refresh')
    },
    // 合同签署
    confirmContract (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/myAr/queryAr.do', { masterChainId: val.masterChainId }).then(res => {
        this.details = res
        this.dialogContractVisible = true
        val.infoLoading = false
      })
    }
  }
}
</script>
