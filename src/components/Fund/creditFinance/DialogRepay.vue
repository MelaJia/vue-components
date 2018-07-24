<template>
<section id="print">
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="detailsP" status-icon :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="12" class="flex">
            <el-form-item label="还款单位:" prop="repayCompany">
              <span>{{detailsP.repayCompany}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="还款银行名称:" prop="repayBankName">
              <span>{{detailsP.repayBankName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="还款银行账号:" prop="repayBankAccount">
              <span>{{detailsP.repayBankAccount}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="应还款金额:" prop="repayAmt">
              <span>{{detailsP.repayAmt}}元</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币别:" prop="currencyName">
              <span>{{detailsP.currencyName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="客户还款金额:" prop="repayAmt">
            <el-input v-model="detailsP.repayAmt">
              <template slot="append">代入应还金额</template>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际还款日期:" prop="actualRepayDate">
              <el-date-picker :editable="false" :picker-options="pickerOptions" v-model="detailsP.actualRepayDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="合同:" prop="currencyName">
            <span>
              <div class="a-link-group inline-block">
                <a v-for="item in this.detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank">{{item.contractName}}</a>
              </div>
            </span>
          </el-form-item>
        </el-row>
      </el-form>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleRepay">还款</el-button>
      <el-button type="default" @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</section>
</template>

<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
ul:last-child{
  height: auto;
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  data () {
    return {
      repayAmt: 0,
      rules: {
        repayAmt: [
          { required: true, message: '请输入还款金额', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        actualRepayDate: [
          { required: true, message: '请输入实际还款日期', trigger: 'blur' }
        ]
      },
      // 日期选择器配置
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.loanId + '还款'
    }
  },
  methods: {
    // 还款
    handleRepay: debounce(submit, 1000, true)
  }
}
// 还款函数
function submit () {
  console.log(this.detailsP)
  this.$refs.form.validate((valid) => {
    if (valid) {
      const param = {
        custId: this.detailsP.custId,
        factoringCustId: this.detailsP.factoringCustId,
        loanId: this.detailsP.loanId,
        repayAmt: this.detailsP.repayAmt,
        actualRepayDate: this.detailsP.actualRepayDate
      }
      console.log(param)
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 发送数据
      this.axios.post('/factoringCreditLoan/repayLoan.do', param).then(res => {
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
</script>
