<template>
  <div class="ar-table">
    <header>
    </header>
    <!-- 合同确认 -->
    <dialog-contract :visible-p.sync="dialogContractVisible" :details-p="detailsContract"></dialog-contract>
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table ref="table" :data="comDatas" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">

              </el-table-column>
              <el-table-column align="center" width="40">
              </el-table-column>
              <el-table-column align="center" prop="loanId" :width="widthArr.loanId">
              </el-table-column>
              <el-table-column align="right" prop="applyAmt" :formatter="regexNum" :width="widthArr.applyAmt">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.currencyDesc" >
              </el-table-column>
              <el-table-column align="center" prop="status" :width="widthArr.status">
              </el-table-column>
              <el-table-column align="center" prop="repaymentType" :width="widthArr.repaymentType">
              </el-table-column>
              <el-table-column align="right" prop="loanAmt" :formatter="regexNum" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="right" prop="payPrincipalAmt" :formatter="regexNum" :width="widthArr.payPrincipalAmt">
              </el-table-column>
              <el-table-column align="right" prop="payInterestAmt" :formatter="regexNum" :width="widthArr.payInterestAmt">
              </el-table-column>
              <el-table-column align="right" prop="payServiceAmt" :formatter="regexNum" :width="widthArr.payServiceAmt">
              </el-table-column>
              <el-table-column align="right" prop="payFineAmt" :formatter="regexNum" :width="widthArr.payFineAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineDays" :width="widthArr.payFineDays">
              </el-table-column>
              <el-table-column align="right" prop="prepaymentDeductInterest" :formatter="regexNum" :width="widthArr.prepaymentDeductInterest">
              </el-table-column>
              <el-table-column align="right" prop="totalRepayAmt" :formatter="regexNum" :width="widthArr.totalRepayAmt">
              </el-table-column>
              <el-table-column align="center" prop="contractSignedDate" :width="widthArr.contractSignedDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="repayDate" :width="widthArr.repayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="left" label-align="center" width='200px'>
                <!-- <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row, true)" >详情</el-button>
                  <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template> -->
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" fixed width="40">
        </el-table-column> -->
        <el-table-column
          type="index"
          label="序号"
          fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed sortable prop="loanId" width="150">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="贴现申请金额" prop="applyAmt" width="150" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实放金额" prop="loanAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款本金" prop="payPrincipalAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款利息" prop="payInterestAmt" :formatter="regexNum"  width="120">
        </el-table-column>
         <el-table-column align="right" header-align="center" label="还款服务费" prop="payServiceAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="罚息" prop="payFineAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="提前还款手续费" prop="prepaymentDeductInterest" :formatter="regexNum" width="120">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款合计" prop="totalRepayAmt" :formatter="regexNum"  width="120">
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button v-for="(item, index) in scope.row.operateArr" :key="index"  size="mini" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button>
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
import { firstToUpperCase, debounce, getDataBase } from '@/util/util' // 首字母大写 防抖函数
import widhConf from '@/config/width' // 宽度配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/orderLoan/loan/DialogContract'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/orderLoan/loan/DialogInfo')
  },
  data () {
    console.log(widhConf.crL)
    return {
      dialogContractVisible: false, // 控制合同窗
      dialogInfoVisible: false,
      detailsContract: '', // 合同数据
      multipleSelection: [], // 选择的数据
      details: {}, // 详情数据
      operateArr: [
        { key: 'cancle', name: '取消' },
        { key: 'contract', name: '合同确认' }
      ], // 操作数据
      widthArr: widhConf.crL // 宽度配置
    }
  },
  computed: {
    comDatas: function () {
      const datas = this.getOpera(this.dataTable)
      return datas
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
    // 更多事件
    handleCommand (obj) {
      let key = `handle${firstToUpperCase(obj.key)}` // 方法为handle+ key首字母大写化组成
      // 执行方法
      this[key](obj.idx, obj.val)
    },
    // 取消转让
    handleCancle: handleCancle,
    // 合同确认
    handleContract: debounce(handleContract, 1000, true),
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    },
    // 按钮处理
    getOpera: getOpera
  }
}
// 详情函数
function handleInfo (idx, val) {
  let param = {
    loanId: val.loanId
  }
  // 获取数据
  getDataBase.call(this, '/creditLoan/queryCreditLoanInfo.do', param, true).then(res => {
    if (res) {
      console.log(res)
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}
// 取消转让
function handleCancle (idx, val) {
  this.$confirm(`点击确认，则取消${val.loanId}融资的申请？`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postBase('/supplierOrderLoan/supplierOrderCancelCreditDiscount.do', { loanId: val.loanId })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 合同确认
function handleContract (idx, val) {
  let param = {
    loanId: val.loanId
  }
  // 获取数据
  getDataBase.call(this, '/creditLoan/queryCreditLoanInfo.do', param, true).then(res => {
    if (res) {
      console.log(res)
      // 标题赋值
      res.masterChainId = val.loanId
      this.detailsContract = res
      this.dialogContractVisible = true
    }
  })
}
/* 按钮菜单显隐处理
  ** val 节点数据
  ** ischild 是否是子数据
*/
function getOpera (val) {
  const datas = val
  datas.forEach((item) => {
    const operateArr = []
    switch (Number(item.status)) {
      case 22:
        operateArr.push(this.operateArr[0])
        break
      case 23:
        operateArr.push(this.operateArr[1])
        break
      default:
        break
    }
    item.operateArr = operateArr
  })
  return datas
}
</script>
