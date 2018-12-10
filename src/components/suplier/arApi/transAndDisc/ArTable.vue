<template>
  <article class="body">
    <!-- 表格区域-头部区域 -->
    <header v-if="operateType===1">
      <el-form ref="ordform" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button round type="primary" @click="handleTrans">转让</el-button>
        </el-form-item>
        <el-form-item label="待转让金额(元)">{{displayTransAmt}}</el-form-item>
        <el-form-item label="当前已选金额(元)">{{displaySumAmt}}</el-form-item>
        <el-form-item>
          <el-button round size="small" @click="handleClearSelection">取消已勾选</el-button>
        </el-form-item>
      </el-form>
    </header>
    <!-- 弹窗块 -->
    <!-- 转让 -->
    <dialog-transfer ref="dialog-trans" :visible-p.sync="visibleTrans" :details-p="tableTrans"></dialog-transfer>
    <dialog-transfer-tg
      ref="dialog-trans-tg"
      :visible-p.sync="visibleTransGou"
      :details-p="detailsTG"
    ></dialog-transfer-tg>
    <!-- 贴现 -->
    <dialog-discount ref="dialog-disc" :visible-p.sync="visibleDisc" :details-p="detailsDisc"></dialog-discount>
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <!-- 表格区域-主体区域 -->
    <section>
      <!-- 表格区 -->
      <el-table
        ref="table"
        :data="comDatas"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        border
        style="width: 100%"
        row-key="masterChainId"
        @selection-change="handleSelectionChange"
        @select-all="handleSelectAll"
      >
        <el-table-column
          v-if="operateType===1"
          type="selection"
          fixed
          width="40"
          :selectable="disableHandle"
          :reserve-selection="true"
        ></el-table-column>
        <el-table-column type="index" label="序号" fixed width="40"></el-table-column>
        <el-table-column
          align="center"
          label="AR单号"
          fixed
          prop="masterChainId"
          width="150"
          :formatter="nullDealWith"
        ></el-table-column>
        <el-table-column
          align="center"
          label="结报单号"
          prop="billId"
          width="150"
          :formatter="nullDealWith"
        ></el-table-column>
        <el-table-column align="center" label="来源" prop="arSourceDesc" :formatter="nullDealWith"></el-table-column>
        <el-table-column align="center" label="付款单位" prop="companyName" :formatter="nullDealWith"></el-table-column>
        <el-table-column
          align="center"
          label="保理方"
          prop="factoringCustName"
          :formatter="nullDealWith"
        ></el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" :formatter="nullDealWith"></el-table-column>
        <el-table-column
          align="right"
          header-align="center"
          label="票面金额"
          prop="billBookAmt"
          :formatter="regexNum"
          width="120"
        ></el-table-column>
        <el-table-column
          align="right"
          header-align="center"
          label="可用余额"
          prop="loanAmt"
          :formatter="regexNum"
          width="120"
        ></el-table-column>
        <el-table-column align="center" label="票据到期日" prop="billPayDate" :formatter="dateFormat"></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="操作"
          width="100px"
          class-name
          fixed="right"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button
              v-if="operateType===2"
              size="mini"
              type="text"
              @click="handleDisc(scope.$index, scope.row)"
            >贴现</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </article>
