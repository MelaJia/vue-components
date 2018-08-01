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
      <!-- <ul>
        <li>
          <span>付款银行名称: <em>{{this.detailsP.repayBankName}}</em></span>
        </li>
        <li>
          <span>付款银款账号: <em>{{this.detailsP.repayBankAccount}}</em></span>
        </li>
      </ul> -->
      <ul>
        <li>
          <span>贴现客户收款银行名称: <em>{{this.detailsP.receiveBankName}}</em></span>
        </li>
        <li>
          <span>贴现客户收款银行账号: <em>{{this.detailsP.receiveBankAccount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>应还款金额: <em>{{this.detailsP.repayAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.repayCurrencyName}}</em></span>
        </li>
      </ul>
      <ul>
         <span>客户还款金额: </span>
         <el-input size="mini" v-model.number="payAmt"></el-input>
         <a href="" @click.prevent="handleFill">代入应还金额</a>
      </ul>
      <ul class="height-auto">
        <span >对应发票号:
          <div class="a-link-group inline-block">
            <label v-for="item in detailsP.invoiceCustomList" :key="item.invoiceNo">{{item.invoiceNo}}</label>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractNo)">{{item.contractName}}</a>
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit">确认</el-button>
      <el-button type="primary" @click="print('print')">打印</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.el-input {
  width: 150px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce, postDataBase } from '@/util/util' // 防抖函数 发送函数
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      payAmt: 0
    }
  },
  watch: {
    getTitle: function () {
      // 置空
      this.payAmt = 0
    }
  },
  computed: {
    getTitle () {
      console.log(this.detailsP.masterChainId)
      return this.detailsP.masterChainId + '还款'
    }
  },
  methods: {
    handleFill: handleFill,
    handleSubmit: debounce(handleSubmit, 1000, true)
  }
}
// 填入应还金额
function handleFill () {
  this.payAmt = this.detailsP.repayAmt
}
// 提交
function handleSubmit () {
  // 1.设置发送数据
  let param = {
    custId: this.detailsP.custFromId, // 客户Id
    factoringCustId: this.detailsP.custToId, // 保理商Id
    masterChainId: this.detailsP.masterChainId, // AR单号
    actualRepayAmt: this.payAmt, // 客户还款金额
    periodNo: this.detailsP.periodNo // 期数
  }
  // 2.发送数据 转移this指向
  postDataBase.call(this, '/loanQuery/repayLoan.do', param, true).then(res => {
    // 操作成功关闭弹窗刷新数据
    if (res.data.status) {
      this.$parent.fresh()
      this.handleClose()
    }
  })
}
</script>
