<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7"><el-form-item label="AR单号" prop="masterChainId">
      <el-input class="wd-190" v-model.trim="formInline.masterChainId" placeholder=""></el-input>
    </el-form-item></el-col>
      <el-col :span="7"><el-form-item label="转让方" prop="custFromName">
      <el-input class="wd-190" v-model.trim="formInline.custFromName" placeholder=""></el-input>
    </el-form-item></el-col>
    <el-col :span="10"><el-form-item label="票据到期日" prop="billPayDate">
      <el-date-picker class="wd-190" :editable="false" v-model="formInline.billPayDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="7"><el-form-item label="交易流水号" prop="transSerialNo">
        <el-input class="wd-190" v-model.trim="formInline.transSerialNo" placeholder=""></el-input>
      </el-form-item></el-col>
      <el-col :span="7"><el-form-item label="币别" prop="billBookCurr">
      <el-select class="wd-190" v-model="formInline.billBookCurr" placeholder="全部">
        <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
      </el-select>
    </el-form-item></el-col>
     <el-col :span="10"><el-form-item label="转让日期" prop="moneyDate">
      <el-date-picker class="wd-190" :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="7"><el-form-item label="发票号" prop="invoiceNo">
      <el-input class="wd-190" v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
    </el-form-item></el-col>
      <el-col :span="7"><el-form-item label="状态" prop="status">
      <el-select class="wd-190" v-model="formInline.status" clearable placeholder="全部">
        <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
      </el-select>
    </el-form-item></el-col>
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
/* 待收Ar搜索 */
export default {
  name: 'onReceivingArPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChainId: '', // ar单号
        isMasterAr: '', // ar来源
        custFromName: '', // 转让单位
        status: null, // 状态
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        moneyDate: null, // 转让日期
        billPayDate: null, // 票据到期日期
        transSerialNo: '' // 交易流水号
      }
    }
  }
}

</script>
