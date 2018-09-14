<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="8" :offset="4">
        <el-form-item label="企业名称">
          <el-input v-model.trim="formInline.enterprise" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="组织机构代码">
          <el-input v-model.trim="formInline.OIBC" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="10">
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
        enterprise: '', // 企业名称
        OIBC: '' // 组织机构代码
      }
    }
  }
}

</script>
