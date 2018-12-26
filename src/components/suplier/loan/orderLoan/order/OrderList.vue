<template>
  <div class="ar-table" ref="resizeContext">
    <header>
      <el-form ref="ordform" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="已选订单金额合计(元)">
          {{displaySumAmt}}
        </el-form-item>
        <el-form-item>
          <el-button plain="" size="small" @click="handleClearSelection">取消已勾选</el-button>
        </el-form-item>
        <el-form-item label="融资金额合计(元)" :rules="amtRule" prop="applyAmt">
          <el-input class="wd-200" v-model.number="displayApplyAmt" @blur="handleChange" @focus="handleFocus"></el-input>
        </el-form-item>
        <el-form-item label="还款日期" :rules="{required: true, message: '请选择日期', trigger: 'blur'}" prop="repayDate">
          <el-date-picker :editable="false" v-model="formInline.repayDate"  :picker-options="pickerOptions" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="handleSub" type="primary" :disabled="isover">融资确认</el-button>
        </el-form-item>
      </el-form>
    </header>
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <!-- 融资确认信息 -->
    <!-- <dialog-loan :visible-p.sync="dialogLoanVisible" :details-p="loanDetails" ></dialog-loan> -->
    <section>
      <el-table ref="table" :data="comDatas" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        row-key="poNumber"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
        <el-table-column type="selection" fixed width="40" :selectable="disableHandle" :reserve-selection="true">
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="No."  fixed width="50">
        </el-table-column>
        <el-table-column align="center" label="订单号" fixed prop="poNumber" width="150" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="下单法人代码" prop="corpCode" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="下单法人名称" prop="corpName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="订单金额" prop="poAmount" width="150" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" width="80" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="订单确认日期" prop="confirmDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="约定交货日期" prop="deliveryDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="交易条件" prop="paymenttermName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width='80px' class-name="" fixed="right" :resizable="false">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<style scoped lang="scss">
