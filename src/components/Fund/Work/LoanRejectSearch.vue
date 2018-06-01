<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="AR单号">
      <el-input v-model="formInline.masterChain" placeholder="AR单号"></el-input>
    </el-form-item>
    <el-form-item label="贴现客户">
      <el-input v-model="formInline.custFromName" placeholder="贴现客户"></el-input>
    </el-form-item>
    <el-form-item label="付款单位">
      <el-input v-model="formInline.companyName" placeholder="付款单位"></el-input>
    </el-form-item>
    <el-form-item label="币别">
      <el-select v-model="formInline.billBookCurr" placeholder="币别">
        <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发票号">
      <el-input v-model="formInline.invoiceNo" placeholder="发票号"></el-input>
    </el-form-item>
    <el-form-item label="贴现金额">
      <el-input v-model="formInline.discountAmtFrom" placeholder="起始金额"></el-input>-<el-input v-model="formInline.discountAmtTo" placeholder="结束金额"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
form {
  padding: 10px;
}
</style>

<script>
import SearchMixIn from '@/mixins/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
export default {
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChain: '', // ar单号
        custFromName: '', // 贴现客户
        companyName: '', // 付款单位
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        discountAmtFrom: '', // 贴现金额起始
        discountAmtTo: '' // 贴现金额结束
      }
    }
  }
}

</script>
