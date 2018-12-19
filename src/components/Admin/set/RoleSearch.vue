<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="formInline.roleName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" clearable placeholder="">
            <el-option v-for="(item,index) in statusTypes" :key="index" :label="item.statusName" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="角色所属" prop="roleType">
          <el-select v-model="formInline.roleType" clearable placeholder="">
            <el-option v-for="(item,index) in roleTypes" :key="index" :label="item.roleTypeName" :value="item.roleType"></el-option>
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
/* 我的验收单查询搜索 */
export default {
  name: 'acceptsearch', // 验收单查询
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      statusTypes: [], // 状态
      roleTypes: [], // 角色
      formInline: {
        roleName: '', // 角色名
        status: '', // 状态
        roleType: '' // 角色所属
      }
    }
  },
  computed: {
    roleBelong () {
      return this.$store.getters.roleBelong
    }
  },
  mounted () {
    this.axios.post('/commonTrans/queryApplyStatusList.do').then(res => {
      if (res.data.status) {
        this.statusTypes = res.data.data
        console.log(this.statusTypes)
      } else {
        this.$message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
    this.axios.post('/commonTrans/queryRoleTypeList.do').then(res => {
      if (res.data.status) {
        this.roleTypes = res.data.data
        this.$store.commit('getRoleBelong', res.data.data) // 将角色存入到store里面
      } else {
        this.$message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
