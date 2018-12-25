<template>
  <section>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <el-table :data="dataTable" border sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed type="index" label="序号">
      </el-table-column>
      <el-table-column align="center" fixed label="AR单号" prop="masterChainId" sortable min-width="130" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="结报单号" prop="billId" width="130" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" label="付款单位" prop="company" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" label="授让单位" prop="custFromName" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" label="交易流水号" sortable min-width="120" prop="transSerialNo" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="arStatusTypeName" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="nullDealWith">
      </el-table-column>
      <el-table-column align="right" header-align="center" label="转让金额" prop="transAmt" :formatter="regexNum">
      </el-table-column>
      <el-table-column align="center" label="授让日期" sortable prop="transDate" :formatter="dateFormat" min-width="120">
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
  </section>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
/* 取消转让列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [Common, ListMinxIn, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/transfer/DialogInfoCancelTrans')
  },
  methods: {
    handleCancle (idx, val) {
      this.$confirm(`确认AR单号${val.masterChainId}是否取消授让?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.postWithId('/transferedAr/cancelTranfered.do', val.masterChainId)
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
