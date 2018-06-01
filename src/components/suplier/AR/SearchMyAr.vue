<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="AR来源">
      <el-select v-model="formInline.isMasterAr" clearable placeholder="AR来源">
        <el-option v-for="(item,index) in selectData.origin" :key="index" :label="item.lable" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="AR单号">
      <el-input v-model="formInline.masterChainId" placeholder="AR单号"></el-input>
    </el-form-item>
    <el-form-item label="转让单位">
      <el-input v-model="formInline.custFromName" placeholder="转让单位"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formInline.status" clearable placeholder="状态">
        <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="币别">
      <el-select v-model="formInline.billBookCurr" clearable placeholder="币别">
        <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发票号">
      <el-input v-model="formInline.invoiceNo" placeholder="发票号"></el-input>
    </el-form-item>
    <el-form-item label="预计付款日期">
      <el-date-picker v-model="formInline.moneyDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="交易流水号">
      <el-input v-model="formInline.transSerialNo" placeholder="交易流水号"></el-input>
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
  mixins: [SearchMixIn, commonDatas]
}

</script>
