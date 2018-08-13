<template>
<section id="print">
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="detailsP" status-icon :rules="rules" label-width="160px">
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
            <el-form-item label="本期应还款金额:" prop="repayAmt">
              <span>{{detailsP.repayAmt | regexNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币别:" prop="currencyName">
              <span>{{detailsP.currencyName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="今日提前还清应还金额:" prop="advancerepayAmt">
              <span>{{detailsP.advancerepayAmt | regexNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" :pull="2">
            <el-form-item>
              <el-checkbox v-model="confirmCheck">确认提前还清</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户还款金额:" prop="actualRepayAmt">
              <el-input v-model="detailsP.actualRepayAmt"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"><a href="javascript:;" @click.prevent="getFull" class="getFull">代入应还金额</a><a href="javascript:;" @click.prevent="getFull" class="getFull">代入提前还清应还金额</a></el-col> -->
          <el-col :span="12"><el-button :disabled="this.confirmCheck === true ? true : false" @click="getFull" class="getFull">代入应还金额</el-button><el-button type="default" :disabled="this.confirmCheck === false ? true : false" @click="getAdvanceFull" class="getFull">代入提前还清应还金额</el-button></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际还款日期:" prop="actualRepayDate">
              <el-date-picker :editable="false" v-model="detailsP.actualRepayDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="合同:">
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
      <el-button type="primary" :disabled="this.confirmCheck === true ? true : false" @click="handleRepay">还款</el-button>
      <el-button type="danger" :disabled="this.confirmCheck === false ? true : false" @click="advanceRepay">提前还清</el-button>
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
.el-form-item{
  margin-bottom: 16px;
}
.getFull{
  margin-left: 10px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
import Common from '@/mixins/common'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    // 金额校验规则
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      let re = /^(0|[1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
      if (!this.confirmCheck) {
        setTimeout(() => {
          if (!re.test(value)) {
            callback(new Error('请输入大于等于0的数字'))
          } else {
            if (value <= 0) {
              callback(new Error('必须大于等于0'))
            } else {
              callback()
            }
          }
        }, 1000)
      } else {
        setTimeout(() => {
          if (!re.test(value)) {
            callback(new Error('请输入大于等于0的数字'))
          } else {
            if (value <= 0) {
              callback(new Error('必须大于等于0'))
            } else if (value < this.detailsP.advancerepayAmt) {
              callback(new Error('还款金额不能小于提前还清金额'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
    }
    return {
      confirmCheck: false, // 确认提前还清选择框
      rules: {
        actualRepayAmt: [
          { required: true, message: '请输入客户还款金额', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        actualRepayDate: [
          { required: true, message: '请输入实际还款日期', trigger: 'blur' }
        ]
      }
      // 日期选择器配置
      // pickerOptions: {
      //   disabledDate (time) {
      //     return time.getTime() <= Date.now()
      //   }
      // }
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.loanId + '还款'
    }
  },
  methods: {
    // 还款
    handleRepay: debounce(submit, 1000, true),
    // 提前还清
    advanceRepay: debounce(advanceSubmit, 1000, true),
    // 代入应还金额
    getFull () {
      this.detailsP.actualRepayAmt = this.detailsP.repayAmt
    },
    // 代入提前还清应还金额
    getAdvanceFull () {
      this.detailsP.actualRepayAmt = this.detailsP.advancerepayAmt
    }
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
        periodNo: this.detailsP.periodNo,
        actualRepayAmt: this.detailsP.actualRepayAmt,
        actualRepayDate: this.detailsP.actualRepayDate
      }
      console.log(param)
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 发送数据
      this.axios.post('/factoringCreditLoan/repayLoan.do', param).then(res => {
        console.log(res)
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.msg ? res.data.msg : '返回结果错误，请联系管理员',
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

// 提前还清
function advanceSubmit () {
  this.$refs.form.validate((valid) => {
    if (valid) {
      const param = {
        custId: this.detailsP.custId,
        factoringCustId: this.detailsP.factoringCustId,
        loanId: this.detailsP.loanId,
        periodNo: this.detailsP.periodNo,
        actualRepayAmt: this.detailsP.actualRepayAmt,
        actualRepayDate: this.detailsP.actualRepayDate
      }
      console.log(param)
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 发送数据
      this.axios.post('/factoringCreditLoan/repayLoan.do', param, true).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.msg ? res.data.msg : '返回结果错误，请联系管理员',
          type: type
        })
        console.log(res)
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
</script>
