<template>
  <div class="ar-table">
    <header>
      <el-form ref="ordform" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="融资金额合计" :rules="amtRule" prop="applyAmt">
          <el-input class="wd-200" v-model="formInline.applyAmt" @change="handleChange"></el-input>元
        </el-form-item>
        <el-form-item label="还款日期" :rules="{required: true, message: '请选择日期', trigger: 'blur'}" prop="repayDate">
          <el-date-picker :editable="false" v-model="formInline.repayDate"  :picker-options="pickerOptions" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button round @click="handleSub" :disabled="isover">融资确认</el-button>
        </el-form-item>
      </el-form>
      <!-- <span>融资金额合计:</span>
      <el-input class="wd-200" :class="isover ? 'red': ''" v-model.number="formInline.applyAmt" @change="handleChange">
      </el-input>元
      <span>还款日期:</span>
      <el-date-picker :editable="false" v-model="formInline.repayDate"  :picker-options="pickerOptions" type="date" placeholder="选择日期"></el-date-picker>
      <el-button round @click="dialogConfirmVisible = true" :disabled="isover">融资确认</el-button> -->
    </header>
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table ref="table" :data="comDatas" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle">
        <el-table-column type="selection" fixed width="40">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="订单号" fixed prop="poNumber" width="150">
        </el-table-column>
        <el-table-column align="center" label="项次" prop="poItem" width="150">
        </el-table-column>
        <el-table-column align="center" label="法人代码" prop="corpCode">
        </el-table-column>
        <el-table-column align="center" label="法人单位" prop="corpName">
        </el-table-column>
        <el-table-column align="center" label="金额" prop="poAmount">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="订单确认日期" prop="confirmDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="约定交货日期" prop="deliveryDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="交易条件" prop="paymenttermName">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width='200px' class-name="">
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
import Common from '@/mixins/common'
import { firstToUpperCase, debounce, getDataBase, postDataBase } from '@/util/util' // 首字母大写 防抖函数
import { validatenumber } from '@/util/validate' // 首字母大写 防抖函数
import widhConf from '@/config/width' // 宽度配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogContract'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/orderLoan/order/DialogInfo')
  },
  data () {
    console.log(widhConf.crL)
    return {
      dialogInfoVisible: false, // 详情显示
      multipleSelection: [], // 选择的数据
      details: {}, // 详情数据
      widthArr: widhConf.crL, // 宽度配置
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
      return this.dataTable
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
    // 融资确认
    handleSub: handleSub,
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
    // 更多事件
    handleCommand (obj) {
      let key = `handle${firstToUpperCase(obj.key)}` // 方法为handle+ key首字母大写化组成
      // 执行方法
      this[key](obj.idx, obj.val)
    },
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    }
  }
}
// 详情函数
function handleInfo (idx, val) {
  // 获取数据
  getDataBase.call(this, '/creditLoan/queryCreditLoanInfo.do', val.loanId, true).then(res => {
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
  this.multipleSelection = val
  console.log(this.multipleSelection)
  // 遍历选择项
  val.forEach(item => {
    amount += item.poAmount // 金额累加
  })
  // 输入框赋值总金额
  if (this.flag) {
    this.formInline.applyAmt = amount
  }
}
// 输入金额事件
function handleChange () {
  // 关闭输入框自动更新
  this.flag = false
  // 置0
  this.multipleSelection = []
  let sum = 0
  // 清除选中项
  this.$refs.table.clearSelection()
  for (let index = 0; index < this.comDatas.length; index++) {
    const element = this.comDatas[index]
    sum += element.poAmount
    // 加入选中项
    this.$refs.table.toggleRowSelection(element)
    this.multipleSelection.push(element)
    // 判断大小
    if (sum >= this.formInline.applyAmt) {
      this.isover = false
      // 跳出循环
      break
    } else {
      this.isover = true
    }
  }
  // 开启输入框自动更新
  setTimeout(() => {
    this.flag = true
  }, 1000)
}
// 确认事件
function handleSub () {
  this.$refs.ordform.validate((valid) => {
    if (valid) {
      this.$confirm(`您好，请问是否确认申请${this.formInline.applyAmt}元人民币的订单信用融资？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 设置数据
        let selected = []
        this.multipleSelection.forEach(item => {
          selected.push(item.poNumber)
        })
        let param = Object.assign({}, this.formInline, { slorder: selected })
        console.log(param)
        postDataBase.call(this, 'creditLoan/supplierOrderApplyDiscount.do', param, true).then(res => {
          if (res.data.status) {
            // 成功刷新数据
            this.fresh()
          }
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    }
  })
}
</script>
