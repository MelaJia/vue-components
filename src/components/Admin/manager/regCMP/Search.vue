<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="公司名称">
          <el-input v-model.trim="formInline.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公司法人代表">
          <el-input v-model.trim="formInline.legalPerson" placeholder="公司法人代表"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公司联系人">
          <el-input v-model.trim="formInline.contactPerson" placeholder="公司联系人"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="客户经理">
          <el-input v-model.trim="formInline.customerManagerId" placeholder="客户经理"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <el-select v-model="formInline.status" clearable placeholder="全部">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.auditStatusName" :value="item.auditStatusId"></el-option>
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
import { getDataBase } from '@/util/util'
export default {
  mixins: [SearchMixIn],
  data () {
    return {
      arStatus: [],
      formInline: {
        companyName: '', // 公司名称
        legalPerson: '', // 公司法人代表
        contactPerson: '', // 公司联系人
        customerManagerId: '', // 客户经理
        status: '' // 状态
      }
    }
  },
  mounted () {
    getDataBase.call(this, '/commonCust/companyUserStatusList.do').then((res) => {
      if (res) {
        this.arStatus = res
      }
    })
  }
}

</script>
