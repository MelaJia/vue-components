<template>
  <div class="ar-table">
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
              :data="menutList"
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
      menutList: []
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
    handleNodeClick: handleNodeClick,
    Init: Init
  }
}
/** 单击角色 */
function handleNodeClick (data) {
  console.log(data)
  let param = {
    roleType: data.roleType,
    roleId: data.roleId
  }
  this.axios.post('/authorizationAdmin/authorizationManageList.do', param).then(res => {
    if (res.data.status) {
      this.menutList = res.data.data.menutList
      this.$refs.menuTree.setCheckedKeys([5])
    } else {
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}
function Init () {
  console.log(this.$refs.tree)
  console.log(this.roleId)
  this.$refs.tree.setCurrentKey(this.roleId)
  var data = this.$refs.tree.getCurrentNode()
  let param = {
    roleType: data.roleType,
    roleId: data.roleId
  }
  this.axios.post('/authorizationAdmin/authorizationManageList.do', param).then(res => {
    if (res.data.status) {
      this.menutList = res.data.data.menutList
    } else {
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}
function Submit () {
  var data = this.$refs.tree.getCurrentNode()
  var t = this.$refs.menuTree.getCheckedKeys(true, false)
  console.log(t)
  let param = {
    roleType: data.roleType,
    roleId: data.roleId,
    menutList: this.$refs.menuTree.getCheckedNodes(true, true)
  }
  console.log(param)
  this.axios.post('/authorizationAdmin/authorizationConfig.do', param).then(res => {
    if (res.data.status) {
      this.menutList = res.data.data.menutList
    } else {
      this.$message.error(res.data.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}
</script>
