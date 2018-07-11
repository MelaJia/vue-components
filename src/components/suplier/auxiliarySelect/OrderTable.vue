<template>
  <div class="order-table">
    <!-- 详情 -->
    <dialog-order :visible-p.sync="dialogInfoVisible" :details-p="details" :filelist="filedetails"></dialog-order>
    <section>
      <el-table ref="table" :data="dataTable" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([6,7])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName"
        >
        <el-table-column
          type="index"
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <!-- <el-table-column align="center" label="供应商代码" fixed sortable prop="vendorCode" width="120">
        </el-table-column> -->
        <el-table-column align="center" fixed label="法人代码" prop="corpCode">
        </el-table-column>
        <el-table-column align="center" label="法人单位" prop="corpName">
        </el-table-column>
        <el-table-column align="center" label="订单号" prop="poNumber">
        </el-table-column>
        <el-table-column align="center" label="项次" prop="poItem">
        </el-table-column>
        <el-table-column align="center" label="金额" prop="poAmount">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currency">
        </el-table-column>
        <el-table-column align="center" label="订单确认日期" prop="confirmDate" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="约定交货日期" prop="deliveryDate" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

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
    'dialog-order': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/auxiliarySelect/DialogOrder')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      filedetails: {}
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
      this.getLoanDetail('/auxiliaryFunction/searchSupplierOrderDetail.do', { vendorCode: val.vendorCode, poNumber: val.poNumber, poItem: val.poItem, plantCode: val.plantCode }).then(res => {
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      })
      // 附件信息展示
      this.axios.post('/auxiliaryFunction/searchPOFile.do', { vendorCode: val.vendorCode, poNumber: val.poNumber, plantCode: val.plantCode }).then(res => {
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
