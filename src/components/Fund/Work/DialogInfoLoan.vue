<template>
<section id="print">
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
        </li>
        <li>
          <span>贴现客户: <em>{{this.detailsP.custFromName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>付款银行名称: <em>{{this.detailsP.payerBankName}}</em></span>
        </li>
        <li>
          <span>付款银款账号: <em>{{this.detailsP.payerBankAccount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现客户收款银行: <em>{{this.detailsP.bankName}}</em></span>
        </li>
        <li>
          <span>贴现客户收款银行: <em>{{this.detailsP.bankAccount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现金额: <em>{{this.detailsP.billBookAmt}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
         <span>贴现利率: <em>{{this.detailsP.interestRate}}</em></span>
        </li>
        <li>
         <span>逾期利率: <em>{{this.detailsP.overdueRate}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>实际放款金额: <em>{{this.detailsP.actualDiscountAmt}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>对应发票号:
          <div class="a-link-group inline-block">
            <label v-for="item in detailsP.invoiceCustomList" :key="item.invoiceNo">{{item.invoiceNo}}</label>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank">{{item.contractName}}</a>
            <!-- <a v-for="item in detailsP.contractList" :key="item.contractId" href="" @click.prevent="constractHandle(item.contractNo)">{{item.contractName}}</a> -->
          </div>
        </span>
      </ul>
      <!-- <p>
            <span>最终付款单位: <em>{{this.detailsP.company}}</em></span>
            <span>最终付款账户：{{this.detailsP.bankCompaney}}</em></span>
            <el-tooltip :content="'最终付款账号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
                <span>最终付款账号: <em>{{this.detailsP.bankAccount}}</em></span>
            </el-tooltip>
        </p>
        <p>
            <span>AR来源: <em>{{this.detailsP.come}}</em></span>
            <span>状态: <em>{{this.detailsP.status}}</em></span>
            <span>币别: <em>{{this.detailsP.moneyType}}</em></span>
        </p>
        <p>
            <span>票面金额: <em>{{this.detailsP.company}}</em></span>
            <span>可用余额: <em>{{this.detailsP.money_can}}</em></span>
            <span>预计回款日期: <em>{{this.detailsP.arriveDate}}</em></span>
        </p> -->
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button type="primary" @click="print('print')">打印</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  data () {
    return {
      radio2: 3
    }
  },
  computed: {
    getTitle () {
      console.log(this.detailsP.masterChainId)
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {

  }
}

</script>
