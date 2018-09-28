<template>
  <div class="ar-table"
  v-loading="loadingAuth"
  element-loading-text="获取数据中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
    <header>
    </header>
    <!--列表展示-->
    <section>
      <el-row>
        <el-col :span="6" :offset="6">
          <article>
            <el-tree ref="tree" :data="getData" :props="defaultProps" node-key="roleId" :default-expand-all="true" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
          </article>
        </el-col>
        <el-col :span="6">
          <article>
            <el-tree
              ref="menuTree"
              :data="menuList"
              show-checkbox
              node-key="menuId"
              :default-expanded-keys="[2, 3]"
              :props="defaultMenuProps"
              >
            </el-tree>
          </article>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="8" :offset="10">
            <el-button type="primary" @click="onSubmit" round size="small">保存</el-button>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<style scoped lang="scss">
</style>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable', 'roleId'],
  mixins: [TableMixIn, Common],
  components: {
  },
  data () {
    return {
      loadingAuth: false, // 权限加载框
      flag: false, // 是否为自动选择
      forms: {
        roleId: 1
      },
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      defaultMenuProps: {
        children: 'children',
        label: 'menuName'
      },
      menuList: []
    }
  },
  watch: {
    getData: function (val) {
      console.log(val)
    }
  },
  computed: {
    getData () {
      return this.dataTable
    }
  },
  mounted () {
  },
  methods: {
    fresh () {
      this.$emit('refresh')
    },
    onSubmit: Submit,
    handleNodeClick: handleNodeClick, // 选择角色
    Init: Init, // 初始化重置
    initAuth: initAuth // 置空权限列表
  }
}
/** 单击角色 */
function handleNodeClick (data) {
  console.log(data)
  if (data.children) {
    return false
  }
  getAuth(this, data)
}
/**
 * 权限勾选节点
 * [object] scope 上下文
 * [Array] arr 勾选节点的 key 的数组
*/
function selectNode (scope, arr) {
  scope.$refs.menuTree.setCheckedKeys(arr, true)
}
/**
 * 设置角色选中
 * [object] scope 上下文
 * [number] key 待被选角色的 key
 */
function selectRole (scope, key) {
  scope.$refs.tree.setCurrentKey(key)
}
/**
 * 获取选中角色节点
 * [object] scope 上下文
 */
function getSelectRoleNode (scope) {
  return scope.$refs.tree.getCurrentNode()
}
/** 初始化 */
function Init () {
  return new Promise((resolve, reject) => {
    // 判断是否传入角色
    if (isNaN(this.roleId)) {
      return
    }
    // 选中传入角色
    console.log(this.roleId)
    selectRole(this, this.roleId)
    // 获取选中角色节点
    var data = getSelectRoleNode(this)
    // 获取角色权限并设置勾选
    console.log(data)
    resolve(getAuth(this, data))
  })
}
/**
 * 获取权限列表
 * [object] scope 上下文
 * [object] data 角色数据
 */
function getAuth (scope, data) {
  return new Promise(async (resolve, reject) => {
    scope.loadingAuth = true
    let param = {
      roleType: data.roleType,
      roleId: data.roleId
    }
    try {
      const res = await scope.axios.post('/authorizationAdmin/authorizationManageList.do', param)
      if (res.data.status) {
        const menuList = res.data.data.menuList
        scope.menuList = menuList
        // 获取勾选权限数组
        const selectArr = getSelectedKeys(menuList)
        // 勾选已有权限
        selectNode(scope, selectArr)
      } else {
        scope.$message.error(res.data.msg)
      }
      scope.loadingAuth = false
      resolve({ finish: true, status: 1 })
    } catch (error) {
      console.log(error)
      scope.loadingAuth = false
      resolve({ finish: true, status: 0 })
    }
  })
}
/**
 * 获取勾选key数组
 */
function getSelectedKeys (object) {
  const resultArr = []
  for (const iterator of object) {
    if (iterator.isSelected) {
      resultArr.push(iterator.menuId)
    }
  }
  return resultArr
}
/**
 * 置空权限
 */
function initAuth () {
  this.menuList = []
}
function Submit () {
  var data = this.$refs.tree.getCurrentNode()
  var t = this.$refs.menuTree.getCheckedKeys(true, false)
  console.log(t)
  let param = {
    roleType: data.roleType,
    roleId: data.roleId,
    menuList: this.$refs.menuTree.getCheckedNodes(true, true)
  }
  console.log(param)
  this.axios.post('/authorizationAdmin/authorizationConfig.do', param).then(res => {
    if (res.data.status) {
      this.menuList = res.data.data.menuList
      selectNode(this, [5])
    } else {
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}
</script>
