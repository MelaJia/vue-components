/**
 * 验证规则 对象
 */

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
            callback(new Error(`${smsg}已存在`))
          }
        }).catch(err => {
          console.log(err)
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
let checkPass = function (key, smsg, url = '/cust/check') {
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
        })
      }
    }
  }
}
let validOne = {
  custUsername: [{
    required: true,
    validator: check('custUsername', '用户名'),
    trigger: 'blur'
  }],
  custPassword: [{
    required: true,
    validator: checkPass('custPassword', '登录密码'),
    trigger: 'blur'
  }],
  custNickname: [{
    required: true,
    validator: check('custNickname', '昵称'),
    trigger: 'blur'
  }],
  companyName: [{
    required: true,
    message: '请输入名称',
    trigger: 'blur'
  }],
  companyPhone: [{
    required: true,
    message: '请输入企业电话',
    trigger: 'blur'
  },
  {
    pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
    message: '电话号码错误',
    trigger: 'blur'
  }
  ],
  companyPersonSum: [{
    type: 'number',
    message: '员工人数必须为数字值'
  }],
  companyAddress: [{
    required: true,
    message: '请输入公司详细地址',
    trigger: 'blur'
  }],
  contactPerson: [{
    required: true,
    message: '请输入联系人姓名',
    trigger: 'blur'
  }],
  contactIdcardNum: [{
    required: true,
    validator: check('custUsername', '身份证'),
    message: '请填写联系人身份证',
    trigger: 'blur'
  },
  {
    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    message: '身份证格式错误',
    trigger: 'blur'
  }
  ],
  contactPhone: [{
    required: true,
    message: '请输入企业电话',
    trigger: 'blur'
  },
  {
    pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
    message: '电话号码错误',
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
    trigger: ['blur', 'change']
  }
  ],
  legalPerson: [{
    required: true,
    message: '请输入法人姓名',
    trigger: 'blur'
  }],
  legalIdcardNum: [{
    required: true,
    message: '请填写联系人身份证',
    trigger: 'blur'
  },
  {
    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    message: '身份证格式错误',
    trigger: 'blur'
  }
  ],
  legalPhone: [{
    required: true,
    message: '请输入法人电话',
    trigger: 'blur'
  },
  {
    pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
    message: '电话号码错误',
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
    trigger: ['blur', 'change']
  }
  ]
}
let validTwo = {
  licenseViceNumber: [{
    required: true,
    message: '请输入营业执照副本编号',
    trigger: 'blur'
  }],
  licenseAddress: [{
    required: true,
    message: '请输入营业执照所在地',
    trigger: 'blur'
  }],
  mainProducts: [{
    required: true,
    message: '请输入主营产品',
    trigger: 'blur'
  }]
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
    message: '请输入营业执照所在地',
    trigger: 'blur'
  }],
  bankName: [{
    required: true,
    message: '请输入营业执照所在地',
    trigger: 'blur'
  }],
  bankAccount: [{
    required: true,
    message: '请输入营业执照所在地',
    trigger: 'blur'
  }],
  bankShortName: [{
    required: true,
    message: '请输入营业执照所在地',
    trigger: 'blur'
  }]
}
vcg.setValid('validOne', validOne)
vcg.setValid('validTwo', validTwo)
vcg.setValid('validThree', validThree)
export default vcg
