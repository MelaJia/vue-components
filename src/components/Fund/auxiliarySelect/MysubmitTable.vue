<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-mysubmit :visible-p.sync="dialogInfoVisible" :details-p="details" :filelist="filedetails"></dialog-mysubmit>
    <section>
      <el-table ref="table" :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
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
              <el-table-column align="center" prop="billNo" :width="widthArr.billNo">
              </el-table-column>
              <el-table-column align="center" prop="invoiceNo" :width="widthArr.invoiceNo">
              </el-table-column>
              <el-table-column align="center" prop="corpCode" :width="widthArr.corpCode">
              </el-table-column>
              <el-table-column align="center" prop="corpName" :width="widthArr.corpName">
              </el-table-column>
              <el-table-column align="center" prop="dueDate" :width="widthArr.dueDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="currencyName" :width="widthArr.currencyName">
              </el-table-column>
              <el-table-column align="center" prop="oriAmt" :width="widthArr.oriAmt">
              </el-table-column>
              <el-table-column align="center" prop="oriPaidAmt" :width="widthArr.oriPaidAmt">
              </el-table-column>
              <el-table-column align="center" prop="oriUnPaidAmt" :width="widthArr.oriUnPaidAmt">
              </el-table-column>
              <el-table-column align="left" label-align="center" width="150">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row, true)" >详情</el-button> -->
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
          align="center"
          label="序号"
          fixed width="60">
        </el-table-column>
        <el-table-column align="center" label="供应商代码" fixed sortable prop="vendorCode" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billNo" width="150">
        </el-table-column>
        <el-table-column align="center" label="发票单号" prop="invoiceNo" width="150">
        </el-table-column>
        <el-table-column align="center" label="法人代码" prop="corpCode" width="180">
        </el-table-column>
        <el-table-column align="center" label="法人单位" prop="corpName" width="180">
        </el-table-column>
        <el-table-column align="center" label="结报申请付款日期" prop="dueDate" width="120" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" width="80">
        </el-table-column>
        <el-table-column align="center" label="应付金额" prop="oriAmt" width="120">
        </el-table-column>
        <el-table-column align="center" label="已付金额" prop="oriPaidAmt" width="120">
        </el-table-column>
        <el-table-column align="center" label="未付金额" prop="oriUnPaidAmt" width="100">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" header-align="center" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
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
    'dialog-mysubmit': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/auxiliarySelect/DialogMysubmit')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      filedetails: {},
      widthArr: {
        vendorCode: '150',
        billNo: '150',
        invList: '150',
        corpCode: '180',
        corpName: '180',
        dueDate: '120',
        currencyName: '80',
        oriAmt: '120',
        oriPaidAmt: '120',
        oriUnPaidAmt: '120'
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
      this.getLoanDetail('/auxiliaryFunction/searchSupplierJieBaoDetail.do', { billNo: val.billNo, plantCode: val.plantCode }).then(res => {
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      })
      // 附件信息展示
      this.axios.post('/auxiliaryFunction/searchSupplierJieBaoFile.do', { vendorCode: val.vendorCode, billNo: val.billNo, plantCode: val.plantCode }).then(res => {
        this.filedetails = res.data.data
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
