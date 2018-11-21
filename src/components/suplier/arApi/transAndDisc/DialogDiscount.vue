<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
                  <span class="title">
                      贴现
                  </span>
                </header>
                <section>
                  <ul>
                    <span>付款单位: <em>{{detailsPC.arList[0].companyName}}</em></span>
                  </ul>
                  <ul>
                    <li>
                      <span>AR来源: <em>{{detailsPC.arList[0].arSourceDesc}}</em></span>
                    </li>
                    <li>
                      <span>状态: <em>{{detailsPC.arList[0].arStatusTypeName}}</em></span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>币别: <em>{{detailsPC.arList[0].currencyDesc}}</em></span>
                    </li>
                    <li>
                      <span>预计回款日期: <em>{{detailsPC.arList[0].billPayDate | dateFormat}}</em></span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>票面金额: <em>{{detailsPC.arList[0].billBookAmt | regexNum}}</em></span>
                    </li>
                    <li>
                      <span>可用金额: <em>{{detailsPC.arList[0].loanAmt | regexNum}}</em></span>
                    </li>
                  </ul>
                  <ul>
                    <span>贴现保理公司：{{detailsPC.arList[0].custToName}}</span>
                  </ul>
                  <ul class="height-auto">
                      <span>已用发票:
                        <div class="el-check-group inline-block">
                          <el-checkbox v-for="item in detailsPC.arList[0].usedInvoiceList" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}(金额：{{item.afterTaxAmt |regexNum}})</el-checkbox>
                        </div>
                      </span>
                  </ul>
                  <ul class="height-auto">
                      <span>可用发票:
                        <el-checkbox-group v-model="checkList" class="inline-blox" @change="handleCheckedChange">
                          <el-checkbox v-for="item in detailsPC.arList[0].availableInvoiceList" :key="item.invoiceNo" :label="item.invoiceNo">{{item.invoiceNo}}(金额：{{item.afterTaxAmt |regexNum}})</el-checkbox>
                        </el-checkbox-group>
                        <!-- <el-checkbox v-for="item in detailsPC.invoiceList" :key="item.invoiceNo" v-model="item.invoiceIsSelected">{{item.invoiceNo}}</el-checkbox> -->
                      </span>
                  </ul>
                </section>
                <el-form class="layout form text-align-left" label-width="100px">
                  <el-row>
                    <el-col :span="8" class="flex">
                      <el-form-item label="贴现金额(元):" prop="receiveCustId">
                        <el-jx-input :autofocus="true" v-model='arAmt' placeholder=''
                          @input.native="handleInputDisc"
                          >
                        </el-jx-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="maxSum">
                        <label class="sum-content">金额上限:{{maxSum | regexNum}}</label>
                    </el-col>
                  </el-row>
                </el-form>
                <footer slot="footer" :style="'clear:both'">
                  <el-button type="primary" @click="handleSubmitDisc">确认</el-button>
                  <el-button type="default" @click="handleClose">取消</el-button>
                </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.layout.form {
  margin-top: 20px;
  padding-left: 15px;
  .el-row {
    margin-bottom: 20px;
    padding-left: 5px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 120px;
    height: 40px;
    line-height: 40px;
  }
}
.sum-content {
  height: 40px;
  line-height: 40px;
  padding-left: 8px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce } from '@/util/util' // 防抖函数
