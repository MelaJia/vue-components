import Mock from 'mockjs'
import { Datas, dataDetails, contract } from './Fund/loanDatas'
import commonDatas from './Common/common'
/* eslint-disable */
const monitorInit = ()=>{
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/getLoanManagerListTable.do', Datas)
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/queryLoanInfo.do', dataDetails)
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/showGenerateContract.do', contract)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonAr/queryCurr.do', commonDatas.moneyTypes)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonAr/queryARStatusType.do', commonDatas.arStatus)
  Mock.mock('https://jurongtest.foxconn.com/sit/myAr2/initiateDiscount.do', commonDatas.comdata)
  Mock.mock('https://jurongtest.foxconn.com/sit/myAr2/getMyArListTable.do', commonDatas.arDatas)
  Mock.mock('https://jurongtest.foxconn.com/sit/myAr2/queryAr', commonDatas.arDetails)
  Mock.mock('https://jurongtest.foxconn.com/sit/commonCust/factoringCustomerList.do', commonDatas.factories)
  Mock.mock('https://jurongtest.foxconn.com/sit/discountAudit/getDiscountAuditListTable.do', commonDatas.fenboList)
}
export {monitorInit}