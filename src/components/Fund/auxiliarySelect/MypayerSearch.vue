<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="付款编号" prop="payNo">
          <el-input v-model.trim="formInline.payNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="结报单号" prop="billNo">
          <el-input v-model.trim="formInline.billNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3" v-if="this.$store.getters.roles!==2">
        <el-form-item label="供应商代码" prop="vendorCode">
          <el-input v-model.trim="formInline.vendorCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="法人代码" prop="corpCode">
          <el-input v-model.trim="formInline.corpCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="实际付款金额" prop="rcvAmtOriginStart">
          <el-col :span="10" class="mon-range-start">
            <el-jx-input v-model="formInline.rcvAmtOriginStart" placeholder="起始金额"></el-jx-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10" class="mon-range-end">
            <el-jx-input v-model="formInline.rcvAmtOriginEnd" placeholder="结束金额"></el-jx-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="0">
        <el-form-item prop="rcvAmtOriginEnd"></el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="币别" prop="currency">
          <el-select v-model="formInline.currency" clearable placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="法人单位" prop="corpName">
          <el-input v-model.trim="formInline.corpName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
       <el-col :span="10">
        <el-form-item label="付款日期" prop="payDate">
          <el-date-picker :editable="false" v-model="formInline.payDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label=" " >
          <el-button type="primary" @click="onSubmit" size="mini">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</el-button>
          <el-button type="default" @click="resetForm('formInline')" size="mini">&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;</el-button>
        </el-form-item>
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
/* 我的付款单查询搜索 */
export default {
  name: 'mypay', // 我的付款单
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        vendorCode: '', // 供应商代码
        payNo: '', // 付款编号
        corpCode: '', // 法人代码
        corpName: '', // 法人单位
        billNo: '', // 结报单号
        currency: '', // 币别
        payDate: null, // 付款日期
        rcvAmtOriginStart: '', // 开始金额
        rcvAmtOriginEnd: '' // 结束金额
      }
    }
  }
}
</script>
