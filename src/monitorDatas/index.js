import Mock from 'mockjs'
import { Datas, dataDetails, contract, LoanedDatas, DataFee } from './Fund/loanDatas'
import {regCMPList} from './Admin/arDatas'
import commonDatas from './Common/common'
import userInfo from './Suplier/userInfo'
import subData from './Fund/index'
/* eslint-disable */
const monitorInit = ()=>{
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/getLoanManagerListTable.do', Datas)
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/queryLoanInfo.do', dataDetails)
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/showGenerateContract.do', contract)
  Mock.mock('https://jurongtest.foxconn.com/sit/loanFee2/getCustLoanFeeListTable.do', DataFee)
  Mock.mock('https://jurongtest.foxconn.com/sit/loanQuery/loanQueryLOANEDManage.do', LoanedDatas)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonAr/queryCurr.do', commonDatas.moneyTypes)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonAr/queryARStatusType.do', commonDatas.arStatus)
  Mock.mock('https://jurongtest.foxconn.com/sit/myAr/initiateDiscount.do', commonDatas.comdata)
  Mock.mock('https://jurongtest.foxconn.com/sit/myAr/getMyArListTable.do', commonDatas.arDatas)
  Mock.mock('https://jurongtest.foxconn.com/sit/myAr/queryAr', commonDatas.arDetails)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonCust/factoringCustomerList.do', commonDatas.factories)
  Mock.mock('https://jurongtest.foxconn.com/sit/discountAudit/getDiscountAuditListTable.do', commonDatas.fenboList)
  Mock.mock('https://jurongtest.foxconn.com/sit/discountAudit/queryDiscountAuditInfo.do', commonDatas.fenboDetail)
  Mock.mock('https://jurongtest.foxconn.com/sit/cust/customerDetailInfo.do', userInfo)
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/confirmInitiateSigning.do', subData)
  Mock.mock('https://jurongtest.foxconn.com/sit/onReceivingAr/getOnReceivingArListTable', commonDatas.getArData)
  Mock.mock('https://jurongtest.foxconn.com/sit/transferedAr/getTransferedArListTable.do', commonDatas.getArData)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonCust/arAuditStatusList.do', commonDatas.fenboStatus)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonCust/queryCustomer.do',{
    "data":{companyName:'123'},
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })
  Mock.mock('https://jurongtest.foxconn.com/sit/cust/check', {
    "data":'',
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })
  // 注册
  Mock.mock('https://jurongtest.foxconn.com/sit/cust/userRegister.do', {
    "data":'',
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })
   // 分拨
  Mock.mock('https://jurongtest.foxconn.com/sit/discountAudit/approveDiscountAudit.do',{
    "data":"成功",
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })
  // 还款
  Mock.mock('https://jurongtest.foxconn.com/sit/loanQuery/repayLoan.do', {
    "data":'',
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })
  // 企业管理列表
  Mock.mock('https://jurongtest.foxconn.com/sit/sysRegisteredCompanyManager/getRegisteredCompanyQueryListTable.do', regCMPList)
  // 首页数据
  Mock.mock('https://jurongtest.foxconn.com/sit/auxiliaryFunction/searchIndexList.do', {
    "data":{
      "unOperateSumAmout": function() {
        return this.unOperateAvailableAmout+this.unOperateExpiredAmout
      },
      "unOperateAvailableAmout|100-2000": 500,
      "unOperateExpiredAmout|100-2000": 500,
      "transferedSumAmout|100-2000": function() {
        return this.transferedAvailableAmout+this.transferedExpiredAmout
      },
      "transferedAvailableAmout|100-2000": 500,
      "transferedExpiredAmout|100-2000": 500,
      "discountedSumAmout|100-2000": function() {
        return this.discountedAvailableAmout+this.discountedExpiredAmout
      },
      "discountedAvailableAmout|100-2000": 500,
      "discountedExpiredAmout|100-2000": 500,
      "receivedSumAmout|100-2000": function() {
        return (this.receivedAvailableAmout*100+this.receivedExpiredAmout*100)/100
      },
      "receivedAvailableAmout": 5555.24,
      "receivedExpiredAmout": 3500.00,
      "onReceiveAmout": 2500.00,
    },
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })
// 已上传数据
Mock.mock('https://jurongtest.foxconn.com/sit/crcQuery/getUploadedAccountInformationList.do', {
  "data":[
    {
      index:1,
      uploadDate:1528905600000,
      billNO:'123',
      creditorsDistrict:'456',
      debtorDistrict:'789',
      amount:'111',
      currency:'111'
    }
  ],
  "recordsTotal":100,
  "msg|1":[
    "失败",
    "成功"
  ],
  "status": true
})
// 已上传数据
Mock.mock('https://jurongtest.foxconn.com/sit/crcQuery/getCorporateInformationList.do', {
  "data":[
    {
      index:1,
      enterprise:'1528905600000',
      OIBC:'123',
      district:'456'
    }
  ],
  "recordsTotal":100,
  "msg|1":[
    "失败",
    "成功"
  ],
  "status": true
})
// 资金提供数据
Mock.mock('https://jurongtest.foxconn.com/sit/crcQuery/getFundProviderInformationList.do', {
  "data":[
    {
      index:1,
      funding:'1234',
      OIBC:'123',
      district:'456'
    }
  ],
  "recordsTotal":100,
  "msg|1":[
    "失败",
    "成功"
  ],
  "status": true
})
// 融资详情数据
Mock.mock('https://jurongtest.foxconn.com/sit/creditLoan/queryCreditLoanInfo.do', {
  "data":
    {
      loanId: 123556, // 融资ID
      applyAmt:123, // 申请金额
      loanAmt:123, // 实放金额
      repayDate:1528905600000, // 还款日期
      currency:'人民币', // 币别
      interestRate:20, // 利率
      serviceFeeRate:20, // 手续费率
      overdueRate:20, // 罚息利率
      prepaymentDeductInterest:20, // 提前还款手续费
      fineGraceDays:20, // 宽容天数
      repaymentType:'分期', // 还款方式
      currencyName:'人民币', // 币别名称
      actualRepayDate:1528905600000, // 实际还款日期
      contractList:[
        {
        contractId:123, // 合同id
        contractNo:123, // 合同号
        contractName:123, // 合同名称
        status:123, // 合同状态
        contractUrl: 'http://www.baidu.com'
        },
        {
          contractId:1231, // 合同id
          contractNo:123, // 合同号
          contractName:123, // 合同名称
          status:123, // 合同状态
        contractUrl: 'http://www.baidu.com'
        }
      ], // 合同信息列表
      fileInfoList:[
        {
          fileUrl: 'url', //  文件url
          fileName: 'url' //  文件名稱
        }
      ] // 附件列表
    },
  "recordsTotal":100,
  "msg|1":[
    "失败",
    "成功"
  ],
  "status": true
})
}
export {monitorInit}