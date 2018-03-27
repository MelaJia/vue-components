<template>
<div class="ar-table">
  <header>
    <el-button round @click="dialogConfirmVisible = true">批量确认</el-button>
    <el-button round @click="dialogTransferVisible = true">批量转让</el-button>
    <el-button round @click="dialogWithdrawVisible = true">一键批量变现</el-button>
  </header>
  <dialog-confirm :visible-p.sync="dialogConfirmVisible" :multiple-selection-p="multipleSelection"></dialog-confirm>
  <dialog-transfer :visible-p.sync="dialogTransferVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-transfer>
  <dialog-withdraw :visible-p.sync="dialogWithdrawVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-withdraw>
  <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" :options="Options"></dialog-info>
  <section>
    <el-table
    :data="tableData5"
    show-summary
    border
    style="width: 100%"
    @selection-change="handleSelectionChange"
    :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle">
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-table
        :data="props.row.tableData"
        border
        style="width: 100%"
        :show-header="false"
        :row-class-name="getPendedColor">
        <el-table-column
        width="48">
      
      </el-table-column>
      <el-table-column
        align="center"
        width="40">
      </el-table-column>
      <el-table-column
        align="center"
        prop="id"
        :min-width="widthArr.id">
      </el-table-column>
      <el-table-column
        align="center"
        prop="come"
        :min-width="widthArr.come">
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="company"
        :min-width="widthArr.company">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        :min-width="widthArr.status">        
      </el-table-column>
      <el-table-column
        align="center"
        prop="moneyType"
        :min-width="widthArr.moneyType">
      </el-table-column>
      <el-table-column
        align="center"
        prop="money"
        :min-width="widthArr.money"
        >
      </el-table-column><el-table-column
        align="center"
        prop="money_can"
        :min-width="widthArr.money_can"
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="arriveDate"
        :min-width="widthArr.arriveDate"
        >
      </el-table-column>
      <el-table-column
      align="center"
      width='200px'
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        fixed
        width="40">
      </el-table-column>
      <el-table-column
        align="center"
        label="AR单号"
        fixed
        sortable
        prop="id"
        min-width="100"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="AR来源"
        prop="come"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="付款单位/对手单位"
        prop="company"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        prop="status"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="币别"
        prop="moneyType"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="票面金额"
        prop="money"
      >
      </el-table-column><el-table-column
        align="center"
        label="可用余额"
        prop="money_can"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="预计回款日期"
        prop="arriveDate"
        min-width="120"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width='200px'
        >
        <template slot-scope="scope" >
          <el-button
            size="mini"
            type="primary"
            @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</div>
  
</template>
<style scoped>
  header{
    text-align: right;
  }
</style>

  <script>
    import TableMixIn from '@/mixins/Ar/Table'
    export default {
      mixins:[TableMixIn],
      components:{
        'dialog-confirm':()=>import(/* webpackChunkName: 'Dialog'*/ './DialogConfirm'),
        'dialog-transfer':()=>import(/* webpackChunkName: 'Dialog'*/ './DialogTransfer'),
        'dialog-withdraw':()=>import(/* webpackChunkName: 'Dialog'*/ './DialogWithdraw'),
        'dialog-info':()=>import(/* webpackChunkName: 'Dialog'*/ './DialogInfo'),
      },
      data(){
        return {
          dialogConfirmVisible: false, //控制确认窗
          dialogTransferVisible: false, //控制转账窗
          dialogWithdrawVisible:false, //控制提现窗
          dialogInfoVisible: false,
          multipleSelection: [], //选择的数据
          details:{} //详情
        }
      },
      methods:{
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
        handleInfo(idx,val){
        console.log(val)
          
          this.details=val;
          this.dialogInfoVisible=true;
        },
      }
    }
  </script>
  
  