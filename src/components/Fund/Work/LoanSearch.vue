<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="AR单号" prop="masterChainId">
          <el-input v-model.trim="formInline.masterChainId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3">
        <el-form-item label="贴现客户" prop="custFromName">
          <el-input v-model.trim="formInline.custFromName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="贴现状态" prop="checkedStatus">
          <el-select v-model="formInline.checkedStatus" placeholder="全部">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="币别" prop="billBookCurr">
          <el-select v-model="formInline.billBookCurr" placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3">
        <el-form-item label="发票号" prop="invoiceNo">
          <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="贴现金额" prop="discountAmtScopeFrom">
          <el-col :span="10" class="mon-range-start">
            <el-jx-input v-model="formInline.discountAmtScopeFrom" placeholder="起始金额"></el-jx-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10" class="mon-range-end">
            <el-jx-input v-model="formInline.discountAmtScopeTo" placeholder="结束金额"></el-jx-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="预计还款日期" prop="moneyDate">
          <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="1">
        <el-form-item prop="discountAmtScopeTo"></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-button type="primary" @click="onSubmit" round size="small">查询</el-button>
        <el-button type="default" @click="resetForm('formInline')" round size="small">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
@import "@/assets/css/_loanSearch.scss";
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
export default {
  name: 'loanPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChainId: '', // ar单号
        custFromName: '', // 贴现客户
        checkedStatus: null, // 状态
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        discountAmtScopeFrom: '', // 贴现金额起始
        discountAmtScopeTo: '', // 贴现金额结束
        moneyDate: null, // 日期
        transSerialNo: '' // 交易流水号
      }
    }
  }
}

</script>
