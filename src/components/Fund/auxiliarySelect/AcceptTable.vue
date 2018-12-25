<template>
  <div class="ar-table" ref="resizeContext">
    <!-- 详情 -->
    <dialog-accept :visible-p.sync="dialogInfoVisible" :details-p="details" :filelist="filedetails"></dialog-accept>
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
              <el-table-column align="center" prop="corpCode" :width="widthArr.corpCode">
              </el-table-column>
              <el-table-column align="center" prop="corpName" :width="widthArr.corpName">
              </el-table-column>
              <el-table-column align="center" prop="grnNumber" :width="widthArr.grnNumber">
              </el-table-column>
              <el-table-column align="center" prop="grnItem" :width="widthArr.grnItem">
              </el-table-column>
              <el-table-column align="center" prop="poNumber" :width="widthArr.poNumber">
              </el-table-column>
              <el-table-column align="center" prop="dataName" :width="widthArr.dataType">
              </el-table-column>
              <el-table-column align="right" prop="amount" :width="widthArr.amount" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="currencyName" :width="widthArr.currencyName">
              </el-table-column>
              <el-table-column align="center" prop="deliveryDate" :width="widthArr.deliveryDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="confirmDate" :width="widthArr.confirmDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="left" label-align="center" width="60">
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
          align="center"
          label="序号"
          fixed width="60">
        </el-table-column>
        <el-table-column align="center" label="供应商代码" fixed sortable prop="vendorCode" width="120">
        </el-table-column>
        <el-table-column align="center" label="法人代码" prop="corpCode" width="">
        </el-table-column>
        <el-table-column align="center" label="法人单位" prop="corpName" width="150">
        </el-table-column>
        <el-table-column align="center" label="进货验收单号" prop="grnNumber" width="120">
        </el-table-column>
        <el-table-column align="center" label="项次" prop="grnItem" width="80">
        </el-table-column>
        <el-table-column align="center" label="订单号" prop="poNumber" width="120">
        </el-table-column>
        <el-table-column align="center" label="类型" prop="dataType" width="80">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="金额" prop="amount" width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" width="80">
        </el-table-column>
        <el-table-column align="center" label="约定交货日期" prop="deliveryDate" width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="进货验收单日期" prop="confirmDate" width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" header-align="center" width="60">
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
import Common from '@/mixins/common/common'
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-accept': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/auxiliarySelect/DialogAccept')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      filedetails: {}, // 附件数据
      widthArr: {
        vendorCode: '120',
        corpCode: '',
        corpName: '150',
        grnNumber: '120',
        grnItem: '80',
        poNumber: '120',
        dataType: '80',
        amount: '120',
        currencyName: '80',
        deliveryDate: '100',
        confirmDate: '100',
        operate: '200'
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
      this.getLoanDetail('/auxiliaryFunction/searchSupplierGRNDetail.do', { vendorCode: val.vendorCode, grnNumber: val.grnNumber, grnItem: val.grnItem, plantCode: val.plantCode }).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
          val.infoLoading = false
        }
      })
      // 附件信息展示
      this.axios.post('/auxiliaryFunction/searchSupplierGRNFile.do', { vendorCode: val.vendorCode, grnNumber: val.grnNumber, plantCode: val.plantCode }).then(res => {
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
</script>
