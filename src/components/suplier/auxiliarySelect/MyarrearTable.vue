<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-myarrear :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-myarrear>
    <section>
      <el-table ref="table" :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle"
        >
        <el-table-column
          type="index"
          label="序号"
          fixed width="60" align="center">
        </el-table-column>
        <el-table-column align="center" label="结账日期" fixed sortable prop="agingDate" width="150" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" label="供应商代码" prop="vendorCode" width="150">
        </el-table-column>
        <el-table-column align="center" label="供应商名称" prop="vendorName" width="180">
        </el-table-column>
        <el-table-column align="center" label="客户代码" prop="customerNo" width="180">
        </el-table-column>
        <el-table-column align="center" label="管报代码" prop="corpCode" width="120">
        </el-table-column>
        <el-table-column align="center" label="客户集团代码" prop="customerGroupNo" width="120">
        </el-table-column>
        <el-table-column align="center" label="事业群代码" prop="bgCode" width="120">
        </el-table-column>
        <el-table-column align="center" label="事业处代码" prop="buCode" width="120">
        </el-table-column>
        <el-table-column align="center" label="生产单位代码" prop="bmCode" width="120">
        </el-table-column>
        <el-table-column align="center" label="关系单位" prop="isRelativePartyName" width="100">
        </el-table-column>
        <el-table-column align="center" label="逾期欠款金额" prop="totalDueARAmount" width="120">
        </el-table-column>
        <el-table-column align="center" label="未到期欠款金额" prop="totalUndueARAmount" width="120">
        </el-table-column>
        <el-table-column align="center" label="欠款总金额" prop="totalARAmount" width="100">
        </el-table-column>
        <el-table-column align="center" label="报表日的预付款余额" prop="advanceReceiptsAmount" width="150">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" width="100">
        </el-table-column>
        <el-table-column align="center" label="创建日期" prop="createTime" width="100" :formatter="dateFormat">
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
    'dialog-myarrear': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/auxiliarySelect/DialogMyarrear')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {} // 详情数据
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
    // handleInfo (idx, val) {
    //   val.infoLoading = true
    //   this.getLoanDetail('/auxiliaryFunction/searchSupplierJieBaoDetail.do', { billNo: val.billNo, plantCode: val.plantCode }).then(res => {
    //     this.details = res
    //     this.dialogInfoVisible = true
    //     val.infoLoading = false
    //   })
    // },
    // 详情
    handleInfo (idx, val) {
      this.details = val
      this.dialogInfoVisible = true
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
