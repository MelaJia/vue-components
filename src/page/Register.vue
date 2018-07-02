<template>
  <section>
  <section class="header">
    <div class="wrapper clearfix">
        <a href="#" class="logo">
          <img src="@/assets/img/login/pread_03.png" alt="">
        </a>
        <div class="phone">
          <!--<a href="#" class="backhome">返回首页</a>-->
          <p>已有账号？ 立即
            <span class="loginLine">登录</span>
          </p>
        </div>
      </div>
  </section>
  <section class="register-style main">
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
                  <el-input v-model.number="getForm.companyPersonSum"></el-input>
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
                <el-form-item label="公司登记机构: " prop="registry">
                  <el-input v-model.trim="getForm.registry"></el-input>
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
                  <upload ref="logoFile" :param="{filename:'logoUrl'}" @get-url="getUrl($event, 'logoUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照(图片)" prop="licenseUrl">
                  <upload ref="licenseFile" :param="{filename:'licenseUrl'}"  @get-url="getUrl($event, 'licenseUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照副本" prop="licenseViceUrl">
                  <upload ref="licenseViceFile" :param="{filename:'licenseViceUrl'}" @get-url="getUrl($event, 'licenseViceUrl')"></upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="组织机构代码证" prop="organizationUrl">
                  <upload ref="organizationFile" :param="{filename:'organizationUrl'}" @get-url="getUrl($event, 'organizationUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证" prop="taxUrl">
                  <upload ref="taxFile" :param="{filename:'taxUrl'}" @get-url="getUrl($event, 'taxUrl')"></upload>
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
  <section class="footer"></section>
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
.loginLine{
  color: #8ec1f4
}
</style>

<script>
import '@/assets/css/pread.css' // 引入样式
import commonDatas from '@/mixins/commonDatas' // 货币类型
import Upload from '@/components/Items/uploadReg'
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
    // 2选一
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
      userInfo: getUserInfo(),
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
    // 开户省市计算
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
      console.log(this.userInfo)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 1.处理数据
          let businessStartDate = this.userInfo.compuDate ? this.userInfo.compuDate[0] : ''
          let businessEndDate = this.userInfo.compuDate ? this.userInfo.compuDate[1] : ''
          this.userInfo.registeredCurrencyType = this.userInfo.registeredCurrencyType.toString() // 注册资本币别
          this.userInfo.paidinCurrencyType = this.userInfo.paidinCurrencyType.toString() // 实收资本币别
          this.userInfo.businessStartDate = businessStartDate // 营业执照开始日期
          this.userInfo.businessEndDate = businessEndDate // 营业执照结束日期
          this.userInfo.bankProvince = this.bankProvinceCity[0] !== undefined ? this.bankProvinceCity[0] : ''
          this.userInfo.bankCity = this.bankProvinceCity[1] !== undefined ? this.bankProvinceCity[1] : ''
          // 2.obj转formdata
          // let p = { data: this.userInfo }
          // const param = objToFormData.apply(this, [p])
          // 3.添加图片信息
          // let arr = ['logoFile', 'licenseFile', 'licenseViceFile', 'organizationFile', 'taxFile']
          // for (const key of arr) {
          //   param.append(key, this.$refs[key].file.raw)
          // }
          // 4.设置请求头
          // let config = {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // }
          // 5.传送数据
          this.axios.post('/cust/userRegister.do', this.userInfo).then(res => {
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
      this.userInfo[idx] = val
    }
  }
}
// 对象转formdata
// function objToFormData (config) { // 对象转formdata格式
//   let formData = new FormData()
//   let obj = config.data
//   let arrayKey = config.arrayKey
//   for (var i in obj) {
//     if (this._.isArray(obj[i])) {
//       obj[i].map(item => {
//         if (!arrayKey) {
//           formData.append(i, item)
//         } else {
//           formData.append(i + '[]', item)
//         }
//       })
//     } else {
//       formData.append(i, obj[i])
//     }
//   }
//   return formData
// }
// 获取userInfo格式
function getUserInfo () {
  return {
    custUsername: '', // 登陆名
    custPassword: '', // 登陆密码
    custNickname: '', // 昵称
    companyName: '', // 公司名称
    companyPhone: '', // 公司电话
    companyPersonSum: 0, // 员工人数
    companyAddress: '', // 公司详细地址
    contactPerson: '', // 联系人姓名
    contactIdcardNum: '', // 联系人身份证
    contactPhone: '', // 联系人电话
    contactMail: '', // 联系人邮箱
    legalPerson: '', // 法人姓名
    legalIdcardNum: '', // 法人身份证
    legalPhone: '', // 法人电话
    legalMail: '', // 法人邮箱
    creditCode: '', // 统一社会信用代码
    licenseNumber: '', // 营业执照编号
    organizationNumber: '', // 组织机构代码编号
    licenseViceNumber: '', // 营业执照副本编号
    taxNumber: '', // 税务登记证编号
    payTaxesNumber: '', // 纳税人识別号
    licenseAddress: '', // 营业执照所在地
    registry: '', // 公司登记机构
    vendorCodes: '', // 供应商代码
    registeredCapital: 0, // 注册资本
    registeredCurrencyType: 1, // 注册资本币别
    paidinCapital: 0, // 实收资本
    paidinCurrencyType: 1, // 实收资本币别
    establishDate: null, // 公司成立日期
    companyRegisterDate: null, // 公司登记日期
    businessStartDate: null, // 营业执照开始日期
    businessEndDate: null, // 营业执照结束日期
    companyBusinessScope: '', // 法定营业范围
    mainProducts: '', // 主营产品
    logoUrl: '', // 公司LOGO
    licenseUrl: '', // 营业执照
    licenseViceUrl: '', // 营业执照副本
    organizationUrl: '', // 组织机构代码证
    taxUrl: '', // 税务登记证
    bankName: '', // 银行名称
    bankAccount: '', // 银行账号
    bankProvince: '', // 银行开户省
    bankCity: '', // 银行开户市
    accountOpeningBranch: '' // 开户支行
  }
}
</script>
