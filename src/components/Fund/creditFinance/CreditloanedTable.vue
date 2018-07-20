<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-creditloaned :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-creditloaned>
    <!--还款-->
    <dialog-repay :visible-p.sync="dialogRepay" :details-p="details"></dialog-repay>
    <section>
      <el-table ref="table" :data="dataTable" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle"
        >
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">
              </el-table-column>
              <el-table-column align="center" width="60">
              </el-table-column>
              <el-table-column align="center" prop="companyName" :width="widthArr.companyName">
              </el-table-column>
              <el-table-column align="center" prop="loanId" :width="widthArr.loanId">
              </el-table-column>
              <el-table-column align="center" prop="LoanTypeName" :width="widthArr.LoanTypeName">
              </el-table-column>
              <el-table-column align="center" prop="applyAmt" :width="widthArr.applyAmt">
              </el-table-column>
              <el-table-column align="center" prop="currency" :width="widthArr.currency">
              </el-table-column>
              <el-table-column align="center" prop="repaymentType" :width="widthArr.repaymentType">
              </el-table-column>
              <el-table-column align="center" prop="loanAmt" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="center" prop="payPrincipalAmt" :width="widthArr.payPrincipalAmt">
              </el-table-column>
              <el-table-column align="center" prop="payInterestAmt" :width="widthArr.payInterestAmt">
              </el-table-column>
              <el-table-column align="center" prop="payServiceAmt" :width="widthArr.payServiceAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineAmt" :width="widthArr.payFineAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineDays" :width="widthArr.payFineDays">
              </el-table-column>
              <el-table-column align="center" prop="prepaymentDeductInterest" :width="widthArr.prepaymentDeductInterest">
              </el-table-column>
              <el-table-column align="center" prop="totalRepayAmt" :width="widthArr.totalRepayAmt">
              </el-table-column>
              <el-table-column align="center" prop="contractSignedDate" :width="widthArr.contractSignedDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="repayDate" :width="widthArr.repayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="actualRepayAmt" :width="widthArr.actualRepayAmt">
              </el-table-column>
              <el-table-column align="center" prop="actualRepayDate" :width="widthArr.actualRepayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" label-align="center" width="150">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="repayMent(scope.$index, scope.row)">还款</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
          fixed width="60">
        </el-table-column>
        <el-table-column align="center" label="融资客户" fixed prop="companyName" width="120">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed sortable prop="loanId" width="120">
        </el-table-column>
        <el-table-column align="center" label="融资类型" prop="LoanTypeName" width="100">
        </el-table-column>
        <el-table-column align="center" label="贴现申请金额" prop="applyAmt" width="150">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currency" width="80">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType" width="150">
        </el-table-column>
        <el-table-column align="center" label="实放金额" prop="loanAmt" width="100">
        </el-table-column>
        <el-table-column align="center" label="还款本金" prop="payPrincipalAmt" width="100">
        </el-table-column>
        <el-table-column align="center" label="还款利息" prop="payInterestAmt" width="100">
        </el-table-column>
        <el-table-column align="center" label="还款服务费" prop="payServiceAmt" width="100">
        </el-table-column>
        <el-table-column align="center" label="罚息" prop="payFineAmt" width="100">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays" width="100">
        </el-table-column>
        <el-table-column align="center" label="提前还款手续费" prop="prepaymentDeductInterest" width="100">
        </el-table-column>
        <el-table-column align="center" label="还款合计" prop="totalRepayAmt" width="100">
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="实际还款金额" prop="actualRepayAmt" width="120">
        </el-table-column>
        <el-table-column align="center" label="实际还款日期" prop="actualRepayDate" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" header-align="center" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<style scoped lang="scss">
header {
  text-align: right;
}
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #033c81;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper {
  li:not(:first-of-type) {
    margin-top: 10px;
  }
  .full-width {
    width: 100%;
  }
}
</style>
<style>
.el-table__expanded-cell .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>
<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-creditloaned': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogCreditloaned'),
    'dialog-repay': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogRepay')
  },
  data () {
    return {
      dialogInfoVisible: false,
      dialogRepay: false,
      details: {}, // 详情数据
      filedetails: {}, // 附件数据
      widthArr: {
        companyName: '120',
        loanId: '120',
        LoanTypeName: '100',
        applyAmt: '150',
        currency: '80',
        // status: '80',
        repaymentType: '150',
        loanAmt: '100',
        payPrincipalAmt: '100',
        payInterestAmt: '100',
        payServiceAmt: '100',
        payFineAmt: '100',
        payFineDays: '100',
        prepaymentDeductInterest: '100',
        totalRepayAmt: '100',
        contractSignedDate: '150',
        repayDate: '150',
        actualRepayAmt: '120',
        actualRepayDate: '150'
      }
    }
  },
  computed: {
    // comDatas: function () {
    //   const datas = this.getOpera(this.dataTable)
    //   return datas
    // }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/creditLoan/queryCreditLoanInfo.do', { loanId: val.loanId }).then(res => {
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      })
    },
    fresh () {
      this.$emit('refresh')
    },
    // 还款详情
    repayMent (idx, val) {
      val.repayLoading = true
      this.getLoanDetail('/creditLoan/queryCreditLoanInfo.do', { loanId: val.loanId }).then(res => {
        this.details = res
        this.dialogRepay = true
        val.infoLoading = false
      })
    }
  }
}
// 错误提示函数
// function erroShow (err, loading) {
//   console.log(this)
//   this.$alert(`网络错误${err}`, '系统提示', {
//     confirmButtonText: '确定',
//     callback: action => {
//       // 关闭加载图标
//       loading.close()
//     }
//   })
// }
</script>
