<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout loan-contract-form">
      <el-form ref="form" :model="detailsP" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="贴现金额: " prop="billBookAmt">
              <span>{{detailsP.billBookAmt}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="放款比例: " prop="loanPer">
             <el-input v-model.number="detailsP.loanPer" type="number" placeholder="放款比例">
               <template slot="append">%</template>
             </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11"  class="flex">
            <el-form-item label="实放金额: " prop="actualDiscountAmt">
             <el-input v-model.number="detailsP.actualDiscountAmt" type="number" placeholder="实放金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="贴现利率: " prop="interestRate">
             <el-input v-model.number="detailsP.interestRate" placeholder="贴现利率">
               <template slot="append">%</template>
             </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
             <el-form-item label="服务费率: " prop="serviceFeeRate">
              <el-input v-model.number="detailsP.serviceFeeRate" placeholder="服务费率">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
             <el-form-item label="逾期利率: " prop="overdueRate">
             <el-input v-model.number="detailsP.overdueRate" placeholder="逾期利率">
               <template slot="append">%</template>
             </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="提前还款手续费: " prop="prepaymentDeductInterest">
              <el-input v-model.number="detailsP.prepaymentDeductInterest" type="number" placeholder="提前还款手续费"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
             <el-form-item label="还款方式: " prop="repaymentType">
             <el-select v-model="detailsP.repaymentType" clearable placeholder="还款方式">
              <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.RepaymentTypeName" :value="item.RepaymentType"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
             <el-form-item label="宽容天数: " prop="fineGraceDays">
             <el-input v-model.number="detailsP.fineGraceDays" type="number" placeholder="宽容天数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" class="flex">
             <el-form-item label="预计回款日期: " prop="billPayDate">
              <span>{{detailsP.billPayDate|dateFormat}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="预计还款日期: " prop="billDueDate">
             <el-date-picker :editable="false" v-model="detailsP.billDueDate" type="date" placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit" :loading="isLoading">确认</el-button>
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

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      transAmt: 0,
      checkList: [],
      moneyTypes: [{
        RepaymentType: 1,
        RepaymentTypeName: '一期还息，期末清偿法'
      },
      {
        RepaymentType: 2,
        RepaymentTypeName: '一次还款本息'
      }
      ],
      isLoading: false,
      rules: {
        loanPer: [
          { required: true, message: '请输入放款比例', trigger: 'blur' },
          { type: 'number', message: '放款比例必须为数字值' }
        ],
        actualDiscountAmt: [
          { required: true, message: '实放金额不能为空', trigger: 'blur' },
          { type: 'number', message: '实放金额必须为数字值' }
        ],
        interestRate: [
          { required: true, message: '请输入贴现利率', trigger: 'blur' },
          { type: 'number', message: '贴现利率必须为数字值' }
        ],
        serviceFeeRate: [
          { required: true, message: '请输入服务费率', trigger: 'blur' },
          { type: 'number', message: '服务费率必须为数字值' }
        ],
        overdueRate: [
          { required: true, message: '请输入逾期利率', trigger: 'blur' },
          { type: 'number', message: '逾期利率必须为数字值' }
        ],
        prepaymentDeductInterest: [
          { required: true, message: '请输入提前还款手续费', trigger: 'blur' },
          { type: 'number', message: '提前还款手续费必须为数字值' }
        ],
        fineGraceDays: [
          { required: true, message: '请输入宽容天数', trigger: 'blur' },
          { type: 'number', message: '宽容天数必须为数字值' }
        ],
        billDueDate: [
          { required: true, message: '请输入预计还款日期', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    /** 修复只根据放款比例计算得到结果 输入的值无法获取  */
    loanPer: function (val) {
      this.detailsP.actualDiscountAmt = this.detailsP.billBookAmt * val / 100
    }
  },
  computed: {
    loanPer () {
      return this.detailsP.loanPer
    },
    getTitle () {
      return this.detailsP.masterChainId + '合同利益确认'
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isLoading = true
          const param = {
            masterChainId: this.detailsP.masterChainId,
            supplierCustId: this.detailsP.supplierCustId,
            billBookAmt: this.detailsP.billBookAmt, // 贴现金额
            loanPer: this.loanPer, // 放款比例
            actualDiscountAmt: this.detailsP.actualDiscountAmt || '', // 实放金額 修复只根据放款比例计算得到结果
            interestRate: this.detailsP.interestRate || '', // 贴现利率
            serviceFeeRate: this.detailsP.serviceFeeRate || '', // 服务费率
            overdueRate: this.detailsP.overdueRate || '', // 逾期利率
            prepaymentDeductInterest: this.detailsP.prepaymentDeductInterest || '', // 提前还款手续费
            repaymentType: this.detailsP.repaymentType || '', // 还款方式
            fineGraceDays: this.detailsP.fineGraceDays || '', // 宽容天数
            billPayDate: this.detailsP.billPayDate, // 预计回款日期
            billDueDate: this.detailsP.billDueDate // 预计还款日期
          }
          console.log(this.detailsP.actualDiscountAmtA)
          console.log(param)
          this.axios.post('/loan2/generateContract.do', param).then(res => {
            let type = res.data.status ? 'success' : 'error'
            this.$message({
              message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
              type: type
            })
            this.isLoading = false
            if (res.data.status) {
              this.$parent.fresh()
              this.handleClose()
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '操作失败'
            })
            this.isLoading = false
          })
        }
      })
    }
  }
}

</script>
