<template>

  <el-dialog custom-class="user-info-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="bankForm" :model="form" :rules="rules"  label-width="130px">
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
              <el-input v-model.trim="form.accountOpeningBranch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="银行名称:" prop="bankName">
              <el-input v-model.trim="form.bankName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4" >
            <el-form-item label="银行账号:" prop="bankAccount">
              <el-input v-model.trim="form.bankAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="账号名称:">
              <el-input v-model.trim="form.bankShortName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle('bankForm')">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
import CityData from '@/mixins/CityData' // 关闭弹窗handleClose
import citys from './city'
/* 修改银行信息 */
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose, CityData],
  components: {
    citys
  },
  data () {
    return {
      bankProvinceCity: [],
      // 校验字段
      rules: {
        bankName: [
          { required: true, message: '请输入银行名称', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '请输入银行账号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return '企业银行信息'
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
    }
  }
}

</script>
