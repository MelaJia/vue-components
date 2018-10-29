<template>
<section id="print">
  <dialog-info :visible-p.sync="dialogRepayInfoVisible" :details-p="details" ></dialog-info>
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
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
          <span>对手单位: <em>{{this.detailsP.custToName}}</em></span>
        </li>
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
          <span>预计回款日期: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
        </li>
        <li>
          <span>贴现申请日期: <em>{{this.detailsP.discountApplyDate | dateFormat}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>贴现申请金额: <em>{{this.detailsP.discountApplyAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>贴现确认金额: <em>{{this.detailsP.discountLoanAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>使用发票:
          <div class="a-link-group inline-block">
            <label v-for="(item,index) in this.detailsP.invoiceCustomList" :key="index">{{item.invoiceNo}}</label>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a>
            <!-- <a v-for="item in detailsP.contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractId)">{{item.contractName}}</a> -->
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button @click="print('print')">打印</el-button>
      <el-button v-if="isShowRepayBtn" @click="handleShowRepay">预还款计划</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
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
      radio2: 3,
      dialogRepayInfoVisible: false,
      details: {} // 详情数据
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '详情'
    },
    isShowRepayBtn () {
      return this.detailsP.checkedStatus === 22 || this.detailsP.checkedStatus === 23 || this.detailsP.checkedStatus === 24 || this.detailsP.checkedStatus === 26 || this.detailsP.checkedStatus === 29
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
