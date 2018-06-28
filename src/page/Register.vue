<template>
  <section class="register-style">
    <article>
      <header>
        <el-steps :active="step" finish-status="success" simple style="margin-top: 20px">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </header>
      <main>
        <section class="reg-step-1" v-if="step==1">
          <el-form ref="form-1" :model="getForm" :rules="rulesOne" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="登陆名: " prop="custUsername">
                  <el-input v-model.trim="getForm.custUsername"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登陆密码: " prop="custPassword">
                  <el-input v-model="getForm.custPassword"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="昵称: " prop="custNickname">
                  <el-input v-model.trim="getForm.custNickname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="公司名称: " prop="companyName">
                  <el-input v-model.trim="getForm.companyName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司电话: " prop="companyPhone">
                  <el-input v-model.trim="getForm.companyPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工人数: " prop="companyPersonSum">
                  <el-input v-model.trim="getForm.companyPersonSum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="公司详细地址: " prop="companyAddress">
                <el-input type="textarea" v-model.trim="getForm.companyAddress"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人姓名: " prop="contactPerson">
                  <el-input v-model.trim="getForm.contactPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人身份证: " prop="contactIdcardNum">
                  <el-input v-model.trim="getForm.contactIdcardNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人电话: " prop="contactPhone">
                  <el-input v-model.trim="getForm.contactPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人邮箱: " prop="contactMail">
                  <el-input v-model.trim="getForm.contactMail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="法人姓名: " prop="legalPerson">
                  <el-input v-model.trim="getForm.legalPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证: " prop="legalIdcardNum">
                  <el-input v-model.trim="getForm.legalIdcardNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="法人电话: " prop="legalPhone">
                  <el-input v-model.trim="getForm.legalPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人邮箱: " prop="legalMail">
                  <el-input v-model.trim="getForm.legalMail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </section>
        <section class="reg-step-2" v-else-if="step==2">
          <el-form ref="form-2" :model="getForm" :rules="rulesTwo" label-width="150px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码:" prop="creditCode">
                  <el-input v-model.trim="getForm.creditCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照编号: " prop="licenseNumber">
                  <el-input v-model="getForm.licenseNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构代码编号: " prop="organizationNumber">
                  <el-input v-model.trim="getForm.organizationNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="营业执照副本编号: " prop="licenseViceNumber">
                  <el-input v-model.trim="getForm.licenseViceNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证编号: " prop="taxNumber">
                  <el-input v-model.trim="getForm.taxNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="纳税人识别号: " prop="payTaxesNumber">
                  <el-input v-model.trim="getForm.payTaxesNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="营业执照所在地: " prop="licenseAddress">
                <el-input type="textarea" v-model.trim="getForm.licenseAddress"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="公司登记机构: " prop="companyAddress">
                  <el-input v-model.trim="getForm.companyAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="代应商代码: " prop="vendorCodes">
                  <el-input v-model.trim="getForm.vendorCodes"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="注册资本：" prop="registeredCapital">
                  <el-input placeholder="请输入金额：" v-model.number="getForm.registeredCapital" class="input-with-select">
                    <el-select v-model.number="getForm.registeredCurrencyType" slot="append" placeholder="请选择">
                      <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
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
              <el-col :span="10">
                <el-form-item label="公司成立日期:" prop="establishDate">
                  <el-date-picker :editable="false" v-model="getForm.establishDate" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="公司登记日期:" prop="companyRegisterDate">
                  <el-date-picker :editable="false" v-model="getForm.companyRegisterDate" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="营业执照日期:" prop="compuDate">
                  <el-date-picker :editable="false" v-model="getForm.compuDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="法定营业范围: " prop="companyBusinessScope">
                  <el-input type="textarea" v-model.trim="getForm.companyBusinessScope"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="主营产品: " prop="mainProducts">
                  <el-input type="textarea" v-model.trim="getForm.mainProducts"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </section>
        <section class="reg-step-3" v-else-if="step==3">
          <el-form ref="form-3" :model="getForm" :rules="rulesThree" label-width="150px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="公司logo" prop="logoUrl">
                  <upload :param="{filename:'logoUrl'}" :o-img-url="getForm.logoUrl" @get-url="getUrl($event, 'logoUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照(图片)" prop="licenseUrl">
                  <upload :param="{filename:'licenseUrl'}" :o-img-url="getForm.licenseUrl" @get-url="getUrl($event, 'licenseUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照副本" prop="licenseViceUrl">
                  <upload :param="{filename:'licenseViceUrl'}" :o-img-url="getForm.licenseViceUrl" @get-url="getUrl($event, 'licenseViceUrl')"></upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="组织机构代码证" prop="organizationUrl">
                  <upload :param="{filename:'organizationUrl'}" :o-img-url="getForm.organizationUrl" @get-url="getUrl($event, 'organizationUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证" prop="taxUrl">
                  <upload :param="{filename:'taxUrl'}" :o-img-url="getForm.taxUrl" @get-url="getUrl($event, 'taxUrl')"></upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="银行名称:" prop="bankName">
                  <el-input v-model.trim="getForm.bankName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="4" >
                <el-form-item label="银行账号:" prop="bankAccount">
                  <el-input v-model.trim="getForm.bankAccount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="开户省市:">
                  <el-cascader
                    :options="options"
                    v-model="getBankAdd"
                    filterable
                    change-on-select
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="4">
                <el-form-item label="开户支行:" prop="accountOpeningBranch">
                  <el-input v-model.trim="getForm.accountOpeningBranch"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </section>

      </main>
      <footer>
        <el-row>
          <el-col :span="6" :offset="10">
            <el-button v-if="step!=1" type="primary" size="mini" @click="prevHandle()">上一步</el-button>
            <el-button v-if="step!=3" type="primary" size="mini" @click="nextHandle(`form-${step}`)">下一步</el-button>
            <el-button v-if="step==3" type="primary" size="mini" @click="subHandle('form-3')">提交</el-button>
          </el-col>
        </el-row>
      </footer>
    </article>
  </section>
