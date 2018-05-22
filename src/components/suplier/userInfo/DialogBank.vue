<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="开户省市:">
              <el-cascader
                :options="options"
                v-model="bankProvinceCity"
                change-on-select
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="开户支行:">
              <el-input v-model="form.accountOpeningBranch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="银行名称:">
              <el-input v-model="form.bankName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="银行账号:">
              <el-input v-model="form.bankAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="账号名称:">
              <el-input v-model="form.bankShortName"></el-input>
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
import DialogClose from '@/mixins/Ar/DialogClose' // 关闭弹窗handleClose
import CityData from '@/mixins/CityData' // 关闭弹窗handleClose
import citys from './city'
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose, CityData],
  components: {
    citys
  },
  data () {
    return {
      bankProvinceCity: []
    }
  },
  computed: {
    getTitle () {
      return this.form + '企业银行信息'
    }
  },
  methods: {
    subHandle () {
      this.form.bankProvince = this.bankProvinceCity[0] | ''
      this.form.bankCity = this.bankProvinceCity[1] | ''
      console.log(this.form)
      this.axios.post('http://10.134.158.84:8080/JuXin/cust/updateBankInfo.do', this.form).then(res => {
        let type = res.data.isAuthened === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.isAuthened,
          type: type
        })
        this.$parent.fresh()
        this.handleClose()
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
