<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="phoneForm" :model="form" label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item
      prop="legalPhone"
      label="输入新手机号:"
      :rules="[
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '手机号格式错误', trigger: 'blur'}
      ]"
  >
    <el-input v-model="form.legalPhone"></el-input>
  </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="验证码:"
            prop="verificationCode"
            :rules="[
              { required: true, message: '请输入验证码', trigger: 'blur' }
            ]"
            >
              <el-input v-model="form.verificationCode"></el-input><el-button :type="btntype" size="mini" @click="sendMessage">{{word}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle('phoneForm')">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
/* 法人手机号修改 */
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  data () {
    return {
      bankProvinceCity: [],
      word: '发送验证码',
      isOvertime: false,
      btntype: 'primary'
    }
  },
  computed: {
    getTitle () {
      return '法人手机号修改'
    }
  },
  methods: {
    subHandle (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/cust/updateLegalPhone.do', this.form).then(res => {
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
        }
      })
    },
    // 验证码
    sendMessage () {
      let phoneRegExp = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
      if (this.isOvertime || !phoneRegExp.test(this.form.legalPhone)) {
        this.$message.error('请输入正确的手机号')
        console.log('请输入正确的手机号')
        return false
      }
      this.axios.post('/cust/toverificationCode.do', { contactPhone: this.form.legalPhone }).then(res => {
        if (res.data.status) {
          let that = this
          let time = 60
          this.btntype = ''
          var sendTimer = setInterval(function () {
            that.isOvertime = true
            time--
            that.word = '重新发送' + time
            if (time < 0) {
              that.isOvertime = false
              this.btntype = 'primary'
              clearInterval(sendTimer)
              that.word = '获取验证码'
            }
          }, 1000)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}

</script>
