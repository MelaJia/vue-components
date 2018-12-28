<template>
  <div class="ar-table" ref="resizeContext">
    <header>
    </header>
    <!-- 合同确认 -->
    <dialog-contract :visible-p.sync="dialogContractVisible" :details-p="detailsContract"></dialog-contract>
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" :show-repay-btn="true"></dialog-info>
    <section>
      <el-table ref="table" :data="comDatas" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
        <el-table-column
          type="index"
          align="center"
          label="No."  fixed width="50">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed  prop="loanId" min-width="150" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName" :formatter="nullDealWith" width="80">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" :formatter="nullDealWith" width="80">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="申请金额" prop="applyAmt" min-width="150" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实放金额" prop="loanAmt" :formatter="regexNum"  min-width="150">
        </el-table-column>
        <el-table-column align="center" label="申请日期" prop="applyDate" :formatter="dateFormat" min-width="120">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="操作" width='112px' class-name="" fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" type="text" v-for="(item, index) in scope.row.operateArr" :key="index"  @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button>
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
import Common from '@/mixins/common/common'
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
    this.postResultFresh('/supplierOrderLoan/supplierOrderCancelCreditDiscount.do', { loanId: val.loanId })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 合同确认
function handleContract (idx, val) {
  if (val.repayDate === undefined || val.repayDate === null || val.repayDate === '') {
    this.$alert(`请先生成合同再进行合同确认!`, '系统提示', {
      confirmButtonText: '确定',
      callback: action => {
      }
    })
    return
  } else if (new Date(val.repayDate) <= new Date()) {
    this.$alert(`抱歉，还款日期已过，无法进行此操作，请重新确认`, '系统提示', {
      confirmButtonText: '确定',
      callback: action => {
      }
    })
    return
  }
  let param = {
    loanId: val.loanId
  }
  // 获取数据
  getDataBase.call(this, '/creditLoan/queryCreditLoanInfo.do', param, true).then(res => {
    if (res) {
      console.log(res)
      // 标题赋值
      res.masterChainId = val.loanId
      this.detailsContract = Object.assign(res, {factoringCustName: val.factoringCustName})
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
