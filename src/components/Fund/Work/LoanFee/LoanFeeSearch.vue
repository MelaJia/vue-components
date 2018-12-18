<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="客户名称" prop="companyName">
      <el-input v-model.trim="formInline.companyName" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="供应商代码" prop="vendorCode">
      <el-input v-model.trim="formInline.vendorCode" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" size="mini">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</el-button>
      <el-button type="default" @click="resetForm('formInline')" size="mini">&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
export default {
  mixins: [SearchMixIn],
  data () {
    return {
      formInline: {
        companyName: '', // 客户名称
        vendorCode: '' // 供应商代码
      }
    }
  }
}

</script>
