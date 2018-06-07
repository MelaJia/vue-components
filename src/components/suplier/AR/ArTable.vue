<template>
  <div class="ar-table">
    <header>
      <!-- <el-button round @click="dialogConfirmVisible = true">批量确认</el-button>
    <el-button round @click="dialogTransferVisible = true">批量转让</el-button>
    <el-button round @click="dialogWithdrawVisible = true">一键批量变现</el-button> -->
    </header>
    <!-- <dialog-confirm :visible-p.sync="dialogConfirmVisible" :multiple-selection-p="multipleSelection"></dialog-confirm> -->
    <!-- 合同确认 -->
    <dialog-contract :visible-p.sync="dialogContractVisible" :details-p="details"></dialog-contract>
    <!-- 转让 -->
    <dialog-transfer :visible-p.sync="dialogTransferVisible" :details-p="details"></dialog-transfer>
    <!-- 贴现 -->
    <dialog-discount :visible-p.sync="dialogDiscountVisible" :details-p="details"></dialog-discount>
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
              <el-table-column align="center" prop="masterChainId" :width="widthArr.masterChainId">
              </el-table-column>
              <el-table-column align="center" prop="billId" :width="widthArr.billId">
              </el-table-column>
              <el-table-column align="center" prop="isMasterAr" :width="widthArr.isMasterAr" :formatter="originFormat">
                >
              </el-table-column>
              <el-table-column align="center" prop="company" :width="widthArr.company">
              </el-table-column>
              <el-table-column align="center" prop="arStatusTypeName" :width="widthArr.arStatusTypeName">
              </el-table-column>
              <el-table-column align="center" prop="currencyDesc" :width="widthArr.currencyDesc">
              </el-table-column>
              <el-table-column align="center" prop="billBookAmt" :width="widthArr.billBookAmt">
              </el-table-column>
              <el-table-column align="center" prop="loanAmt" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="center" prop="billPayDate" :width="widthArr.billPayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="billPayStatus" :width="widthArr.billPayStatus">
              </el-table-column>
              <el-table-column align="left" label-align="center" width='200px'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row, true)" :loading="scope.row.infoLoading">详情</el-button>
                  <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" :loading="item.isLoading">{{item.name}}</el-button></el-dropdown-item>
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
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="付款单位/对手单位" prop="company" width="150">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="center" label="票面金额" prop="billBookAmt">
        </el-table-column>
        <el-table-column align="center" label="可用余额" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="打款处理状态" prop="billPayStatus">
        </el-table-column>
        <el-table-column align="left" label-align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)" :loading="scope.row.infoLoading">详情</el-button>
            <el-dropdown :hide-on-click="false" v-if="scope.row.operateArr.length>0">
  <span class="el-dropdown-link">
    更多<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="(item, index) in scope.row.operateArr" :key="index" ><el-button class="full-width" type="primary" @click="handleCommand({key:item.key, idx:index, val:scope.row})" :loading="item.isLoading">{{item.name}}</el-button></el-dropdown-item>
    <!-- <el-dropdown-item v-for="(item, index) in operateArr" :key="index" :command="{key:item.key, idx:scope.$index, val:scope.row}">{{item.name}}</el-dropdown-item> -->
  </el-dropdown-menu>
