<template>

  <el-dialog custom-class="dia-width-70 my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="" class="footerBtn">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="emailForm" :model="form" label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item
    :prop="paramName"
    label="输入新邮箱地址"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="form[paramName]"></el-input>
  </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle('emailForm')" class="searchBtn" size="small">提交</el-button>
      <el-button @click="handleClose" type="primary" size="small" plain>取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_newUI.scss";
</style>
<style>
.footerBtn .el-dialog__footer{
  background:#F0F0F0;
}
</style>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
/* 邮箱修改 */
export default {
  props: ['visibleP', 'form', 'paramName'],
  mixins: [DialogClose],
  data () {
    return {
      select: '',
      url: {
        legalMail: '/cust/toAuthenticateLegalMail.do',
        contactMail: '/cust/toAuthenticateContractMail.do'
      }
    }
  },
  computed: {
    getTitle () {
      return '邮箱认证'
    }
  },
  methods: {
    subHandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            [this.paramName]: this.form[this.paramName]
          }
          console.log(param)
          this.axios.post(this.url[this.paramName], param).then(res => {
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
    }
  }
}

</script>
