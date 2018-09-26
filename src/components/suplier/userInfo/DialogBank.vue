<template>

  <el-dialog custom-class="user-info-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section style="padding-left:200px" v-if="step===1">
      <el-form label-width="100px" :model="verifyForm" ref="verifyForm" :rules="rule">
            <el-form-item label="手机号">
                <el-col :span="8">
                  {{getPhones}}
                </el-col>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
                <el-col :span="8" >
                <el-input v-model.trim="verifyForm.captcha" auto-complete="off" :maxlength="6" size="small" :disabled="isInput"></el-input>
                </el-col>
                <el-col :span="8" :offset="1">
                <el-button :type="btntype" size="small" @click="sendMessage">{{word}}</el-button>
                </el-col>
            </el-form-item>
      </el-form>
    </section>
    <section v-if="step===2">
      <el-form ref="bankForm" :model="getInfo" :rules="rules"  label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="开户省市:">
              <el-cascader
                :options="options"
                v-model="getBankAdd"
                filterable
                change-on-select
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="开户支行:">
              <el-input v-model.trim="getInfo.accountOpeningBranch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="银行名称:" prop="bankName">
              <el-input v-model.trim="getInfo.bankName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4" >
            <el-form-item label="银行账号:" prop="bankAccount">
              <el-input v-model.trim="getInfo.bankAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="账号名称:">
              <el-input v-model.trim="getInfo.bankAccountName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-alert
              title="为了您的资金安全，请自行确认银行账户信息准确性，如发现有误请及时修改。"
              type="warning"
              :closable="false"
              show-icon>
            </el-alert>
          </el-col>
        </el-row>
      </el-form>
    </section>

    <footer slot="footer" :style="'clear:both'">
      <el-button v-if="step===1" @click="handleNext" type="primary" >下一步</el-button>
      <el-button v-if="step===2" type="primary" @click="subHandle('bankForm')">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
import CityData from '@/mixins/CityData' // 关闭弹窗handleClose
import citys from './city'
import commmon from '@/mixins/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数

/* 修改银行信息 */
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose, commmon, CityData],
  components: {
    citys
  },
  data () {
    let validateVerify = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`验证码不能为空`))
      } else {
        this.axios.post('/cust/validVerificationCode.do', {
          contactPhone: this.getContactPhone,
          verificationCode: value
        }).then(res => {
          if (res.data.status) {
            callback()
          } else {
            callback(new Error(res.data.msg))
          }
        }).catch(err => {
          console.log(err)
          callback(new Error(`验证失败请联系管理员`))
        })
      }
    }
    return {
      bankProvinceCity: [],
      verifyForm: {
        captcha: '' // 验证码
      },
      isInput: true, // 是否可输入
      word: '获取验证码',
      isOvertime: false,
      btntype: 'primary', // 验证码按钮样式
      step: 1, // 步骤
      // 校验字段
      rules: {
        bankName: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请输入银行账号', trigger: 'blur' }
        ]
      },
      rule: {
        captcha: [
          { validator: validateVerify, trigger: 'blur' },
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return '企业银行信息'
    },
    getInfo () {
      return this.form
    },
    getPhones () {
      return this.$store.state.user.userinfos.legalPhone
    },
    getBankAdd: {
      get: function () {
        console.log(this)
        console.log(this.form)
        let arr = []
        arr[0] = this.form.bankProvince
        arr[1] = this.form.bankCity
        return arr
      },
      set: function (newValue) {
        this.bankProvinceCity = newValue
      }
    }
  },
  methods: {
    subHandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.bankProvince = this.bankProvinceCity[0] !== undefined ? this.bankProvinceCity[0] : ''
          this.form.bankCity = this.bankProvinceCity[1] !== undefined ? this.bankProvinceCity[1] : ''
          console.log(this.form)
          this.axios.post('/cust/updateBankInfo.do', this.form).then(res => {
            let type = res.data.status ? 'success' : 'error'
            this.$message({
              message: res.data.msg,
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleNext: handleNext,
    sendMessage: debounce(sendMessage, 1000, true),
    init: Init
  }
}
function handleNext () {
  this.$refs['verifyForm'].validate((valid) => {
    if (valid) {
      this.step = 2
    }
  })
}
var sendTimer
// 获取验证码
function sendMessage () {
  if (this.isOvertime) {
    return
  }
  this.isOvertime = true // 验证码获取中
  this.axios.post('/cust/toverificationCode.do', {
    operationType: 6,
    contactPhone: this.getPhones
  }).then(res => {
    if (res.data.status) {
      this.$message({
        message: res.data.msg,
        type: 'success'
      })
      this.isInput = false
      let that = this
      let time = 60
      this.btntype = ''
      sendTimer = setInterval(function () {
        time--
        that.word = `${time}秒后重新发送`
        if (time < 0) {
          that.isOvertime = false // 重置可发送验证码
          that.btntype = 'primary'
          clearInterval(sendTimer)
          that.word = '重新获取验证码'
        }
      }, 1000)
    } else {
      this.isOvertime = false // 重置可发送验证码
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    this.isOvertime = false // 重置可发送验证码
    console.log(err)
    erroShow.call(this, err)
  })
}
function Init () {
  this.verifyForm.captcha = '' // 验证码
  this.isInput = true // 是否可输入
  this.isOvertime = false
  this.btntype = 'primary'
  clearInterval(sendTimer)
  this.word = '获取验证码'
  this.step = 1
}
</script>
