<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-myinvoice :visible-p.sync="dialogInfoVisible" :details-p="details" :filelist="filedetails"></dialog-myinvoice>
    <section>
      <el-table ref="table" :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown"
        >
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">
              </el-table-column>
              <el-table-column align="center" width="60">
              </el-table-column>
              <el-table-column align="center" prop="vendorCode" :width="widthArr.vendorCode">
              </el-table-column>
              <el-table-column align="center" prop="invoiceNo" :width="widthArr.invoiceNo">
              </el-table-column>
              <el-table-column align="center" prop="statementNo" :width="widthArr.statementNo">
              </el-table-column>
              <el-table-column align="center" prop="sellerName" :width="widthArr.sellerName">
              </el-table-column>
              <el-table-column align="center" prop="buyerName" :width="widthArr.buyerName">
              </el-table-column>
              <el-table-column align="right" prop="amount" :width="widthArr.amount" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" prop="taxAmount" :width="widthArr.taxAmount" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="right" prop="total" :width="widthArr.total" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="currencyName" :width="widthArr.currencyName">
              </el-table-column>
              <el-table-column align="center" prop="invoiceTypeName" :width="widthArr.invoiceTypeName">
              </el-table-column>
              <el-table-column align="center" prop="statusName" :width="widthArr.statusName">
              </el-table-column>
              <el-table-column align="center" prop="entryDate" :width="widthArr.entryDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="creationDate" :width="widthArr.creationDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="left" label-align="center" width="150">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row, true)" >详情</el-button> -->
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
        <el-table-column
          type="index"
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <el-table-column align="center" label="供应商代码" fixed sortable prop="vendorCode" min-width="150">
        </el-table-column>
        <el-table-column align="center" label="发票单号" prop="invoiceNo" min-width="150">
        </el-table-column>
        <el-table-column align="center" label="对账单号" prop="statementNo" min-width="150">
        </el-table-column>
        <el-table-column align="center" label="销方名称" prop="sellerName" min-width="180">
        </el-table-column>
        <el-table-column align="center" label="购方名称" prop="buyerName" min-width="180">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="金额" prop="amount" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="税额" prop="taxAmount" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="税价合计" prop="total" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="发票类型" prop="invoiceTypeName" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="statusName" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="开票日期" prop="entryDate" min-width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="创建日期" prop="creationDate" min-width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" header-align="center" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
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
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-myinvoice': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Admin/auxiliarySelect/DialogMyinvoice')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      filedetails: {},
      widthArr: {
        vendorCode: '150',
        invoiceNo: '150',
        statementNo: '150',
        sellerName: '180',
        buyerName: '180',
        amount: '120',
        taxAmount: '120',
        total: '120',
        currencyName: '100',
        invoiceTypeName: '100',
        statusName: '100',
        entryDate: '100',
        creationDate: '100'
      }
    }
  },
  computed: {
    // comDatas: function () {
    //   const datas = this.getOpera(this.dataTable)
    //   return datas
    // }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/auxiliaryFunction/searchSupplierInvoiceDetail.do', { vendorCode: val.vendorCode, invoiceNo: val.invoiceNo, invoiceCode: val.invoiceCode, plantCode: val.plantCode }).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
          val.infoLoading = false
        }
      })
      // 附件信息展示
      this.axios.post('/auxiliaryFunction/searchSupplierInvoiceFile.do', { statementNo: val.statementNo, corpCode: val.corpCode }).then(res => {
        if (res) {
          this.filedetails = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fresh () {
      this.$emit('refresh')
    }
  }
}
// 错误提示函数
// function erroShow (err, loading) {
//   console.log(this)
//   this.$alert(`网络错误${err}`, '系统提示', {
//     confirmButtonText: '确定',
//     callback: action => {
//       // 关闭加载图标
//       loading.close()
//     }
//   })
// }
</script>
