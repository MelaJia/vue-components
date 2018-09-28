<template>
  <div class="ar-table" ref="resizeContext">
    <!-- 详情 -->
    <dialog-creditreject :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-creditreject>
    <section>
      <el-table ref="table" :data="dataTable" v-loading.fullscreen="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border style="width: 100%" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" @mousedown.native="mouseDown"
        >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          fixed width="60">
        </el-table-column>
        <el-table-column align="center" label="融资客户" fixed prop="companyName">
        </el-table-column>
        <el-table-column align="center" label="融资编号" prop="loanId">
        </el-table-column>
        <el-table-column align="center" label="融资类型" prop="loanTypeName">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="贴现申请金额" prop="applyAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyName">
        </el-table-column>
        <el-table-column align="center" label="还款方式" prop="repaymentType">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="repayDate" :formatter="dateFormat">
        </el-table-column>
        <!-- <el-table-column align="center" label="操作" header-align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column> -->
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
    'dialog-creditreject': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/creditFinance/DialogCreditreject')
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
    handleInfo (idx, val) {
      val.infoLoading = true
      this.getLoanDetail('/creditLoan/queryCreditLoanInfo.do', { loanId: val.loanId }).then(res => {
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
