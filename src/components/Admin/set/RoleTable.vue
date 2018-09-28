<template>
  <div class="ar-table" ref="resizeContext">
    <header>
      <el-button type="primary" size="mini" @click="roleAdd">新增</el-button>
    </header>
    <!--新增-->
    <dialog-roleadd :visible-p.sync="dialogRoleAddVisible"></dialog-roleadd>
    <!--修改-->
    <dialog-rolemodify :visible-p.sync="dialogRoleModifyVisible" :details-p="details"></dialog-rolemodify>
    <!--列表展示-->
    <section>
      <el-table ref="table" :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown"
        >
        <el-table-column
          type="index"
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <el-table-column align="center" label="角色名" prop="roleName">
        </el-table-column>
        <el-table-column align="center" label="角色所属" prop="roleTypeName">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName">
        </el-table-column>
        <el-table-column align="center" label="创建人" prop="createType">
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" header-align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleModify(scope.$index, scope.row)">修改</el-button>
            <el-button v-if="scope.row.status==0||scope.row.status==2" size="mini" type="success" @click="handleStart(scope.$index, scope.row)">启用</el-button>
            <el-button v-else size="mini" type="danger" @click="handleStop(scope.$index, scope.row)">停用</el-button>
            <el-button size="mini" type="text" @click="authDelivery(scope.$index, scope.row)">权限配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<style scoped lang="scss">
header {
  text-align: right;
  padding-bottom: 10px;
}
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #033c81;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper {
  li:not(:first-of-type) {
    margin-top: 10px;
  }
  .full-width {
    width: 100%;
  }
}
.wd-200 {
  width: 200px;
}
.red {
  color: red;
}
</style>
<style>
.el-table__expanded-cell .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-roleadd': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/set/DialogRoleadd'),
    'dialog-rolemodify': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/set/DialogRolemodify')
  },
  data () {
    return {
      dialogRoleAddVisible: false, // 新增
      dialogRoleModifyVisible: false, // 修改
      details: {} // 详情
    }
  },
  computed: {
    // comDatas: function () {
    //   const datas = this.getOpera(this.dataTable)
    //   return datas
    // }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    fresh () {
      this.$emit('refresh')
    },
    // 新增
    roleAdd () {
      this.dialogRoleAddVisible = true
    },
    // 修改
    handleModify (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/roleAdmin/queryRoleInfo.do', { roleId: val.roleId }).then(res => {
        if (res) {
          this.details = res
          this.dialogRoleModifyVisible = true
          val.infoLoading = false
        }
      })
    },
    handleStart: handleStart, // 启用
    handleStop: handleStop, // 停用
    // 权限配置
    authDelivery: authDelivery
  }
}
// 启用
function handleStart (idx, val) {
  this.$confirm(`角色为${val.roleName}确定启用?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postResultFresh('/roleAdmin/enableRole.do', { roleId: val.roleId }) // 调用common混合中公共方法
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 停用
function handleStop (idx, val) {
  this.$confirm(`角色为${val.roleName}确定停用?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postResultFresh('/roleAdmin/disableRole.do', { roleId: val.roleId }) // 调用common混合中公共方法
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 权限配置
function authDelivery (idx, val) {
  this.$router.push({
    path: 'authmanage',
    name: '',
    query: {
      roleId: val.roleId,
      roleType: val.roleType
    }
  })
}
</script>
