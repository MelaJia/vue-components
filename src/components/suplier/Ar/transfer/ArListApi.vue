<template>
  <section>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <article class="row-merge">
      <el-table :data="rowMergeData" border sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
        @expand-change="expendhandle" :span-method="objectSpanMethod" @mousedown.native="mouseDown">
        <el-table-column align="center" fixed type="index" label="序号">
        </el-table-column>
        <el-table-column align="center" fixed label="交易流水号"  min-width="120" prop="transSerialNo" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="转让日期"  prop="transDate" :formatter="dateFormat" min-width="120">
        </el-table-column>
        <el-table-column align="center" label="接收方" prop="custToName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="AR单号" prop="masterChainId"  min-width="130" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="130" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="转让金额" prop="transAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="票据到期日" prop="billPayDate" :formatter="dateFormat" min-width="120">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width='80px'>
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="text" @click="handleCancle(scope.$index, scope.row)" v-if="scope.row.checkedStatus==3">取消授让</el-button>
          </template>
        </el-table-column>
      </el-table>
    </article>
  </section>
</template>
<style lang="scss">
@import "@/assets/css/_rowMerge.scss";
</style>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
/* 取消转让列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [Common, ListMinxIn, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/get/DialogInfoApi')
  },
  methods: {
    handleCancle (idx, val) {
      this.$confirm(`确认交易流水号${val.transSerialNo}是否取消授让?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.postResultFresh('/multiArTransferManager/multiCancelArPay.do', {transSerialNo: val.transSerialNo})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    }
  }
}

</script>
<style>
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
