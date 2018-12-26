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
          align="center" label="No."  fixed width="50">
        </el-table-column>
        <el-table-column align="center" fixed label="AR单号" prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="120">
        </el-table-column>
        <!-- <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column> -->
        <el-table-column align="center" label="付款单位/对手单位" prop="transUnitName" width="">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName" width="120">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" width="80">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="票面金额" prop="billBookAmt" width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实际放款金额" prop="loanAmt" width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="票据到期日" prop="billPayDate" :formatter="dateFormat" width="100">
        </el-table-column>
        <el-table-column align="center" label="打款处理状态" prop="billPayStatus" width="140">
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
        <el-table-column align="center" label="操作" header-align="center" width='120' fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="text" :disabled="scope.row.operateControllerStatus=='0'?true:false" @click="confirmContract(scope.$index, scope.row)">合同确认</el-button>
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
import Common from '@/mixins/common/common'
import { getDataBase } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-schedule': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogSchedule'),
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogContract')
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
      this.getLoanDetail('/multiArManager/multiArLoanDetail.do', { transSerialNo: val.transSerialNo }).then(res => {
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      })
    },
    fresh () {
      this.$emit('refresh')
    },
    // 合同签署
    // confirmContract (idx, val) {
    //   val.infoLoading = true
    //   this.getLoanDetail('/myAr/queryAr.do', { masterChainId: val.masterChainId }).then(res => {
    //     this.details = res
    //     this.dialogContractVisible = true
    //     val.infoLoading = false
    //   })
    // }
    confirmContract (idx, val) {
      let param = {
        transSerialNo: val.transSerialNo
      }
      // 获取数据
      getDataBase.call(this, '/multiArManager/multiArLoanSigningDetail.do', param, true).then(res => {
        if (res) {
          console.log(res)
          // 标题赋值
          // res.masterChainId = val.loanId
          this.details = Object.assign(res, {transSerialNo: val.transSerialNo})
          this.dialogContractVisible = true
        }
      })
      // this.$alert('该协议内容由保理方xxx拟定，不由本平台提供，确认签署前需自行对协议内容进行审核', '提示', {
      //   confirmButtonText: '我知道了',
      //   center: true,
      //   type: 'warning'
      // }).then(() => {
      //   // val.infoLoading = true
      //   this.getLoanDetail('/myAr/queryAr.do', { masterChainId: val.masterChainId }).then(res => {
      //     this.details = res
      //     this.dialogContractVisible = true
      //     val.infoLoading = false
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消操作'
      //   })
      // })
    }
  }
}
</script>
