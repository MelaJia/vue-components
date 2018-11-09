<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <section class="row-merge">
    <el-table :data="colData" v-loading.fullscreen="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([7])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" :span-method="objectSpanMethod" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed prop="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="交易流水号" prop="transSerialNo" min-width="120" :formatter="nullDealWith" >
      </el-table-column>
      <el-table-column align="center" label="转让日期" sortable prop="transDate" min-width="120" :formatter="dateFormat">
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
      <el-table-column align="center" label="预计回款日期" prop="billPayDate" min-width="120" :formatter="dateFormat">
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
.row-merge {
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: #fff;
  }
}
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
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/get/DialogInfo')
  },
  computed: {
    colData () {
      const t = this.dataTable
      if (t.length > 0) {
        let flag = null
        let idx = 0
        let idxSum = 1 // 合并后索引
        let sumRow = 1
        for (let index = 0; index < t.length; index++) {
          const element = t[index]
          element.rowSpan = 1 // 默认1行
          element.index = idxSum // 索引
          if (element.transSerialNo === flag) {
            sumRow++
            element.rowSpan = 0
            if (index === t.length - 1) {
              t[idx].rowSpan = sumRow
            }
          } else {
            element.index = idxSum++ // 索引
            t[idx].rowSpan = sumRow
            idx = index
            flag = element.transSerialNo
            sumRow = 1
          }
        }
      }
      return t
    }
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
    this.postWithId('/onReceivingAr/receiveTranfer.do', val.masterChainId)
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
    this.postWithId('/onReceivingAr/rejectTranfer.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 合并单元格
function objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
  if (columnIndex >= 0 && columnIndex <= 5 | columnIndex === 10) {
    return {
      rowspan: row.rowSpan,
      colspan: 1
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
