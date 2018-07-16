<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="150px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="融资编号">
          <el-input class="wd-190" v-model.trim="formInline.masterChainId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3">
          <el-form-item label="状态">
            <el-select class="wd-190" v-model="formInline.status" clearable placeholder="全部">
              <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
           <el-form-item label="币别">
              <el-select class="wd-190" v-model="formInline.billBookCurr" clearable placeholder="全部">
                <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="10">
          <el-form-item label="预计付款日期">
            <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="预计付款日期">
            <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="贴现金额">
          <el-col :span="10">
            <el-input class="ipt" v-model.number="formInline.discountAmtScopeFrom" placeholder="起始金额"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-input v-model.number="formInline.discountAmtScopeTo" placeholder="结束金额"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="11">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
@media screen and (min-width: 1551px) and (max-width: 1601px){
  .el-form{
        width:1199px;
    }
}
.wd-190{
  width: 190px;
}
form {
  padding: 10px;
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的Ar搜索 */
export default {
  name: 'myArPage',
  mixins: [SearchMixIn, commonDatas]
}

</script>
