<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="企业联系人名称:">
              <el-input v-model.trim="form.legalPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="企业联系人身份证:">
              <el-input v-model.trim="form.legalIdcardNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
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
    subHandle () {
      console.log(this.form)
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
  }
}

</script>
