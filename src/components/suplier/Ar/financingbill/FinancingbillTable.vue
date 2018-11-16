<template>
  <div class="order-table">
    <!-- 详情 -->
    <dialog-financingbill :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-financingbill>
    <!--合同确认-->
    <dialog-contract :visible-p.sync="dialogContractVisible" :details-p="details"></dialog-contract>
    <section>
      <el-table ref="table" :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([6,7])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName"
        @mousedown.native="mouseDown"  >
        <el-table-column
          type="index"
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <el-table-column align="center" fixed label="AR单号" prop="masterChainId" width="120">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="120">
        </el-table-column>
        <el-table-column align="center" label="保理商" prop="custToName" width="">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="checkedStatusName" width="90">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" width="80">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="申请金额" prop="applyAmt" width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实际金额" prop="loanAmt" width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="100">
        </el-table-column>
        <el-table-column align="center" label="申请时间" prop="applyDate" :formatter="dateFormatToMinutes" width="100">
        </el-table-column>
        <el-table-column align="center" label="操作" header-align="center" width='120' fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="text" v-if="scope.row.checkedStatus === 23" @click="confirmContract(scope.$index, scope.row)">合同确认</el-button>
            <el-button size="mini" type="text" v-if="scope.row.checkedStatus === 22" @click="cancel(scope.$index, scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<style scoped lang="scss">
.status-tooltip{
  ul{
    padding: 0;
  }
  li {
    list-style: none;
    display: inline-block;
  }
  ul:last-child {
    li{
      width: 63px;
    }
    li:nth-of-type(n+3){
      width: 75px;
    }
  }
}
</style>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
import { getDataBase } from '@/util/util' // 首字母大写 防抖函数
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-financingbill': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/financingbill/DialogFinancingbill'),
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/financingbill/DialogContract')
  },
  data () {
    return {
      dialogInfoVisible: false,
      dialogContractVisible: false,
      details: {}, // 详情数据
      filedetails: {}
    }
  },
  filters: {

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
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/multiArManager/multiArLoanDetail.do', { transSerialNo: val.transSerialNo }).then(res => {
        this.details = res
        console.log(this.details)
        this.dialogInfoVisible = true
        val.infoLoading = false
      })
    },
    fresh () {
      this.$emit('refresh')
    },
    // 合同确认
    confirmContract (idx, val) {
      let param = {
        transSerialNo: val.transSerialNo
      }
      // 获取数据
      getDataBase.call(this, '/multiArManager/multiArLoanSigningDetail.do', param, true).then(res => {
        if (res) {
          console.log(res)
          // 标题赋值
          // res.masterChainId = val.loanId
          this.details = Object.assign(res, {transSerialNo: val.transSerialNo})
          this.dialogContractVisible = true
        }
      })
    },
    // 取消
    cancel (idx, val) {
      this.$confirm(`单号为${val.masterChainId}的确认取消融资?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.postResultFresh('/multiArInFinancingManager/multiArCancelDiscount.do', {transSerialNo: val.transSerialNo}) // 调用common混合中公共方法
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
