<template>
  <section>
    <el-table :data="tableData5" border show-summary sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="AR单号" prop="id" width="130">
      </el-table-column>
      <el-table-column align="center" label="付款单位" prop="come">
      </el-table-column>
      <el-table-column align="center" label="授让单位" prop="company">
      </el-table-column>
      <el-table-column align="center" sortable label="交易流水号" prop="fid" min-width="120">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
      </el-table-column>
      <el-table-column align="center" label="币别" prop="moneyType">
      </el-table-column>
      <el-table-column align="center" label="票面金额" prop="money">
      </el-table-column>
      <el-table-column align="center" label="转让日期" sortable prop="money_can" min-width="120">
      </el-table-column>
      <el-table-column align="center" label="预计回款日期" prop="arriveDate" min-width="120">
      </el-table-column>
      <el-table-column align="center" label="操作" width='230px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="handleAccept(scope.$index, scope.row)">接受</el-button>
          <el-button size="mini" type="primary" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import ListMinxIn from '@/mixins/Ar/List'
export default {
  mixins: [ListMinxIn]
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
