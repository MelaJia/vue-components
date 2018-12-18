<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="" class="footerBtn">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="contactForm" :model="form" label-width="150px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item
              prop="contactPerson"
             label="企业联系人名称:"
             :rules="[
                { required: true, message: '请输入联系人名称', trigger: 'blur' },
              ]"
            >
              <el-input v-model.trim="form.contactPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item
              prop="contactIdcardNum"
              label="企业联系人身份证:"
              :rules="[
                { required: true, message: '请输入身份证', trigger: 'blur' },
                {pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '身份证格式错误', trigger: 'blur'}
              ]"
            >
              <el-input v-model.trim="form.contactIdcardNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle('contactForm')" class="searchBtn" size="small">提交</el-button>
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
/* 修改企业联系人信息 */
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
      return '企业联系人信息'
    }
  },
  methods: {
    subHandle (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/cust/updateContractPerson.do', this.form).then(res => {
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
