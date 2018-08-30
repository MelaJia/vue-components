<template>
<section id="print">
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>申请金额: <em>{{this.detailsP.applyAmt | regexNum}}</em></span>
        </li>
        <li>
         <span>实放金额: <em>{{this.detailsP.loanAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>还款日期: <em>{{this.detailsP.repayDate | dateFormat}}</em></span>
        </li>
         <li>
          <span>币别: <em>{{this.detailsP.currencyName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>年利率: <em>{{this.detailsP.interestRate | addPercent}}</em></span>
        </li>
        <li>
          <span>提前还款手续费率: <em>{{this.detailsP.serviceFeeRate | addPercent}}</em></span>
        </li>
      </ul>
      <ul>
         <li>
          <span>罚息利率: <em>{{this.detailsP.overdueRate | addPercent}}</em></span>
        </li>
        <li>
          <span>提前还款手续费: <em>{{this.detailsP.prepaymentDeductInterest | addPercent}}</em></span>
        </li>
      </ul>
      <ul>
         <li>
          <span>宽容天数: <em>{{this.detailsP.fineGraceDays}}天</em></span>
        </li>
        <li>
          <span>还款方式: <em>{{this.detailsP.repaymentType}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <el-table
          :data="detailsP.poLoanInfoList"
          height="150"
          border
          style="width: 100%">
          <el-table-column
            prop="corpCode"
            label="法人代碼"
            width="200">
          </el-table-column>
          <el-table-column
            prop="corpName"
            label="法人单位"
            width="250">
          </el-table-column>
          <el-table-column
            label="订单号">
            <template slot-scope="scope">
              <span class="po-number-style" v-for="(item,idx) in scope.row.poLoanDetailInfoList" :key="idx" style="margin-left: 10px">{{ item.poNumber }}</span>
            </template>
          </el-table-column>
        </el-table>
      </ul>
      <ul class="height-auto">
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a>
            <!-- <a v-for="item in detailsP.contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractId)">{{item.contractName}}</a> -->
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
span>lable.strong{
  color: #303133;
}
span.po-number-style:not(:last-child)::after{
  content: ","
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
// 导入时间格式化过滤器
import Common from '@/mixins/common'
/* 待收Ar详情 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      radio2: 3
    }
  },
  computed: {
    getTitle () {
      return '融资编号' + this.detailsP.loanId
    }
  },
  methods: {
  }
}

</script>
