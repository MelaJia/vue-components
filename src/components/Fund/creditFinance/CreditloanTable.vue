<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-creditloan :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-creditloan>
    <!--电子合同-->
    <dialog-contract :visible-p.sync="dialogTransferVisible" :details-p="detailsContract"></dialog-contract>
    <!--线下合同-->
    <!-- <dialog-contractonline :visible-p.sync="dialogOnline" :details-p="detailsContract"></dialog-contractonline> -->
    <!--线下合同-->
    <dialog-contractoffline :visible-p.sync="dialogOnline" :details-p="offlineContract"></dialog-contractoffline>
    <!--校验手机号-->
    <dialog-checkphone :visible-p.sync="dialogCheckPhone" :details-p="checkDetail"></dialog-checkphone>
    <section>
      <el-table ref="table" :data="comDatas" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @mousedown.native="mouseDown"
        >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          fixed width="60">
        </el-table-column>
        <el-table-column align="center" label="融资客户" fixed prop="companyName" min-width="140">
        </el-table-column>
        <el-table-column align="center" label="融资编号" sortable prop="loanId" min-width="140">
        </el-table-column>
        <el-table-column align="center" label="融资类型" prop="loanTypeName" min-width="140">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="贴现申请金额" prop="applyAmt" min-width="140" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType" min-width="140">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实放金额" prop="loanAmt" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="信用报告" min-width="100">
          <template slot-scope="scope">
            <a :href="scope.row.riskPlatFormURL" target="_blank">信用报告</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" :formatter="dateFormat" min-width="140">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat" min-width="140">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="操作" width='350px' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          <el-button v-for="(item, index) in scope.row.operateArr" :key="index" size="mini" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" >{{item.name}}</el-button>
          <!-- <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length!==0">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" >{{item.name}}</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
      </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
import { firstToUpperCase, debounce, erroShow } from '@/util/util' // 首字母大写 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [ListMinxIn, Common, Dialog],
  components: {
    'dialog-creditloan': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogCreditloan'),
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogLoancontract'),
    // 'dialog-contractonline': () =>
    //  import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogOnlinecontract')
    'dialog-contractoffline': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogOfflinecontract'),
    'dialog-checkphone': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogCheckphone')
  },
  data () {
    return {
      dialogInfoVisible: false,
      dialogOnline: false,
      dialogCheckPhone: false,
      details: {}, // 详情数据
      detailsContract: {},
      offlineContract: {}, // 线下合同详情
      checkDetail: {},
      operateArr: [{ key: 'contrac', name: '合同生成' }, { key: 'confirm', name: '发起确认' }, { key: 'accept', name: '放款' }, { key: 'reject', name: '拒绝' }] // 操作数据
    }
  },
  computed: {
    comDatas: function () {
      const datas = this.getOpera(this.dataTable)
      return datas
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
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
// 详情函数
function handleInfo (idx, val) {
  // 引入mixins/common.js中getLoanDetail其中包含有加载loading
  this.getLoanDetail('/creditLoan/queryCreditLoanInfo.do', { loanId: val.loanId }).then(res => {
    if (res) {
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}

// 合同生成
function handleContrac (idx, val) {
  console.log(val)
  // 1.显示加载图标
  const loading = this.$loading(loadingConf.get())
  // 2.获取数据
  if (val.contractSignType === 1) {
    this.axios.post('/factoringCreditLoan/showElectronicsContract.do', { loanId: val.loanId }).then(res => {
      console.log(res)
      if (res.data.status) {
        // 放款比例初始化否则先输入实际放款金额会造成不联动
        res.data.data.loanPer = res.data.data.loanPer || 1
        res.data.data.loanAmt = res.data.data.loanAmt || res.data.data.applyAmt * res.data.data.loanPer / 100
        res.data.data.repaymentType = res.data.data.repaymentType ? parseInt(res.data.data.repaymentType) : null
        // 3.设置数据
        this.dialogTransferVisible = true // 显示电子合同
        this.detailsContract = res.data.data
        console.log(this.detailsContract)
      } else {
        this.$message.error(res.data.msg)
      }
      loading.close()
    }).catch(err => {
      erroShow.call(this, err, loading)
    })
  } else {
    // 线下合同查询接口列表
    this.axios.post('/factoringCreditLoan/queryManualContract.do', { loanId: val.loanId }).then(res => {
      if (res.data.status) {
        console.log(res.data.data)
        this.dialogOnline = true // 显示线下上传合同
        this.offlineContract = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
      loading.close()
    }).catch((err) => {
      erroShow.call(this, err, loading)
    })
  }
}

// 发起确认
// function handleConfirm (idx, val) {
//   this.$confirm(`单号为${val.loanId}的贴现合同确认发起确认?`, `提示`, {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//     center: true
//   }).then(() => {
//     this.postResultFresh('/factoringCreditLoan/confirmInitiateSigning.do', {loanId: val.loanId}) // 调用common混合中公共方法
//   }).catch(() => {
//     this.$message({
//       type: 'info',
//       message: '操作已取消'
//     })
//   })
// }
function handleConfirm (idx, val) {
  this.$confirm(`单号为${val.loanId}的贴现合同确认发起确认?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    if (val.contractSignType === 1) {
      this.checkDetail = val
      this.dialogCheckPhone = true
    } else {
      this.postResultFresh('/factoringCreditLoan/confirmInitiateSigning.do', {loanId: val.loanId}) // 调用common混合中公共方法
    }
    console.log(val)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 放款
function handleAccept (idx, val) {
  this.$confirm(`融资编号为${val.loanId}的贴现申请确认放款?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.postResultFresh('/factoringCreditLoan/completeLoan.do', {loanId: val.loanId}) // 调用common混合中公共方法
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 拒绝
function handleReject (idx, val) {
  this.$prompt(`融资编号为${val.loanId}的贴现申请确认拒绝`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    inputPlaceholder: '请输入拒绝理由',
    inputType: 'textarea',
    inputPattern: /^\S+$/,
    inputErrorMessage: '拒绝理由不能为空',
    center: true
  }).then(({value}) => {
    console.log(value)
    this.postResultFresh('/factoringCreditLoan/rejectLoan.do', {loanId: val.loanId, rejectReason: value}) // 调用common混合中公共方法
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

<style lang="scss" scoped>
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
