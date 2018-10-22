<template>
  <el-dialog :custom-class="'dia-class style-dia-repay'" :visible.sync="visibleP" :before-close="handleClose" center="">
    <section>
      <article>
        <header class="repay-header">还款计划表</header>
        <div class="repay-content">
          <table>
            <tr>
              <td class="td-left">客户名称</td>
              <td class="pad-left-10" colspan="5">{{detailsP.companyName}}</td>
            </tr>
            <tr>
              <td class="td-left">期数</td>
              <td class="td-right">{{detailsP.periodId}}</td>
              <td class="td-left">年利率</td>
              <td class="td-right">{{detailsP.interestRate |addPercent}}</td>
              <td class="td-left">贷款金额</td>
              <td class="td-right">{{detailsP.loanAmt | regexNum}}</td>
            </tr>
            <tr>
              <td class="td-left">月还本金</td>
              <td class="td-right">{{detailsP.periodPrincipal | regexNum}}</td>
              <td class="td-left">月还利息</td>
              <td class="td-right">{{detailsP.periodInterest | regexNum}}</td>
              <td class="td-right"></td>
              <td class="td-right"></td>
            </tr>
          </table>
        </div>
      </article>
      <article>
        <header class="repay-header">每月还款明细</header>
        <div class="repay-detail-conten">
          <el-table
            :data="detailsP.repaymentScheduleList"
            border
            :summary-method="getSummaries"
            show-summary
            style="width: 100%">
            <el-table-column
              prop="periodId"
              label="期数"
              width="60">
            </el-table-column>
            <el-table-column
              prop="periodPayDate"
              label="应还日期"
              :formatter="dateFormat"
              width="120">
            </el-table-column>
            <el-table-column
              align="right"
              header-align="center"
              prop="periodPayAmt" :formatter="regexNum"
              label="期供（元）">
            </el-table-column>
            <el-table-column
              align="right"
              header-align="center"
              prop="principal"
              :formatter="regexNum"
              label="本金（元）">
            </el-table-column>
            <el-table-column
              align="right"
              header-align="center"
              prop="remainingPrincipal"
              :formatter="regexNum"
              label="剩余本金（元）">
            </el-table-column>
            <el-table-column
              align="right"
              header-align="center"
              prop="interest"
              :formatter="regexNum"
              label="利息（元）">
            </el-table-column>
            <el-table-column
              align="right"
              header-align="center"
              prop="serviceFee"
              :formatter="regexNum"
              label="服务费（元）">
            </el-table-column>
          </el-table>
        </div>
      </article>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </footer>
  </el-dialog>
</template>
<style>
.style-dia-repay {
  width: 850px;
}
.repay-header {
  font-size: 20px;
  color: #000;
  font-weight: 500;
}
.repay-content .pad-left-10 {
  padding-left: 10px;
}
.repay-content table {
  border-collapse: collapse
}
.repay-content td {
  border: solid 1px;
  height: 32px;
  line-height: 32px;
}
.repay-content .td-left {
  text-align: right;
  width: 133px;
  background-color: #cccccc;
  color: #333333;
}
.repay-content .td-right {
  width: 133px;
  text-align: center;
}
.repay-detail-conten .el-table thead th,.repay-detail-conten .el-table thead tr {
    background: #ccc;
    color: #333;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { thousandth } from '@/util/util' // 发送数据函数
import Common from '@/mixins/common'
/* 我的Ar详情 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {
    getSummaries: getSummaries
  }
}
function getSummaries (param) {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (index === 1 || index === 4) {
      sums[index] = ''
      return
    }
    const values = data.map(item => Number(item[column.property]))
    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = thousandth(sums[index])
    } else {
      sums[index] = ''
    }
  })
  return sums
}
</script>
