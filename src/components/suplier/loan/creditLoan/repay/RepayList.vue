<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">

              </el-table-column>
              <el-table-column align="center" width="40">
              </el-table-column>
              <el-table-column align="center" prop="loanId" :width="widthArr.loanId">
              </el-table-column>
              <el-table-column align="center" prop="applyAmt" :width="widthArr.applyAmt">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.currencyDesc" >
              </el-table-column>
              <el-table-column align="center" prop="status" :width="widthArr.status">
              </el-table-column>
              <el-table-column align="center" prop="repaymentType" :width="widthArr.repaymentType">
              </el-table-column>
              <el-table-column align="center" prop="loanAmt" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="center" prop="payPrincipalAmt" :width="widthArr.payPrincipalAmt">
              </el-table-column>
              <el-table-column align="center" prop="payInterestAmt" :width="widthArr.payInterestAmt">
              </el-table-column>
              <el-table-column align="center" prop="payServiceAmt" :width="widthArr.payServiceAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineAmt" :width="widthArr.payFineAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineDays" :width="widthArr.payFineDays">
              </el-table-column>
              <el-table-column align="center" prop="prepaymentDeductInterest" :width="widthArr.prepaymentDeductInterest">
              </el-table-column>
              <el-table-column align="center" prop="totalRepayAmt" :width="widthArr.totalRepayAmt">
              </el-table-column>
              <el-table-column align="center" prop="contractSignedDate" :width="widthArr.contractSignedDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="repayDate" :width="widthArr.repayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" width='200px'>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed sortable prop="loanId" width="150">
        </el-table-column>
        <el-table-column align="center" label="融资申请金额" prop="applyAmt" width="150">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType">
        </el-table-column>
        <el-table-column align="center" label="实放金额" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款本金" prop="payPrincipalAmt">
        </el-table-column>
        <el-table-column align="center" label="还款利息" prop="payInterestAmt">
        </el-table-column>
         <el-table-column align="center" label="还款服务费" prop="payServiceAmt">
        </el-table-column>
        <el-table-column align="center" label="罚息" prop="payFineAmt">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays">
        </el-table-column>
        <el-table-column align="center" label="提前还款手续费" prop="prepaymentDeductInterest">
        </el-table-column>
        <el-table-column align="center" label="还款合计" prop="totalRepayAmt">
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
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
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/creditLoan/loan/DialogInfo')
  },
  methods: {
    // 详情
    handleInfo: debounce(handleInfo, 1000, true)
  }
}
// 详情函数
function handleInfo (idx, val) {
  // 获取数据
  getDataBase.call(this, '/creditLoan/queryCreditLoanInfo.do', val.loanId, true).then(res => {
    if (res) {
      console.log(res)
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}
</script>
