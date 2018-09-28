<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card search-box-card" :class="{'hideBox':!searchShow}">
        <div slot="header" class="clearfix" style="position:relative">
          <i class="el-icon-search"></i>
          <span>查询条件</span>
          <el-tooltip class="item" effect="dark" content="点我收起" placement="right-start">
            <i class="el-icon-arrow-down" v-show="searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;color:#409EFF;top:3px;cursor:pointer;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="点我展开" placement="right-start">
            <i class="el-icon-arrow-right" v-show="!searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;color:#409EFF;top:3px;cursor:pointer;"></i>
          </el-tooltip>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
          <search @handle-search="searchSubmit" :type="query.roleTypeId" v-show="searchShow"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <auth-table ref="authBox" :data-loading="loading" :data-table="tableData5" :role-id="query.roleId" @refresh="handleRefresh"></auth-table>
      </el-card>
    </div>
  </div>
</template>
<style scope>
</style>

<script>
import AuthTable from '@/components/Admin/set/authority/authTable'
import Search from '@/components/Admin/set/authority/authSearch'
import Table from '@/mixins/suplier/Ar/Table'
import { getDataBase } from '@/util/util' // 发送数据函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  mixins: [Table],
  props: ['query'],
  data () {
    return {
      loading: false,
      postUrl: '/roleAdmin/queryRoleList.do',
      param: { roleTypeId: 0 }
    }
  },
  components: {
    'auth-table': AuthTable,
    'search': Search
  },
  async mounted () {
    console.log(this.query.roleTypeId)
    let result = await initGetRoles(this, { roleTypeId: isNaN(this.query.roleTypeId) ? 0 : this.query.roleTypeId })
    const loading = this.$loading(loadingConf.get())
    if (isNaN(this.query.roleTypeId)) {
      loading.close()
      return false
    }
    if (result) {
      setTimeout(async () => {
        let t = await this.$refs.authBox.Init()
        console.log(t)
        loading.close()
      }, 0)
    }
  },
  methods: {
    // 查询
    searchSubmit: searchSubmit,
    // 刷新
    handleRefresh () {
      getRoles(this, this.param)
    }
  }
}
async function searchSubmit (val) {
  console.log(this.query)
  /* 修改请求参数 */
  this.param = {
    roleTypeId: val.roleTypeId // 角色所属
  }
  let result = await getRoles(this, this.param)
  if (result) {
    setTimeout(() => {
      this.$refs.authBox.initAuth()
    }, 0)
  }
}
/**
 * 获取角色列表
 * [object] scope 上下文
 * [object] data 角色所属
 */
function getRoles (scope, data) {
  return new Promise(async (resolve, reject) => {
    let res = await getDataBase.call(scope, scope.postUrl, data, true)
    console.log('获取成功')
    if (res) {
      /** 获取角色所属名 */
      let name = getRoleTypeName(scope, data)
      scope.tableData5 = [{ roleName: name, children: res }]
      resolve(true)
    } else {
      scope.tableData5 = []
      scope.$message.error(res.data.msg)
      resolve(false)
    }
  })
}
function initGetRoles (scope, data) {
  return new Promise(async (resolve, reject) => {
    // 显示加载图标
    const loading = scope.$loading(loadingConf.get())
    let res = await scope.axios.post(scope.postUrl, data)
    if (res.data.status) {
      /** 获取角色所属名 */
      let name = getRoleTypeName(scope, data)
      scope.tableData5 = [{ roleName: name, children: res.data.data }]
      resolve(true)
    } else {
      scope.tableData5 = []
      scope.$message.error(res.data.msg)
      loading.close()
      resolve(false)
    }
  })
}
/**
 * 获取选中的角色所属名
*/
function getRoleTypeName (scope, data) {
  const arr = [...scope.$store.state.user.roleBelong]
  let name = ''
  for (const iterator of arr) {
    if (iterator.roleType === data.roleTypeId) {
      name = iterator.roleTypeName
    }
  }
  return name
}
</script>
