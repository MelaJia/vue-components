/**
 * 验证规则 对象
 */
import {checkNumber} from '@/util/validate'
function Vcg () {
  this.scope = this
  this.valid = []
}
Vcg.prototype.setValid = function (name, obj) {
  this.valid[name] = obj
}
Vcg.prototype.getValid = function (name) {
  return this.valid[name]
}
const vcg = new Vcg()
let check = function (key, smsg, url = '/cust/check') {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(`${smsg}不能为空`))
    } else {
      let axios = vcg.scope.axios || null
      if (axios) {
        axios.post(url, {
          key: key,
          value: value
        }).then(res => {
          console.log(res)
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
  }
}
/**
 * 密码校验
 * @param {string} key 字段名
 * @param {string} smsg 提示信息
 * @param {str} url 地址
 */
let validPass = function (key, smsg, url = '/cust/check') {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(`${smsg}不能为空`))
    } else {
      let axios = vcg.scope.axios || null
      if (axios) {
        axios.post(url, {
          key: key,
          value: value
        }).then(res => {
          console.log(res)
          if (res.data.status) {
            if (vcg.scope.getForm.checkPass !== '') {
              vcg.scope.$refs['form-1'].validateField('checkPass')
            }
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
  }
}
let validPass2 = (rule, value, callback) => {
  let _this = vcg.scope
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== _this.getForm.custPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
let validOne = {
  custUsername: [{
    required: true,
    validator: check('custUsername', '用户名'),
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  custPassword: [{
    required: true,
    validator: validPass('custPassword', '登录密码'),
    trigger: 'blur'
  }],
  checkPass: [
    { required: true, validator: validPass2, trigger: 'blur' }
  ],
  custNickname: [{
    required: true,
    validator: check('custNickname', '昵称'),
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  companyName: [{
    required: true,
    message: '请输入名称',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  companyPhone: [{
    required: true,
    message: '请输入企业电话',
    trigger: 'blur'
  },
  {
    pattern: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,6})?$/,
    message: '电话号码格式错误',
    trigger: 'blur'
  }
  ],
  companyPersonSum: [{
    type: 'number',
    message: '员工人数必须为数字值'
  }, {
    validator: checkNumber,
    trigger: 'blur'
  }],
  companyAddress: [{
    required: true,
    message: '请输入公司详细地址',
    trigger: 'blur'
  }, { max: 225, message: '长度不得超过225个字符', trigger: 'blur' }],
  contactPerson: [{
    required: true,
    message: '请输入联系人姓名',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  contactIdcardNum: [{
    required: true,
    validator: check('contactIdcardNum', '身份证'),
    trigger: 'blur'
  }
  ],
  contactPhone: [{
    required: true,
    message: '请输入联系人手机号',
    trigger: 'blur'
  },
  {
    pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
    message: '手机号码格式错误',
    trigger: 'blur'
  }
  ],
  contactMail: [{
    required: true,
    message: '请输入邮箱地址',
    trigger: 'blur'
  },
  {
    type: 'email',
    message: '请输入正确的邮箱地址',
    trigger: ['blur']
  }
  ],
  legalPerson: [{
    required: true,
    message: '请输入法人姓名',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  legalIdcardNum: [{
    required: true,
    validator: check('legalIdcardNum', '身份证'),
    trigger: 'blur'
  }
  ],
  legalPhone: [{
    required: true,
    message: '请输入法人手机号',
    trigger: 'blur'
  },
  {
    pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
    message: '手机号码格式错误',
    trigger: 'blur'
  }
  ],
  legalMail: [{
    required: true,
    message: '请输入邮箱地址',
    trigger: 'blur'
  },
  {
    type: 'email',
    message: '请输入正确的邮箱地址',
    trigger: ['blur']
  }
  ]
}
let validTwo = {
  licenseViceNumber: [{
    required: true,
    message: '请输入营业执照副本编号',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  licenseAddress: [{
    required: true,
    message: '请输入营业执照所在地',
    trigger: 'blur'
  }, { max: 128, message: '长度不得超过128个字符', trigger: 'blur' }],
  registry: [{ max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  vendorCodes: [{
    required: true,
    validator: check('vendorCodes', '供应商代码'),
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  companyBusinessScope: [{ max: 200, message: '长度不得超过200个字符', trigger: 'blur' }],
  mainProducts: [{
    required: true,
    message: '请输入主营产品',
    trigger: 'blur'
  }, { max: 200, message: '长度不得超过200个字符', trigger: 'blur' }]
}
let validThree = {
  logoUrl: [{
    required: true,
    message: '请上传公司logo',
    trigger: 'blur'
  }],
  licenseUrl: [{
    required: true,
    message: '请上传营业执照',
    trigger: 'blur'
  }],
  licenseViceUrl: [{
    required: true,
    message: '请上传营业执照副本',
    trigger: 'blur'
  }],
  organizationUrl: [{
    required: true,
    message: '请上传组织机构代码证',
    trigger: 'blur'
  }],
  taxUrl: [{
    required: true,
    message: '请上传税务登记证',
    trigger: 'blur'
  }],
  accountOpeningBranch: [{
    required: true,
    message: '请输入开户支行',
    trigger: 'blur'
  }],
  bankName: [{
    required: true,
    message: '请输入银行名称',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }],
  bankAccount: [{
    required: true,
    message: '请输入银行账号',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' },
  {
    pattern: /^\d+$/,
    message: '银行账号格式错误',
    trigger: 'blur'
  }],
  bankShortName: [{
    required: true,
    message: '请输入开户支行',
    trigger: 'blur'
  }, { max: 32, message: '长度不得超过32个字符', trigger: 'blur' }]
}
vcg.setValid('validOne', validOne)
vcg.setValid('validTwo', validTwo)
vcg.setValid('validThree', validThree)
export default vcg
