<template>
  <section class="reg-style">
  <section class="header">
    <div class="wrapper clearfix">
        <a href="#" class="logo">
          <img src="@/assets/img/login/pread_03.png" alt="">
        </a>
        <div class="phone">
          <!--<a href="#" class="backhome">返回首页</a>-->
          <p>已有账号？ 立即
             <router-link to="/login" class="red">登录</router-link>
          </p>
        </div>
      </div>
  </section>
  <section class="register-style main">
    <article>
      <header>
        <el-steps :active="step" finish-status="success" simple style="margin-top: 20px">
          <el-step title="设定账号"></el-step>
          <el-step title="完善信息"></el-step>
          <el-step title="完成注册"></el-step>
        </el-steps>
      </header>
      <main>
        <section class="reg-step-1" v-show="step==0">
          <el-form ref="form-1" :model="getForm" :rules="rulesOne" label-width="130px">
            <el-row>
              <el-col :span="24">
                <div v-show="isPassShow" class="text-error">提示：密码必须是由数字、大写字母、小写字母、特殊符号(包括!&quot;#$%&amp;&#x27;()*+,-./:;&lt;=&gt;?@[]^_&#x60;{|}~)四者组成,且长度为8~20位的字符串.</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="注册账号类型: " prop="custType" :rules="[{ required: true, message: '账号类型不能为空'}]">
                  <el-select v-model="getForm.custType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in custTypeOptions"
                      :key="item.roleType"
                      :label="item.roleTypeName"
                      :value="item.roleType">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="登陆名: " prop="custUsername">
                  <el-input v-model.trim="getForm.custUsername"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登陆密码: " prop="custPassword">
                  <el-input :type="pShow?'text':'password'" auto-complete="new-password" v-model="getForm.custPassword" @blur="passBlur" @focus="passFocus">
                    <eye slot="suffix" :item-show.sync="pShow"></eye>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input :type="pcShow?'text':'password'" v-model="getForm.checkPass" auto-complete="off">
                    <eye slot="suffix" :item-show.sync="pcShow"></eye>
                  </el-input>
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
                <el-form-item label="昵称: " prop="custNickname">
                  <el-input v-model.trim="getForm.custNickname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="公司详细地址: " prop="companyAddress">
                  <el-input type="textarea" v-model.trim="getForm.companyAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工人数: " prop="companyPersonSum">
                  <el-input v-model.number="getForm.companyPersonSum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-col :span="8">
                <el-form-item label="联系人姓名: " prop="contactPerson">
                  <el-input v-model.trim="getForm.contactPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人电话:" prop="contactPhone">
                  <el-input v-model.trim="getForm.contactPhone" placeholder="系统以此号码为准"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="验证码" :class="'is-required'">
                  <el-col :span="10" >
                    <el-input v-model.trim="verificationCode" auto-complete="off" :maxlength="6" size="small" @blur="handleCheckCode"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-button :type="btntype" size="small" @click="sendMessage" :disabled="isPhoneRe">{{word}}</el-button>
                  </el-col>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人邮箱: " prop="contactMail">
                  <el-input v-model.trim="getForm.contactMail"></el-input>
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
                <el-form-item label="法人姓名: " prop="legalPerson">
                  <el-input v-model.trim="getForm.legalPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人电话: " prop="legalPhone">
                  <el-input v-model.trim="getForm.legalPhone" @change.native="handlePhoneChange"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="法人邮箱: " prop="legalMail">
                  <el-input v-model.trim="getForm.legalMail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人身份证: " prop="legalIdcardNum">
                  <el-input v-model.trim="getForm.legalIdcardNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </section>
        <section class="reg-step-2" v-show="step==1">
          <el-form ref="form-2" :model="getForm"  :rules="rulesTwo" label-width="150px">
            <el-row>
              <el-col :span="24">
                <div v-show="is2s1Show" class="text-error">提示：统一社会信用代码与(营业执照编号,组织机构代码证编号,税务登记编号),两者是贰选壹的关系。</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码:" prop="creditCode" :show-message="!t2oAb">
                  <el-input :disabled="t2oAb" v-model.trim="getForm.creditCode" :maxlength="32"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营业执照编号: " prop="licenseNumber" :show-message="!o2tAb">
                  <el-input :disabled="o2tAb" v-model="getForm.licenseNumber" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构代码编号: " prop="organizationNumber" :show-message="!o2tAb">
                  <el-input :disabled="o2tAb" v-model.trim="getForm.organizationNumber"></el-input>
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
                <el-form-item label="税务登记证编号: " prop="taxNumber" :show-message="!o2tAb">
                  <el-input :disabled="o2tAb" v-model.trim="getForm.taxNumber"></el-input>
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
                <el-form-item label="供应商代码: " prop="vendorCodes">
                  <el-input v-model.trim="getForm.vendorCodes"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="注册资本：" prop="registeredCapital">
                  <el-input placeholder="请输入金额：" :maxlength="12" v-model.number="getForm.registeredCapital" class="input-with-select">
                    <el-select v-model="getForm.registeredCurrencyType" slot="append" placeholder="请选择">
                      <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="4">
                <el-form-item label="实收资本：" prop="paidinCapital">
                  <el-input :maxlength="12" v-model.number="getForm.paidinCapital">
                    <el-select v-model="getForm.paidinCurrencyType" slot="append" placeholder="请选择">
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
                <el-form-item label="营业执照日期:">
                  <el-date-picker :editable="false" v-model="compuDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
        <section class="reg-step-3" v-show="step==2">
          <el-form ref="form-3" :model="getForm" :rules="rulesThree" label-width="150px">
            <el-row>
              <el-col :span="8">
                <el-form-item ref="logoFile" label="公司logo" prop="logoUrl">
                  <upload :param="{typename:'logoUrl'}" @get-url="getUrl($event, 'logoUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="licenseFile" label="营业执照(图片)" prop="licenseUrl">
                  <upload :param="{typename:'licenseUrl'}"  @get-url="getUrl($event, 'licenseUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="licenseViceFile" label="营业执照副本" prop="licenseViceUrl">
                  <upload :param="{typename:'licenseViceUrl'}" @get-url="getUrl($event, 'licenseViceUrl')"></upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item ref="organizationFile" label="组织机构代码证" prop="organizationUrl">
                  <upload :param="{typename:'organizationUrl'}" @get-url="getUrl($event, 'organizationUrl')"></upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="taxFile" label="税务登记证" prop="taxUrl">
                  <upload :param="{typename:'taxUrl'}" @get-url="getUrl($event, 'taxUrl')"></upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="银行名称:" prop="bankName">
                  <el-input v-model.trim="getForm.bankName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号:" prop="bankAccount">
                  <el-input v-model.trim="getForm.bankAccount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="银行账户名称:" prop="bankAccountName">
                  <el-input v-model.trim="getForm.bankAccountName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户省市:" required="" :error="bankProvinceCityError">
                  <el-cascader
                    :options="options"
                    v-model="getBankAdd"
                    filterable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户支行:" prop="accountOpeningBranch">
                  <el-input v-model.trim="getForm.accountOpeningBranch"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="iptChoose">
                <label for="agree">
                  <el-checkbox v-model="checked" @change="handleCheck">我已阅读并同意
                  <a :href="pdfUrl" target="_pdf" id="agreement"
                    class="red">《钜信网服务协议》</a>
                    </el-checkbox>
                <el-alert v-if="checkShow"
                  title="请同意相关协议"
                  type="error">
                </el-alert>
                </label>
              </div>
            </el-row>
          </el-form>
        </section>

      </main>
      <footer>
        <el-row>
          <el-col :span="6" :offset="10">
            <el-button v-if="step!=0" type="primary" size="mini" @click="prevHandle()">上一步</el-button>
            <el-button v-if="step!=2" type="primary" size="mini" @click="nextHandle(`form-${step+1}`)">下一步</el-button>
            <el-button v-if="step==2" type="primary" size="mini" @click="subHandle('form-3')" :loading="registing">提交</el-button>
          </el-col>
        </el-row>
      </footer>
    </article>
  </section>
  <!--阅读协议提醒-->
  <el-dialog title="温馨提示" :visible.sync="DialogVisible" width="30%" center @close='closeDialog'>
    <p style="text-align:justify;line-height:1.5;"><span style="color:#000">【审慎阅读】</span>您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。如您对协议有任何疑问，可向钜信网平台客服咨询。</p>
    <p style="text-align:justify;line-height:1.5;"><span style="color:#000">【签约动作】</span>当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与平台达成一致，成为钜信平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序；弹出内容不影响原有勾选注册协议流程</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmBtn" >确 定</el-button>
    </span>
  </el-dialog>
  <section class="footer"></section>
  </section>
</template>
<style lang="scss">
.reg-style {
  .header {
    background-color: white;
    height: 100px;
    line-height: 100px;
    min-height: 100px;
  }

  .header .logo,
  .header .phone {
    display: inline-block;
  }

  .header .logo {
    float: left;
    margin-left: 70px;
  }

  .header .logo img {
    vertical-align: middle;
  }

  .header .phone {
    float: right;
    color: #666;
    font-size: 16px;
    height: 100px;
    line-height: 100px;
    margin-right: 70px;
  }
  a {
    text-decoration: none;
  }

  a.red {
    color: #ff7832;
  }

  a.red:hover {
    text-decoration: underline;
  }
}
// ie10步骤条兼容处理
.ie10 {
  .el-steps {
    display: block;
  }
  .el-step {
    display: inline-block;
    width: 43%;
  }
  .el-step:last-of-type.is-flex {
    width: 10%;
  }
  .el-step.is-simple .el-step__head {
    float: left;
  }
}
// ie10步骤条兼容处理
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
  .el-input-group__append .el-select .el-input {
    width: 130px;
  }
  .el-cascader {
    width: 100%;
  }
}
.loginLine {
  color: #8ec1f4;
}
// 密码提示信息样式
.text-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding: 4px;
  text-align: center;
}
// 服务协议样式
.iptChoose {
  padding: 20px 50px;
}
// 同意协议按钮
.iptChoose .el-checkbox__inner{
  border: 1px solid #5795e2
}
</style>

