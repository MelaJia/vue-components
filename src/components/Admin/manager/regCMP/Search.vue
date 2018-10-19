<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model.trim="formInline.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公司法人代表" prop="legalPerson">
          <el-input v-model.trim="formInline.legalPerson" placeholder="公司法人代表"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公司联系人" prop="contactPerson">
          <el-input v-model.trim="formInline.contactPerson" placeholder="公司联系人"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <!-- <el-form-item label="客户经理" prop="customerManagerId">
          <el-input v-model.trim="formInline.customerManagerId" placeholder="客户经理"></el-input>
        </el-form-item> -->
        <el-form-item label="客户经理" prop="customerManagerId">
          <el-select v-model="formInline.customerManagerId" placeholder="请选择" value-key="customerManagerId">
            <el-option
              v-for="item in this.customerManagerList"
              :key="item.customerManagerId"
              :label="item.customerManagerName"
              :value="item.customerManagerId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" clearable placeholder="全部">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.auditStatusName" :value="item.auditStatusId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="formInline.roleId" clearable placeholder="全部">
            <el-option v-for="(item,index) in roleTypes" :key="index" :label="item.roleName" :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="10">
        <el-button type="primary" @click="onSubmit" round size="small">查询</el-button>
        <el-button type="default" @click="resetForm('formInline')" round size="small">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import { getDataBase } from '@/util/util'
export default {
  name: 'fundDemandManagementPage',
  mixins: [SearchMixIn],
  data () {
    return {
      arStatus: [],
      roleTypes: [], // 角色
      formInline: {
        companyName: '', // 公司名称
        legalPerson: '', // 公司法人代表
        contactPerson: '', // 公司联系人
        customerManagerId: '', // 客户经理
        status: '', // 状态
        roleId: ''
      },
      customerManagerList: [] // 客户经理
    }
  },
  computed: {
    roleBelong () {
      return this.$store.getters.roleBelong
    }
  },
  mounted () {
    // 获取客户经理列表
    getDataBase.call(this, '/commonCust/customerManagerList.do').then((res) => {
      if (res) {
        this.customerManagerList = res
      }
    })
    // 获取状态
    getDataBase.call(this, '/commonCust/companyUserStatusList.do').then((res) => {
      if (res) {
        this.arStatus = res
      }
    })
    // 获取角色
    this.axios.post('/commonTrans/queryAvailableRoleList.do').then(res => {
      if (res.data.status) {
        this.$store.commit('getRoleBelong', res.data.data) // 将角色存入到store里面
        // 赋值
        let pageName = this.$options.name ? this.$options.name : 'all'
        for (const iterator of res.data.data) {
          if (iterator.pageName === pageName) {
            this.roleTypes = iterator.roleList
          }
        }
      } else {
        this.$message.error(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

</script>
