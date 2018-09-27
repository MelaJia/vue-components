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
          <search @handle-search="searchSubmit" :type="query.roleType" v-show="searchShow"></search>
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
export default {
  mixins: [Table],
  props: ['query'],
  data () {
    return {
      loading: false,
      postUrl: '/roleAdmin/roleManageList.do',
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'auth-table': AuthTable,
    'search': Search
  },
  mounted () {
    this.getdata(1, this.psize)
      .then(res => {
        if (res.data.status) {
          const arr = [...this.$store.state.user.roleBelong]
          let name = arr[0].roleTypeName // 设置默认名称
          for (const iterator of arr) {
            console.log(iterator.roleType)
            console.log(this.query.roleType)
            if (iterator.roleType === this.query.roleType) {
              name = iterator.roleTypeName
            }
          }
          this.tableData5 = [{ roleName: name, children: res.data[this.dataStr] }]
          this.total = res.data[this.totalStr]
          setTimeout(() => {
            this.$refs.authBox.Init()
          }, 0)
        } else {
          this.tableData5 = []
          this.total = 0
          this.$message.error(res.data.msg)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    // 查询
    searchSubmit (val) {
      console.log(this.query)
      /* 修改请求参数 */
      this.param = {
        iDisplayStart: 1,
        iDisplayLength: 10,
        roleType: val.roleType // 角色所属
      }
      if (this.total && this.currentPage !== 1) {
        this.total = 0 // 分页的当前页数变动会触发 从而获取数据
      } else {
        this.getdata(1, this.psize).then(res => {
          if (res.data.status) {
            /** 获取角色所属名 */
            const arr = [...this.$store.state.user.roleBelong]
            let name = ''
            for (const iterator of arr) {
              if (iterator.roleType === val.roleType) {
                name = iterator.roleTypeName
              }
            }
            this.tableData5 = [{ roleName: name, children: res.data[this.dataStr] }]
            this.total = res.data[this.totalStr]
          } else {
            this.tableData5 = []
            this.total = 0
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    // 刷新
    handleRefresh () {
      const that = this
      this.getdata(that.currentPage, that.psize)
        .then(res => {
          if (res.data.status) {
            this.tableData5 = res.data[this.dataStr]
            this.total = res.data[this.totalStr]
          } else {
            this.tableData5 = []
            this.total = 0
            this.$message.error(res.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