import Input from '@/components/Items/inputNumber'
export default {
  name: 'ardiscount', // 贴现弹窗
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  components: {
    'el-jx-input': Input
  },
  data () {
    return {
      checkList: [], // 选中发票
      arAmt: '', // 贴现金额
      maxSum: '0.00' // 最大金额
    }
  },
  computed: {
    getTitle () {
      return this.detailsPC.masterChainId + '贴现'
    },
    detailsPC () {
      return this.detailsP === '' ? {
        discountAmt: '',
        discountTotalCreditAmt: '',
        interfaceTransSerial: '',
        arList: [{
          masterChainId: '', // 唯一標識當前ar
          usedInvoiceList: [
            {
              invoiceNo: '123', // 发票号
              afterTaxAmt: 150000 // 发票金额
            }
          ],
          availableInvoiceList: [
            {
              invoiceNo: '123', // 发票号
              afterTaxAmt: 150000 // 发票金额
            }
          ],
          companyName: '', // 付款单位
          billPayDate: null, // 预计回款日期
          billBookAmt: null, // 票面金额
          loanAmt: null, // 可用金额
          isMasterAr: 0, // AR来源0：购入AR1：自有AR
          checkedStatus: 1, // AR状态
          arStatusTypeName: '可用', // AR状态名称
          arSourceDesc: '购入', // AR來源
          billBookCurr: null, // AR币别
          currencyName: '', // AR货币英文名稱
          currencyDesc: '', // AR货币中文名稱
          currencyUnitName: '' // AR货币单位名称
        }]
      } : this.detailsP
    }
  },
  methods: {
    // 贴现
    handleSubmitDisc: debounce(handleSubmitDisc, 1000, true),
    // 金额输入框
    handleInputDisc: handleInputDisc,
    // 发票修改事件
    handleCheckedChange: handleCheckedChange,
    // 置空
    init: Init
  }
}
// 贴现
function handleSubmitDisc () {
  // 1.获取已勾选发票
  var arr = getSelect.call(this, this.checkList)
  var data = {
    arList: [{
      masterChainId: this.detailsPC.arList[0].masterChainId
    }],
    remark: ''
  }
  if (arr.length === 0) {
    this.$message({
      type: 'error',
      message: '未勾选发票'
    })
    return
  }
  if (Number(this.arAmt) > this.maxSum) {
    this.$message({
      type: 'error',
      message: '贴现金额不得超过金额上限'
    })
    return
  }
  // 5.2判断是否大于余额
  if (Number(this.arAmt) > this.detailsPC.arList[0].loanAmt) {
    this.$message({
      type: 'error',
      message: '贴现金额不得大于可用余额'
    })
    return
  }
  data.arList[0].arAmt = this.arAmt
  data.arList[0].selectedInvoiceList = arr
  console.log(JSON.stringify(data))
  this.post('/multiArDiscountManager/multiInitiateDiscount.do', data, true).then((res) => {
    console.log(res)
    // 操作成功 关闭弹窗
    if (res.data.status) {
      // 关闭弹窗
      this.handleClose()
      // 刷新数据
      this.$parent.fresh()
    }
  }).catch(function (err) {
    // 错误提示
    console.log(err)
  })
}
function getSelect (value) {
  var arr = []
  this.detailsPC.arList[0].availableInvoiceList.forEach(function (item) {
    for (var index = 0; index < value.length; index++) {
      if (value[index] === item.invoiceNo) {
        arr.push(item)
      }
    }
  })
  return arr
}
// 贴现金额输入框事件
function handleInputDisc (e) {
  var _this = this
  if (this.maxSum < Number(e.target.value)) {
    this.$alert('转让金额不得超过金额上限', '警告', {
      confirmButtonText: '确定',
      callback: function (action) {
        _this.arAmt = _this.maxSum
      }
    })
  }
}
// 改变选项
function handleCheckedChange (value) {
  console.log(value)
  // 1.获取已勾选发票
  var arr = getSelect.call(this, value)
  // 2.计算勾选发票金额
  var sum = getSum(arr, 'afterTaxAmt')
  var netSum = this.detailsPC.discountTotalCreditAmt ? this.detailsPC.discountTotalCreditAmt : 0
  if (netSum === 0) {
    this.maxSum = sum
  } else {
    this.maxSum = sum < netSum && sum !== 0 ? sum : netSum
  }
  // 赋值
  this.arAmt = sum === 0 ? 0 : this.maxSum
}
// 初始化
function Init () {
  // 已选发票置空
  this.checkList = [] // 选中发票
  this.arAmt = '' // 贴现金额
}
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
</script>