header {
  text-align: right;
  padding-bottom: 20px;
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
.wd-200 {
  width: 200px;
}
.red {
  color: red;
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
import { debounce, getDataBase, postDataBase, thousandth } from '@/util/util' // 首字母大写 防抖函数
import { validatenumber } from '@/util/validate' // 首字母大写 防抖函数
import widhConf from '@/config/width' // 宽度配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-loan': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/orderLoan/order/DialogLoan'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/orderLoan/order/DialogInfo')
  },
  data () {
    console.log(widhConf.crL)
    return {
      dialogInfoVisible: false, // 详情显示
      multipleSelection: [], // 选择的数据
      details: {}, // 详情数据
      // dialogLoanVisible: false, // 融资显示
      // loanDetails: {}, // 融资数据
      widthArr: widhConf.crL, // 宽度配置
      displaySumAmt: '0.00', // 已选总金额
      displayApplyAmt: '',
      // 表单数据
      formInline: {
        applyAmt: '', // 融资申请金额
        repayDate: null // 还款日期
      },
      // 日期选择器配置
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      flag: true, // 输入框自动更新标记
      isover: false // 超出总金额
    }
  },
  computed: {
    comDatas: function () {
      return this.dataTable.map(function (item, index, arr) {
        item.idx = index
        return item
      })
    },
    amtRule: function () {
      var checkMax = (rule, value, callback) => {
        if (value && !validatenumber(value)) {
          return callback(new Error('请输入正确的金额'))
        }
        if (this.isover) {
          return callback(new Error('金额不能大于订单合计金额'))
        }
        return callback()
      }
      return [
        { validator: checkMax, trigger: 'blur' }
      ]
    }
  },
  methods: {
    // 选中项改变事件
    handleSelectionChange: debounce(handleSelectionChange, 1000),
    // 输入金额事件
    handleChange: handleChange,
    // 聚焦事件
    handleFocus: resetInput,
    // 融资确认
    handleSub: handleSub,
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
    // 是否可选择
    disableHandle: disableHandle,
    handleClearSelection: clearSelection,
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    }
  }
}
// 详情函数
function handleInfo (idx, val) {
  let param = {
    vendorCode: val.vendorCode, // 供应商代码
    poNumber: val.poNumber, // 订单号
    poItem: val.poItem, // 项次
    plantCode: val.plantCode // 法人工厂代码
  }
  // 获取数据
  getDataBase.call(this, '/supplierOrderLoan/availableSupplierOrderDetail.do', param, true).then(res => {
    if (res) {
      console.log(res)
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}
// 选中项改变事件
function handleSelectionChange (val) {
  // 总金额
  let amount = 0
  console.log(this.multipleSelection)
  this.multipleSelection = val
  // this.multipleSelection.sort((a, b) => {
  //   return a.idx - b.idx
  // })
  console.log(this.multipleSelection)
  // 遍历选择项
  val.forEach(item => {
    amount += item.poAmount // 金额累加
  })
  // 输入框赋值总金额
  if (this.flag) {
    // 校验重置
    this.$refs.ordform.clearValidate()
    // 判断金额是否大于勾选金额
    if (amount < this.formInline.applyAmt) {
      this.isover = true
      this.$refs.ordform.validateField('applyAmt', res => {
      })
    } else {
      this.isover = false
    }
    // 格式化
    this.displaySumAmt = thousandth(amount)
  }
}
// 输入金额事件
function handleChange (val) {
  // 赋值
  this.formInline.applyAmt = this.displayApplyAmt
  // 格式化
  this.displayApplyAmt = this.displayApplyAmt === '' ? '0.00' : thousandth(this.displayApplyAmt)
  // 关闭输入框自动更新
  // this.flag = false
  let sum = 0
  for (let index = 0; index < this.multipleSelection.length; index++) {
    const element = this.multipleSelection[index]
    sum += element.poAmount
  }
  console.log(sum)
  if (sum < this.formInline.applyAmt) {
    this.isover = true
  } else {
    this.isover = false
  }
  // ***************************************************************************金额改变勾选项
  // let sum = computeMethod.call(this, this.multipleSelection)
  // if (sum < this.formInline.applyAmt) {
  //   computeMethod.call(this, this.comDatas)
  // }
  // 开启输入框自动更新
  updateOpen.call(this)
}
// *****************************************金额选中项联动
// function computeMethod (data) {
//   let sum = 0
//   let selectAuto = []
//   // 清除选中项
//   this.$refs.table.clearSelection()
//   for (let index = 0; index < data.length; index++) {
//     // 不是人民币时跳出
//     if (data[index].currencyId !== 1) {
//       continue
//     }
//     const element = data[index]
//     sum += element.poAmount
//     // 加入选中项
//     this.$refs.table.toggleRowSelection(element)
//     selectAuto.push(element)
//     // 判断大小
//     if (sum >= this.formInline.applyAmt) { // 所选金额超出填写金额
//       this.multipleSelection = selectAuto // 赋值
//       this.isover = false
//       // 跳出循环
//       break
//     } else {
//       this.isover = true
//     }
//   }
//   return sum
// }
// 更新开启
function updateOpen () {
  setTimeout(() => {
    this.flag = true
  }, 1000)
}
// 输入框恢复数字
function resetInput () {
  this.displayApplyAmt = this.formInline.applyAmt
}
// 确认事件
function handleSub () {
  if (this.multipleSelection.length === 0) {
    this.$alert(`未勾选订单!`, '系统提示', {
      confirmButtonText: '确定',
      callback: action => {
      }
    })
    return
  }
  this.$refs.ordform.validate((valid) => {
    if (valid) {
      // *****************************************弹窗确认
      // 设置数据
      // let sum = 0
      // let flag = true
      // for (let index = 0; index < this.multipleSelection.length; index++) {
      //   console.log(index)
      //   const element = this.multipleSelection[index]
      //   sum += element.poAmount
      //   console.log(sum)
      //   if (this.formInline.applyAmt >= sum) {
      //     element.applyPoAmount = element.poAmount
      //   } else if (flag) {
      //     element.applyPoAmount = element.poAmount + this.formInline.applyAmt - sum
      //     flag = false
      //   } else {
      //     element.applyPoAmount = 0
      //   }
      // }
      // let param = Object.assign({}, this.formInline, { poLoanInfoList: this.multipleSelection })
      // this.loanDetails = param
      // this.dialogLoanVisible = true
      // if (this.dialogLoanVisible) {
      //   return
      // }
      this.$confirm(`您好，请问是否确认申请${thousandth(this.formInline.applyAmt)}元人民币的订单信用融资？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 设置数据
        let sum = 0
        let flag = true
        for (let index = 0; index < this.multipleSelection.length; index++) {
          console.log(index)
          const element = this.multipleSelection[index]
          sum += element.poAmount
          console.log(sum)
          if (this.formInline.applyAmt >= sum) {
            element.applyPoAmount = element.poAmount
          } else if (flag) {
            element.applyPoAmount = element.poAmount + this.formInline.applyAmt - sum
            flag = false
          } else {
            element.applyPoAmount = 0
          }
        }
        let param = Object.assign({}, this.formInline, { poLoanInfoList: this.multipleSelection })
        console.log(param)
        postDataBase.call(this, 'supplierOrderLoan/supplierOrderApplyDiscount.do', param, true).then(res => {
          if (res.data.status) {
            // 成功刷新数据
            this.fresh()
            this.handleClearSelection()
            // 点击操作成功重置输入框的值和日期
            this.displayApplyAmt = ''
            this.formInline.repayDate = null
            if (this.$refs.ordform) {
              this.$refs.ordform.resetFields()
            }
          } else {
            // 点击操作失败重置输入框的值和日期
            this.displayApplyAmt = ''
            this.formInline.repayDate = null
            if (this.$refs.ordform) {
              this.$refs.ordform.resetFields()
            }
          }
        })
      }).catch((err) => {
        // 重置输入框的值和日期
        this.displayApplyAmt = ''
        this.formInline.repayDate = null
        if (this.$refs.ordform) {
          this.$refs.ordform.resetFields()
        }
        console.log(err)
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    }
  })
}
// 可选项（金额为人民币）
function disableHandle (row, index) {
  let result = row.currencyId === 1
  return result
}
function clearSelection () {
  this.$refs.table.clearSelection()
}
</script>
