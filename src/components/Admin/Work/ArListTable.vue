<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <dialog-accept :visible-p.sync="dialogTransferVisible" :details-p="details"></dialog-accept>
    <dialog-reject :visible-p.sync="dialogRejectVisible" :details-p="details"></dialog-reject>
    <section>
    <el-table :data="comDatas" v-loading="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([5,6])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="贴现客户" prop="custFromName" width="130">
      </el-table-column>
      <el-table-column align="center" label="一级供应商" prop="companyNameOfL1">
      </el-table-column>
      <el-table-column align="center" label="付款单位" prop="companyName">
      </el-table-column>
      <el-table-column align="center" label="保理方" prop="custToName">
      </el-table-column>
      <el-table-column align="center" label="状态" prop="auditedTypeName">
      </el-table-column>
      <el-table-column align="left" header-align="center" label="操作" width='150px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-dropdown  :hide-on-click="false" v-if="scope.row.operateArr.length!==0">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" v-loading.fullscreen.lock="item.isLoading">{{item.name}}</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import { firstToUpperCase, debounce } from '@/util/util' // 首字母大写 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
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
  computed: {
    comDatas: function () {
      const datas = this.getOpera(this.dataTable)
      return datas
    }
  },
  methods: {
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
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
    },
    /* 按钮菜单显隐处理
    ** val 节点数据
    ** ischild 是否是子数据
    */
    getOpera: function (val) {
      const datas = val
      datas.forEach((item) => {
        const operateArr = []
        switch (item.isAudited) {
          case 0:
            operateArr.push(this.operateArr[0])
            operateArr.push(this.operateArr[1])
            break
          default:
            break
        }
        item.operateArr = operateArr
      })
      return datas
    }
  }
}
// 错误提示函数
function erroShow (err, loading) {
  console.log(this)
  this.$alert(`网络错误${err}`, '系统提示', {
    confirmButtonText: '确定',
    callback: action => {
      // 关闭加载图标
      loading.close()
    }
  })
}
// 详情
function handleInfo (idx, val) {
  // 1.显示加载图标
  const loading = this.$loading(loadingConf.get())
  let param = {
    custId: val.custId,
    buyerCustNo: val.buyerCustNo
  }
  // 2.获取数据
  this.axios.post('/discountAudit/queryDiscountAuditInfo.do', param).then(res => {
    if (res.data.status) {
      // 3.设置数据
      this.details = res.data.data
      // 4.显示弹窗
      this.dialogInfoVisible = true
    } else {
      this.$message({
        showClose: true,
        message: res.data.msg,
        type: 'error'
      })
    }
    loading.close() // 关闭加载图标
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
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
