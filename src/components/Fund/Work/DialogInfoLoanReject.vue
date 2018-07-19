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
      <ul class="height-auto">
        <span>对应发票号:
          <div class="a-link-group inline-block">
            <label v-for="item in detailsP.invoiceCustomList" :key="item.invoiceNo">{{item.invoiceNo}}</label>
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button type="primary" @click="print('print')">打印</el-button>
    </footer>
  </el-dialog>
</section>
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
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {

  }
}

</script>
