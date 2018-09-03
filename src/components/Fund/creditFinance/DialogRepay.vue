<template>
<section id="print">
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="detailsP" status-icon :rules="rules" label-width="170px">
        <el-row>
          <el-col :span="24" class="flex">
            <el-form-item label="还款单位:" prop="repayCompany" class="textPosition">
              <span>{{detailsP.repayCompany}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="还款银行名称:" prop="repayBankName" class="textPosition">
              <span>{{detailsP.repayBankName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="还款银行账号:" prop="repayBankAccount" class="textPosition">
              <span>{{detailsP.repayBankAccount}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="本期应还款金额:" prop="repayAmt" class="textPosition">
              <span>{{detailsP.repayAmt | regexNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币别:" prop="currencyName" class="textPosition">
              <span>{{detailsP.currencyName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="今日提前还清应还金额:" prop="settlePrepayAmt" class="textPosition">
              <span>{{settlePrepayAmt | regexNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" :pull="2">
            <el-form-item>
              <el-checkbox v-model="confirmCheck" v-on:change="change">确认提前还清</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户还款金额:" prop="actualRepayAmt">
              <el-input v-model.number="detailsP.actualRepayAmt" @keyup.native="checkHanle($event)"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12"><a href="javascript:;" @click.prevent="getFull" class="getFull">代入应还金额</a><a href="javascript:;" @click.prevent="getFull" class="getFull">代入提前还清应还金额</a></el-col> -->
          <el-col :span="12"><el-button :disabled="this.confirmCheck === true ? true : false" @click.prevent="getFull" class="getFull">代入应还金额</el-button><el-button type="default" :disabled="this.confirmCheck === false ? true : false" @click.prevent="getAdvanceFull" class="getFull">代入提前还清应还金额</el-button></el-col>
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
            <span class="textPosition">
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
.textPosition{
  text-align: left;
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
import Common from '@/mixins/common'
export default {
  props: ['visibleP', 'detailsP', 'repayDetail'],
  mixins: [DialogClose, Common, SearchMixIn],
  data () {
    // 金额校验规则
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      let re = /^(0|[1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
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
    }
    return {
      confirmCheck: false, // 确认提前还清选择框
      isConfirmSettled: 0,
      settlePrepayAmt: 0,
      rules: {
        actualRepayAmt: [
          { required: true, message: '请输入客户还款金额', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        actualRepayDate: [
          { required: true, message: '请输入实际还款日期', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visibleP: function () {
      this.init()
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
    // 置空方法
    init: Init,
    // 代入应还金额
    getFull () {
      if (this.detailsP.repayAmt === '' || this.detailsP.repayAmt === undefined) {
        this.detailsP.actualRepayAmt = 0
        return
      }
      this.detailsP.actualRepayAmt = this.detailsP.repayAmt
    },
    // 代入提前还清应还金额
    getAdvanceFull () {
      if (this.repayDetail.settlePrepayAmt === '' || this.repayDetail.settlePrepayAmt === undefined) {
        this.detailsP.actualRepayAmt = 0
        return
      }
      this.detailsP.actualRepayAmt = this.repayDetail.settlePrepayAmt
    },
    // 选择框改变将boolean值改为number
    change (val) {
      if (val === true) {
        // this.detailsP.actualRepayAmt = this.repayDetail.settlePrepayAmt
        this.axios.post('/factoringCreditLoan/prepaySettleLoanTrial.do', {loanId: this.detailsP.loanId, custId: '', factoringCustId: ''}).then(res => {
          if (res.data.status) {
            this.settlePrepayAmt = res.data.data.settlePrepayAmt
            this.detailsP.actualRepayAmt = res.data.data.settlePrepayAmt
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
        this.isConfirmSettled = 1
      } else {
        this.detailsP.actualRepayAmt = this.detailsP.repayAmt
        this.isConfirmSettled = 0
      }
    },
    checkHanle (e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.detailsP.actualRepayAmt = e.target.value
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
          this.init()
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
        actualRepayAmt: this.detailsP.actualRepayAmt,
        loanId: this.detailsP.loanId,
        isConfirmSettled: this.isConfirmSettled
      }

      console.log(param)
      // 发送数据
      if (this.detailsP.actualRepayAmt < this.repayDetail.settlePrepayAmt) {
        this.$message.error('客户还款金额不得小于提前还清应还金额')
      } else {
        // 显示加载图标
        const loading = this.$loading(loadingConf.sub())
        this.axios.post('/factoringCreditLoan/prepaySettleLoan.do', param, true).then(res => {
          let type = res.data.status ? 'success' : 'error'
          this.$message({
            message: res.data.msg ? res.data.msg : '返回结果错误，请联系管理员',
            type: type
          })
          // 关闭加载图标
          loading.close()
          // 操作成功关闭弹窗刷新数据
          if (res.data.status) {
            this.init()
            this.$parent.fresh()
            this.handleClose()
          } else {
            loading.close()
            this.$message.error(res.data.msg)
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
    }
  })
}
function Init () {
  this.settlePrepayAmt = 0
  this.confirmCheck = false
  if (this.$refs.form) {
    this.$refs.form.resetFields()
  }
}
</script>
