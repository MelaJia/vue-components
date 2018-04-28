<template>
    <section>
        <el-table
        :data="tableData5"
        show-summary
        border
        sum-text="本页合计"
        style="width: 100%"
        :row-class-name="tableRowClassName" @expand-change="expendhandle">
        <el-table-column align="center"
        fixed
        type="index"
        label="序号"
        >
        </el-table-column>
        <el-table-column align="center"
        fixed
        label="AR单号"
        prop="id"
        sortable
        min-width="130">
        </el-table-column>
        <el-table-column align="center"
        label="付款单位"
        prop="come"
        >
        </el-table-column>
        <el-table-column align="center"
        label="授让单位"
        prop="company"
        >
        </el-table-column>
        <el-table-column align="center"
        label="交易流水号"
        sortable
        min-width="120"
        prop="fid"
        >
        </el-table-column>
        <el-table-column align="center"
        label="状态"
        prop="status"
        >
        </el-table-column>
        <el-table-column align="center"
        label="币别"
        prop="moneyType"
        >
        </el-table-column>
        <el-table-column align="center"
        label="票面金额"
        prop="money"
        >
        </el-table-column><el-table-column align="center"
        label="转让日期"
        sortable
        prop="money_can"
        min-width="120">
        </el-table-column>
        <el-table-column align="center"
        label="预计回款日期"
        prop="arriveDate"
        min-width="120"
        >
        </el-table-column>
        <el-table-column align="center"
        fixed="right"
        label="操作"
        width='230px'
        >
        <template slot-scope="scope" >
            <el-button
            size="mini"
            type="primary"
            @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">取消授让</el-button>
        </template>
        </el-table-column>
    </el-table>
    </section>
</template>

<script>
import ListMinxIn from '@/mixins/Ar/List'
export default {
  mixins: [ListMinxIn],
  data () {
    return {
      tableData5: [{
        pend: false,
        id: 'A205322625122',
        fid: 'B10023',
        come: '富金机',
        company: '大诚制造',
        status: '已授让',
        moneyType: '人民币',
        money: '20000',
        money_can: '2017-9-26',
        arriveDate: '2017-9-26',
        tableData: []
      }, {
        id: 'A205322625123',
        fid: 'B10023',
        come: '富金机',
        company: '大诚制造',
        status: '已授让',
        moneyType: '人民币',
        money: '20000',
        money_can: '2017-9-26',
        arriveDate: '2017-9-26'
      }]
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
