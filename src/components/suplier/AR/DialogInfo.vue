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
          <span>转让单位:{{this.detailsP.custFromName}}</span>
        </li>
        <li>
          <span>状态:{{this.detailsP.arStatusTypeName}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>预计回款日期:{{this.detailsP.billPayDate}}</span>
        </li>
        <li>
          <span>转让日期:{{this.detailsP.transDate}}</span>
        </li>
        <li>
          <span>转让金额:{{this.detailsP.transAmt}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别:{{this.detailsP.currencyDesc}}</span>
        </li>
        <li>
          <el-tooltip :content="'交易流水:'+this.detailsP.transSerialNo" placement="bottom" effect="light">
            <span>交易流水:{{this.detailsP.transSerialNo}}</span>
          </el-tooltip>
        </li>
        <li>
          <span>预计回款日期:{{this.detailsP.billPayDate}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <el-tooltip :content="'对应发票号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
              <span>对应发票号:{{this.detailsP.bankAccount}}</span>
          </el-tooltip>
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
  width: 32%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 32px;
  border-left: 0.5px solid #931719;
  text-align: center;
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
