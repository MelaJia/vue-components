<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="贴现客户">
      <el-input v-model="formInline.custFromName" placeholder="贴现客户"></el-input>
    </el-form-item>
    <el-form-item label="付款单位">
      <el-input v-model="formInline.companyName" placeholder="付款单位"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
form {
  padding: 10px;
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
export default {
  mixins: [SearchMixIn],
  data () {
    return {
      formInline: {
        custFromName: '', // 贴现客户
        companyName: '' // 付款单位
      }
    }
  }
}

</script>
