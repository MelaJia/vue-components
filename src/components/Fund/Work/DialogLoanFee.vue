<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px" label-position="left">
        <el-row>
          <el-col :span="11">
            <el-form-item label="宽容天数:">
              <el-input v-model="form.fineGraceDays"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="年利率:">
              <el-input v-model="form.interestRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="还款手续费:">
              <el-input v-model="form.serviceFeeRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="罚息天利率:">
              <el-input v-model="form.fineGraceDayRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <el-form-item label="提前还款手续费:">
              <el-input v-model="form.prepaymentDeductRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  data () {
    return {
      bankProvinceCity: []
    }
  },
  computed: {
    getTitle () {
      return this.form.companyName
    }
  },
  methods: {
    subHandle () {
      const param = {
        custId: this.form.custId, // 客户id
        factoringCustId: this.form.factoringCustId, // 保理商Id
        vendorCode: this.form.vendorCode, // 供应商代码
        fineGraceDays: this.form.fineGraceDays, // 宽容天数
        interestRate: this.form.interestRate, // 年利率
        serviceFeeRate: this.form.serviceFeeRate, // 还款手续费
        fineGraceDayRate: this.form.fineGraceDayRate, // 罚息天利率
        prepaymentDeductRate: this.form.prepaymentDeductRate // 提前还款手续费
      }
      this.axios.post('/loanFee2/confirmCustLoanFee.do', param).then(res => {
        let type = res.data.result === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.message,
          type: type
        })
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: `操作失败${err}`
        })
      })
    }
  }
}

</script>
