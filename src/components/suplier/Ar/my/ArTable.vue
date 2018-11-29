<template>
  <div class="ar-table" ref="resizeContext">
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
      <el-table ref="table" :data="comDatas" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown"
        >
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">
              </el-table-column>
              <el-table-column align="center" width="40">
                <template slot-scope="scope">
                  - -
                </template>
              </el-table-column>
              <el-table-column align="center" prop="masterChainId" :width="widthArr.masterChainId" :formatter="nullDealWith" >
              </el-table-column>
              <el-table-column align="center" prop="billId" :width="widthArr.billId" :formatter="nullDealWith" >
              </el-table-column>
              <el-table-column align="center" :width="widthArr.isMasterAr" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="transUnitName" :width="widthArr.transUnitName" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="center" prop="arStatusTypeName" :width="widthArr.arStatusTypeName">
              </el-table-column>
              <el-table-column align="center" prop="currencyDesc" :width="widthArr.currencyDesc" :formatter="nullDealWith">
              </el-table-column>
              <el-table-column align="right" prop="billBookAmt" :width="widthArr.billBookAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right"  :width="widthArr.loanAmt" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="billPayDate" :width="widthArr.billPayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" label-align="center" width='80px'>
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row, true)" >详情</el-button>
                  <!-- <el-button size="mini" type="text" v-for="(item, index) in scope.row.operateArr" :key="index" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button> -->
                  <!-- <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown> -->
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
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="付款单位/对手单位" prop="transUnitName" width="150" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName" :formatter="nullDealWith" >
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="票面金额" prop="billBookAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="余额" prop="loanAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="票据到期日" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width='80px' class-name="" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <!-- <el-button size="mini" type="text" v-for="(item, index) in scope.row.operateArr" :key="index" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button> -->
            <!-- <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
  <span class="el-dropdown-link">
    更多<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})">{{item.name}}</el-button></el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown> -->
            <!-- <el-dropdown>
              <el-button type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button size="mini" type="text" @click="handleTransfer(scope.$index, scope.row)">转让</el-button></el-dropdown-item>
                <el-dropdown-item><el-button size="mini" type="text" @click="handleCancle(scope.$index, scope.row)">取消</el-button></el-dropdown-item>
                <el-dropdown-item><el-button size="mini" type="text" @click="handleApply(scope.$index, scope.row)">贴现审核申请</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
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
import { firstToUpperCase, debounce } from '@/util/util' // 首字母大写 防抖函数
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-contract': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogContract'),
    'dialog-transfer': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogTransfer'),
    'dialog-discount': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogDiscount'),
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogInfoMy'),
    'dialog-info-1': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogInfoMy-1')
  },
  data () {
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
      ] // 操作数据
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
  })
}
// 转让
function handleTrans (idx, val) {
  // 获取数据
  this.getDetail(val).then(res => {
    if (res) {
      this.detailsTransfer = res
      this.dialogTransferVisible = true
    }
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
    this.postWithId('/myAr/cancelTrans.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 贴现
function handleInitiateDiscount (idx, val) {
  // 获取数据
  this.getDetail(val).then(res => {
    if (res) {
      this.detailsDiscount = res
      this.dialogDiscountVisible = true
    }
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
    this.postWithId('/myAr/cancelDiscount.do', val.masterChainId)
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作已取消'
    })
  })
}
// 合同确认
function handleContract (idx, val) {
  // 获取数据
  this.getDetail(val).then(res => {
    if (res) {
      this.detailsContract = res
      this.dialogContractVisible = true
    }
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
    this.postWithId('/myAr/auditApplyDiscount.do', val.masterChainId)
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
