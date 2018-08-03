<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="150px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="AR来源">
          <el-select v-model="formInline.isMasterAr" clearable placeholder="全部">
            <el-option v-for="(item,index) in selectData.origin" :key="index" :label="item.lable" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="AR单号">
          <el-input v-model.trim="formInline.masterChainId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="付款单位/对手单位">
          <el-input v-model.trim="formInline.companyName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="formInline.status" clearable placeholder="全部">
              <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="币别">
              <el-select v-model="formInline.billBookCurr" clearable placeholder="全部">
                <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号">
            <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
          <el-form-item label="预计回款日期">
            <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="4">
            <el-form-item label="结报单号">
              <el-input v-model.trim="formInline.billId" placeholder=""></el-input>
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