</template>
<style scoped lang="scss">
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
import { thousandth, debounce } from '@/util/util' // 首字母大写 防抖函数
import { cloneDeep } from 'lodash/fp'
/* 我的Ar列表 */
export default {
  props: {
    dataLoading: Boolean,
    dataTable: [Object, Array],
    operateType: {// operateType:1转让，2贴现
      type: Number,
      default: 1
    },
    query: Object // 外部标识等参数
  },
  mixins: [TableMixIn, Common],
  components: {
    'dialog-transfer': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/arApi/transAndDisc/DialogTransfer'),
    'dialog-transfer-tg': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/arApi/transAndDisc/DialogTransferTg'),
    'dialog-discount': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/arApi/transAndDisc/DialogDiscount'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/arApi/transAndDisc/DialogInfoMy')
  },
  data () {
    return {
      // 表单数据
      displaySumAmt: '0.00', // 已选总金额
      visibleTrans: false, // 控制转账窗
      visibleTransGou: false, // 控制购入转账窗
      visibleDisc: false, // 控制贴现窗
      dialogInfoVisible: false,
      tableTrans: {
        arInvoiceList: [{
          masterChainId: '', // 唯一標識當前ar
          companyName: '', // 付款单位
          billPayDate: null, // 预计回款日期
          billBookAmt: null, // 票面金额
          loanAmt: null, // 可用金额
          invoiceNo: '', // 发票号
          afterTaxAmt: null, // 发票金额
          availableAfterTaxAmt: null, // 可用发票金额
          transferAfterTaxAmt: null, // 转让发票金额
          billBookCurr: null, // AR币别
          currencyName: '', // AR货币英文名稱
          currencyDesc: '', // AR货币中文名稱
          currencyUnitName: '' // AR货币单位名称
        }]
      }, // 转账数据
      detailsTG: {
        arInvoiceList: [{
          masterChainId: '', // 唯一標識當前ar
          companyName: '', // 付款单位
          billPayDate: null, // 预计回款日期
          billBookAmt: null, // 票面金额
          loanAmt: null, // 可用金额
          invoiceNo: '', // 发票号
          afterTaxAmt: null, // 发票金额
          availableAfterTaxAmt: null, // 可用发票金额
          transferAfterTaxAmt: null, // 转让发票金额
          billBookCurr: null, // AR币别
          currencyName: '', // AR货币英文名稱
          currencyDesc: '', // AR货币中文名稱
          currencyUnitName: '' // AR货币单位名称
        }],
        transAmt: '',
        interfaceTransSerial: ''
      }, // 购入转账数据
      detailsDisc: '', // 贴现数据
      multipleSelection: [], // 已选项
      details: {} // 详情数据
    }
  },
  computed: {
    comDatas: function () {
      const datas = this.dataTable.arList
      return datas
    },
    displayTransAmt: function () { // 待转总金额
      return this.dataTable.transAmt
    }
  },
  methods: {
    /* 表格区 */
    handleClearSelection: clearSelection, // 清除已勾选
    // 选中项改变事件
    handleSelectionChange: debounce(handleSelectionChange, 500),
    // 是否可选择
    disableHandle: disableHandle,
    // 详情
    handleInfo: handleInfo,
    // 转让
    handleTrans: handleTrans,
    // 贴现
    handleDisc: handleDisc,
    // 全选
    handleSelectAll: handleSelectAll
  }
}
// 详情函数
function handleInfo (idx, val, isChild = false) {
  // 获取数据
  if (this.operateType === 1) {
    getDetail.apply(this, ['multiArManager/arInfoDetail.do', val.masterChainId]) // 转让
  } else {
    getDetail.apply(this, ['multiArManager/arInfoDetail2Discount.do', val.masterChainId]) // 贴现
  }
}
// 显示转让
function handleTrans () {
  if (this.multipleSelection.length === 0) {
    this.$message({
      message: '请至少选择一笔单进行作业',
      type: 'warning'
    })
    return true
  }
  var _this = this
  var data = {
    arList: _this.multipleSelection,
    interfaceTransSerial: _this.query.interfaceTransSerial
  }
  // 2018-12-4 by:xyl
  this.getLoanDetail('/multiArTransferManager/multiArTransView.do', data).then(function (res) {
    _this.tableTrans = cloneDeep(res)
    _this.visibleTrans = true
    setTimeout(function () {
      _this.$refs['dialog-trans'].$refs.tableTrans.toggleAllSelection()
      // 全选改变转让金额恢复
      setTimeout(() => {
        _this.tableTrans.arInvoiceList.forEach((val, idx) => {
          val.transferAfterTaxAmt = res.arInvoiceList[idx].transferAfterTaxAmt
        })
        // 赋值总金额
        setDialogSumAmt.call(_this, 'dialog-trans', res)
      }, 300)
      // _this.$refs['dialog-trans'].displaySumAmtTrans = thousandth(getSum(_this.tableTrans.arInvoiceList, 'transferAfterTaxAmt'))
    }, 500)
  }).catch(function (error) {
    console.log(error)
  })
  // 2018-11-30 by:xyl
  // this.getLoanDetail('/multiArTransferManager/multiArTransView.do', data).then(function (res) {
  //   _this.detailsTG = res
  //   _this.visibleTransGou = true
  //   // 赋值总金额
  //   setDialogSumAmt.call(_this, 'dialog-trans-tg')
  //   // _this.$refs['dialog-trans-tg'].displaySumAmtTrans = thousandth(getSum(_this.detailsTG.arInvoiceList, 'arTransferAmt'))
  // }).catch(function (error) {
  //   console.log(error)
  // })
  // 2018-11-30 by:xyl
  // if (this.multipleSelection[0].isMasterAr === 1) {
  //   // 获取自有数据
  //   this.getLoanDetail('/multiArTransferManager/multiArTransViewOwn.do', data).then(function (res) {
  //     _this.tableTrans = res
  //     _this.visibleTrans = true
  //     setTimeout(function () {
  //       _this.$refs['dialog-trans'].$refs.tableTrans.toggleAllSelection()
  //       // 赋值总金额
  //       setDialogSumAmt.call(_this, 'dialog-trans')
  //       // _this.$refs['dialog-trans'].displaySumAmtTrans = thousandth(getSum(_this.tableTrans.arInvoiceList, 'transferAfterTaxAmt'))
  //     }, 500)
  //   }).catch(function (error) {
  //     console.log(error)
  //   })
  // } else {
  //   // 获取购入数据
  //   this.getLoanDetail('/multiArTransferManager/multiArTransViewPurchased.do', data).then(function (res) {
  //     _this.detailsTG = res
  //     _this.visibleTransGou = true
  //     // 赋值总金额
  //     setDialogSumAmt.call(_this, 'dialog-trans-tg')
  //     // _this.$refs['dialog-trans-tg'].displaySumAmtTrans = thousandth(getSum(_this.detailsTG.arInvoiceList, 'arTransferAmt'))
  //   }).catch(function (error) {
  //     console.log(error)
  //   })
  // }
}
function setDialogSumAmt (dialog) {
  console.log(dialog)
  console.log(this.tableTrans)
  console.log(this.detailsTG)
  let data = dialog === 'dialog-trans' ? this.tableTrans.arInvoiceList : this.detailsTG.arInvoiceList
  this.$refs[dialog].displaySumAmtTrans = thousandth(getSum(data, 'transferAfterTaxAmt'))
}
// 贴现
function handleDisc (idx, val) {
  var _this = this
  var param = {
    arList: [val],
    interfaceTransSerial: _this.query.interfaceTransSerial
  }
  // 获取数据
  this.getLoanDetail('/multiArDiscountManager/multiArDiscountView.do', param).then(function (res) {
    _this.detailsDisc = res
    console.log('贴现总金额', res.discountTotalCreditAmt)
    console.log(_this.$refs)
    _this.$refs['dialog-disc'].maxSum = res.discountTotalCreditAmt
    _this.visibleDisc = true
  }).catch(function (error) {
    console.log(error)
  })
}
/** 清除选中项 **/
function clearSelection () {
  this.$refs.table.clearSelection()
}
// 主列表选中项改变事件
function handleSelectionChange (val) {
  this.multipleSelection = val
  // 输入框赋值总金额
  this.displaySumAmt = thousandth(getSum(val, 'loanAmt'))
}
/**
 * 加总金额
 * val 数组
 * tag 加总的属性
 */
