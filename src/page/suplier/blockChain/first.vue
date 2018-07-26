<template>
  <section>
    <el-row>
      <el-col :span="20" :offset="2">
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
            <el-button  type="primary" @click="post('addCompany')">企业新增</el-button>
            <el-button  type="warning" @click="post('updateCompany')">企业更新</el-button>
            <el-button  type="default" @click="post('company')">企业查询</el-button>
            <el-button  type="default" @click="post('')">企业查看权限分配</el-button>
            <el-button  type="default" >企业修改权限分配</el-button>
            <el-button  type="default" >企业新增权限分配</el-button>
            <br/>
            <el-button  type="default" @click="post('')">AR查询</el-button>
            <el-button  type="default" @click="post('')">支付查询</el-button>
            <el-button  type="default" @click="post('')">贴现查询</el-button>
            <br/>
            <el-button  type="default" @click="post('')">合同查询</el-button>
          </el-form-item>
          <el-form-item label="请求串">
            <el-input type="textarea" v-model="content.body"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="sign(content)">生成签名串</el-button>
          </el-form-item>
           <el-form-item label="签名串">
            <el-input type="textarea" v-model="content.signResult1" placeholder="生成签名串"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="view(content)">请求</el-button>
          </el-form-item>
          <el-form-item>
            <div v-show="signError" class="col-md-offset-1 col-md-10"><span class="text-danger">{{signError}}</span></div>
          </el-form-item>
           <el-form-item label="结果">
            <el-input type="textarea" v-model="content.signResult" placeholder="请求"></el-input>
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
        content: JSON.stringify(_this.content)
      })
      this.post('/blockChainBrower/bcView.do', JSON.stringify(content)).then(res => {
        _this.signResult = res.data
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
        content: JSON.stringify(_this.content)
      })
      this.post('/blockChainBrower/rsaSign.do', JSON.stringify(content)).then(res => {
        _this.signResult1 = res.data
      })
    }
  },
  mounted () {
    var _this = this
    _this.content.privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtBn5urZpFNq2PFyNj5jGRxwAgH1mCO1l9ANuMvwLr4PKQJyh5unfxrNPFKTRFgOFRWMP+4p7LAMHii53Lnp+S2ln5Pk8W+VwVqBiC79eI5pj3qw4vf6FLMTwiEq+aD+0qY/FwVKpbSw5gY8hHxfJKS0S9Ge/pVtXPX3rfAd8ZiHog8KcchipliQIecxSP3ij8TrTSBEPVHBMAOQCFFHAabEGRR4HrbodD4RoBi21noon2XWa2vwxUKTAVd2jYO+S/HrOJmP9WG9N4PPxncAmTe1ZvJsA9SL9OLV8GecC3OUxLwGCwfv0ww9NDca20Mc+LbGhbL/Bl6APFPznmFM6FAgMBAAECggEBAKvzai6/5DKoti8gBZHAML75D4zc2u1r4fEyqv3izhpwwV61K6pdv9mzsfmci1APVtyq5I0n1jtUk1p6+eRjzZ351bS3UY45XmQ/W6y0gnSRBrALlNtrcXXyhhoui8kFzuJz1HuYCH0VyEHOqDl75OAkkTmEz0ILhAzEjK2XhIovx7x2GbKMVIfJVQ695QBmhf0BrYOjHMPqCrsqIAOCSCokvqjaOi6mQgr+5eKCCAl+spSJJXreHV7m+MHLmlDfMBvpNlwp0u0VE/NlXJcDMqDjBMydXJEHUaz3erAatN3LNk2dcb55iUg1PZlPsjwyaGTdFHD/XBwYNA360ty9BsECgYEA/hbk7CRRyfJl30kRRsHTLajKu2rR+cUxYLVAUWp08a98/vTjx+yr4WbOdbQehCvZ6pzO9wCJCH8ry0qtsVgzZ+d2I4Wft4WR705QZetubQORrlvIwSoRiFI2hRZ2WXlILkJdzn39YfsnAU2fk7l9TDgpHMNug9284DPdnivscl0CgYEArlOOeirIkGMLwOgAYY4SABGBnya/c4ipYhCHI9ok8GE+/D8zC8GNIk0retA4bXPy9mxqnuUGqoBMvPfc17ioyhcRzqfxI9CJ4x/NOMD7NsZmbELfLMNIj8qFSCs/9E0nKab6wjK2p5V+W9fxbBsPLoeCrtEKeUbtW2/NefUJ2kkCgYBxcDE2CCUHvxOiM1HmQCSTDver4s3p8BLSdTlI3/lj6ZApl5WWLWCzWh20yPySz60TpHx2JCQJyhT4RtfzBEi3C8xfoYmj+psjttgIGKsNOnmw2UNwkeKP9PxoQJYH7jC+jlypEvCr7OAGIeyrnDWHcM9SCyJs9vMbOayosD149QKBgA4B5MboPSls6/raKX2tPsEGpxW0tVmBN6sLjPBSjPlLtxXpth5RtRd2f/HkXUReNr2aRI7z9C8rE/9zIymqStXCOMoUMIoiLZI0cfcHeqgSFRTJ4sjkACadrUv5PbBRqr3sDuYf0RFyL68NkPaQzg19EgEeButryZK5Txdnmx0RAoGBAO5EoBGPq5AdDxlA6vfPu7Rt1+vyyBSHhmbt6IYS780voUOw9VhK2TgX/VGhZ4xJ8IMGO3h7Ltvd04R/VmbS8ZoaA0Ss+xEyKNRQ2l+PToCNFhkg5ZnSasFpGTT5+1zU2DQTnu9A9ohnGaVSPdad1puSeb9RDrfyqBdYCOWSwTRI'
    _this.content.url = 'http://10.134.184.117:8081/openapi'
    _this.content.clientId = 'fjj'
  }
}

</script>
