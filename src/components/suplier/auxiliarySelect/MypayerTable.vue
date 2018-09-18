<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-mypayer :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-mypayer>
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
              <el-table-column align="center" prop="payNo" :width="widthArr.payNo">
              </el-table-column>
              <el-table-column align="center" prop="payBacth" :width="widthArr.payBacth">
              </el-table-column>
              <el-table-column align="center" prop="billNo" :width="widthArr.billNo">
              </el-table-column>
              <el-table-column align="center" prop="corpCode" :width="widthArr.corpCode">
              </el-table-column>
              <el-table-column align="center" prop="corpName" :width="widthArr.corpName">
              </el-table-column>
              <el-table-column align="right" prop="rcvAmtOrigin" :width="widthArr.rcvAmtOrigin" :formatter="regexNum">
              </el-table-column>
              <el-table-column align="center" prop="currencyName" :width="widthArr.currencyName">
              </el-table-column>
              <el-table-column align="center" prop="payDate" :width="widthArr.payDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" prop="billDate" :width="widthArr.billDate" :formatter="dateFormat">
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
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <el-table-column align="center" label="付款编号" fixed sortable prop="payNo" min-width="150">
        </el-table-column>
        <el-table-column align="center" label="付款批次" prop="payBacth" min-width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billNo" min-width="180">
        </el-table-column>
        <el-table-column align="center" label="法人代码" prop="corpCode" min-width="180">
        </el-table-column>
        <el-table-column align="center" label="法人单位" prop="corpName" min-width="200">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="实际付款金额" prop="rcvAmtOrigin" min-width="120" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="付款日期" prop="payDate" min-width="100" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="结报日期" prop="billDate" min-width="100" :formatter="dateFormat">
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
import Common from '@/mixins/common'
// import { debounce } from '@/util/util' // 首字母大写 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
/* 我的Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [TableMixIn, Common],
  components: {
    'dialog-mypayer': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/auxiliarySelect/DialogMypayer')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      widthArr: {
        payNo: '150',
        payBacth: '150',
        billNo: '180',
        corpCode: '180',
        corpName: '200',
        rcvAmtOrigin: '120',
        currencyName: '100',
        payDate: '100',
        billDate: '100'
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
      this.getLoanDetail('/auxiliaryFunction/searchSupplierPaymentDetail.do', { payNo: val.payNo, payBacth: val.payBacth, plantCode: val.plantCode }).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
          val.infoLoading = false
        }
      })
    },
    fresh () {
      this.$emit('refresh')
    }
  }
}

</script>
