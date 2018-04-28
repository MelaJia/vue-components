<template>
  <div class="ar-table">
    <el-table :data="tableData5" show-summary border style="width: 100%" :row-class-name="tableRowClassName" @expand-change="expendhandle"
      @header-dragend="widthHandle">
      <el-table-column align="center" type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.tableData" style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
            <el-table-column align="center" width="48">
            </el-table-column>
            <el-table-column align="center" prop="id" :width="widthArr.id">
            </el-table-column>
            <el-table-column align="center" prop="come" :width="widthArr.come">
            </el-table-column>
            <el-table-column align="center" prop="company" :width="widthArr.company">
            </el-table-column>
            <el-table-column align="center" prop="status" :width="widthArr.status">
            </el-table-column>
            <el-table-column align="center" prop="moneyType" :width="widthArr.moneyType">
            </el-table-column>
            <el-table-column align="center" prop="money" :width="widthArr.money">
            </el-table-column>
            <el-table-column align="center" prop="money_cash" :width="widthArr.money_cash">
            </el-table-column>
            <el-table-column align="center" prop="arriveDate" :width="widthArr.arriveDate">
            </el-table-column>
            <el-table-column align="center" width='200px'>
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" label="AR单号" prop="id" width="100">
      </el-table-column>
      <el-table-column align="center" label="AR来源" prop="come">
      </el-table-column>
      <el-table-column align="center" label="付款单位/对手单位" prop="company" width="150">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
      </el-table-column>
      <el-table-column align="center" label="币别" prop="moneyType">
      </el-table-column>
      <el-table-column align="center" label="票面金额" prop="money">
      </el-table-column>
      <el-table-column align="center" label="兑付金额" prop="money_cash">
      </el-table-column>
      <el-table-column align="center" label="预计回款日期" prop="arriveDate" width="120">
      </el-table-column>
      <el-table-column align="center" label="操作" width='200px'>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import TableMixIn from '@/mixins/Ar/Table'
export default {
  mixins: [TableMixIn]
}

</script>
