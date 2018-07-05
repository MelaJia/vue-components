<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <dialog-contract :visible-p.sync="dialogTransferVisible" :details-p="detailsContract"></dialog-contract>
    <section>
    <el-table :data="comDatas" v-loading="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([5,6])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="AR单号" prop="masterChainId" width="130">
      </el-table-column>
      <el-table-column align="center" label="结报单号" prop="billId">
      </el-table-column>
      <el-table-column align="center" label="贴现客户" prop="custFromName">
      </el-table-column>
      <el-table-column align="center" label="币别" prop="currencyDesc">
      </el-table-column>
      <el-table-column align="center" label="贴现金额" prop="billBookAmt">
      </el-table-column>
      <el-table-column align="center" label="实放金额" prop="discountAmt" >
      </el-table-column>
      <el-table-column align="center" label="预计回款日期" prop="billPayDate" min-width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column align="center" label="信用报告">
        <template slot-scope="scope">
          <a :href="scope.row.riskPlatFormURL" target="_blank">信用报告</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="贴现状态" prop="arStatusTypeName">
      </el-table-column>
      <el-table-column align="center" label="操作" width='230px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length!==0">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" >{{item.name}}</el-button></el-dropdown-item>
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
import Common from '@/mixins/common' // getLoanDetail 刷新数据fresh函数
import Dialog from '@/mixins/suplier/Ar/Dialog'
import { firstToUpperCase, debounce } from '@/util/util' // 首字母大写 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  name: 'loan', // 放款列表页面
  props: ['dataLoading', 'dataTable'],
  data () {
    return {
      detailsContract: '',
      operateArr: [{ key: 'contrac', name: '合同生成' }, { key: 'confirm', name: '发起确认' }, { key: 'accept', name: '放款' }, { key: 'reject', name: '拒绝' }] // 操作数据
    }
  },
  mixins: [ListMinxIn, Common, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/DialogInfoLoan'),
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/DialogLoanContract')
  },
  computed: {
    comDatas: function () {
      const datas = this.getOpera(this.dataTable)
      return datas
    }
  },
  methods: {
    // 更多事件
    handleCommand (obj) {
      console.log(firstToUpperCase(obj.key))
      let key = `handle${firstToUpperCase(obj.key)}` // 方法为handle+ key首字母大写化组成
      this[key](obj.idx, obj.val)
    },
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
    // 合同生成
    handleContrac: debounce(handleContrac, 1000, true),
    // 发起确认
    handleConfirm: handleConfirm,
    // 放款
    handleAccept: handleAccept,
    // 拒绝
    handleReject: handleReject,
    // 按钮菜单显隐处理
    getOpera: getOpera
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
// 详情函数
function handleInfo (idx, val) {
  // 引入mixins/common.js中getLoanDetail其中包含有加载loading
  this.getLoanDetail('/loan2/queryLoanInfo.do', { masterChainId: val.masterChainId }).then(res => {
    this.details = res
    this.dialogInfoVisible = true
  })
}
// 合同生成
function handleContrac (idx, val) {
  // 1.显示加载图标
  const loading = this.$loading(loadingConf.get())
  // 2.获取数据
  this.axios.post('/loan2/showGenerateContract.do', { masterChainId: val.masterChainId }).then(res => {
    console.log(res)
    if (res.data.status) {
      // 放款比例初始化否则先输入实际放款金额会造成不联动
      if (!res.data.data.loanPer) {
        res.data.data.loanPer = 1
      }
      // 3.设置数据
      this.detailsContract = res.data.data
      // 4.显示弹窗
      this.dialogTransferVisible = true
    } else {
      this.$message.error(res.data.msg)
    }
    loading.close() // 关闭加载图标
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 发起确认
function handleConfirm (idx, val) {
  this.$confirm(`单号为${val.masterChainId}的贴现合同确认发起确认?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/loan2/confirmInitiateSigning.do', val.masterChainId) // 调用common混合中公共方法
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 放款
function handleAccept (idx, val) {
  this.$confirm(`单号为${val.masterChainId}的贴现申请确认放款?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/loan2/completeLoan.do', val.masterChainId) // 调用common混合中公共方法
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 拒绝
function handleReject (idx, val) {
  this.$confirm(`单号为${val.masterChainId}的贴现申请确认拒绝?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/loan2/rejectLoan.do', val.masterChainId) // 调用common混合中公共方法
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
/* 按钮菜单显隐处理
    ** val 节点数据
    ** ischild 是否是子数据
    */
function getOpera (val) {
  const datas = val
  datas.forEach((item) => {
    const operateArr = []
    switch (item.checkedStatus) {
      case 22:
        operateArr.push(this.operateArr[0])
        operateArr.push(this.operateArr[1])
        break
      case 24:
        operateArr.push(this.operateArr[2])
        break
      default:
        break
    }
    operateArr.push(this.operateArr[3])
    item.operateArr = operateArr
  })
  console.log(datas)
  return datas
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
