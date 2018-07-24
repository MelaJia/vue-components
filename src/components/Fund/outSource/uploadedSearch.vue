<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="上传日期区间">
          <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币别">
          <el-select v-model="formInline.billBookCurr" placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyDesc"></el-option>
          </el-select>
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
export default {
  name: 'loanPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        billBookCurr: '', // 币别
        moneyDate: null // 日期
      }
    }
  }
}

</script>
