<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <section class="row-merge">
    <el-table :data="rowMergeData" v-loading.fullscreen="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([7])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" :span-method="objectSpanMethod" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed prop="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed  label="交易流水号" prop="transSerialNo" min-width="120" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="center" label="转让日期"  prop="transDate" min-width="120" :formatter="dateFormatToMinutes">
      </el-table-column>
      <el-table-column align="center" label="转让单位" prop="custFromName" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="center" label="状态" prop="arStatusTypeName" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="center"  label="AR单号" prop="masterChainId" width="130" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="center"  label="结报单号" prop="billId" width="130" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="right" header-align="center" label="转让金额" prop="transAmt" :formatter="regexNum">
      </el-table-column>
      <el-table-column align="center" label="票据到期日" prop="billPayDate" min-width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column align="center" label="操作" width='130px' fixed="right" :resizable="false">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="text" v-if="scope.row.checkedStatus==3" @click="handleAccept(scope.$index, scope.row)">接受</el-button>
          <el-button size="mini" type="text" v-if="scope.row.checkedStatus==3" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
  </div>
</template>
<style lang="scss">
@import "@/assets/css/_rowMerge.scss";
</style>

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
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/get/DialogInfoApi')
  },
  methods: {
    // 申请时间精确到分格式化
    dateFormatToMinutes: function (row, column) {
      var date = row[column.property]
      if (date === undefined || date === null || date === '') {
        return '- -'
      }
      return new Date(date).Format('yyyy-MM-dd HH:mm')
    },
    // 接受转让
    handleAccept: handleAccept,
    // 拒绝转让
    handleReject: handleReject
  }
}
// 接受转让
function handleAccept (idx, val) {
  this.$confirm(`请确认交易流水号${val.transSerialNo}接受转让?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postResultFresh('/multiArTransferManager/multiReceptionArPay.do', {transSerialNo: val.transSerialNo})
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 拒绝转让
function handleReject (idx, val) {
  this.$confirm(`请确认交易流水号${val.transSerialNo}拒绝转让?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postResultFresh('/multiArTransferManager/multiRejectArPay.do', {transSerialNo: val.transSerialNo})
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
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
