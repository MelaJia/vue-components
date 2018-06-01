<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-row>
        <el-col :span="11" class="flex"><label>贴现金额:</label><el-input v-model.number="getform.billBookAmt" placeholder="贴现金额"></el-input></el-col>
        <el-col :span="11" :offset="1" class="flex"><label>实放金额:</label><el-input v-model.number="getform.actualDiscountAmt" type="number" placeholder="实放金额"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="11" class="flex"><label>贴现利率:</label><el-input v-model.number="getform.interestRate" placeholder="贴现利率"></el-input></el-col>
        <el-col :span="11" :offset="1" class="flex"><label>贴现手续费：</label><el-input v-model.number="getform.serviceFee" type="number" placeholder="贴现手续费"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="11" class="flex"><label>逾期利率:</label><el-input v-model.number="getform.overdueRate" placeholder="逾期利率"></el-input></el-col>
        <el-col :span="11" :offset="1" class="flex"><label>提前还款手续费:</label><el-input v-model.number="getform.prepaymentDeductInterest" type="number" placeholder="提前还款手续费"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="11" class="flex"><label>还款方式:</label>
          <el-select v-model="getform.repaymentType" clearable placeholder="币别">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.RepaymentTypeName" :value="item.RepaymentType"></el-option>
          </el-select>
        </el-col>
        <el-col :span="11" :offset="1" class="flex"><label>宽容天数:</label><el-input v-model.number="getform.fineGraceDays" type="number" placeholder="宽容天数"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="11" class="flex"><label>预计回款日期:</label><span>{{getform.billPayDate|dateFormat}}</span></el-col>
        <el-col :span="11" :offset="1" class="flex"><label>预计还款日期:</label><el-date-picker
      v-model="getform.billDueDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker></el-col>
      </el-row>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
.layout.form {
  margin-top: 10px;
  > .el-row {
    margin-top: 10px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 150px;
    height: 40px;
    line-height: 40px;
  }
  > span {
    height: 40px;
    line-height: 40px;
  }
  > .el-select,
  > .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>

<script>
import DialogClose from '@/mixins/Ar/DialogClose'
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
      }]
    }
  },
  computed: {
    getform () {
      return this.detailsP
    },
    getTitle () {
      return this.detailsP.masterChainId + '合同利益确认'
    },
    getBillDueDate () {
      return this.detailsP.billDueDate
    }
  },
  methods: {
    handleSubmit () {
      const param = {
        masterChainId: this.getform.masterChainId,
        supplierCustId: this.getform.supplierCustId,
        billBookAmt: this.getform.billBookAmt, // 贴现金额
        actualDiscountAmt: this.getform.actualDiscountAmt || '', // 实放金額
        interestRate: this.getform.interestRate || '', // 贴现利率
        serviceFee: this.getform.serviceFee || '', // 贴现手续费
        overdueRate: this.getform.overdueRate || '', // 逾期利率
        prepaymentDeductInterest: this.getform.prepaymentDeductInterest || '', // 提前还款手续费
        repaymentType: this.getform.repaymentType || '', // 还款方式
        fineGraceDays: this.getform.fineGraceDays || '', // 宽容天数
        billPayDate: this.getform.billPayDate, // 预计回款日期
        billDueDate: this.getform.billDueDate // 预计还款日期
      }
      console.log(param)
      this.axios.post('/loan2/generateContract.do', param).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data.message,
          type: type
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败'
        })
      })
    }
  }
}

</script>
