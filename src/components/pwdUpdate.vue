<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="originPass">
          <el-input type="password" v-model="ruleForm2.originPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style scoped>
footer {
  text-align: center;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { debounce, postDataBase } from '@/util/util' // 防抖函数
/* 合同确认 */
export default {
  props: ['visibleP'],
  mixins: [DialogClose],
  data () {
    // 密码校验规则
    /**
 * 密码校验
 * @param {string} key 字段名
 * @param {string} smsg 提示信息
 * @param {str} url 地址
 */
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`新密码不能为空`))
      } else {
        this.axios.post('/cust/check', {
          key: 'custPassword',
          value: value
        }).then(res => {
          if (res.data.status) {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass')
            }
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
    let validatePass2 = (rule, value, callback) => {
      let _this = this
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== _this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        originPass: '', // 原密码
        pass: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit: debounce(submitForm, 1000),
    init: Init,
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

function submitForm (formName) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      let param = {
      }
      // 提交数据
      postDataBase.call(this, '/creditLoan/creditApplyDiscount.do', param, true).then(res => {
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
// 初始化
function Init () {
  this.checkList = []
}
</script>
