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
      <ul>
        <li>
          <span>付款银行名称: <em>{{this.detailsP.payerBankName}}</em></span>
        </li>
        <li>
          <span>付款银款账号: <em>{{this.detailsP.payerBankAccount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现客户收款银行: <em>{{this.detailsP.bankName}}</em></span>
        </li>
        <li>
          <span>贴现客户收款银行: <em>{{this.detailsP.bankAccount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>应还款金额: <em>{{this.detailsP.needPayAmt}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
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
      <!-- <p>
            <span>最终付款单位: <em>{{this.detailsP.company}}</em></span>
            <span>最终付款账户：{{this.detailsP.bankCompaney}}</em></span>
            <el-tooltip :content="'最终付款账号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
                <span>最终付款账号: <em>{{this.detailsP.bankAccount}}</em></span>
            </el-tooltip>
        </p>
        <p>
            <span>AR来源: <em>{{this.detailsP.come}}</em></span>
            <span>状态: <em>{{this.detailsP.status}}</em></span>
            <span>币别: <em>{{this.detailsP.moneyType}}</em></span>
        </p>
        <p>
            <span>票面金额: <em>{{this.detailsP.company}}</em></span>
            <span>可用余额: <em>{{this.detailsP.money_can}}</em></span>
            <span>预计回款日期: <em>{{this.detailsP.arriveDate}}</em></span>
        </p> -->
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
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  data () {
    return {
      radio2: 3,
      payAmt: 0
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
  this.payAmt = this.detailsP.billBookAmt
}
// 提交
function handleSubmit () {
  // 1.获取发送数据
  let param = {
    custId: this.detailsP.custFromId, // 客户Id
    factoringCustId: this.detailsP.custToId, // 保理商Id
    masterChainId: this.detailsP.masterChainId, // AR单号
    payAmt: this.needPayAmt // 还款金额
  }
  // 2.显示加载图标
  const loading = this.$loading(loadingConf.sub())
  // 3.发送数据
  this.axios.post('/loanQuery/repayLoan.do', param).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 关闭加载图标
    loading.close()
    // 操作成功关闭弹窗刷新数据
    if (res.data.status) {
      this.$parent.fresh()
      this.handleClose()
    }
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '操作失败'
    })
    // 关闭加载图标
    loading.close()
  })
}
</script>
