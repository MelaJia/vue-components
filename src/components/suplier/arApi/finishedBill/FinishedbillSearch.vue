<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="AR单号" prop="masterChainId">
          <el-input v-model.trim="formInline.masterChainId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3">
        <el-form-item label="状态" prop="checkedStatus">
          <el-select v-model="formInline.checkedStatus" placeholder="">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
          </el-select>
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
      <el-col :span="7">
        <el-form-item label="保理商" prop="custToName">
          <el-input v-model.trim="formInline.custToName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7"  :offset="3">
        <el-form-item label="发票号" prop="invoiceNo">
          <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="结报单号" prop="billId">
          <el-input v-model.trim="formInline.billId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="票据到期日" style="white-space:nowrap" prop="billPayDate">
          <el-date-picker :editable="false" v-model="formInline.billPayDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
/* 我的验收单查询搜索 */
export default {
  name: 'finishedMultiArPage', // 已完结单据状态
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChainId: '', // AR单号
        checkedStatus: '', // 状态
        billBookCurr: '', // 币别
        custToName: '', // 保理商
        invoiceNo: '', // 发票号
        billId: '', // 结报单号
        billPayDate: null // 预计回款日期
      }
    }
  }
}
</script>
