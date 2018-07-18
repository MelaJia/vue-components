<template>
  <div class="ar-table">
    <header>
      <!-- <el-button round @click="dialogConfirmVisible = true">批量确认</el-button>
    <el-button round @click="dialogTransferVisible = true">批量转让</el-button>
    <el-button round @click="dialogWithdrawVisible = true">一键批量变现</el-button> -->
    </header>
    <!-- <dialog-confirm :visible-p.sync="dialogConfirmVisible" :multiple-selection-p="multipleSelection"></dialog-confirm> -->
    <!-- 合同确认 -->
    <dialog-contract :visible-p.sync="dialogContractVisible" :details-p="detailsContract"></dialog-contract>
    <!-- 转让 -->
    <dialog-transfer :visible-p.sync="dialogTransferVisible" :details-p="detailsTransfer"></dialog-transfer>
    <!-- 贴现 -->
    <dialog-discount :visible-p.sync="dialogDiscountVisible" :details-p="detailsDiscount"></dialog-discount>
    <!-- <dialog-withdraw :visible-p.sync="dialogWithdrawVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-withdraw> -->
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <!-- 子详情 -->
    <dialog-info-1 :visible-p.sync="dialogChildInfoVisible" :details-p="details" ></dialog-info-1>
    <section>
      <el-table ref="table" :data="comDatas" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">

              </el-table-column>
              <el-table-column align="center" width="40">
              </el-table-column>
              <el-table-column align="center" prop="loanId" :width="widthArr.loanId">
              </el-table-column>
              <el-table-column align="center" prop="applyAmt" :width="widthArr.applyAmt">
              </el-table-column>
              <el-table-column align="center" :width="widthArr.currencyDesc" >
              </el-table-column>
              <el-table-column align="center" prop="status" :width="widthArr.status">
              </el-table-column>
              <el-table-column align="center" prop="repaymentType" :width="widthArr.repaymentType">
              </el-table-column>
              <el-table-column align="center" prop="loanAmt" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="center" prop="payPrincipalAmt" :width="widthArr.payPrincipalAmt">
              </el-table-column>
              <el-table-column align="center" prop="payInterestAmt" :width="widthArr.payInterestAmt">
              </el-table-column>
              <el-table-column align="center" prop="payServiceAmt" :width="widthArr.payServiceAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineAmt" :width="widthArr.payFineAmt">
              </el-table-column>
              <el-table-column align="center" prop="payFineDays" :width="widthArr.payFineDays">
              </el-table-column>
              <el-table-column align="center" prop="prepaymentDeductInterest" :width="widthArr.prepaymentDeductInterest">
              </el-table-column>
              <el-table-column align="center" prop="totalRepayAmt" :width="widthArr.totalRepayAmt">
              </el-table-column>
              <el-table-column align="center" prop="contractSignedDate" :width="widthArr.contractSignedDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="repayDate" :width="widthArr.repayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="left" label-align="center" width='200px'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row, true)" >详情</el-button>
                  <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" fixed width="40">
        </el-table-column> -->
        <el-table-column
          type="index"
          label="序号"
          fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="融资编号" fixed sortable prop="loanId" width="150">
        </el-table-column>
        <el-table-column align="center" label="融资申请金额" prop="applyAmt" width="150">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType">
        </el-table-column>
        <el-table-column align="center" label="实放金额" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款本金" prop="payPrincipalAmt">
        </el-table-column>
        <el-table-column align="center" label="还款利息" prop="payInterestAmt">
        </el-table-column>
         <el-table-column align="center" label="还款服务费" prop="payServiceAmt">
        </el-table-column>
        <el-table-column align="center" label="罚息" prop="payFineAmt">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="payFineDays">
        </el-table-column>
        <el-table-column align="center" label="提前还款手续费" prop="prepaymentDeductInterest">
        </el-table-column>
        <el-table-column align="center" label="还款合计" prop="totalRepayAmt">
        </el-table-column>
        <el-table-column align="center" label="合同签署日期" prop="contractSignedDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button v-for="(item, index) in scope.row.operateArr" :key="index"  size="mini" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button>
            </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>
