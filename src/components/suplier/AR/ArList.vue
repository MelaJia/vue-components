<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <section>
    <el-table :data="dataTable" v-loading="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([7])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" :span-method="objectSpanMethod" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="AR单号" prop="masterChainId" width="130">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="结报单号" prop="billId" width="130">
      </el-table-column>
      <el-table-column align="center" label="付款单位" prop="company">
      </el-table-column>
      <el-table-column align="center" label="转让单位" prop="custFromName">
      </el-table-column>
      <el-table-column align="center" sortable label="交易流水号" prop="transSerialNo" min-width="120">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="arStatusTypeName">
      </el-table-column>
      <el-table-column align="center" label="币别" prop="currencyDesc">
      </el-table-column>
      <el-table-column align="center" label="转让金额" prop="transAmt" :formatter="regexNum">
      </el-table-column>
      <el-table-column align="center" label="转让日期" sortable prop="transDate" min-width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column align="center" label="预计回款日期" prop="billPayDate" min-width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column align="center" label="操作" width='230px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button v-if="scope.row.checkedStatus==3" size="mini" type="primary" @click="handleAccept(scope.$index, scope.row)">接受</el-button>
          <el-button v-if="scope.row.checkedStatus==3" size="mini" type="primary" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
  </div>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
/* 待收Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [ListMinxIn, Common, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogInfo')
  },
  methods: {
    // 接受转让
    handleAccept: handleAccept,
    // 拒绝转让
    handleReject: handleReject,
    objectSpanMethod: objectSpanMethod
  }
}
// 接受转让
function handleAccept (idx, val) {
  this.$confirm(`请确认AR单号${val.masterChainId}接受转让?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/onReceivingAr/receiveTranfer.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 拒绝转让
function handleReject (idx, val) {
  this.$confirm(`请确认AR单号${val.masterChainId}拒绝转让?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/onReceivingAr/rejectTranfer.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
function objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
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
