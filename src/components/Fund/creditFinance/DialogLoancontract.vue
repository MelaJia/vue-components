<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout loan-contract-form">
      <el-form ref="form" :model="detailsP" status-icon :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="贴现金额: " prop="applyAmt">
              <span>{{detailsP.applyAmt | regexNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="放款比例: " prop="loanPer">
             <el-input v-model="detailsP.loanPer"  placeholder="放款比例">
               <template slot="append">%</template>
             </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="实放金额: " prop="loanAmt">
             <el-input v-model="loanAmt" placeholder="实放金额" :formatter="regexNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="年利率: " prop="interestRate">
             <el-jx-input v-model="detailsP.interestRate" placeholder="贴现利率">
               <template slot="append">%</template>
             </el-jx-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
             <el-form-item label="服务费率: " prop="serviceFeeRate">
              <el-jx-input v-model="detailsP.serviceFeeRate" placeholder="服务费率">
                <template slot="append">%</template>
              </el-jx-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
             <el-form-item label="逾期利率: " prop="overdueRate">
             <el-jx-input v-model="detailsP.overdueRate" placeholder="逾期利率">
               <template slot="append">%</template>
             </el-jx-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="提前还款手续费率: " prop="prepaymentDeductInterest">
              <el-jx-input v-model="detailsP.prepaymentDeductInterest"  placeholder="提前还款手续费"></el-jx-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="还款方式: " prop="repaymentType">
             <el-select v-model="detailsP.repaymentType" clearable placeholder="还款方式">
              <el-option v-for="(item,index) in RepaymentTypes" :key="index" :label="item.RepaymentTypeName" :value="item.RepaymentType"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
             <el-form-item label="宽容天数: " prop="fineGraceDays">
             <el-input v-model="detailsP.fineGraceDays"  placeholder="宽容天数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="还款日期: " prop="repayDate">
             <!-- <el-date-picker :editable="false" v-model="detailsP.repayDate" type="date" placeholder="选择日期">
            </el-date-picker> -->
            <span>{{detailsP.repayDate | dateFormat}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit">生成</el-button>
      <el-button type="default" @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style lang="scss">
.layout.loan-contract-form {
  margin-top: 10px;
  .el-row {
    margin-top: 10px;
  }
}

.layout.loan-contract-form .flex {
  display: flex;
  label {
    width: 150px;
    height: 40px;
    line-height: 40px;
  }
  span {
    height: 40px;
    line-height: 40px;
  }
  .el-select,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 180px;
  }
  .el-input-group__append {
    padding: 0 5px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import commonDatas from '@/mixins/commonDatas'
import { debounce } from '@/util/util' // 防抖函数
import { validatenum } from '@/util/validate'
import { loadingConf } from '@/config/common' // 获取加载配置
import Input from '@/components/Items/inputNumber'

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common, commonDatas],
  components: {
    'el-jx-input': Input
  },
  data () {
    return {
      transAmt: 0,
      checkList: [],
      RepaymentTypes: [{
        RepaymentType: 2,
        RepaymentTypeName: '一期还息，期末清偿法'
      },
      {
        RepaymentType: 1,
        RepaymentTypeName: '一次还款本息'
      }
      ],
      rules: {
        loanPer: [
          { required: true, message: '请输入放款比例', trigger: 'blur' },
          { validator: checkRate, trigger: 'blur' }
        ],
        loanAmt: [
          { required: true, message: '实放金额不能为空', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        interestRate: [
          { required: true, message: '请输入贴现利率', trigger: 'blur' },
          { validator: checkFate, trigger: 'blur' }
        ],
        serviceFeeRate: [
          { required: true, message: '请输入服务费率', trigger: 'blur' },
          { validator: checkFate, trigger: 'blur' }
        ],
        overdueRate: [
          { required: true, message: '请输入逾期利率', trigger: 'blur' },
          { validator: checkFate, trigger: 'blur' }
        ],
        prepaymentDeductInterest: [
          { required: true, message: '请输入提前还款手续费', trigger: 'blur' },
          { validator: checkFate, trigger: 'blur' }
        ],
        fineGraceDays: [
          { required: true, message: '请输入宽容天数', trigger: 'blur' },
          { validator: checkDay, trigger: 'blur' }
        ],
        repayDate: [
          { required: true, message: '请输入预计还款日期', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    /** 修复只根据放款比例计算得到结果 输入的值无法获取  */
    loanPer: debounce(function (val) {
      this.detailsP.loanAmt = this.detailsP.applyAmt * val / 100
    }, 1000)
  },
  computed: {
    loanPer () {
      return this.detailsP.loanPer
    },
    loanAmt: {
      // getter
      get: function () {
        return (this.detailsP.applyAmt * (this.detailsP.loanPer * 100) / 10000).toFixed(2)
      },
      // setter
      set: debounce(function (newValue) {
        this.detailsP.loanAmt = newValue
        let val = Number((newValue / this.detailsP.applyAmt * 100).toFixed(2))
        console.log(typeof (val))
        this.detailsP.loanPer = val
        console.log(this.detailsP.loanPer)
      }, 1000)
    },
    getTitle () {
      return this.detailsP.loanId + '合同确认'
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true)
    // // 检验年利率
    // handleRate (e) {
    //   e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    //   this.detailsP.interestRate = e.target.value
    // },
    // // 检验服务费率
    // handleService (e) {
    //   e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    //   this.detailsP.serviceFeeRate = e.target.value
    // },
    // // 检验逾期利率
    // handleDue (e) {
    //   e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    //   this.detailsP.overdueRate = e.target.value
    // },
    // // 检验提前还款手续费率
    // handlePay (e) {
    //   e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    //   this.detailsP.prepaymentDeductInterest = e.target.value
    // }
  }
}
// 提交操作
function submit () {
  console.log(this.detailsP)
  this.$refs.form.validate((valid) => {
    if (valid) {
      const param = {
        loanId: this.detailsP.loanId,
        supplierCustId: this.detailsP.custId,
        applyAmt: this.detailsP.applyAmt, // 贴现金额
        loanPer: this.loanPer, // 放款比例
        loanAmt: this.detailsP.loanAmt || '', // 实放金額 修复只根据放款比例计算得到结果
        interestRate: this.detailsP.interestRate || '', // 贴现利率
        serviceFeeRate: this.detailsP.serviceFeeRate || '', // 服务费率
        overdueRate: this.detailsP.overdueRate || '', // 逾期利率
        prepaymentDeductInterest: this.detailsP.prepaymentDeductInterest || '', // 提前还款手续费
        repaymentType: this.detailsP.repaymentType || '', // 还款方式
        fineGraceDays: Number(this.detailsP.fineGraceDays) || '', // 宽容天数
        repayDate: this.detailsP.repayDate // 还款日期
        // repayDate: new Date(this.detailsP.repayDate).Format('yyyy-MM-dd') // 还款日期
      }
      console.log(param)
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 发送数据
      this.axios.post('/factoringCreditLoan/generateElectronicsContract.do', param).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
          type: type
        })
        // 关闭加载图标
        loading.close()
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '操作失败'
        })
        // 关闭加载图标
        loading.close()
      })
    }
  })
}
// async 校验规则
// 利率规则
var checkRate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  let re = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
  setTimeout(() => {
    if (!re.test(value)) {
      callback(new Error('请输入大于等于0的数字'))
    } else {
      if (value < 0 || value > 100) {
        callback(new Error('必须为0-100之间'))
      } else {
        callback()
      }
    }
  }, 1000)
}
// 年利率规则
var checkFate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  let re = /^\d+(\.\d{0,2})?$/
  setTimeout(() => {
    if (!re.test(value)) {
      callback(new Error('请输入正数或者带两位小数的正数'))
    } else {
      if (value < 0 || value > 100) {
        callback(new Error('必须为0-100之间'))
      } else {
        callback()
      }
    }
  }, 1000)
}
// 数字规则
var checkNumber = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  let re = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
  setTimeout(() => {
    if (!re.test(value)) {
      callback(new Error('请输入大于等于0的数字'))
    } else {
      if (value < 0) {
        callback(new Error('必须大于等于0'))
      } else {
        callback()
      }
    }
  }, 1000)
}
// 验证宽容天数
var checkDay = (rule, value, callback) => {
  console.log(validatenum(value, 2))
  if (!value) {
    return callback(new Error('不能为空'))
  }
  if (validatenum(value, 2) | value < 0) {
    callback(new Error('必须为大于0的整数'))
  } else {
    callback()
  }
}
</script>
