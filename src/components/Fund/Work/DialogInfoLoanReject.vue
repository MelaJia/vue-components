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
          <el-tooltip :content="'付款单位:'+this.detailsP.companyName" placement="bottom" effect="light">
            <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'贴现客户:'+this.detailsP.custFromName" placement="bottom" effect="light">
            <span>贴现客户: <em>{{this.detailsP.custFromName}}</em></span>
          </el-tooltip>
        </li>
      </ul>
      <ul>
        <li>
          <el-tooltip :content="'贴现客户收款银行名称:'+this.detailsP.bankName" placement="bottom" effect="light">
            <span>贴现客户收款银行名称: <em>{{this.detailsP.bankName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'贴现客户收款银行账号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
             <span>贴现客户收款银行账号: <em>{{this.detailsP.bankAccount}}</em></span>
          </el-tooltip>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
         <span>年利率: <em>{{this.detailsP.interestRate |addPercent}}</em></span>
        </li>
        <li>
         <span>逾期利率: <em>{{this.detailsP.overdueRate |addPercent}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>对应发票号:
          <div class="a-link-group inline-block">
            <label v-for="(item,index) in detailsP.invoiceCustomList" :class="{'first-child':index===0}" :key="item.invoiceNo">{{item.invoiceNo}}</label>
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
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import common from '@/mixins/common' //
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, common],
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
