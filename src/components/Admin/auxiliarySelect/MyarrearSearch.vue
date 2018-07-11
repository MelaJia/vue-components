<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="供应商代码">
          <el-input v-model.trim="formInline.vendorCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事业群代码">
          <el-input v-model.trim="formInline.bgCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事业处代码">
          <el-input v-model.trim="formInline.buCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="生产单位代码">
          <el-input v-model.trim="formInline.bmCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="管报代码">
          <el-input v-model.trim="formInline.corpCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币别">
          <el-select v-model="formInline.currency" placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="结账日期">
          <el-date-picker :editable="false" v-model="formInline.agingDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="10">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
.el-select.el-select--mini{
  width:178px;
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的欠款查询搜索 */
export default {
  name: 'myarrear', // 我的欠款
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        vendorCode: '', // 供应商代码
        bgCode: '', // 事业群代码
        buCode: '', // 事业处代码
        bmCode: '', // 生产单位代码
        corpCode: '', // 管报代码
        currency: '', // 币别
        agingDate: null // 结报申请付款日期
      }
    }
  }
}
</script>
