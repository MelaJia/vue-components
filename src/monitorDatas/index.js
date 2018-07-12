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
        return this.receivedAvailableAmout+this.receivedExpiredAmout
      },
      "receivedAvailableAmout|100-2000": 500,
      "receivedExpiredAmout|100-2000": 500,
      "onReceiveAmout|100-2000": 500,
    },
    "msg|1":[
      "失败",
      "成功"
    ],
    "status": true
  })

}
export {monitorInit}