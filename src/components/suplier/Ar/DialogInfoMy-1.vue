<template>

  <el-dialog :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>付款单位:{{this.detailsP.companyName}}</span>
        </li>
        <li>
          <span>对手单位:{{this.detailsP.custToName}}</span>
        </li>
        <li>
          <span>AR来源:{{this.detailsP.arSourceDesc}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>状态:{{this.detailsP.arStatusTypeName}}</span>
        </li>
        <li>
          <span>币别:{{this.detailsP.currencyDesc}}</span>
        </li>
        <li>
          <span>预计回款日期:{{this.detailsP.billPayDate | dateFormat}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>票面金额:{{this.detailsP.billBookAmt}}</span>
        </li>
        <li>
          <span>可用金额:{{this.detailsP.arAvailableAmt}}</span>
        </li>
      </ul>
      <ul>
          <span>已勾选发票:
            <div class="el-check-group inline-block">
            <el-checkbox v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}</el-checkbox>
            </div>
          </span>
      </ul>
      <ul>
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractId)">{{item.contractName}}</a>
          </div>
        </span>
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
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button type="primary" @click="print(`.${detailsP.masterChainId}`)">打印</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
/* 我的Ar详情 */
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
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {
  }
}

</script>
