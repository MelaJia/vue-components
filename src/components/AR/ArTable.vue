<template>
  <div class="ar-table">
    <header>
      <!-- <el-button round @click="dialogConfirmVisible = true">批量确认</el-button>
    <el-button round @click="dialogTransferVisible = true">批量转让</el-button>
    <el-button round @click="dialogWithdrawVisible = true">一键批量变现</el-button> -->
    </header>
    <dialog-confirm :visible-p.sync="dialogConfirmVisible" :multiple-selection-p="multipleSelection"></dialog-confirm>
    <dialog-transfer :visible-p.sync="dialogTransferVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-transfer>
    <dialog-withdraw :visible-p.sync="dialogWithdrawVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-withdraw>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" :options="Options"></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" show-summary :summary-method="sumHandle([7,8])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">

              </el-table-column>
              <el-table-column align="center" width="40">
              </el-table-column>
              <el-table-column align="center" prop="masterChainId" :width="widthArr.masterChainId">
              </el-table-column>
              <el-table-column align="center" prop="billId" :width="widthArr.billId">
              </el-table-column>
              <el-table-column align="center" prop="isMasterAr" :width="widthArr.isMasterAr">
                >
              </el-table-column>
              <el-table-column align="center" prop="company" :width="widthArr.company">
              </el-table-column>
              <el-table-column align="center" prop="arStatusTypeName" :width="widthArr.arStatusTypeName">
              </el-table-column>
              <el-table-column align="center" prop="currencyDesc" :width="widthArr.currencyDesc">
              </el-table-column>
              <el-table-column align="center" prop="billBookAmt" :width="widthArr.billBookAmt">
              </el-table-column>
              <el-table-column align="center" prop="loanAmt" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="center" prop="billPayDate" :width="widthArr.billPayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" width='200px'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
                  <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="selection" fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="付款单位/对手单位" prop="company" width="150">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="center" label="票面金额" prop="billBookAmt">
        </el-table-column>
        <el-table-column align="center" label="可用余额" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width='200px'>
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<style scoped>
header {
  text-align: right;
}
</style>

<script>
import TableMixIn from '@/mixins/Ar/Table'
import Common from '@/mixins/common'
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-confirm': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/AR/DialogConfirm'),
    'dialog-transfer': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/AR/DialogTransfer'),
    'dialog-withdraw': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/AR/DialogWithdraw'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/AR/DialogInfo')
  },
  data () {
    return {
      dialogConfirmVisible: false, // 控制确认窗
      dialogTransferVisible: false, // 控制转账窗
      dialogWithdrawVisible: false, // 控制提现窗
      dialogInfoVisible: false,
      multipleSelection: [], // 选择的数据
      details: {} // 详情
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleInfo (idx, val) {
      console.log(val)
      this.axios.post('/myAr2/queryAr', { masterChainId: 'AR20180503000001' }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.details = val
      this.dialogInfoVisible = true
    }
  }
}

</script>
