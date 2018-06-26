<template>

  <el-dialog custom-class="dia-width-70 user-info-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="getForm" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称: " prop="companyName">
              <el-input v-model.trim="getForm.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业电话：" prop="companyPhone">
              <el-input v-model="getForm.companyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业地址：" prop="companyAddress">
              <el-input v-model.trim="getForm.companyAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码:" prop="creditCode">
              <el-input v-model.trim="getForm.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识別号：" prop="payTaxesNumber">
              <el-input v-model.trim="getForm.payTaxesNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商代码：" prop="vendorCodes">
              <el-input v-model.trim="getForm.vendorCodes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本：" prop="registeredCapital">
              <el-input placeholder="请输入金额：" v-model.number="getForm.registeredCapital" class="input-with-select">
                <el-select v-model.number="getForm.registeredCurrencyType" slot="append" placeholder="请选择">
                  <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收资本：" prop="paidinCapital">
              <el-input v-model.number="getForm.paidinCapital">
                <el-select v-model.number="getForm.paidinCurrencyType" slot="append" placeholder="请选择">
                  <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司成立日期:" prop="establishDate">
              <el-date-picker :editable="false" v-model="getForm.establishDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照日期:" prop="compuDate">
              <el-date-picker :editable="false" v-model="getForm.compuDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司登记日期:" prop="companyRegisterDate">
              <el-date-picker :editable="false" v-model="getForm.companyRegisterDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="经营范围" prop="mainProducts">
            <el-input type="textarea" v-model.trim="getForm.mainProducts"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司logo" >
              <upload :param="{filename:'logoUrl'}" :o-img-url="getForm.logoUrl" @get-url="getUrl($event, 'logoUrl')"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照(图片)">
              <upload :param="{filename:'licenseUrl'}" :o-img-url="getForm.licenseUrl" @get-url="getUrl($event, 'licenseUrl')"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照副本">
              <upload :param="{filename:'licenseViceUrl'}" :o-img-url="getForm.licenseViceUrl" @get-url="getUrl($event, 'licenseViceUrl')"></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="组织机构代码证">
              <upload :param="{filename:'organizationUrl'}" :o-img-url="getForm.organizationUrl" @get-url="getUrl($event, 'organizationUrl')"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税务登记证">
              <upload :param="{filename:'taxUrl'}" :o-img-url="getForm.taxUrl" @get-url="getUrl($event, 'taxUrl')"></upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle('form')">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
import commonDatas from '@/mixins/commonDatas' // 货币类型
import Upload from '@/components/Items/upload'
/* 企业认证 */
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose, commonDatas],
  components: { Upload },
  data () {
    return {
      select: '',
      rules: {
        companyName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        companyPhone: [
          { required: true, message: '请输入企业电话', trigger: 'blur' },
          { pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, message: '电话号码错误', trigger: 'blur' }
        ],
        companyAddress: [
          { required: true, message: '请输入企业地址', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
        ],
        payTaxesNumber: [
          { required: false, message: '请输入纳税人识別号', trigger: 'blur' }
        ],
        vendorCodes: [
          { required: true, message: '请输入供应商代码', trigger: 'blur' }
        ],
        registeredCapital: [
          { required: false, message: '请填写注册资本', trigger: 'blur' }
          // { type: 'number', message: '资本必须为数字值' }
        ],
        paidinCapital: [
          { required: false, message: '请填写实收资本', trigger: 'blur' }
          // { type: 'number', message: '资本必须为数字值' }
        ],
        establishDate: [
          { required: false, message: '请选择日期', trigger: 'change' }
        ],
        compuDate: [
          { required: false, message: '请选择营业执照日期', trigger: 'change' }
        ],
        companyRegisterDate: [
          { required: false, message: '请选择日期', trigger: 'change' }
        ],
        mainProducts: [
          { required: true, message: '请填写经营范围', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return '企业认证'
    },
    getForm () {
      console.log(this.form)
      return this.form
    }
  },
  methods: {
    subHandle (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let businessStartDate = this.form.compuDate ? this.form.compuDate[0] : ''
          let businessEndDate = this.form.compuDate ? this.form.compuDate[1] : ''
          const param = {
            custId: this.form.custId, // 公司ID
            companyName: this.form.companyName, // 企业名称
            companyPhone: this.form.companyPhone, // 企业电话
            companyAddress: this.form.companyAddress, // 企业地址
            creditCode: this.form.creditCode, // 统一社会信用代码
            payTaxesNumber: this.form.payTaxesNumber, // 纳税人识別号
            vendorCodes: this.form.vendorCodes, // 供应商代码
            registeredCapital: this.form.registeredCapital, // 注册资本
            registeredCurrencyType: this.form.registeredCurrencyType.toString(), // 注册资本币别
            paidinCapital: this.form.paidinCapital, // 实收资本
            paidinCurrencyType: this.form.paidinCurrencyType.toString(), // 实收资本币别
            establishDate: this.form.establishDate, // 公司成立日期
            businessStartDate: businessStartDate, // 营业执照开始日期
            businessEndDate: businessEndDate, // 营业执照结束日期
            companyRegisterDate: this.form.companyRegisterDate, // 公司登记日期
            mainProducts: this.form.mainProducts, // 经营范围
            logoUrl: this.form.logoUrl, // 公司LOGO
            licenseUrl: this.form.licenseUrl, // 营业执照(图片)
            licenseViceUrl: this.form.licenseViceUrl, // 营业执照副本
            organizationUrl: this.form.organizationUrl, // 组织机构代码证
            taxUrl: this.form.taxUrl // 税务登记证

          }
          console.log(param)
          this.axios.post('/cust/toAuthenticateCompany.do', param).then(res => {
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
    // 上传图片更新formUrl地址
    getUrl (val, idx) {
      console.log('上传成功返回:')
      console.log(val)
      console.log(idx)
      if (val.status) {
        this.form[idx] = val.data
      }
    }
  }
}

</script>
