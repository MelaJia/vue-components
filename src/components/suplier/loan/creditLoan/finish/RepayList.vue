<template>
  <div class="ar-table" ref="resizeContext">
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <!-- 还款详情 -->
    <dialog-repay-info :visible-p.sync="dialogRepayInfoVisible" :details-p="detailsRepay" ></dialog-repay-info>
    <section>
      <el-table :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
        <el-table-column
          type="index"
          label="序号"
          fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed sortable prop="loanId" width="150" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="申请金额" prop="applyAmt" :formatter="regexNum" width="150">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实放金额" prop="loanAmt" :formatter="regexNum" width="120">
        </el-table-column>
        <el-table-column align="center" label="申请日期" prop="applyDate" :formatter="dateFormat" min-width="120">
        </el-table-column>
        <el-table-column align="center" label="放款日期" prop="loanDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款合计" prop="totalRepayAmt" :formatter="regexNum" width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width='150px' class-name="" fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="text" @click="handleShowRepay(scope.row)">还款表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>

</template>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // expendhandle、widthHandle等方法
import Common from '@/mixins/common/common' // dateFormat等
import dialogRepay from '@/mixins/common/common/dialogRepay' // 还款计划表混合方法
import widhConf from '@/config/width' // 宽度配置
import { debounce, getDataBase } from '@/util/util' // 首字母大写 防抖函数
/* 历史Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [Common, TableMixIn, dialogRepay],
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
  // 设置数据
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
