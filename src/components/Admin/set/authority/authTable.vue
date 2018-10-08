<template>
  <div class="ar-table"
  v-loading="loadingAuth"
  :element-loading-text="loadingMsg"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
    <header>
    </header>
    <!--列表展示-->
    <section>
      <el-row :gutter="24">
        <el-col :span="11" >
          <el-card shadow="always">
            <article>
              <el-tree ref="tree" :data="getData" :props="defaultProps" node-key="roleId" :default-expand-all="true" @node-click="handleNodeClick" :highlight-current="true"></el-tree>
            </article>
          </el-card>
        </el-col>
        <el-col :span="11">
          <el-card shadow="hover">
            <article>
            <el-tree
              ref="menuTree"
              :data="menuList"
              show-checkbox
              node-key="menuId"
              default-expand-all
              :props="defaultMenuProps"
              >
            </el-tree>
            <div class="bottom clearfix">
              <el-button v-show="menuList.length>0" type="text" class="button" @click="onSubmit">保存</el-button>
            </div>
            <!-- <el-row>
              <el-col :span="2" :offset="11">
                  <el-button v-show="menuList.length>0" type="text" @click="onSubmit">保存</el-button>
              </el-col>
            </el-row> -->
          </article>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<style scoped lang="scss">
.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
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
      loadingMsg: '获取数据中...', // 加载时提示信息
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
class Point {
  constructor (Arr = []) {
    this.resultArr = Arr
  }
  /**
   * 计算选择的数据key数组
   * [object] object 需要计算的树形结构数据
   */
  computeSelectKeys (object) {
    for (const key in object) {
      const iterator = object[key]
      if (iterator.children && iterator.children.length > 0) {
        this.resultArr = [...new Set(this.computeSelectKeys(iterator.children))]
        if (key === object.length - 1) {
          return this.resultArr
        }
      } else if (iterator.isSelected) {
        this.resultArr.push(iterator.menuId)
      }
    }
    return this.resultArr
  }
  /**
   * 获取选择权限的key数组
   * [object] data 权限树形结构数据
  */
  getSelectedKeys (data) {
    keysFunc.init() // 初始化缓存避免影响后面获取数组
    return this.computeSelectKeys(data)
  }
  init () {
    this.resultArr = []
  }
}
// 获取权限
var getAuth = cache()
// 获取勾选key数组
var keysFunc = new Point()
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
// function getAuth (scope, data) {
//   return new Promise(async (resolve, reject) => {
//     scope.loadingAuth = true
//     let param = {
//       roleType: data.roleType,
//       roleId: data.roleId
//     }
//     try {
//       const res = await scope.axios.post('/authorizationAdmin/authorizationManageList.do', param)
//       if (res.data.status) {
//         const menuList = res.data.data.menuList
//         scope.menuList = menuList
//         // 获取勾选权限数组
//         const selectArr = getSelectedKeys(menuList)
//         // 勾选已有权限
//         selectNode(scope, selectArr)
//       } else {
//         scope.$message.error(res.data.msg)
//       }
//       scope.loadingAuth = false
//       resolve({ finish: true, status: 1 })
//     } catch (error) {
//       console.log(error)
//       scope.loadingAuth = false
//       resolve({ finish: true, status: 0 })
//     }
//   })
// }
/*
*缓存
*/
function cache () {
  var cacheList
  return function (scope, data, fromCache) {
    console.log(cacheList)
    console.log(fromCache)
    return new Promise(async (resolve, reject) => {
      if (fromCache) {
        scope.menuList = []
        scope.menuList = cacheList
        // 获取勾选权限数组
        const selectArr = keysFunc.getSelectedKeys(cacheList)
        // 勾选已有权限
        selectNode(scope, selectArr)
        return resolve({ finish: true, status: 1 })
      }
      setTimeout(() => {
        console.log('修改提示信息')
        if (scope.loadingAuth) {
          showLoading(scope, '获取数据中...')
        }
      }, 1000)
      scope.loadingAuth = true
      let param = {
        roleType: data.roleType,
        roleId: data.roleId
      }
      try {
        const res = await scope.axios.post('/authorizationAdmin/authorizationManageList.do', param)
        console.log('接受到数据')
        if (res.data.status) {
          const menuList = res.data.data.menuList
          cacheList = menuList
          console.log(cacheList)
          scope.menuList = menuList
          // 获取勾选权限数组
          const selectArr = keysFunc.getSelectedKeys(menuList)
          console.log(selectArr)
          // 勾选已有权限
          selectNode(scope, selectArr)
        } else {
          scope.$message.error(res.data.msg)
        }
        closeLoading(scope)
        resolve({ finish: true, status: 1 })
      } catch (error) {
        console.log(error)
        closeLoading(scope)
        resolve({ finish: true, status: 0 })
      }
    })
  }
}
/**
 * 显示加载信息
 */
function showLoading (scope, msg) {
  scope.loadingMsg = msg
  scope.loadingAuth = true
}
/**
 * 关闭加载信息
 */
function closeLoading (scope) {
  scope.loadingAuth = false
}
/**
 * 获取勾选key数组
 */
// function getgetSelectedKeysFunc () {
//   let resultArr = []
//   return function (object) {
//     for (const key in object) {
//       const iterator = object[key]
//       if (iterator.children && iterator.children.length > 0) {
//         resultArr = [...new Set(getSelectedKeys(iterator.children))]
//         if (key === object.length - 1) {
//           return resultArr
//         }
//       } else if (iterator.isSelected) {
//         resultArr.push(iterator.menuId)
//       }
//     }
//     return resultArr
//   }
// }
/**
 * 置空权限列表
 */
function initAuth () {
  this.menuList = []
}
/**
 * 保存权限
 */
function Submit () {
  showLoading(this, '保存中...') // 显示加载框
  let param = getDataToSave(this) // 获取保存数据
  console.log(param)
  this.axios.post('/authorizationAdmin/authorizationConfig.do', param).then(res => {
    if (res.data.status) {
      showLoading(this, res.data.msg) // 显示加载框
      getAuth(this, this.$refs.tree.getCurrentNode()) // 刷新数据
    } else {
      this.$message.error(res.data.msg)
      getAuth(this, {}, true) // 恢复选择
      closeLoading(this) // 关闭加载框
    }
  }).catch(err => {
    getAuth(this, {}, true) // 恢复选择
    closeLoading(this) // 关闭加载框
    this.$message.error('系统错误，请联系管理员')
    console.log(err)
  })
}
/**
 * 获取数据保存数据
*/
function getDataToSave (scope) {
  const data = scope.$refs.tree.getCurrentNode()
  const t = scope.$refs.menuTree.getCheckedNodes(false, false)
  const hafNode = scope.$refs.menuTree.getHalfCheckedNodes()
  return {
    roleType: data.roleType,
    roleId: data.roleId,
    menuList: [...t, ...hafNode]
  }
}
</script>
