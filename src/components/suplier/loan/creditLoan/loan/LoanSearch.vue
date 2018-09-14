<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline loan-search-style" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="融资编号" prop="loanId">
          <el-input class="wd-190" v-model.trim="formInline.loanId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3" prop="status">
          <el-form-item label="状态">
            <el-select class="wd-190" v-model="formInline.status" clearable placeholder="全部">
              <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
           <el-form-item label="币别" prop="currency">
              <el-select class="wd-190" v-model="formInline.currency" clearable placeholder="全部">
                <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="10">
          <el-form-item label="还款日期" prop="repayDate">
            <el-date-picker :editable="false" v-model="formInline.repayDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="合同签署日期" prop="contractDate">
            <el-date-picker :editable="false" v-model="formInline.contractDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="金额申请金额" prop="amountBegin">
          <el-col :span="10" class="mon-range-start">
            <el-jx-input class="ipt" v-model="formInline.amountBegin" placeholder="起始金额"></el-jx-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10" class="mon-range-end">
            <el-jx-input v-model="formInline.amountEnd" placeholder="结束金额"></el-jx-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="1">
        <el-form-item prop="amountEnd"></el-form-item>
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
@media screen and (min-width: 1356px) and (max-width: 1396px){
  .el-form {
        width: 1020px;
    }
}
@media screen and (min-width: 1396px) and (max-width: 1440px){
  .el-form {
        width: 1100px;
    }
}
@media screen and (min-width: 1431px) and (max-width: 1483px){
  .el-form {
        width: 1150px;
    }
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的Ar搜索 */
export default {
  name: 'financingSituationPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        loanId: '', // 融资编号
        status: null, // 状态
        currency: '', // 币别
        repayDate: '', // 还款日期
        contractDate: null, // 合同签署日期
        amountBegin: '', // 起始金额
        amountEnd: '' // 结束金额
      }
    }
  }
}

</script>
