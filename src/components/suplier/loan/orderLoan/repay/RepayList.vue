<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">

              </el-table-column>
              <el-table-column align="center" width="40">
              </el-table-column>
              <el-table-column align="center" prop="loanId" :width="widthArr.loanId" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="right" prop="applyAmt" :width="widthArr.applyAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.currencyDesc" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="status" :width="widthArr.status" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="repaymentType" :width="widthArr.repaymentType" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="loanAmt" :width="widthArr.loanAmt" :formatter="regexNum">
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
              <el-table-column align="right" header-align="center" prop="prepaymentDeductInterest" :width="widthArr.prepaymentDeductInterest" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" header-align="center" prop="totalRepayAmt" :width="widthArr.totalRepayAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="contractSignedDate" :width="widthArr.contractSignedDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="repayDate" :width="widthArr.repayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="actualRepayDate" :formatter="dateFormat" :width="widthArr.actualRepayDate">
              </el-table-column>
              <el-table-column align="center" width='80px'>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed sortable prop="loanId" width="150" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="贴现申请金额" prop="applyAmt" :formatter="regexNum" width="150">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实放金额" prop="loanAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款本金" prop="payPrincipalAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款利息" prop="payInterestAmt" :formatter="regexNum"  width="120">
        </el-table-column>
         <el-table-column align="right" header-align="center" label="还款服务费" prop="payServiceAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="罚息" prop="payFineAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="提前还款手续费" prop="prepaymentDeductInterest" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款合计" prop="totalRepayAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="实际还款日期" prop="actualRepayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width='80px' class-name="" fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            </template>
        </el-table-column>
      </el-table>
    </section>
  </div>

</template>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // expendhandle、widthHandle等方法
import Common from '@/mixins/common' // dateFormat等
import widhConf from '@/config/width' // 宽度配置
import { debounce, getDataBase } from '@/util/util' // 首字母大写 防抖函数
/* 历史Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [Common, TableMixIn],
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      widthArr: widhConf.crL // 宽度配置
    }
  },
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/orderLoan/loan/DialogInfo')
  },
  methods: {
    // 详情
    handleInfo: debounce(handleInfo, 1000, true)
  }
}
// 详情函数
function handleInfo (idx, val) {
  let param = {
    loanId: val.loanId
  }
  // 获取数据
  getDataBase.call(this, '/creditLoan/queryCreditLoanInfo.do', param, true).then(res => {
    if (res) {
      console.log(res)
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}
</script>
