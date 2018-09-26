<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="mini" label-width="150px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="formInline.roleName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" clearable placeholder="">
            <el-option v-for="(item,index) in statusTypes" :key="index" :label="item.statusName" :value="item.status"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="角色所属" prop="roleType">
          <el-select v-model="formInline.roleType" clearable placeholder="">
            <el-option v-for="(item,index) in roleTypes" :key="index" :label="item.roleTypeName" :value="item.roleType"></el-option>
          </el-select>
        </el-form-item>
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
.el-select.el-select--mini{
  width:178px;
}
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
    this.axios.get('/commonTrans/queryApplyStatusList.do').then(res => {
      if (res.data.status) {
        this.statusTypes = res.data.data
        console.log(this.statusTypes)
      } else {
        this.$message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
    this.axios.get('/commonTrans/queryRoleTypeList.do').then(res => {
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
