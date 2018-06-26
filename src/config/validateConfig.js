/**
 * 验证规则 对象
 */
export default {
  custUsername: [{
    required: true,
    message: '请输入登录名',
    trigger: 'blur'
  }],
  custPassword: [{
    required: true,
    message: '请输入登录密码',
    trigger: 'blur'
  }],
  custNickname: [{
    required: true,
    message: '请输入昵称',
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
  }
  ],
  contactPerson: [{
    required: true,
    message: '请输入联系人姓名',
    trigger: 'blur'
  }
  ],
  contactIdcardNum: [{
    required: true,
    message: '请填写联系人身份证',
    trigger: 'blur'
  },
  { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '身份证格式错误', trigger: 'blur' }
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
  contactMail: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  legalPerson: [{
    required: true,
    message: '请输入法人姓名',
    trigger: 'blur'
  }
  ],
  legalIdcardNum: [{
    required: true,
    message: '请填写联系人身份证',
    trigger: 'blur'
  },
  { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '身份证格式错误', trigger: 'blur' }
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
  legalMail: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ]
}
