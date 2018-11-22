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
            <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'转让单位:'+this.detailsP.custToName" placement="bottom" effect="light">
            <span>授让单位: <em>{{this.detailsP.custToName}}</em></span>
          </el-tooltip>
        </li>
      </ul>
      <ul>
        <li>
          <span>状态: <em>{{this.detailsP.arStatusTypeName}}</em></span>
        </li>
        <li>
          <span>票据到期日: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>转让日期: <em>{{this.detailsP.arGenerateDate | dateFormat}}</em></span>
        </li>
        <li>
          <span>金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
        </li>
        <li>
          <span>对应原始AR: <em>{{this.detailsP.parentChainId}}</em></span>
        </li>

      </ul>
      <ul>
        <li>
          <el-tooltip :content="'交易流水:'+this.detailsP.transSerialNo" placement="bottom" effect="light">
            <span>交易流水: <em>{{this.detailsP.transSerialNo}}</em></span>
          </el-tooltip>
        </li>
      </ul>
      <ul class="height-auto" v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9">
        <span>对应发票号:
          <div class="a-link-group inline-block">
            <label v-for="(item,index) in detailsP.invoiceListSelected" :class="{'first-child':index===0}"  :key="item.invoiceNo">{{item.invoiceNo}}(金额:{{item.invoiceAfterTaxAmt|regexNum}})</label>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
        <span>备注:
           <em>{{this.detailsP.remark}}</em>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button @click="print('print')">打印</el-button>
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
