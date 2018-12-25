<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title" class="headerTitle">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-form class="demo-form-inline" ref="form" :rules="rules" :model="getForm" size="small" label-width="140px">
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="付款单位:">
              <el-tooltip class="item" effect="dark" :content="detailsP.companyName" placement="top">
                <span>{{detailsP.companyName}}</span>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="flex">
            <el-form-item label="贴现客户:">
              <el-tooltip class="item" effect="dark" :content="detailsP.custFromName" placement="top">
                <span>{{detailsP.custFromName}}</span>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="flex">
            <el-form-item label="一级供应商:">
              <el-tooltip class="item" effect="dark" :content="detailsP.companyNameOfL1" placement="top">
                <span>{{detailsP.companyNameOfL1}}</span>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="flex">
            <el-form-item label="融资类型:">
              <span>{{detailsP.loanTypeName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="detailsP.loanType === 3">
          <el-col :span="12" class="flex">
            <el-form-item prop="superviseBankName" label="监管银行:">
              <el-input v-model="detailsP.superviseBankName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="flex">
            <el-form-item prop="superviseBankAccount" label="监管账号:">
              <el-input v-model.number="detailsP.superviseBankAccount" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="flex">
            <el-form-item label="保理单位:">
              <el-select v-model="form.factoringCustId" clearable placeholder="保理单位">
                <el-option v-for="(item,index) in factoringCusts" :key="index" :label="item.factoringApId" :value="item.factoringCustId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="flex" v-show="detailsP.loanType === 4">
            <el-form-item prop="totalCreditAmount" label="授信额度:">
              <el-input v-model="detailsP.totalCreditAmount" @keyup.native="checkHandle($event)">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit" class="searchBtn" size="small">确认</el-button>
      <el-button @click="handleClose" type="primary" size="small" plain>取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_newUI.scss";
.el-input.el-input--small {
  width: 215px;
}
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
    text-align: right;
    padding-right: 20px;
    font-weight: 600;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  > span {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
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
      form: {
        custId: this.detailsP.custId, // 客户Id
        buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
        factoringCustId: '' // 保理单位
      },
      transAmt: 0,
      checkList: [],
      factoringCusts: [{
        factoringCustId: 1,
        factoringApId: '获取数据失败'
      }],
      rules: {
        totalCreditAmount: [
          {required: true, message: '授信额度不能为空', trigger: 'blur'},
          {validator: checkNumber, trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.axios.post('/commonCust/factoringCustomerList.do').then(res => {
      if (res.data.status) {
        this.factoringCusts = res.data.data
      }
    }).catch((err) => {
      throw new Error(err)
    })
  },
  computed: {
    getTitle () {
      return this.detailsP.custFromName
    },
    getForm () {
      return this.detailsP
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true),
    checkHandle (e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      this.detailsP.totalCreditAmount = e.target.value
    }
  }
}
// 提交操作
function submit () {
  if (this.form.factoringCustId.length <= 0) {
    this.$message({
      type: 'warning',
      message: '请选择保理单位'
    })
    return
  }
  // 授信额度存在的时候要去校验
  if (this.detailsP.loanType === 4) {
    this.$refs.form.validate((valid) => {
      if (valid) {
        const param = {
          custId: this.detailsP.custId, // 客户Id
          buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
          factoringCustId: this.form.factoringCustId, // 保理单位
          superviseBankName: this.getForm.superviseBankName, // 监管银行
          superviseBankAccount: this.getForm.superviseBankAccount, // 监管账号
          loanType: this.detailsP.loanType, // 融资类型
          totalCreditAmount: this.detailsP.totalCreditAmount // 授信额度
        }
        console.log(param)
        // 显示加载图标
        const loading = this.$loading(loadingConf.sub())
        this.axios.post('/discountAudit/approveDiscountAudit.do', param).then(res => {
          let type = res.data.status ? 'success' : 'error'
          this.$message({
            message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
            type: type
          })
          // 操作成功关闭弹窗刷新数据
          if (res.data.status) {
            this.handleClose() // 关闭弹窗
            this.$parent.fresh() // 刷新数据
          } else {
            loading.close()
          }
        }).catch((err) => {
          // 错误提示
          erroShow.call(this, err, loading)
        })
      }
    })
  } else {
    const param = {
      custId: this.detailsP.custId, // 客户Id
      buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
      factoringCustId: this.form.factoringCustId, // 保理单位
      superviseBankName: this.getForm.superviseBankName, // 监管银行
      superviseBankAccount: this.getForm.superviseBankAccount, // 监管账号
      loanType: this.detailsP.loanType, // 融资类型
      totalCreditAmount: 0 // 授信额度
    }
    console.log(param)
    // 显示加载图标
    const loading = this.$loading(loadingConf.sub())
    this.axios.post('/discountAudit/approveDiscountAudit.do', param).then(res => {
      let type = res.data.status ? 'success' : 'error'
      this.$message({
        message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
        type: type
      })
      // 操作成功关闭弹窗刷新数据
      if (res.data.status) {
        this.handleClose() // 关闭弹窗
        this.$parent.fresh() // 刷新数据
      } else {
        loading.close()
      }
    }).catch((err) => {
      // 错误提示
      erroShow.call(this, err, loading)
    })
  }
}
</script>