<script>
import Upload from '@/components/Items/uploadReg'
import Eye from '@/components/Items/eye'
import validConf from '@/config/validateConfig'
import CityData from '@/mixins/CityData' // 省市数据
import { getStore, setStore } from '@/util/store'
import { debounce, erroShow } from '@/util/util'
/* 企业认证 */
export default {
  props: ['visibleP', 'form'],
  mixins: [CityData],
  components: {
    Upload,
    Eye
  },
  data () {
    validConf.scope = this
    // 2选一
    let valido2tfun = (rule, value, callback) => {
      if (!value && !this.getForm.creditCode) {
        callback(new Error('不能为空'))
      } else {
        callback()
      }
    }
    let validt2ofun = (rule, value, callback) => {
      if (!value && !this.getForm.licenseNumber && !this.getForm.organizationNumber && !this.getForm.taxNumber) {
        callback(new Error('请输入统一社会信用代码'))
      } else {
        this.axios.post('/cust/check', {
          key: 'creditCode',
          value: value
        }).then(res => {
          if (res.data.status) {
            callback()
          } else {
            callback(new Error(res.data.msg))
          }
        }).catch(err => {
          console.log(err)
          callback(new Error(`验证失败请联系管理员`))
        })
      }
    }
    let arr = {
      creditCode: [{
        required: true,
        validator: validt2ofun,
        trigger: 'blur'
      }],
      licenseNumber: [{
        required: true,
        validator: valido2tfun,
        message: '请输入营业执照编号',
        trigger: 'blur'
      }, { max: 20, message: '长度不得超过20个字符', trigger: 'blur' }],
      organizationNumber: [{
        required: true,
        validator: valido2tfun,
        message: '请输入组织机构代码编号',
        trigger: 'blur'
      }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
      taxNumber: [{
        required: true,
        validator: valido2tfun,
        message: '请输入税务登记证编号',
        trigger: 'blur'
      }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }]
    }
    return {
      step: 0,
      show: true,
      checked: false,
      checkShow: false, // 协议未勾选错误信息显示
      DialogVisible: false, // 协议弹框提醒
      pdfUrl: `/upload/pdf/JuXinProtocol/JuXinProtocolService.pdf`, // 服务协议文件地址
      isPassShow: false, // 密码提示信息显示
      is2s1Show: true, // 二选一提示
      userInfo: getUserInfo(),
      compuDate: [], // 营业执照日期
      bankProvinceCity: [], // 银行省市
      bankProvinceCityError: '', // 错误信息提示
      select: '',
      rulesOne: validConf.getValid('validOne'),
      rulesTwo: { ...arr, ...validConf.getValid('validTwo') },
      rulesThree: validConf.getValid('validThree'),
      moneyTypes: [],
      pShow: false, // 密码是否可见
      pcShow: false, // 密码确认是是否可见
      /** 账号类型 */
      custTypeOptions: [],
      /** 验证码 ****/
      isPhoneRe: true, // 可验证
      verificationCode: '',
      verificationCodeStatus: 0, // 验证状态
      word: '获取验证码',
      isOvertime: false,
      btntype: 'primary', // 验证码按钮样式
      registing: false // 注册中
    }
  },
  watch: {
    getcontPhone: function (nval, oldval) {
      console.log('联系人手机修改了')
      this.verificationCodeStatus = 0 // 未验证
    }
  },
  computed: {
    getTitle () {
      return '企业认证'
    },
    getForm () {
      return this.userInfo
    },
    // 2选一是否可输入
    o2tAb () {
      return this.getForm.creditCode.length > 0
    },
    t2oAb () {
      return this.getForm.licenseNumber.length > 0 || this.getForm.organizationNumber.length > 0 || this.getForm.taxNumber.length > 0
    }, // 2选一是否可输入
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
        this.bankProvinceCityError = ''
      }
    },
    // 获取联系人手机
    getcontPhone () {
      return this.getForm.contactPhone
    }
  },
  async mounted () {
    this.moneyTypes = getStore({
      name: 'moneyTypes'
    })
    // storage中无数据
    if (!this.moneyTypes) {
      console.log('从服务器获取通用数据')
      // 获取货币类型并保存
      await this.axios.get('/commonAr/queryCurr.do').then(res => {
        if (res.data.status) {
          setStore({
            name: 'moneyTypes',
            content: res.data.data,
            type: true
          })
          // 赋值
          this.moneyTypes = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        this.$message.error(`网络错误,请求数据失败!${err}`)
      })
    }
    if (this.moneyTypes) {
      // 全部索引
      let idx = this.moneyTypes.findIndex(val => {
        return val.currencyId === null
      })
      // 去除全部
      this.moneyTypes.splice(idx, 1)
      this.moneyTypes.map((val, idx) => {
        this.moneyTypes[idx].currencyId = this.moneyTypes[idx].currencyId.toString()
      })
    }
    this.axios.post('/commonTrans/queryRoleTypeList.do').then(res => {
      if (res.data.status) {
        this.custTypeOptions = res.data.data
        this.userInfo.custType = 2
      } else {
        this.$message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 上一页
    prevHandle: prevHandle,
    // 下一页
    nextHandle: nextHandle,
    // 密码框获取焦点时显示提示信息
    passFocus: passFocus,
    // 密码框失去焦点时隐藏提示信息
    passBlur: passBlur,
    // 提交
    subHandle: debounce(subHandle, 1000, true),
    handleCheck: handleCheck,
    // 格式化银行账号
    formatBankNo: formatBankNo,
    // 还原银行账号
    resetBankNo: resetBankNo,
    // 可见修改
    handlePShowChange: handlePShowChange,
    // 上传图片更新formUrl地址
    getUrl (val, idx) {
      let ref = idx.replace('Url', 'File')
      this.$refs[ref].clearValidate()
      if (val.status) {
        this.userInfo[idx] = val.data
      } else {
        this.$message.error(val.msg)
      }
    },
    // 协议弹框提醒点击确认
    confirmBtn () {
      this.DialogVisible = false // 关闭弹窗
      this.checked = true // 确认勾选
      this.checkShow = false // 协议提示隐藏
    },
    closeDialog () {
      this.DialogVisible = false // 关闭弹窗
    },
    sendMessage: debounce(sendMessage, 1000, true),
    handleCheckCode: handleCheckCode,
    handlePhoneChange (e) {
      console.log(e)
    }
  }
}
// 上一页函数
function prevHandle (formName) {
  this.step = this.step > 0 ? this.step - 1 : this.step
}
// 下一页函数
function nextHandle (formName) {
  // 校验操作
  this.$refs[formName].validate((valid) => {
    if (valid) {
      // 第一步则校验验证码
      console.log(this.verificationCodeStatus)
      if (this.step === 0) {
        if (this.verificationCodeStatus === 0) {
          this.$message.error('手机号未校验，请进行校验')
          return false
        } else if (this.verificationCodeStatus === 2) {
          this.$message.error('手机号校验失败，请重新校验')
          return false
        }
      }
      // 校验成功显示下一步骤
      this.step = this.step < 2 ? this.step + 1 : this.step
    }
  })
}
// 显示密码提示信息
function passFocus () {
  this.isPassShow = true
}
//  隐藏密码提示信息
function passBlur () {
  this.isPassShow = false
}
// 阅读协议
function handleCheck (val) {
  this.DialogVisible = val
  this.checked = false
}
// 提交
function subHandle (formName) {
  console.log(this.userInfo)
  if (!this.checked) {
    this.checkShow = true
    return
  }
  this.bankProvinceCityError = this.bankProvinceCity.length > 0 && this.bankProvinceCity[0] !== undefined ? '' : '选择开户省市'
  this.$refs[formName].validate((valid) => {
    if (valid) {
      // 1.处理数据
      let businessStartDate = this.compuDate.length > 0 ? this.compuDate[0] : null
      let businessEndDate = this.compuDate.length > 1 ? this.compuDate[1] : null
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
      console.log(Object.keys(this.userInfo).length)
      this.registing = true
      this.axios.post('/cust/userRegister.do', this.userInfo).then(res => {
        let _this = this
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.msg,
          type: type
        })
        setTimeout(function () {
          this.registing = false
          if (res.data.status) {
            _this.$router.push('/login')
          }
        }, 1000)
      }).catch(err => {
        this.registing = false
        console.log(err)
        this.$message({
          type: 'info',
          message: `系统错误，请联系管理员`
        })
      })
    }
  })
}
// 获取userInfo格式
function getUserInfo () {
  const infos = {
    custType: null, // 账号类型2 供应商 3 保理方
    custUsername: '', // 登陆名
    custPassword: '', // 登陆密码
    checkPass: '', // 确认密码
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
    registeredCurrencyType: '1', // 注册资本币别
    paidinCapital: 0, // 实收资本
    paidinCurrencyType: '1', // 实收资本币别
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
    bankAccountName: '', // 银行账户名称
    bankProvince: '', // 银行开户省
    bankCity: '', // 银行开户市
    accountOpeningBranch: '' // 开户支行
  }
  const devInfos = {
    custUsername: 'a', // 登陆名
    custPassword: 'a', // 登陆密码
    custNickname: 'a', // 昵称
    companyName: 'a', // 公司名称
    companyPhone: '8725585', // 公司电话
    companyPersonSum: 0, // 员工人数
    companyAddress: 'a', // 公司详细地址
    contactPerson: 'a', // 联系人姓名
    contactIdcardNum: '433121199912103562', // 联系人身份证
    contactPhone: '13713384377', // 联系人电话
    contactMail: '11@qq.com', // 联系人邮箱
    legalPerson: 'a', // 法人姓名
    legalIdcardNum: '433121199912103562', // 法人身份证
    legalPhone: '13713384377', // 法人电话
    legalMail: '11@qq.com', // 法人邮箱
    logoUrl: '111123.png', // 公司LOGO
    licenseUrl: '111123.png', // 营业执照
    licenseViceUrl: '111123.png', // 营业执照副本
    organizationUrl: '111123.png', // 组织机构代码证
    taxUrl: '111123.png' // 税务登记证
  }
  return process.env.NODE_ENV === 'development' ? Object.assign(infos, devInfos) : infos
}
// 银行账号格式化
function formatBankNo () {
  if (this.getForm.bankAccount === '') return
  var account = this.getForm.bankAccount.toString()
  account = account.substring(0, 22) /* 帐号的总数, 包括空格在内 */
  if (account.match('.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}') == null) {
    /* 对照格式 */
    if (account.match('.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' + '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' +
      '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' + '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}') == null) {
      var accountNumeric = ''
      var accountChar = ''
      var i
      for (i = 0; i < account.length; i++) {
        accountChar = account.substr(i, 1)
        if (!isNaN(accountChar) && (accountChar !== ' ')) accountNumeric = accountNumeric + accountChar
      }
      account = ''
      for (i = 0; i < accountNumeric.length; i++) { /* 可将以下空格改为-,效果也不错 */
        if (i === 4) account = account + ' ' /* 帐号第四位数后加空格 */
        if (i === 8) account = account + ' ' /* 帐号第八位数后加空格 */
        if (i === 12) account = account + ' ' /* 帐号第十二位后数后加空格 */
        account = account + accountNumeric.substr(i, 1)
      }
    }
  } else {
    account = ' ' + account.substring(1, 5) + ' ' + account.substring(6, 10) + ' ' + account.substring(14, 18) + '-' + account.substring(18, 25)
  }
  if (account !== this.getForm.bankAccount) {
    console.log(this.getForm.bankAccount)
    setTimeout(() => { this.getForm.bankAccount = account }, 1000)
  }
}
// 重置银行账号
function resetBankNo () {
  this.getForm.bankAccount = this.getForm.bankAccount.replace(/ /g, '')
}
// 可见修改
function handlePShowChange (val) {
  this[val] = !this[val]
}
// 获取验证码
var sendTimer
function sendMessage () {
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  if (!reg.test(this.getForm.contactPhone)) {
    this.$message.error('手机号不能为空')
    return
  }
  if (this.isOvertime) {
    return
  }
  this.isOvertime = true // 验证码获取中
  this.axios.post('/cust/toverificationCode.do', {
    operationType: 1,
    contactPhone: this.getForm.contactPhone
  }).then(res => {
    if (res.data.status) {
      this.$message({
        message: res.data.msg,
        type: 'success'
      })
      let that = this
      let time = 60
      this.btntype = ''
      sendTimer = setInterval(function () {
        time--
        that.word = `${time}秒后重新发送`
        if (time < 0) {
          that.isOvertime = false // 重置可发送验证码
          that.btntype = 'primary'
          clearInterval(sendTimer)
          that.word = '重新获取验证码'
        }
      }, 1000)
    } else {
      this.isOvertime = false // 重置可发送验证码
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    this.isOvertime = false // 重置可发送验证码
    console.log(err)
    erroShow.call(this, err)
  })
}
function handleCheckCode () {
  if (this.verificationCode === '') {
    return
  }
  this.axios.post('/cust/registerCheckVerify', {
    contactPhone: this.getForm.contactPhone,
    verificationCode: this.verificationCode
  }).then(res => {
    console.log(res)
    if (res.data.status) {
      this.verificationCodeStatus = 1 // 成功
      this.$message({
        message: res.data.msg,
        type: 'success'
      })
    } else {
      this.$message.error(res.data.msg)
      this.verificationCodeStatus = 2 // 失败
      return false
    }
  }).catch(err => {
    this.verificationCodeStatus = 2 // 失败
    console.log(err)
    erroShow.call(this, err)
  })
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
// function getcontPhone () {
//   return this.getForm.contactPhone
// }
</script>
