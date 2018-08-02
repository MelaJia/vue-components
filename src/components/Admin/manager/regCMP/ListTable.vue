<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <dialog-cs :visible-p.sync="dialogTransferVisible" :details-p="details"></dialog-cs>
    <dialog-cm :visible-p.sync="dialogRejectVisible" :details-p="details"></dialog-cm>
    <section>
    <el-table :data="comDatas" v-loading="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([5,6])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="公司名称" prop="companyName" width="130">
      </el-table-column>
      <el-table-column align="center" label="公司法人代表" prop="legalPerson">
      </el-table-column>
      <el-table-column align="center" label="公司成立日期" prop="establishDate" :formatter="dateFormat">
      </el-table-column>
      <el-table-column align="center" label="公司注册资本" prop="registeredCapital">
      </el-table-column>
      <el-table-column align="center" label="公司状态" prop="status" :formatter="statusFormat">
      </el-table-column>
      <el-table-column align="center" label="公司地址" prop="companyAddress">
      </el-table-column>
      <el-table-column align="center" label="客户经理" prop="customerManagerName">
      </el-table-column>
      <el-table-column align="left" header-align="center" label="操作" width='390px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button v-if="scope.row.status==0||scope.row.status==2" size="mini" type="primary" @click="handleStart(scope.$index, scope.row)">启用</el-button>
          <el-button v-else size="mini" type="primary" @click="handleStop(scope.$index, scope.row)">停用</el-button>
          <el-button size="mini" type="primary" @click="handleCustManagerSet(scope.$index, scope.row)">客户经理设置</el-button>
           <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">更新同步</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
  </div>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table'
import Common from '@/mixins/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
import { debounce, getDataBase } from '@/util/util' // 首字母大写 防抖函数
export default {
  props: ['dataLoading', 'dataTable'],
  data () {
    return {
      operateArr: [{ key: 'accept', name: '分拨', isLoading: false }, { key: 'reject', name: '拒绝', isLoading: false }],
      dialogRejectVisible: false
    }
  },
  mixins: [ListMinxIn, Common, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/manager/regCMP/DialogInfo'),
    'dialog-cs': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/manager/regCMP/DialogConSignSet'),
    'dialog-cm': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/manager/regCMP/DialogCustManagerSet')
  },
  computed: {
    comDatas: function () {
      return this.dataTable
    }
  },
  methods: {
    // 状态格式化
    statusFormat: function (row, column) {
      return row[column.property] === '0' ? '不可用' : row[column.property] === '1' ? '可用' : '待确认'
    },
    // 签核方式格式化
    signtypeFormat: function (row, column) {
      return row[column.property] === 1 ? '线下上传' : row[column.property] === 2 ? '电子签章' : '未知'
    },
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
    // 停用
    handleStop: handleStop,
    // 启用
    handleStart: handleStart,
    // 合同签署设置
    handleConSignSet (idx, val) {
      this.details = val
      this.dialogTransferVisible = true
    },
    // 客户经理设置
    handleCustManagerSet (idx, val) {
      this.details = val
      this.dialogRejectVisible = true
    },
    // 更新同步
    handleUpdate: handleUpdate
  }
}
// 详情
function handleInfo (idx, val) {
  // 1.设置数据
  let param = {
    custId: val.custId
  }
  // 2.获取数据
  getDataBase.call(this, '/cust/customerDetailInfo.do', param, true).then((res) => {
    if (res) {
      res.registeredCurrencyType = parseInt(res.registeredCurrencyType) // 货币类型数字转字符串
      res.paidinCurrencyType = parseInt(res.paidinCurrencyType) // 货币类型数字转字符串
      // 3.设置数据
      this.details = res
      // 4.显示弹窗
      this.dialogInfoVisible = true
    }
  })
}
// 停用
function handleStop (idx, val) {
  this.$confirm(`确认停用${val.companyName}?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postBase('/sysRegisteredCompanyManager/disableRegisteredCompany.do', { custId: val.custId })
  }).catch(() => {
    this.$message({
      showClose: true,
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 启用
function handleStart (idx, val) {
  this.$confirm(`确认启用${val.companyName}?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postBase('/sysRegisteredCompanyManager/enableRegisteredCompany.do', { custId: val.custId })
  }).catch(() => {
    this.$message({
      showClose: true,
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 更新同步
function handleUpdate (idx, val) {
  // 设置请求数据
  let param = {
    custId: val.custId,
    vendorCodes: val.vendorCodes

  }
  this.$confirm(`点击确认,将同步更新${val.companyName}的AR资料,订单资料!`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postBase('/sysRegisteredCompanyManager/sycCompanyAR.do', param)
  }).catch(() => {
    this.$message({
      showClose: true,
      type: 'info',
      message: '操作已取消'
    })
  })
}
</script>
<style lang="scss">
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/* 更多菜单样式 */
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
</style>
