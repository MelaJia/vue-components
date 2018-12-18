<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="AR来源" prop="isMasterAr">
          <el-select v-model="formInline.isMasterAr" clearable placeholder="全部">
            <el-option v-for="(item,index) in selectData.origin" :key="index" :label="item.lable" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3">
          <el-form-item label="发票号" prop="invoiceNo">
            <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      <el-col :span="7">
           <el-form-item label="币别" prop="billBookCurr">
              <el-select v-model="formInline.billBookCurr" clearable placeholder="全部">
                <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
          <el-form-item label="票据到期日" prop="moneyDate">
            <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      <el-col :span="7" >
        <el-form-item label="付款单位/对手单位" prop="companyName">
          <el-input v-model.trim="formInline.companyName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="10">
          <el-form-item label="还款日期" prop="payDate">
            <el-date-picker :editable="false" v-model="formInline.payDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="7">
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
/* 我的Ar搜索 */
export default {
  name: 'myArPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChainId: '', // ar单号
        companyName: '', // 付款单位/对手单位
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        moneyDate: null, // 日期
        payDate: null // 还款日期
      }
    }
  }
}

</script>
