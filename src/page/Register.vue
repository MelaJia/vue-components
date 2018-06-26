<template>
  <section class="register-style">
    <article>
      <header>
        <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </header>
      <main>
        <section class="reg-step-1">
          <el-form ref="form" :model="getForm" :rules="rules" label-width="130px">
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
        <section class="reg-step-2"></section>
        <section class="reg-step-3"></section>

      </main>
      <footer>
        <el-row>
          <el-col :span="2" :offset="11">
            <el-button type="primary" size="mini" @click="subHandle('form')">下一步</el-button>
          </el-col>
        </el-row>
      </footer>
    </article>
  </section>
</template>
<style scoped>
.register-style {
  width: 60%;
  border: solid 1px #bbb;
  margin: auto;
  height: auto;
}
</style>

<script>
import commonDatas from '@/mixins/commonDatas' // 货币类型
import Upload from '@/components/Items/upload'
import validConf from '@/config/validateConfig'
/* 企业认证 */
export default {
  props: ['visibleP', 'form'],
  mixins: [commonDatas],
  components: {
    Upload
  },
  data () {
    return {
      show: true,
      userInfo: {},
      select: '',
      rules: validConf
    }
  },
  computed: {
    getTitle () {
      return '企业认证'
    },
    getForm () {
      console.log(this.userInfo)
      return this.userInfo
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
        console.log(this.userInfo)
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
    subHandle (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let businessStartDate = this.form.compuDate ? this.form.compuDate[0] : ''
          let businessEndDate = this.form.compuDate ? this.form.compuDate[1] : ''
          const param = {
            custId: this.form.custId, // 公司ID
            custUsername: this.form.custUsername, // 企业名称
            custPassword: this.form.custPassword, // 企业电话
            custNickname: this.form.custNickname, // 企业地址
            companyName: this.form.companyName, // 统一社会信用代码
            companyPhone: this.form.companyPhone, // 纳税人识別号
            companyPersonSum: this.form.companyPersonSum, // 供应商代码
            contactPerson: this.form.contactPerson, // 注册资本
            registeredCurrencyType: this.form.registeredCurrencyType.toString(), // 注册资本币别
            contactIdcardNum: this.form.contactIdcardNum, // 实收资本
            paidinCurrencyType: this.form.paidinCurrencyType.toString(), // 实收资本币别
            contactPhone: this.form.contactPhone, // 公司成立日期
            businessStartDate: businessStartDate, // 营业执照开始日期
            businessEndDate: businessEndDate, // 营业执照结束日期
            companyRegisterDate: this.form.companyRegisterDate, // 公司登记日期
            companyAddress: this.form.companyAddress, // 经营范围
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
