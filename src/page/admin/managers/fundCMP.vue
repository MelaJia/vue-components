<template>
  <div class="main">
    <div class="body">
       <el-card class="box-card search-box-card" :class="{'hideBox':!searchShow}">
        <div slot="header" class="clearfix" style="position:relative">
          <i class="el-icon-search"></i>
          <span>查询条件</span>
          <el-tooltip class="item" effect="dark" content="点我收起" placement="right-start">
            <i class="el-icon-arrow-down" v-show="searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;color:#409EFF;"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="点我展开" placement="right-start">
            <i class="el-icon-arrow-right" v-show="!searchShow" @click="searchShow=!searchShow" style="position: absolute;right: 0;color:#409EFF;"></i>
          </el-tooltip>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <search v-show="searchShow" @handle-search="searchSubmit"></search>
        </transition>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card text-align-center">
        <ar-table :data-loading="loading" :data-table="tableData5" @refresh="handleRefresh"></ar-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizesArr"
      :page-size="psize"
      :current-page.sync="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </el-card>
    </div>
  </div>
</template>
<style scope>
.text-align-center {
  text-align: center;
}
</style>

<script>
import ArTable from '@/components/Admin/manager/fundCMP/ListTable'
import Search from '@/components/Admin/manager/fundCMP/Search'
import Table from '@/mixins/suplier/Ar/Table'
// import { auditList } from '@/monitorDatas/Admin/arDatas.js'
export default {
  mixins: [Table],
  data () {
    return {
      loading: false,
      postUrl: '/sysCompanyUserManager/getFactoringCompanyQueryListTable.do', // 数据来源
      dataStr: 'data',
      totalStr: 'recordsTotal'
    }
  },
  components: {
    'ar-table': ArTable,
    'search': Search
  },
  mounted () {
    this.getdata(1, this.psize)
      .then(res => {
        if (res) {
          this.tableData5 = res.data[this.dataStr]
          this.total = res.data[this.totalStr]
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    // 搜索
    searchSubmit: searchSubmit,
    // 刷新
    handleRefresh: handleRefresh
  }
}
// 搜索
function searchSubmit (val) {
  /* 修改请求参数 */
  this.param = {
    companyName: val.companyName, // 公司名称
    legalPerson: val.legalPerson, // 公司法人代表
    contactPerson: val.contactPerson, // 公司联系人
    status: val.status // 状态
  }
  if (this.total && this.currentPage !== 1) {
    this.total = 0 // 分页的当前页数变动会触发 从而获取数据
  } else {
    this.getdata(1, this.psize).then(res => {
      if (res) {
        this.tableData5 = res.data[this.dataStr]
        this.total = res.data[this.totalStr]
      }
    })
  }
}
// 刷新数据
function handleRefresh () {
  this.getdata(this.currentPage, this.psize)
    .then(res => {
      if (res) {
        this.tableData5 = res.data[this.dataStr]
        this.total = res.data[this.totalStr]
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

</script>