<style scoped lang="scss">
header {
  text-align: right;
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
</style>
<style>
.el-table__expanded-cell .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
import { firstToUpperCase, debounce, erroShow } from '@/util/util' // 首字母大写 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
import widhConf from '@/config/width' // 宽度配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogContract'),
    'dialog-transfer': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogTransfer'),
    'dialog-discount': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogDiscount'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogInfoMy'),
    'dialog-info-1': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogInfoMy-1')
  },
  data () {
    console.log(widhConf.crL)
    return {
      dialogContractVisible: false, // 控制合同窗
      dialogTransferVisible: false, // 控制转账窗
      dialogDiscountVisible: false, // 控制贴现窗
      dialogInfoVisible: false,
      dialogChildInfoVisible: false, // 子详情
      detailsContract: '', // 合同数据
      detailsTransfer: '', // 转账数据
      detailsDiscount: '', // 贴现数据
      multipleSelection: [], // 选择的数据
      details: {}, // 详情数据
      operateArr: [
        { key: 'trans', name: '转让' },
        { key: 'cancleDiscount', name: '取消' },
        { key: 'initiateDiscount', name: '贴现' },
        { key: 'contract', name: '合同确认' },
        { key: 'cancleTrans', name: '取消授让' },
        { key: 'apply', name: '保理方申请' }
      ], // 操作数据
      widthArr: widhConf.crL
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
    // 详情
    handleInfo: debounce(handleInfo, 1000, true),
    // 更多事件
    handleCommand (obj) {
      let key = `handle${firstToUpperCase(obj.key)}` // 方法为handle+ key首字母大写化组成
      // 执行方法
      this[key](obj.idx, obj.val)
    },
    // 转让
    handleTrans: debounce(handleTrans, 1000, true),
    // 取消转让
    handleCancleTrans: handleCancleTrans,
    // 贴现
    handleInitiateDiscount: debounce(handleInitiateDiscount, 1000, true),
    // 取消贴现
    handleCancleDiscount: handleCancleDiscount,
    // 合同确认
    handleContract: debounce(handleContract, 1000, true),
    // 审核申请
    handleApply: handleApply,
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    },
    // 按钮处理
    getOpera: getOpera
  }
}
// 详情函数
function handleInfo (idx, val, isChild = false) {
  // 显示加载图标
  const loading = this.$loading(loadingConf.get())
  // 获取数据
  this.getDetail(val).then(res => {
    if (res) {
      this.details = res
      if (isChild) {
        this.dialogChildInfoVisible = true
      } else {
        this.dialogInfoVisible = true
      }
    }
    // 关闭加载图标
    loading.close()
  }).catch(err => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 转让
function handleTrans (idx, val) {
  // 显示加载图标
  const loading = this.$loading(loadingConf.get())
  // 获取数据
  this.getDetail(val).then(res => {
    console.log(res)
    if (res) {
      this.detailsTransfer = res
      this.dialogTransferVisible = true
    }
    // 关闭加载图标
    loading.close()
  }).catch(err => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 取消转让
function handleCancleTrans (idx, val) {
  this.$confirm(`单号为${val.masterChainId}的确认取消授让?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/myAr/cancelTrans.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 贴现
function handleInitiateDiscount (idx, val) {
  // 显示加载图标
  const loading = this.$loading(loadingConf.get())
  // 获取数据
  this.getDetail(val).then(res => {
    console.log(res)
    if (res) {
      this.detailsDiscount = res
      this.dialogDiscountVisible = true
    }
    // 关闭加载图标
    loading.close()
  }).catch(err => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 取消贴现
function handleCancleDiscount (idx, val) {
  this.$confirm(`单号为${val.masterChainId}的确认取消贴现?`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/myAr/cancelDiscount.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 合同确认
function handleContract (idx, val) {
  // 显示加载图标
  const loading = this.$loading(loadingConf.get())
  // 获取数据
  this.getDetail(val).then(res => {
    console.log(res)
    if (res) {
      this.detailsContract = res
      this.dialogContractVisible = true
    }
    // 关闭加载图标
    loading.close()
  }).catch(err => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 审核申请
function handleApply (idx, val) {
  this.$confirm(`单号为${val.masterChainId}的确认进行贴现审核申请？`, `提示`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    this.cancelBase('/myAr/auditApplyDiscount.do', val.masterChainId)
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
    /* 子节点菜单处理 start */
    if (item.tableData && item.tableData.length > 0) { // 子节点菜单处理
      const childs = item.tableData
      childs.map((itemc) => {
        const operateChild = []
        switch (itemc.checkedStatus) {
          case 3:
            operateChild.push(this.operateArr[4])
            break
          case 22:
            operateChild.push(this.operateArr[1])
            break
          case 23:
            operateChild.push(this.operateArr[3])
            break
          default:
            break
        }
        itemc.operateArr = operateChild
      })
    }
    /* 子节点菜单处理 end */
    switch (item.checkedStatus) {
      case 1:
        operateArr.push(this.operateArr[5])
        break
      case 2:
        operateArr.push(this.operateArr[0])
        operateArr.push(this.operateArr[2])
        break
      case 3:
        operateArr.push(this.operateArr[4])
        break
      case 22:
        operateArr.push(this.operateArr[1])
        break
      case 23:
        operateArr.push(this.operateArr[3])
        break
      default:
        break
    }
    item.operateArr = operateArr
  })
  return datas
}
</script>
