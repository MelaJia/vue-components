<template>
  <div class="ar-table" ref="resizeContext">
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table ref="table" :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown"
        >
        <el-table-column type="index" label="序号" fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="AR单号" fixed prop="masterChainId" width="150" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="100" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="来源" prop="arSourceDesc" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="付款单位" prop="companyName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" header-align="center" label="状态" prop="arStatusTypeName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName" :formatter="nullDealWith">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="票面金额" prop="billBookAmt" :formatter="regexNum" width="120">
        </el-table-column>
        <el-table-column align="center" label="票据到期日" prop="billPayDate" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" header-align="center" width="140">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button v-if="scope.row.checkedStatus === 1" size="mini" type="text" @click="fundApply(scope.$index, scope.row)">保理方申请</el-button>
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
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/arApi/fundApply/DialogInfo')
  },
  data () {
    return {
      dialogInfoVisible: false,
      details: {} // 详情数据
    }
  },
  computed: {
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 详情
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/multiArManager/arInfoDetail.do', { masterChainId: val.masterChainId }).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
          val.infoLoading = false
        }
      })
    },
    // 保理方申请
    fundApply (idx, val) {
      this.$confirm(`单号为${val.masterChainId}确认进行保理商分拨申请?`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.postResultFresh('/applyFactoringManager/arApplyFactoring.do', {masterChainId: val.masterChainId}) // 调用common混合中公共方法
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    fresh () {
      this.$emit('refresh')
    }
  }
}
</script>
