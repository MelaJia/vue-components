<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="AR单号">
      <el-input v-model="formInline.masterChainId" placeholder="AR单号"></el-input>
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
      <el-col :span="11"><el-input v-model="formInline.discountAmtScopeFrom" placeholder="起始金额"></el-input></el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11"><el-input v-model="formInline.discountAmtScopeTo" placeholder="结束金额"></el-input></el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
export default {
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChainId: '', // ar单号
        custFromName: '', // 贴现客户
        companyName: '', // 付款单位
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        discountAmtScopeFrom: '', // 贴现金额起始
        discountAmtScopeTo: '' // 贴现金额结束
      }
    }
  }
}

</script>
