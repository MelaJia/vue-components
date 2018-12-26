<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :form="details"></dialog-info>
    <section>
    <el-table :data="dataTable" v-loading.fullscreen="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([5,6])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed type="index" label="No." width="50">
      </el-table-column>
      <el-table-column align="center" fixed  label="客户名称" prop="companyName" min-width="130">
      </el-table-column>
      <el-table-column align="center" label="供应商代码" prop="vendorCode">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="放款比例(%)" prop="loanPer" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="宽容天数(天)" prop="fineGraceDays" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="年利率(%)" prop="interestRate" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="服务费率(%)" prop="serviceFeeRate" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="逾期利率(%)" prop="fineGraceDayRate" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="提前还款手续费率(%)" prop="prepaymentDeductRate" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" label="操作" width='80px' fixed="right" :resizable="false">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
  </div>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table'
import Common from '@/mixins/common/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
export default {
  props: ['dataLoading', 'dataTable'],
  data () {
    return {
    }
  },
  mixins: [ListMinxIn, Common, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/LoanFee/DialogLoanFee')
  },
  methods: {
    // 详情
    handleInfo (idx, val) {
      this.details = val
      this.dialogInfoVisible = true
    }
  }
}

</script>
<style lang="scss">
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
 /* 更多菜单样式 */
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
