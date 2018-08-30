<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-creditend :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-creditend>
    <section>
      <el-table ref="table" :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown"
        >
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">
              </el-table-column>
              <el-table-column width="60">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.companyName">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.loanId">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.loanTypeName">
              </el-table-column>
              <el-table-column align="right" :width="widthArr.applyAmt">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.currencyName">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.statusName">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.repaymentType">
              </el-table-column>
              <el-table-column align="right" :width="widthArr.loanAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" prop="payPrincipalAmt" :width="widthArr.payPrincipalAmt">
                <template slot-scope="scope">
                  <span v-if="scope.row.payPrincipalAmt !== null || scope.row.payPrincipalAmt !== 0">{{scope.row.payPrincipalAmt | filterNum}}</span>
                </template>
              </el-table-column>
              <el-table-column align="right" prop="payInterestAmt" :width="widthArr.payInterestAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" prop="payServiceAmt" :width="widthArr.payServiceAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" prop="payFineAmt" :width="widthArr.payFineAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="payFineDays" :width="widthArr.payFineDays">
              </el-table-column>
              <el-table-column align="center" prop="prepaymentDeductInterest" :width="widthArr.prepaymentDeductInterest">
              </el-table-column>
              <el-table-column align="right" prop="periodReliefAmt" :width="widthArr.periodReliefAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" prop="totalRepayAmt" :width="widthArr.totalRepayAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.contractSignedDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="repayDate" :width="widthArr.repayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="right" prop="actualRepayAmt" :width="widthArr.actualRepayAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="actualRepayDate" :width="widthArr.actualRepayDate" :formatter="dateFormat">
              </el-table-column>
              <!-- <el-table-column align="center" prop="actualLoanDate" :width="widthArr.actualLoanDate" :formatter="dateFormat">
              </el-table-column> -->
              <el-table-column align="left" label-align="center" width="150">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row, true)" >详情</el-button> -->
                  <!-- <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown> -->
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
        <el-table-column align="center" label="融资客户" fixed prop="companyName" min-width="120">
        </el-table-column>
        <el-table-column align="center" label="融资编号" sortable prop="loanId" min-width="120">
        </el-table-column>
        <el-table-column align="center" label="融资类型" prop="loanTypeName" min-width="100">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="贴现申请金额" prop="applyAmt" min-width="150" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" min-width="80">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName" min-width="80">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType" min-width="150">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实放金额" prop="loanAmt" min-width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款本金" prop="payPrincipalAmt" min-width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款利息" prop="payInterestAmt" min-width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款服务费" prop="payServiceAmt" min-width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="罚息" prop="payFineAmt" min-width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="提前还款手续费" prop="prepaymentDeductInterest" min-width="100">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款优惠金额" prop="periodReliefAmt" width="100" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款合计" prop="totalRepayAmt" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" min-width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" min-width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实际还款金额" prop="actualRepayAmt" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="实际还款日期" prop="actualRepayDate" min-width="150" :formatter="dateFormat">
        </el-table-column>
        <!-- <el-table-column align="center" label="实际放款日期" prop="actualLoanDate" min-width="150" :formatter="dateFormat">
        </el-table-column> -->
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
    'dialog-creditend': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogCreditend')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      filedetails: {}, // 附件数据
      widthArr: {
        companyName: '120',
        loanId: '120',
        loanTypeName: '100',
        applyAmt: '150',
        currencyName: '80',
        statusName: '80',
        repaymentType: '150',
        loanAmt: '100',
        payPrincipalAmt: '100',
        payInterestAmt: '100',
        payServiceAmt: '100',
        payFineAmt: '100',
        payFineDays: '100',
        prepaymentDeductInterest: '100',
        periodReliefAmt: '100',
        totalRepayAmt: '120',
        contractSignedDate: '150',
        repayDate: '150',
        actualRepayAmt: '120',
        actualRepayDate: '150',
        actualLoanDate: '150'
      }
    }
  },
  computed: {
    // comDatas: function () {
    //   const datas = this.getOpera(this.dataTable)
    //   return datas
    // }
  },
  filters: {
    filterNum: thousand
  },
  methods: {
    // 子table列表背景色
    // getColor ({row, rowIndex}) {
    //   return 'expendcolor'
    // },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/creditLoan/queryCreditLoanInfo.do', { loanId: val.loanId }).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
          val.infoLoading = false
        }
      })
    },
    fresh () {
      this.$emit('refresh')
    }
  }
}

// 该页面中的子table中还款本金金额单独格式化
function thousand (val) {
  var regex = /(\d)(?=(\d{3})+$)/g
  var result
  if (typeof val === 'string') {
    let str = val
    if (str.indexOf('.') === -1) {
      result = str.replace(regex, '$1,') + '.00'
    } else {
      var newStr = str.split('.')
      var str2 = newStr[0].replace(regex, '$1,')
      if (newStr[1].length <= 1) {
        // 小数点后只有一位时
        result = str2 + '.' + newStr[1] + '0'
      } else if (newStr[1].length > 1) {
        // 小数点后两位以上时
        var decimals = newStr[1].substr(0, 2)
        result = str2 + '.' + decimals
      }
    }
  } else if (typeof val === 'number') {
    // 当金额为0的时候，不显示
    if (val === 0) {
      return ''
    }
    return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  } else if (val === undefined || val === null || val === '') {
    return ''
  }
  return result
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
