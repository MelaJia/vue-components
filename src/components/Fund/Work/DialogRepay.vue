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
          <el-tooltip :content="'贴现客户收款银行名称:'+this.detailsP.receiveBankName" placement="bottom" effect="light">
            <span>贴现客户收款银行名称: <em>{{this.detailsP.receiveBankName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'贴现客户收款银行账号:'+this.detailsP.receiveBankAccount" placement="bottom" effect="light">
            <span>贴现客户收款银行账号: <em>{{this.detailsP.receiveBankAccount}}</em></span>
          </el-tooltip>
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
          <li>
            <span>今日提前还清应还金额: <em>{{this.detailsP.settlePrepayAmt | regexNum}}</em></span>
          </li>
          <li>
             <el-checkbox v-model="confirmCheck" >确认提前还清</el-checkbox>
          </li>
        </ul>
      <ul>
         <span>客户还款金额: </span>
         <el-input size="mini" v-model.number="payAmt"></el-input>
         <el-button type="text" @click.prevent="handleFill" :disabled="this.confirmCheck === true ? true : false">代入应还金额</el-button>
         <el-button type="text" @click.prevent="getAdvanceFull" :disabled="this.confirmCheck === false ? true : false">代入提前还清应还金额</el-button>
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
            <a v-for="item in detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a>
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" :disabled="this.confirmCheck === true ? true : false" @click="handleSubmit">本期还款</el-button>
      <el-button type="danger" :disabled="this.confirmCheck === false ? true : false" @click="advanceRepay">提前还清</el-button>
      <el-button type="default" @click="handleClose">取消</el-button>
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
import { validatenumber } from '@/util/validate'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      payAmt: '',
      confirmCheck: false // 确认提前还清选择框
    }
  },
  watch: {
    confirmCheck: function () {
      this.payAmt = ''
    },
    visibleP: function () {
      this.init()
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '还款'
    }
  },
  methods: {
    // 带入还款金额
    handleFill: handleFill,
    // 代入提前还清应还金额
    getAdvanceFull: getAdvanceFull,
    handleSubmit: debounce(handleSubmit, 1000, true),
    // 提前还清
    advanceRepay: debounce(advanceSubmit, 1000, true),
    // 置空方法
    init: Init
  }
}
// 填入应还金额
function handleFill () {
  if (this.detailsP.repayAmt === '' || this.detailsP.repayAmt === undefined) {
    this.payAmt = ''
    return
  }
  this.payAmt = this.detailsP.repayAmt
}
// 填入提前还款金额
function getAdvanceFull () {
  console.log(this.detailsP.settlePrepayAmt)
  if (this.detailsP.settlePrepayAmt === '' || this.detailsP.settlePrepayAmt === undefined) {
    this.payAmt = ''
    return
  }
  this.payAmt = this.detailsP.settlePrepayAmt
}
// 提交
function handleSubmit () {
  if (!validatenumber(this.payAmt)) {
    this.$message.error('还款金额需为大于0的数字')
    return
  }
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
      // 初始化重置
      this.init()
      this.$parent.fresh()
      this.handleClose()
    }
  }).catch(err => {
    console.log(err)
  })
}
// 提前还清
function advanceSubmit () {
  if (!validatenumber(this.payAmt)) {
    this.$message.error('还款金额需为大于0的数字')
    return
  }
  if (this.payAmt < this.detailsP.settlePrepayAmt) {
    this.$message.error('客户还款金额不得小于提前还清应还金额')
    return
  }
  // 1.设置发送数据
  let param = {
    custId: this.detailsP.custFromId, // 客户Id
    factoringCustId: this.detailsP.custToId, // 保理商Id
    masterChainId: this.detailsP.masterChainId, // AR单号
    actualRepayAmt: this.payAmt, // 客户还款金额
    isConfirmSettled: 1 // 期数
  }
  // 2.发送数据 转移this指向
  postDataBase.call(this, '/loanQuery/prepaySettleLoan.do', param, true).then(res => {
    // 操作成功关闭弹窗刷新数据
    if (res.data.status) {
      // 初始化重置
      this.init()
      this.$parent.fresh()
      this.handleClose()
    }
  }).catch(err => {
    console.log(err)
  })
}
// 初始化
function Init () {
  this.payAmt = ''
  this.confirmCheck = false
}
</script>
