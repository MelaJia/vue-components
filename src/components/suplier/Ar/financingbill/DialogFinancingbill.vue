<template>
<section id="print">
  <!-- 发票详情 -->
  <dialog-list :visible-p.sync="dialogListVisible" :details-p="detailsList" ></dialog-list>
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>AR来源: <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].arSourceDesc}}</em></span>
        </li>
        <li>
          <span>状态: <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].checkedStatusName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>付款单位: <em>{{this.detailsP.custFromName}}</em></span>
        </li>
        <li>
          <span>结报状态: <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].billStatusName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>保理方: <em>{{this.detailsP.custToName}}</em></span>
        </li>
        <li>
          <span>币别: <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].currencyDesc}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>预计回款日期: <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].billPayDate | dateFormat}}</em></span>
        </li>
        <li>
          <span>申请时间: <em>{{this.detailsP.applyDate | dateFormatToMinutes}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>申请金额: <em>{{this.detailsP.applyAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>实放金额: <em>{{this.detailsP.loanAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>使用发票:
          <div class="a-link-group inline-block" v-if="this.detailsP.arList">
            <!-- <label v-for="(item,index) in this.detailsP.arList.usedInvoiceList" :key="index">{{item.invoiceNo}}(金额:{{item.invoiceAfterTaxAmt | regexNum}})</label> -->
            <a href="javascript:;" v-for="item in this.detailsP.arList[0].usedInvoiceList" :key="item.invoiceNo" @click.prevent="checkInvoice(item)">{{item.invoiceNo}}(金额:{{item.invoiceAfterTaxAmt|regexNum}})</a>
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
      <!-- <el-button v-if="isShowRepayBtn" @click="handleShowRepay">预还款计划</el-button> -->
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
      dialogListVisible: false,
      detailsList: {},
      details: {} // 详情数据
    }
  },
  computed: {
    getTitle () {
      if (this.detailsP.arList) {
        return this.detailsP.arList[0].masterChainId + '详情'
      }
    },
    isShowRepayBtn () {
      return this.detailsP.checkedStatus === 22 || this.detailsP.checkedStatus === 23 || this.detailsP.checkedStatus === 24 || this.detailsP.checkedStatus === 26 || this.detailsP.checkedStatus === 29
    }
  },
  filters: {
    // 申请时间格式化
    dateFormatToMinutes: function (value) {
      if (value === null || value === undefined || value === '') {
        return '- -'
      }
      return new Date(value).Format('yyyy-MM-dd HH:mm')
    }
  },
  components: {
    'dialog-list': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/financingbill/DialogInvoicelist')
  },
  methods: {
    handleShowRepay: handleShowRepay,
    checkInvoice (item) {
      this.axios.post('/loan2/queryInvoicePic.do', {
        billId: this.detailsP.arList ? this.detailsP.arList[0].billId : '',
        invoiceNo: item.invoiceNo,
        hostCode: this.detailsP.arList ? this.detailsP.arList[0].hostCode : ''
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
