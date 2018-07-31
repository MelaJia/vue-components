<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="贴现客户">
          <el-input v-model.trim="formInline.custFromName" placeholder="贴现客户"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="一级供应商">
          <el-input v-model.trim="formInline.companyNameOfL1" placeholder="一级供应商"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="付款单位">
          <el-input v-model.trim="formInline.companyName" placeholder="付款单位"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="保理方">
          <el-input v-model.trim="formInline.custToName" placeholder="保理方"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <el-select v-model="formInline.auditedTypeId" clearable placeholder="状态">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.auditedTypeName" :value="item.auditedTypeId "></el-option>
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
<style scoped>
.el-input.el-input--small {
  width: 190px;
}
.el-select.el-select--small{
  width: 190px;
}
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
      arStatus: [],
      formInline: {
        custFromName: '', // 贴现客户
        companyNameOfL1: '', // 一级供应商
        companyName: '', // 付款单位
        custToName: '', // 保理方
        auditedTypeId: '' // 状态
      }
    }
  },
  mounted () {
    this.axios.post('/commonCust/arAuditStatusList.do').then((res) => {
      console.log(res.data.data)
      if (res.data.status) {
        console.log(res.data.data)
        this.arStatus = res.data.data
      }
    })
  }
}

</script>
