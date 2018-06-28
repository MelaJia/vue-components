<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px" label-position="left">
        <el-row>
          <el-col :span="11">
            <el-form-item label="放款比例:"
            prop="loanPer"
            :rules="[
            { required: true, message: '请输入放款比例', trigger: 'blur' },
            { type: 'number', message: '放款比例必须为数字值' }
            ]"
            >
              <el-input v-model.number="form.loanPer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="宽容天数:">
              <el-input v-model.number="form.fineGraceDays"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="年利率:">
              <el-input v-model.number="form.interestRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务费率:">
              <el-input v-model.number="form.serviceFeeRate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="罚息天利率:">
              <el-input v-model.number="form.fineGraceDayRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <el-form-item label="提前还款手续费:">
              <el-input v-model.number="form.prepaymentDeductRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle">修改</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
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
    subHandle: debounce(submit, 1000, true)
  }
}

// 提交操作
function submit () {
  // 表单验证
  this.$refs.form.validate((valid) => {
    if (valid) {
      // 组合数据
      const param = {
        custId: this.form.custId, // 客户id
        factoringCustId: this.form.factoringCustId, // 保理商Id
        vendorCode: this.form.vendorCode, // 供应商代码
        loanPer: this.form.loanPer, // 放款比例
        fineGraceDays: this.form.fineGraceDays, // 宽容天数
        interestRate: this.form.interestRate, // 年利率
        serviceFeeRate: this.form.serviceFeeRate, // 还款手续费
        fineGraceDayRate: this.form.fineGraceDayRate, // 罚息天利率
        prepaymentDeductRate: this.form.prepaymentDeductRate // 提前还款手续费
      }
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 上传数据
      this.axios.post('/loanFee2/confirmCustLoanFee.do', param).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
          type: type
        })
        // 关闭加载图标
        loading.close()
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: `操作失败${err}`
        })
        // 关闭加载图标
        loading.close()
      })
    }
  })
}
</script>
