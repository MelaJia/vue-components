<template>
<section id="print">
  <!-- 预还款详情 -->
  <dialog-info :visible-p.sync="dialogRepayInfoVisible" :details-p="details" ></dialog-info>
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title" class="headerTitle">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="section">
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
    </section>
    <section class="section">
      <ul>
        <li>
          <span>利率: <em>{{this.detailsP.interestRate | addPercent}}</em></span>
        </li>
        <li>
          <span>手续费率: <em>{{this.detailsP.serviceFeeRate | addPercent}}</em></span>
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
          <span>宽容天数: <em>{{this.detailsP.fineGraceDays}}</em>天</span>
        </li>
        <li>
          <span>还款方式: <em>{{this.detailsP.repaymentType}}</em></span>
        </li>
      </ul>
    </section>
    <section class="section">
      <ul class="height-auto" style="display:flex;">
          <span style="width:80px;">合同:</span>
          <div class="a-link-group inline-block" style="background:#ECECEC;flex:1;height:80px;max-height:80px;overflow-y:auto;">
            <a v-for="item in this.detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a>
          </div>
      </ul>
      <ul class="height-auto" style="display:flex;">
        <span style="width:80px;"> 附件:</span>
        <div class="a-link-group inline-block" style="background:#ECECEC;flex:1;height:80px;max-height:80px;overflow-y:auto;">
           <a v-for="(item, index) in this.detailsP.loanUploadFileList" :key="index" :href="item.fileUrl" target="_blank" @click="constractHandle(item.fileUrl)">{{item.fileName}}</a>
          </div>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose" class="searchBtn" size="small">确认</el-button>
      <el-button @click="handleShowRepay" type="primary" size="small" plain>预还款计划</el-button>
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
ul:last-child{
  height: auto;
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common/common'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  computed: {
    getTitle () {
      return '融资编号' + this.detailsP.loanId
    }
  },
  data () {
    return {
      dialogRepayInfoVisible: false
    }
  },
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogRepayInfo')
  },
  methods: {
    handleShowRepay: handleShowRepay
  }
}
function handleShowRepay () {
  this.getLoanDetail('/loan/loanTrialRepaymentScheduleInfo.do', { loanId: this.detailsP.masterChainId }).then(res => {
    if (res) {
      this.details = res
      this.dialogRepayInfoVisible = true
    }
  })
}
</script>
