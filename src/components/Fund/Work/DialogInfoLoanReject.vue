<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>付款单位:{{this.detailsP.companyName}}</span>
        </li>
        <li>
          <span>贴现客户:{{this.detailsP.custFromName}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>付款银行名称:{{this.detailsP.payerBankName}}</span>
        </li>
        <li>
          <span>付款银款账号:{{this.detailsP.payerBankAccount}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现客户收款银行:{{this.detailsP.bankName}}</span>
        </li>
        <li>
          <span>贴现客户收款银行:{{this.detailsP.bankAccount}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现金额:{{this.detailsP.billBookAmt}}</span>
        </li>
        <li>
          <span>币别:{{this.detailsP.currencyDesc}}</span>
        </li>
      </ul>
      <ul>
        <li>
         <span>贴现利率:{{this.detailsP.interestRate}}</span>
        </li>
        <li>
         <span>逾期利率:{{this.detailsP.overdueRate}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>对应发票号:<label v-for="(item,index) in detailsP.invoiceCustom" :key="index">{{item.invoiceAfterTaxAmt}}</label></span>
        </li>
      </ul>
      <!-- <p>
            <span>最终付款单位:{{this.detailsP.company}}</span>
            <span>最终付款账户：{{this.detailsP.bankCompaney}}</span>
            <el-tooltip :content="'最终付款账号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
                <span>最终付款账号:{{this.detailsP.bankAccount}}</span>
            </el-tooltip>
        </p>
        <p>
            <span>AR来源:{{this.detailsP.come}}</span>
            <span>状态:{{this.detailsP.status}}</span>
            <span>币别:{{this.detailsP.moneyType}}</span>
        </p>
        <p>
            <span>票面金额:{{this.detailsP.company}}</span>
            <span>可用余额:{{this.detailsP.money_can}}</span>
            <span>预计回款日期:{{this.detailsP.arriveDate}}</span>
        </p> -->
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
#title {
  color: #931719;
  line-height: 24px;
  font-size: 18px;
}

section {
  padding: 0px 20px;
}

ul {
  position: relative;
  border-top: 0.5px solid #931719;
  margin: 0;
  border-right: 0.5px solid #931719;
  padding: 0;
  height: 32px;
}

ul:last-of-type {
  border-bottom: 0.5px solid #931719;
}

li {
  list-style: none;
  width: 48%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 32px;
  border-left: 0.5px solid #931719;
  text-align: left;
  padding-left: 5px;
}
</style>

<script>
import DialogClose from '@/mixins/Ar/DialogClose'

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
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {

  }
}

</script>
