<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="供应商代码" prop="vendorCode">
          <el-input v-model.trim="formInline.vendorCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事业群代码" prop="bgCode">
          <el-input v-model.trim="formInline.bgCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事业处代码" prop="buCode">
          <el-input v-model.trim="formInline.buCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="生产单位代码" prop="bmCode">
          <el-input v-model.trim="formInline.bmCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="管报代码" prop="corpCode">
          <el-input v-model.trim="formInline.corpCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币别" prop="currency">
          <el-select v-model="formInline.currency" clearable placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="结账日期" prop="agingDate">
          <el-date-picker :editable="false" v-model="formInline.agingDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="10">
          <el-button type="primary" @click="onSubmit" round size="small">查询</el-button>
          <el-button type="default" @click="resetForm('formInline')" round size="small">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
@import "@/assets/css/_loanSearch.scss";
.el-select.el-select--mini{
  width:178px;
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/common/searchDatas' // 查询条件获取公共参数列表
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
