<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="" class="footerBtn">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="legalForm" :model="form" :rules="rules"  label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="法人代表名称:" prop="legalPerson">
              <el-input v-model.trim="form.legalPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="法人代表身份证:" prop="legalIdcardNum">
              <el-input v-model.trim="form.legalIdcardNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle('legalForm')" class="searchBtn" size="small">提交</el-button>
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
/* 企业法人信息修改 */
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  data () {
    return {
      bankProvinceCity: [],
      // 校验字段
      rules: {
        legalPerson: [
          { required: true, message: '请输入法人代表名称', trigger: 'blur' }
        ],
        legalIdcardNum: [
          { required: true, message: '请输入法人代表身份证号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return '企业法人信息修改'
    }
  },
  methods: {
    subHandle (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/cust/updateLegalPerson.do', this.form).then(res => {
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