function getSum (val, tag) {
  // 遍历选择项
  // 2.计算勾选发票金额
  var sum = val.reduce(function (sum, currVal) {
    var num = Number(currVal[tag])
    if (isNaN(num)) {
      return
    }
    return sum + num * 100
  }, 0) / 100
  // val.forEach(function (item) {
  //   amount += Number(item[tag]) * 100 // 金额累加
  // })
  // amount = amount / 100
  console.log(sum)
  return sum // 返回
}
// 可选项（金额为人民币）
function disableHandle (row, index) {
  if (this.multipleSelection.length === 0) {
    return true
  }
  var result = row.currency === this.multipleSelection[0].currency &&
    row.factoringCustId === this.multipleSelection[0].factoringCustId
  return result
}
// 全选中事件
function handleSelectAll (val) {
  const _this = this
  // 1.选中
  if (val.length > 0 && _this.multipleSelection.length === 0) {
    // 1.1清除所有选中
    console.log(this.$refs.table)
    this.$refs.table.clearSelection()
    // 1.2勾选全部与第一个类型相同的
    _this.comDatas.forEach(function (item, idx) {
      if (val[0].isMasterAr === item.isMasterAr && item.currency === val[0].currency && item.companyName === val[0].companyName) {
        _this.$refs.table.toggleRowSelection(item)
      }
    })
  } else { // 2.未选择
  }
}
function getDetail (url, val) {
  var param = {
    masterChainId: val,
    interfaceTransSerial: this.query.interfaceTransSerial
  }
  // 获取数据
  this.getLoanDetail(url, param).then((res) => {
    if (res) {
      this.details = res
      this.dialogInfoVisible = true
    }
  }).catch(function (error) {
    console.log(error)
  })
}
</script>
