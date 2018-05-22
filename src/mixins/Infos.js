export default {
  data () {
    return {
      userInfo: {
        'businessEndDate': null,
        'businessStartDate': null,
        'companyAddress': '广东省深圳市',
        'companyAuthenticationInfo': {
          'bankName': '工商銀行',
          'companyName': 'CF',
          'isAuthened': 1
        },
        'companyPhone': '13523001191',
        'contractAuthenticationInfo': {
          'contactMail': '7890',
          'contactPerson': '杨林',
          'contactPhone': '15507580148',
          'isAuthened': 1
        },
        'creditCode': '91370200163562681G',
        'custId': 'ADMIN_ID',
        'establishDate': null,
        'isUsableDesc': '可用',
        'legalAuthenticationInfo': {
          'isAuthened': 1,
          'legalMail': '123456@com',
          'legalPerson': '苗盼',
          'legalPhone': '苗盼'
        },
        'mainProducts': '服装',
        'paidinCapital': null,
        'payTaxesNumber': 'cre001234',
        'registeredCapital': null,
        'sourceName': null,
        'vendorCodes': null
      },
      form: {
        ssoId: this.$store.state.user.ssoId,
        companyName: '',
        companyPhone: '',
        companyAddress: '',
        creditCode: '',
        payTaxesNumber: '',
        vendorCodes: '',
        registeredCapital: '',
        registeredCurrencyType: '',
        paidinCapital: '',
        paidinCurrencyType: '',
        establishDate: '',
        businessStartDate: '',
        businessEndDate: '',
        companyRegisterDate: '',
        mainProducts: '',
        logoUrl: '',
        licenseUrl: '',
        licenseViceUrl: '',
        organizationUrl: '',
        taxUrl: ''
      }
    }
  }
}
