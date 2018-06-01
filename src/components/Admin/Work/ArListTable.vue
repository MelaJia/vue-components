<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <dialog-accept :visible-p.sync="dialogTransferVisible" :details-p="details"></dialog-accept>
    <dialog-reject :visible-p.sync="dialogRejectVisible" :details-p="details"></dialog-reject>
    <section>
    <el-table :data="dataTable" v-loading="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border show-summary :summary-method="sumHandle([5,6])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="贴现客户" prop="custFromName" width="130">
      </el-table-column>
      <el-table-column align="center" label="L1供应商" prop="companyNameOfL1">
      </el-table-column>
      <el-table-column align="center" label="付款单位" prop="companyName">
      </el-table-column>
      <el-table-column align="center" label="信用报告">
        <template slot-scope="scope">
          <a :href="scope.row.riskPlatFormURL" target="_blank">信用报告</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width='230px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-dropdown  :hide-on-click="false">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" :loading="item.isLoading">{{item.name}}</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </section>
  </div>
</template>

<script>
import ListMinxIn from '@/mixins/Ar/List'
import Common from '@/mixins/common'
import Dialog from '@/mixins/Ar/Dialog'
import { firstToUpperCase } from '@/util/util' // 首字母大写
import { auditDetail } from '@/monitorDatas/Admin/arDatas.js'
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
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/Work/DialogInfoAr'),
    'dialog-accept': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/Work/DialogArAccept'),
    'dialog-reject': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/Work/DialogArReject')
  },
  methods: {
    // 详情
    handleInfo (idx, val) {
      let param = {
        custId: val.custId,
        buyerCustNo: val.buyerCustNo
      }
      this.details = auditDetail
      this.dialogInfoVisible = true
      this.axios.post('/discountAudit/queryDiscountAuditInfo.do', param).then(res => {
        // if (res.data.status) {
        this.details = res.data
        this.dialogInfoVisible = true
        // } else {
        //   this.$message({
        //     showClose: true,
        //     message: '错了哦，这是一条错误消息',
        //     type: 'error'
        //   })
        // }
      }).catch(function (error) {
        console.log(error)
      })
    },
    // 更多事件
    handleCommand (obj) {
      console.log(firstToUpperCase(obj.key))
      let key = `handle${firstToUpperCase(obj.key)}` // 方法为handle+ key首字母大写化组成
      this[key](obj.idx, obj.val)
    },
    // 分拨
    handleAccept (idx, val) {
      this.details = val
      this.dialogTransferVisible = true
    },
    // 拒绝
    handleReject (idx, val) {
      this.details = val
      this.dialogRejectVisible = true
    }
  }
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
