<template>
  <div>
    <table>
      <tr>企业基础信息</tr>
      <tr>
        <td>企业状态：{{infos.isUsableDesc}}
</td>
        <td>所属客户经理：{{infos.sourceName}}</td>
        <td>公司ID：{{infos.custId}}</td>
      </tr>
      <tr>
        <td>企业电话：{{infos.companyPhone}}
        </td>
        <td>企业地址：{{infos.companyAddress}}</td>
      </tr>
      <tr>
        <td>统一社会信用代码:{{infos.creditCode}}</td>
        <td>纳税人识別号：{{infos.payTaxesNumber}}</td>
      </tr>
      <tr>
        <td>供应商代码：{{infos.vendorCodes}}</td>
        <td>注册资本:{{infos.registeredCapital}}</td>
        <td>实收资本：{{infos.paidinCapital}}</td>
      </tr>
      <tr>
        <td>公司成立日期：{{infos.establishDate}}</td>
        <td>营业执照开始日期：{{infos.businessStartDate}}</td>
        <td>营业执照结束日期：{{infos.businessEndDate}}</td>
        <td>公司登记日期：{{infos.companyRegisterDate}}</td>
      </tr>
      <tr>
        <td>经营范围 ：{{infos.mainProducts}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
/* 用户信息列表 */
export default {
  props: ['infos']
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
}
div {
  background: #fff;
  border: solid 1px #ebeef5;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
