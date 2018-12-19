<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="贴现客户" prop="custFromName">
          <el-input v-model.trim="formInline.custFromName" placeholder="贴现客户"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="一级供应商" prop="companyNameOfL1">
          <el-input v-model.trim="formInline.companyNameOfL1" placeholder="一级供应商"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="付款单位" prop="companyName">
          <el-input v-model.trim="formInline.companyName" placeholder="付款单位"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="保理方" prop="custToName">
          <el-input v-model.trim="formInline.custToName" placeholder="保理方"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="状态" prop="auditedTypeId">
          <el-select v-model="formInline.auditedTypeId" clearable placeholder="状态">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.auditedTypeName" :value="item.auditedTypeId "></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="融资类型" prop="loanType">
          <el-select v-model="formInline.loanType" clearable placeholder="融资类型">
            <el-option v-for="(item,index) in loanTypes" :key="index" :label="item.loanTypeName" :value="item.loanType "></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" :offset="14">
          <el-form-item label=" " >
            <el-button type="primary" @click="onSubmit" size="mini">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</el-button>
            <el-button type="default" @click="resetForm('formInline')" size="mini">&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;</el-button>
          </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
@import "@/assets/css/_loanSearch.scss";

</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
export default {
  name: 'fundPartyPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      arStatus: [],
      formInline: {
        custFromName: '', // 贴现客户
        companyNameOfL1: '', // 一级供应商
        companyName: '', // 付款单位
        custToName: '', // 保理方
        auditedTypeId: '', // 状态
        loanType: '' // 融资类型
      }
    }
  },
  mounted () {
    this.axios.post('/commonCust/arAuditStatusList.do').then((res) => {
      if (res.data.status) {
        this.arStatus = res.data.data
      }
    })
  }
}

</script>
