<template>
<section id="print">
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title" class="headerTitle">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="section">
      <ul>
        <li>
          <el-tooltip :content="'付款单位:'+this.detailsP.companyName" placement="bottom" effect="light">
            <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <span>AR来源: <em>{{this.detailsP.arSourceDesc}}</em></span>
        </li>
      </ul>
      <ul>
          <span>对手单位: <em>{{this.detailsP.historyCustToName}}</em></span>
      </ul>
      <ul>
        <li>
          <span>状态: <em>{{this.detailsP.arStatusTypeName}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
        </li>
      </ul>
      <ul>
         <li>
          <span>票据到期日: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
        </li>
        <li>
          <span>还款日期: <em>{{this.detailsP.actualRepayDate | dateFormat}}</em></span>
        </li>
      </ul>
    </section>
    <section class="section">
      <ul>
        <li>
          <span>可用金额: <em>{{this.detailsP.arAvailableAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>入账金额: <em>{{this.detailsP.admissionAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>还款本金: <em>{{this.detailsP.payPrincipalAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>还款利息: <em>{{this.detailsP.payInterestAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>服务费: <em>{{this.detailsP.payServiceAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>还款罚息: <em>{{this.detailsP.payFineAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>提前还款手续费: <em>{{this.detailsP.prepayServiceAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>罚息天数: <em>{{this.detailsP.payFineDays}}</em></span>
        </li>
      </ul>
    </section>
    <section class="section">
      <ul class="height-auto" v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9" style="display:flex;">
        <span style="width:80px;">发票列表:</span>
        <div class="a-link-group inline-block" style="background:#ECECEC;flex:1;height:80px;max-height:80px;overflow-y:auto;">
            <label v-for="(item,index) in detailsP.invoiceCustomList" :class="{'first-child':index===0}" :key="item.invoiceNo">{{item.invoiceNo}}</label>
          </div>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" class="searchBtn" size="small" @click="handleClose">确认</el-button>
        <el-button type="primary" size="small" plain @click="print('print')">打印</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
@import "@/assets/css/_newUI.scss";
section{
  > ul,>ul:last-of-type{
    border: none;
  }
  > ul > li:not(:first-of-type) {
    border-left: none;
  }
  li{
    width: 68%;
  }
  li+li{
    width: 30%;
  }
}
span>lable.strong{
  color: #303133;
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
      return '详情'
    }
  },
  methods: {
  }
}

</script>
