<template>
  <div class="ar-table">
    <header>
      <!-- <el-button round @click="dialogConfirmVisible = true">批量确认</el-button>
    <el-button round @click="dialogTransferVisible = true">批量转让</el-button>
    <el-button round @click="dialogWithdrawVisible = true">一键批量变现</el-button> -->
    </header>
    <!-- <dialog-confirm :visible-p.sync="dialogConfirmVisible" :multiple-selection-p="multipleSelection"></dialog-confirm> -->
    <!-- <dialog-withdraw :visible-p.sync="dialogWithdrawVisible" :multiple-selection-p="multipleSelection" :options="Options"></dialog-withdraw> -->
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" show-summary :summary-method="sumHandle([7,8])" border style="width: 100%"
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
              <el-table-column align="center" prop="isMasterAr" :width="widthArr.isMasterAr">
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
              <el-table-column align="center" width='200px'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
                  <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="selection" fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="付款单位" prop="company" width="150">
        </el-table-column>
        <el-table-column align="center" label="贴现客户" prop="company" width="150">
        </el-table-column>
        <el-table-column align="center" label="贴现放款金额" prop="arStatusTypeName">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="billBookAmt">
        </el-table-column>
        <el-table-column align="center" label="宽容天数" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款本金" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款利息" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款手续费" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款罚息" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="罚息天数" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="提前还款手续费" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="还款总计" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="出借日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="预计还款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="打款处理状态">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="会计确认->财务确认->财务已付款->付款单确认" placement="top">
              <span>{{scope.row.loanAmt}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)" :loading="scope.row.infoLoading">详情</el-button>
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
// 更多菜单样式
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #ff6040;
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

<script>
import TableMixIn from '@/mixins/Ar/Table'
import Common from '@/mixins/common'
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/DialogInfoLoaned')
  },
  data () {
    return {
      dialogContractVisible: false, // 控制合同窗
      dialogTransferVisible: false, // 控制转账窗
      dialogDiscountVisible: false, // 控制贴现窗
      dialogInfoVisible: false,
      multipleSelection: [], // 选择的数据
      details: {} // 详情数据
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    getDetail (val) {
      return this.axios.post('/myAr2/queryAr', { masterChainId: val.masterChainId }).then(res => {
        console.log('获取到数据')
        // 处理数据
        let details = this.handleInvoiceListFormat(res.data)
        details.masterChainId = val.masterChainId
        return details
      })
    },
    // 详情
    handleInfo (idx, val) {
      console.log(val)
      val.infoLoading = true
      this.getDetail(val).then(res => {
        console.log(res)
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      }).catch(err => {
        this.$alert(err, '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            })
          }
        })
      })
    },
    // 更多事件
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
    }
  }
}

</script>