</template>
<style lang="scss">
.register-style {
  min-width: 960px;
  width: 65%;
  border: solid 1px #bbb;
  margin: auto;
  height: auto;
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-select .el-input {
    width: 130px;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>

<script>
import commonDatas from '@/mixins/commonDatas' // 货币类型
import Upload from '@/components/Items/upload'
import validConf from '@/config/validateConfig'
import CityData from '@/mixins/CityData' // 省市数据
/* 企业认证 */
export default {
  props: ['visibleP', 'form'],
  mixins: [commonDatas, CityData],
  components: {
    Upload
  },
  data () {
    validConf.scope = this
    let valido2tfun = (rule, value, callback) => {
      console.log(!this.getForm.creditCode)
      console.log(value)
      if (!value && !this.getForm.creditCode) {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    let validt2ofun = (rule, value, callback) => {
      if (!value && !this.getForm.licenseNumber && !this.getForm.organizationNumber && !this.getForm.taxNumber) {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    let arr = {
      creditCode: [{
        required: true,
        validator: validt2ofun,
        message: '请输入统一社会信用代码',
        trigger: 'blur'
      }],
      licenseNumber: [{
        required: true,
        validator: valido2tfun,
        message: '请输入营业执照编号',
        trigger: 'blur'
      }],
      organizationNumber: [{
        required: true,
        validator: valido2tfun,
        message: '请输入组织机构代码编号',
        trigger: 'blur'
      }],
      taxNumber: [{
        required: true,
        validator: valido2tfun,
        message: '请输入税务登记证编号',
        trigger: 'blur'
      }]
    }
    return {
      step: 1,
      show: true,
      userInfo: {},
      bankProvinceCity: [], // 银行省市
      select: '',
      rulesOne: validConf.getValid('validOne'),
      rulesTwo: { ...arr, ...validConf.getValid('validTwo') },
      rulesThree: validConf.getValid('validThree')

    }
  },
  computed: {
    getTitle () {
      return '企业认证'
    },
    getForm () {
      return this.userInfo
    },
    getBankAdd: {
      get: function () {
        let arr = []
        arr[0] = this.userInfo.bankProvince
        arr[1] = this.userInfo.bankCity
        return arr
      },
      set: function (newValue) {
        this.bankProvinceCity = newValue
      }
    }
  },
  mounted () {
    this.axios.post('/cust/customerDetailInfo.do', {}).then(res => {
      if (res.data.status) {
        const data = res.data.data
        const compuDate = [] // 营业执照日期
        data.registeredCurrencyType = parseInt(data.registeredCurrencyType) // 货币类型数字转字符串
        data.paidinCurrencyType = parseInt(data.paidinCurrencyType) // 货币类型数字转字符串
        compuDate.push(data.businessStartDate)
        compuDate.push(data.businessEndDate)
        data.compuDate = compuDate
        this.userInfo = data
      } else {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: 'error'
        })
      }
    })
  },
  methods: {
    prevHandle (formName) {
      this.step = this.step > 1 ? this.step - 1 : this.step
    },
    nextHandle (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.step = this.step < 3 ? this.step + 1 : this.step
        }
      })
    },
    subHandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let businessStartDate = this.userInfo.compuDate ? this.userInfo.compuDate[0] : ''
          let businessEndDate = this.userInfo.compuDate ? this.userInfo.compuDate[1] : ''
          this.userInfo.registeredCurrencyType = this.userInfo.registeredCurrencyType.toString() // 注册资本币别
          this.userInfo.paidinCurrencyType = this.userInfo.paidinCurrencyType.toString() // 实收资本币别
          this.userInfo.businessStartDate = businessStartDate // 营业执照开始日期
          this.userInfo.businessEndDate = businessEndDate // 营业执照结束日期
          this.userInfo.bankProvince = this.bankProvinceCity[0] !== undefined ? this.bankProvinceCity[0] : ''
          this.userInfo.bankCity = this.bankProvinceCity[1] !== undefined ? this.bankProvinceCity[1] : ''
          const param = {
            custId: this.userInfo.custId, // 公司ID
            custUsername: this.userInfo.custUsername, // 企业名称
            custPassword: this.userInfo.custPassword, // 企业电话
            custNickname: this.userInfo.custNickname, // 企业地址
            companyName: this.userInfo.companyName, // 统一社会信用代码
            companyPhone: this.userInfo.companyPhone, // 纳税人识別号
            companyPersonSum: this.userInfo.companyPersonSum, // 供应商代码
            contactPerson: this.userInfo.contactPerson, // 注册资本
            registeredCurrencyType: this.userInfo.registeredCurrencyType.toString(), // 注册资本币别
            contactIdcardNum: this.userInfo.contactIdcardNum, // 实收资本
            paidinCurrencyType: this.userInfo.paidinCurrencyType.toString(), // 实收资本币别
            contactPhone: this.userInfo.contactPhone, // 公司成立日期
            businessStartDate: businessStartDate, // 营业执照开始日期
            businessEndDate: businessEndDate, // 营业执照结束日期
            companyRegisterDate: this.userInfo.companyRegisterDate, // 公司登记日期
            companyAddress: this.userInfo.companyAddress, // 经营范围
            logoUrl: this.userInfo.logoUrl, // 公司LOGO
            licenseUrl: this.userInfo.licenseUrl, // 营业执照(图片)
            licenseViceUrl: this.userInfo.licenseViceUrl, // 营业执照副本
            organizationUrl: this.userInfo.organizationUrl, // 组织机构代码证
            taxUrl: this.userInfo.taxUrl // 税务登记证

          }
          console.log(this.userInfo)
          this.axios.post('/cust/userRegister.do', param).then(res => {
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
        this.userInfo[idx] = val.data
      }
    }
  }
}

</script>
