<template>
<section id="print">
  <el-dialog :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <el-tooltip :content="'付款单位:'+this.detailsP.companyName" placement="bottom" effect="light">
            <span>付款单位:{{this.detailsP.companyName}}</span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'转让单位:'+this.detailsP.custFromName" placement="bottom" effect="light">
            <span>转让单位:{{this.detailsP.custFromName}}</span>
          </el-tooltip>
        </li>
      </ul>
      <ul>
        <li>
          <span>状态:{{this.detailsP.arStatusTypeName}}</span>
        </li>
        <li>
          <span>预计回款日期:{{this.detailsP.billPayDate | dateFormat}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>转让日期:{{this.detailsP.arGenerateDate | dateFormat}}</span>
        </li>
        <li>
          <span>金额:{{this.detailsP.billBookAmt}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别:{{this.detailsP.currencyDesc}}</span>
        </li>
        <li>
          <span>转让对应AR:{{this.detailsP.parentChainId}}</span>
        </li>

      </ul>
      <ul>
        <li>
          <el-tooltip :content="'交易流水:'+this.detailsP.transSerialNo" placement="bottom" effect="light">
            <span>交易流水:{{this.detailsP.transSerialNo}}</span>
          </el-tooltip>
        </li>
      </ul>
      <ul v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9">
        <span>对应发票号:
          <div class="a-link-group inline-block">
            <label v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo">{{item.invoiceNo}}</label>
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
import Common from '@/mixins/common'
/* 取消转让详情 */
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
