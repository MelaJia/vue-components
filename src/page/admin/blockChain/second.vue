<template>
  <section>
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="content" label-width="100px">
          <el-form-item label="密钥">
            <el-input type="textarea" v-model="content.privateKey"></el-input>
          </el-form-item>
          <el-form-item label="区块链地址">
            <el-input type="textarea" v-model="content.url"></el-input>
          </el-form-item>
          <el-form-item label="公司简称">
            <el-input v-model="content.clientId"></el-input>
          </el-form-item>
          <el-form-item label="业务主键">
            <el-input v-model="content.key"></el-input>
          </el-form-item>
          <el-form-item>
            <div style="margin-bottom:10px;"><el-button type="default" @click="post('company')">企业查询</el-button></div>
            <div style="margin-bottom:10px;">
              <el-button type="primary" @click="post('addAr')">Ar新增</el-button>
              <el-button type="warning" @click="post('updateAr')">Ar更新</el-button>
              <el-button type="default" @click="post('ar')">Ar查询</el-button>
              <el-button type="default" @click="post('arQueryPermissionsAllocation')">Ar查询权限分配</el-button>
            </div>
            <div style="margin-bottom:10px;">
              <el-button type="primary" @click="post('addArPay')">支付新增</el-button>
              <el-button type="warning" @click="post('updateArPay')">支付更新</el-button>
              <el-button type="default" @click="post('arPay')">支付查询</el-button>
              <el-button type="default" @click="post('payQueryPermissionsAllocation')">支付查询权限分配</el-button>
            </div>
            <div style="margin-bottom:10px;">
              <el-button type="primary" @click="post('addArDiscount')">贴现新增</el-button>
              <el-button type="warning" @click="post('updateArDiscount')">贴现更新</el-button>
              <el-button type="default" @click="post('discount')">贴现查询</el-button>
              <el-button type="default" @click="post('discountQueryPermissionsAllocation')">贴现查询权限分配</el-button>
            </div>
            <div>
              <el-button type="default" @click="post('contract')">合同查询</el-button>
            </div>
          </el-form-item>
          <el-form-item label="请求串">
            <el-input type="textarea" v-model="content.body"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="sign(content)">生成签名串</el-button>
          </el-form-item>
           <el-form-item label="签名串">
            <el-input type="textarea" v-model="signResult1" placeholder="生成签名串"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="view(content)">发送</el-button>
          </el-form-item>
          <el-form-item>
            <div v-show="signError" class="col-md-offset-1 col-md-10"><span class="text-danger">{{signError}}</span></div>
          </el-form-item>
           <el-form-item label="结果">
            <el-input type="textarea" v-model="signResult" placeholder="结果"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import {
  setStore
} from '@/util/store'
var tmpl = {
  company: {
    key: 'companyId',
    method: 'getCompanyById',
    content: {}
  },
  ar: {
    key: 'arId',
    method: 'getArById',
    content: {}
  },
  arPay: {
    key: 'payId',
    method: 'getArPayById',
    content: {}
  },
  discount: {
    key: 'discountId',
    method: 'getArDiscountById',
    content: {}
  },
  arQueryPermissionsAllocation: {
    key: 'arQueryPermission',
    method: 'arQueryPermission',
    content: {}
  },
  payQueryPermissionsAllocation: {
    key: 'payQueryPermission',
    method: 'payQueryPermission',
    content: {}
  },
  discountQueryPermissionsAllocation: {
    key: 'discountQueryPermission',
    method: 'discountQueryPermission',
    content: {}
  },
  contract: {
    key: 'contractNo',
    method: 'getArContractByNo',
    content: {}
  },
  addContract: {
    key: 'contractNo',
    method: 'addArContract',
    content: {
      'tradeId': '001',
      'tradeType': '1',
      'contractType': '1',
      'status': 1,
      'filePath': '测试合同.pdf',
      'digest': 'fdsagsafdsa',
      'contractUrl': 'http://jy.com/conract'
    }
  },
  addCompany: {
    key: 'companyId',
    method: 'addCompany',
    content: {
      'address': '深圳',
      'bankAccount': '32143',
      'bankAccountName': '4321',
      'bankBranchCity': '4321',
      'bankBranchName': '4321',
      'bankBranchProvince': '43214',
      'bankName': '21432143',
      'businessLicence': '1111',
      'contact': '测试人员',
      'contactIdcardNum': '123213',
      'createdDate': 1514518822000,
      'email': '1232@123.com',
      'legalIdcardNum': '123',
      'legalMail': '321',
      'legalPerson': '1321`1',
      'legalPhone': '1231',
      'name': '钱福保理',
      'phone': '18118762818',
      'type': '1',
      'updatedDate': 1514518826000,
      'usci': '12318328143fda'
    }
  },
  updateCompany: {
    key: 'companyId',
    method: 'updateCompany',
    content: {
      'address': '深圳',
      'bankAccount': '32143',
      'bankAccountName': '4321',
      'bankBranchCity': '4321',
      'bankBranchName': '4321',
      'bankBranchProvince': '43214',
      'bankName': '21432143',
      'businessLicence': '1111',
      'contact': '测试人员更新',
      'contactIdcardNum': '123213',
      'createdDate': 1514518822000,
      'email': '1232@123.com',
      'legalIdcardNum': '123',
      'legalMail': '321',
      'legalPerson': '1321`1',
      'legalPhone': '1231',
      'name': '钱福保理',
      'phone': '18118762818',
      'type': '1',
      'updatedDate': 1514518826000,
      'usci': '12318328143fda'
    }
  },
  addAr: {
    key: 'arId',
    method: 'addAr',
    content: {
      'arParentId': 'AR001',
      'arSourceId': 'AR001',
      'billBookAmt': 1000021,
      'billDueDate': '1514509741757',
      'billId': '11',
      'billPayDate': '1514509741757',
      'billStartDate': '1514509741757',
      'createdDate': 1514517177000,
      'currency': 'RMB',
      'fromId': '11',
      'invoiceNoList': [{
        'invoiceNo': '001',
        'afterTaxAmt': 100
      }],
      'loanAmt': 100,
      'plantCode': '1',
      'plantLegalPerson': '测试人员',
      'plantName': 'fdsa',
      'poNumberList': [{
        'poNumber': '001'
      }],
      'status': '0',
      'transSerialNo': '12321432142',
      'toId': '12',
      'updatedDate': 1514517180000
    }
  },
  updateAr: {
    key: 'arId',
    method: 'updateArStatus',
    content: {
      'status': '2'
    }
  },
  addArPay: {
    key: 'payId',
    method: 'addArPay',
    content: {
      'arList': [{
        'arSourceId': 'AR001',
        'arParentId': 'AR001',
        'arSubId': 'AR002',
        'amount': 100
      }],
      'currency': 'RMB',
      'fromId': '1',
      'paidDate': '1514513101000',
      'payId': '002',
      'poDetailList': [{
        'poClassify': '111',
        'poAmt': 200
      }],
      'proxyUrl': 'http://www.baidu.com',
      'refTransSerialNo': '001',
      'status': '0',
      'toId': '1'
    }
  },
  updateArPay: {
    key: 'payId',
    method: 'updateArPayStatus',
    content: {
      'status': '2'
    }
  },
  addArDiscount: {
    key: 'discountId',
    method: 'addArDiscount',
    content: {
      'actualInterest': 8,
      'actualServiceFee': 8,
      'acutalLoanAmt': 89,
      'anchorId': '1',
      'applyDate': '1514509741757',
      'arParentId': '001',
      'arSourceId': '001',
      'arSubId': '002',
      'auditDate': '1514509741757',
      'currency': 'RMB',
      'currentFlag': 'Y',
      'currentStatus': '1',
      'discountAmount': 100,
      'discountId': '002',
      'fundId': '1',
      'id': 1,
      'interest': 8,
      'interestRate': 8,
      'loanAmt': 90,
      'loanPer': 8,
      'status': '2',
      'overdueRate': 8,
      'refTransSerialNo': '00001',
      'serviceFee': 8,
      'serviceFeeRate': 8,
      'supplierId': '1'
    }
  },
  updateArDiscount: {
    key: 'discountId',
    method: 'updateArDiscount',
    content: {
      'actualInterest': 8,
      'actualServiceFee': 8,
      'acutalLoanAmt': 89,
      'anchorId': '1',
      'applyDate': '1514509741757',
      'arParentId': '001',
      'arSourceId': '001',
      'arSubId': '002',
      'auditDate': '1514509741757',
      'currency': 'RMB',
      'currentFlag': 'Y',
      'currentStatus': '1',
      'discountAmount': 100,
      'discountId': '002',
      'fundId': '1',
      'id': 1,
      'interest': 8,
      'interestRate': 8,
      'loanAmt': 90,
      'loanPer': 8,
      'status': '5',
      'overdueInterest': 8,
      'overdueRate': 8,
      'refTransSerialNo': '00001',
      'serviceFee': 8,
      'serviceFeeRate': 8,
      'supplierId': '1'
    }
  }

}
export default {
  data () {
    return {
      content: {
        privateKey: '',
        body: '',
        url: '',
        key: '',
        clientId: ''
      },
      signResult: '',
      signResult1: '',
      signError: ''
    }
  },
  methods: {
    post: function (type) {
      console.info(type)
      var _this = this
      var t = tmpl[type]
      var body = {
        clientId: _this.content.clientId,
        content: t.content,
        timestamp: Date.now()
      }
      body.content[t.key] = _this.content.key
      body.method = t.method
      _this.content.body = JSON.stringify(body)
    },
    view: function (content) {
      var _this = this
      _this.signError = ''
      if (!content.privateKey || !content.body || !content.url) {
        _this.signError = '密钥和请求串都不能为空！'
        return
      }
      _this.signResult = '请求中...'
      setStore({
        name: 'content',
        content: _this.content
      })
      this.axios.post('/blockChainBrower/bcView.do', content).then(res => {
        _this.signResult = JSON.stringify(res.data)
      })
    },
    sign: function (content) {
      var _this = this
      _this.signError = ''
      if (!content.privateKey || !content.body || !content.url) {
        _this.signError = '密钥和请求都不能为空！'
        return
      }
      _this.signResult1 = '请求中...'
      setStore({
        name: 'content',
        content: _this.content
      })
      this.axios.post('/blockChainBrower/rsaSign.do', content).then(res => {
        _this.signResult1 = res.data
      })
    }
  },
  mounted () {
    var _this = this
    _this.content.privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDoTt6XgvCvIb3YSrDHgbfSZWuIAsYrel1xovx0ubBYe/vhoCNomGzdGEHrRf/Prg49waH2PEzfA2JWB3NYj4uTMYCs7RRBmz8gLaM5g3h6FpkE5vvjRpHDfYDJEWk826O5SHlmqUoguzOeGEfVeC+bhHFuOCsHZpKL7mZSvs8LPx2fN/HGXKboNWovFc5aSnKWDqzO0l9nCKE9gXABYywleUjrbiGraH5Bi9j2a4w3twg5gvM4c9J060WgXNQ47BT9wQB+ThAJE9PNjXXrVn2ZpYfEwRK4fRJVnqLaxCYBgmbmgzqbroLMqL+OW6MK+tFsOEuBI6y3OtcCC4Qs2RfnAgMBAAECggEAEGBe+LdWWEI8q964D5hpaP+VUQVBCxeZNsWSnnfoopQ68XDkjh8QrZVkMD3DBtTyVBAuZrlhgecvK3li/D9CS6IVvBsKboWPMamF9Cv8dj7Zkqrl3uO+qtVSGtqLXKrvI8SkKkSM4TnRLbfweG/8iy4PAQIcpmzor8yikfq5hcVO4yIAc09hk0+7H5G1x8GQxAnS4FeD/pAnDIG286hl6KldygbHW1lT02vZ8ydwhkUGgbGuELnQuL6omLU2mOA0tHFbnFLQ5AcEgcEByB1gssU50ZlRbeTj2/F6TKzck9J5nhwtOPGsz5tmdPVzD5dGzIVzc68xPE0zRzEwd8x+wQKBgQD08qVHEvefqnjjHJm1DVHRMJMbhs142KxGcVlkrXrpTZpHcfJAkx22OHLhQ25x6FxULnqdPooLVVLfSGcHrjkLRbq3AZ+Px+OqPw9nXmyGrihTkX9oX7RsDY4EeRxSPZuOFKvNdtk1xMYuyk/ftrQ1CtvaarP/pFNtKO129K83HwKBgQDyyjld8Fs6Ef/+k+EYHHeaqH9lRo6GBnv16ZfIiVwYOosWkIDmhKN8MQLy4MrOomKjtlqUWMisKZqKun3tc34y6KwTF0FiZYsB1uLuWYnyepCtD9dUZGcHUNtMsmF/DxeHcYxTXvcdhxj5zj8u/bRqE/4+fVrKW+luex0vE4nuOQKBgQDeAq9a5A4cYV6AOoP2XcQyXlx3Lo89YOWEU2g6oCIvI28aImT3sl/TsQYutfd8tqY4hogLzYtBCmy6g90eUQLS/Lhm9smwf/QRcmZ7wlGLIH7cf5uC9nuJFCAMXdkVkVFUTdgJuhbVbSxTbHtIwUhEazsplFzg8AfNgLL6hnvo8QKBgB2sjbpniB7e2FT7KgXSZOPoODnel8jVvgzeUgjWkQT9EsbdPoPuLjUdoGijBOagfkHYJdX/y/cO1q6iAIYnGYOLYIysyPcHxiehZfcPxoZ2aHxedUkBRH5maYdEPhpTc+LABBCkiLt5KZpOlPZfV8+nRenJVHFrLmqsbXK1hqQxAoGBAKida6Bho6f448kPLuucOEOlixEXnt1hSdSVBxxuapplHB6nFQnR5F5KUiJqHGHEdpHoOyj+JN0MKZjc5jliAE9tCulPfWu2uWek3wRnsvxG/UqCxTYWV3FSVNi3RTTJWknueaDlm4ADTF9FKBGBsO0ehc6sCYjUuv0OUu2g9o9M'
    _this.content.url = 'http://10.134.184.117:8080/openapi'
    _this.content.clientId = 'jy'
  }
}

</script>