</el-dropdown>
            <!-- <el-dropdown>
              <el-button type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button size="mini" type="primary" @click="handleTransfer(scope.$index, scope.row)">转让</el-button></el-dropdown-item>
                <el-dropdown-item><el-button size="mini" type="primary" @click="handleCancle(scope.$index, scope.row)">取消</el-button></el-dropdown-item>
                <el-dropdown-item><el-button size="mini" type="primary" @click="handleApply(scope.$index, scope.row)">贴现审核申请</el-button></el-dropdown-item>
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
import TableMixIn from '@/mixins/suplier/Ar/Table'
import Common from '@/mixins/common'
import { firstToUpperCase } from '@/util/util'
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
    return {
      dialogContractVisible: false, // 控制合同窗
      dialogTransferVisible: false, // 控制转账窗
      dialogDiscountVisible: false, // 控制贴现窗
      dialogInfoVisible: false,
      dialogChildInfoVisible: false, // 子详情
      multipleSelection: [], // 选择的数据
      details: {}, // 详情数据
      operateArr: [
        { key: 'trans', name: '转让', isLoading: false },
        { key: 'cancleDiscount', name: '取消', isLoading: false },
        { key: 'initiateDiscount', name: '贴现', isLoading: false },
        { key: 'contract', name: '合同确认', isLoading: false },
        { key: 'cancleTrans', name: '取消授让', isLoading: false },
        { key: 'apply', name: '贴现审核申请', isLoading: false }
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
    getDetail (val) {
      return this.axios.post('/myAr/queryAr', { masterChainId: val.masterChainId }).then(res => {
        // 处理数据
        if (res.data.status) {
          let details = this.handleInvoiceListFormat(res.data.data)
          details.masterChainId = val.masterChainId
          return details
        } else {
          this.$message({
            type: 'info',
            message: `请求出错`
          })
          return false
        }
      })
    },
    // 详情
    handleInfo (idx, val, isChild = false) {
      console.log(val)
      val.infoLoading = true
      this.getDetail(val).then(res => {
        if (res) {
          this.details = res
          if (isChild) {
            this.dialogChildInfoVisible = true
          } else {
            this.dialogInfoVisible = true
          }
        }
        val.infoLoading = false
      }).catch(err => {
        this.$alert(err, '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `网络错误`
            })
          }
        })
        val.infoLoading = false
      })
    },
    // 更多事件
    handleCommand (obj) {
      console.log(firstToUpperCase(obj.key))
      let key = `handle${firstToUpperCase(obj.key)}` // 方法为handle+ key首字母大写化组成
      this[key](obj.idx, obj.val)
    },
    // 转让
    handleTrans (idx, val) {
      this.operateArr[idx].isLoading = true
      this.getDetail(val).then(res => {
        console.log(res)
        if (res) {
          this.details = res
          this.dialogTransferVisible = true
        }
        this.operateArr[idx].isLoading = false
      }).catch(err => {
        console.log(err)
        this.operateArr[idx].isLoading = false
      })
    },
    // 取消转让
    handleCancleTrans (idx, val) {
      this.$confirm(`单号为${val.masterChainId}的确认取消授让?`, `${val.masterChainId}取消授让`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelBase('/myAr/cancelTrans.do', val.masterChainId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 贴现
    handleInitiateDiscount (idx, val) {
      this.operateArr[idx].isLoading = true
      this.getDetail(val).then(res => {
        console.log(res)
        if (res) {
          this.details = res
          this.dialogDiscountVisible = true
        }
        this.operateArr[idx].isLoading = false
      }).catch(err => {
        console.log(err)
        this.operateArr[idx].isLoading = false
      })
    },
    // 取消贴现
    handleCancleDiscount (idx, val) {
      this.$confirm(`单号为${val.masterChainId}的确认取消贴现?`, `${val.masterChainId}取消贴现`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelBase('/myAr/cancelDiscount.do', val.masterChainId)
        // this.axios.post('/myAr/cancelDiscount.do', { masterChainId: val.masterChainId }).then(res => {
        //   let type = res.data.result === 'true' ? 'success' : 'error'
        //   this.$message({
        //     message: res.data.message,
        //     type: type
        //   })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '操作失败'
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 合同确认
    handleContract (idx, val) {
      this.operateArr[idx].isLoading = true
      this.getDetail(val).then(res => {
        console.log(res)
        if (res) {
          this.details = res
          this.dialogContractVisible = true
        }
        this.operateArr[idx].isLoading = false
      }).catch(err => {
        console.log(err)
        this.operateArr[idx].isLoading = false
      })
    },
    // 审核申请
    handleApply (idx, val) {
      this.$confirm('确认进行贴现审核申请？', `${val.masterChainId}贴现审核申请`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelBase('/myAr/auditApplyDiscount.do', val.masterChainId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    },
    /* 发票已选未选分离 */
    handleInvoiceListFormat (oData) {
      const data = oData
      const list = []
      const listSelected = []
      data.invoiceCustomList.forEach(element => {
        if (element.invoiceIsSelected) {
          element.invoiceIsSelected = true
          listSelected.push(element)
        } else {
          list.push(element)
        }
      })
      data.invoiceList = list
      data.invoiceListSelected = listSelected
      return data
    },
    /* 按钮菜单显隐处理
    ** val 节点数据
    ** ischild 是否是子数据
    */
    getOpera: function (val) {
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
          case 2:
            operateArr.push(this.operateArr[0])
            if (item.isNeedDiscountAudit === 0 && item.discountAuditStatus === 1) {
              operateArr.push(this.operateArr[2])
            }
            if (item.isNeedDiscountAudit === 0 && (item.discountAuditStatus === 2 || item.discountAuditStatus === 9)) {
              operateArr.push(this.operateArr[5])
            }
            if (item.isNeedDiscountAudit === 1 && item.discountAuditStatus === -1) {
              operateArr.push(this.operateArr[5])
            }
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
  }
}

</script>
