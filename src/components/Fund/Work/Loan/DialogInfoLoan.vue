<template>
<section id="print">
  <!-- 预还款详情 -->
  <dialog-info :visible-p.sync="dialogRepayInfoVisible" :details-p="details" ></dialog-info>
  <!-- 发票详情 -->
  <dialog-list :visible-p.sync="dialogListVisible" :details-p="detailsList" ></dialog-list>
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
      <!-- <ul>
        <li>
          <span>付款银行名称: <em>{{this.detailsP.payerBankName}}</em></span>
        </li>
        <li>
          <span>付款银款账号: <em>{{this.detailsP.payerBankAccount}}</em></span>
        </li>
      </ul> -->
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
      <ul>
        <li>
          <span>实际放款金额: <em>{{this.detailsP.actualDiscountAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>对应发票号:
          <div class="a-link-group inline-block">
            <!-- <label v-for="(item,index) in detailsP.invoiceCustomList" :class="{'first-child':index===0}" :key="item.invoiceNo">{{item.invoiceNo}}(金额:{{item.afterTaxAmt|regexNum}})</label> -->
            <a href="javascript:;" v-for="(item,index) in detailsP.invoiceCustomList" :class="{'first-child':index===0}" :key="item.invoiceNo" @click.prevent="checkInvoice(index)">{{item.invoiceNo}}(金额:{{item.afterTaxAmt|regexNum}})</a>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank"  @click="constractHandle(item.contractUrl)">{{item.contractName}}</a>
            <!-- <a v-for="item in detailsP.contractList" :key="item.contractId" href="" @click.prevent="constractHandle(item.contractNo)">{{item.contractName}}</a> -->
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button @click="print('print')">打印</el-button>
      <el-button @click="handleShowRepay">预还款计划</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // constractHandle、handleClose、print
import common from '@/mixins/common' //
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, common],
  data () {
    return {
      dialogRepayInfoVisible: false,
      details: {},
      dialogListVisible: false,
      detailsList: {}
    }
  },
  computed: {
    getTitle () {
      console.log(this.detailsP.masterChainId)
      return this.detailsP.masterChainId + '详情'
    }
  },
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogRepayInfo'),
    'dialog-list': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/Loan/DialogList')
  },
  methods: {
    handleShowRepay: handleShowRepay,
    checkInvoice (index) {
      this.axios.post('/loan2/queryInvoicePic.do', {
        billId: this.detailsP.invoiceCustomList[index].billId,
        invoiceNo: this.detailsP.invoiceCustomList[index].invoiceNo,
        hostCode: this.detailsP.invoiceCustomList[index].hostCode
      }).then(res => {
        if (res.data.status) {
          this.detailsList = res.data.data
          this.dialogListVisible = true
          // window.open(fileUrl)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
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
