import Mock from 'mockjs'
import { dataDetails } from './loanDatas'
/* eslint-disable */
const monitorInit = ()=>{
  Mock.mock('https://jurongtest.foxconn.com/sit/loan2/queryLoanInfo.do', dataDetails)
}
export {monitorInit}