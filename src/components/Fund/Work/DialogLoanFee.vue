<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="170px" status-icon :rules="rules" label-position="right">
        <el-row>
          <el-col :span="11">
            <el-form-item label="放款比例(%):" prop="loanPer">
              <el-input v-model="form.loanPer">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="宽容天数(天):" prop="fineGraceDays">
              <el-input v-model="form.fineGraceDays"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <el-form-item label="年利率(%):" prop="interestRate">
              <el-input v-model="form.interestRate">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务费率(%):" prop="serviceFeeRate">
              <el-input v-model="form.serviceFeeRate">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <el-form-item label="逾期利率(%):" prop="fineGraceDayRate">
              <el-input v-model="form.fineGraceDayRate">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" >
            <el-form-item label="提前还款手续费率(%):" prop="prepaymentDeductRate">
              <el-input v-model="form.prepaymentDeductRate"></el-input>
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
      bankProvinceCity: [],
      rules: {
        loanPer: [
          { required: true, message: '请输入放款比例', trigger: 'blur' },
          { validator: checkRate, trigger: 'blur' }
        ],
        fineGraceDays: [
          { required: true, message: '请输入宽容天数', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        interestRate: [
          { required: true, message: '请输入年利率', trigger: 'blur' },
          { validator: checkRate, trigger: 'blur' }
        ],
        serviceFeeRate: [
          { required: true, message: '请输入服务费率', trigger: 'blur' },
          { validator: checkRate, trigger: 'blur' }
        ],
        fineGraceDayRate: [
          { required: true, message: '请输入逾期利率', trigger: 'blur' },
          { validator: checkRate, trigger: 'blur' }
        ],
        prepaymentDeductRate: [
          { required: true, message: '请输入提前还款手续费率', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
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
      return this.form.companyName
    }
  },
  methods: {
    subHandle: debounce(submit, 1000, true),
    // 置空方法
    init: Init
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
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        } else {
          loading.close()
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
// async 校验规则
// 利率规则
var checkRate = (rule, value, callback) => {
  let re = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
  re.test(value)
  setTimeout(() => {
    if (!re.test(value)) {
      callback(new Error('请输入大于0的数字'))
    } else {
      if (value <= 0 || value > 100) {
        callback(new Error('必须为0-100之间'))
      } else {
        callback()
      }
    }
  }, 1000)
}
// 数字规则
var checkNumber = (rule, value, callback) => {
  let re = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
  setTimeout(() => {
    if (!re.test(value)) {
      callback(new Error('请输入大于0的数字'))
    } else {
      if (value <= 0) {
        callback(new Error('必须大于0'))
      } else {
        callback()
      }
    }
  }, 1000)
}
function Init () {
  if (this.$refs.form) {
    this.$refs.form.resetFields()
  }
}
</script>
