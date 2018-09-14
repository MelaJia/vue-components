<template>
  <div class="ar-table">
    <header>
      <!-- <el-button round @click="dialogConfirmVisible = true">批量确认</el-button>
    <el-button round @click="dialogTransferVisible = true">批量转让</el-button>
    <el-button round @click="dialogWithdrawVisible = true">一键批量变现</el-button> -->
    </header>
    <!-- <dialog-confirm :visible-p.sync="dialogConfirmVisible" :multiple-selection-p="multipleSelection"></dialog-confirm> -->
    <!-- <dialog-withdraw :visible-p.sync="dialogWithdrawVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-withdraw> -->
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([6])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">
              </el-table-column>
              <el-table-column align="center" prop="masterChainId" :width="widthArr.masterChainId" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="billId" :width="widthArr.billId" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="companyName" :width="widthArr.companyName" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="custFromName" :width="widthArr.custFromName" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="billBookAmt" :width="widthArr.billBookAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="currencyDesc" :width="widthArr.currencyDesc" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="repaymentType" :width="widthArr.repaymentType" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="fineGraceDays" :width="widthArr.fineGraceDays" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="payPrincipalAmt" :width="widthArr.payPrincipalAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="payInterestAmt" :width="widthArr.payInterestAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="payServiceAmt" :width="widthArr.payServiceAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="payFineAmt" :width="widthArr.payFineAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="payFineDays" :width="widthArr.payFineDays" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="prepayServiceAmt" :width="widthArr.prepayServiceAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="periodReliefAmt" :width="widthArr.periodReliefAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="payAmt" :width="widthArr.payAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="billPayDate" :width="widthArr.billPayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="loanDate" :width="widthArr.loanDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="periodPayDate" :width="widthArr.periodPayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="actualRepayDate" :width="widthArr.actualRepayDate" :formatter="dateFormat" >
              </el-table-column>
              <el-table-column align="center" width='80px'>
                <template slot-scope="scope">
                  - -
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="付款单位" prop="companyName" width="150">
        </el-table-column>
        <el-table-column align="center" label="贴现客户" prop="custFromName" width="150">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="贴现放款金额" prop="billBookAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType">
        </el-table-column>
        <el-table-column align="center" label="宽容天数" prop="fineGraceDays">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款本金" prop="payPrincipalAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款利息" prop="payInterestAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="服务费" prop="payServiceAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款罚息" prop="payFineAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="提前还款手续费" prop="prepayServiceAmt" :formatter="regexNum">
        </el-table-column>
         <el-table-column align="right" header-align="center" label="还款优惠金额" prop="periodReliefAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款总计" prop="payAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="出借日期" prop="loanDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="预计还款日期" prop="periodPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="实际还款日期" prop="actualRepayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width='80px' class-name="" fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<style scoped lang="scss">
header {
  text-align: right;
}
// 更多菜单样式
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #033c81;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper {
  li:not(:first-of-type) {
    margin-top: 10px;
  }
  .full-width {
    width: 100%;
  }
}
</style>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table'
import Common from '@/mixins/common' // fresh刷新数据函数
import Width from '@/mixins/Fund/width' // 宽度
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common, Width],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/DialogInfoLoaned')
  },
  data () {
    return {
      dialogRepayVisible: false, // 控制贴现窗
      dialogInfoVisible: false,
      multipleSelection: [], // 选择的数据
      details: {} // 详情数据
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo: handleInfo
  }
}
/**
 * 详情
 */
function handleInfo (idx, val) {
  // 引入mixins/common.js中getLoanDetail其中包含有加载loading
  this.getLoanDetail('/loan2/queryLoanInfo.do', { masterChainId: val.masterChainId }).then(res => {
    if (res) {
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}
</script>
