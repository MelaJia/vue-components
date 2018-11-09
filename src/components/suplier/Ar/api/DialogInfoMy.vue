<template>
  <section id="print">
  <!-- 发票详情 -->
  <dialog-list :visible-p.sync="dialogListVisible" :details-p="detailsList" ></dialog-list>
  <el-dialog :custom-class="'dia-class p'+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
              <span class="title">
                详情
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
                  <span>预计回款日期: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
                </li>
                <li>
                  <span>还款日期: <em>{{this.detailsP.actualRepayDate | dateFormat}}</em></span>
                </li>
              </ul>
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
              <ul class="height-auto" v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9">
                <span>发票列表:
                  <div class="a-link-group inline-block">
                    <label v-for="(item,index) in detailsP.invoiceCustomList" :class="{'first-child':index===0}" :key="item.invoiceNo">{{item.invoiceNo}}</label>
                  </div>
                </span>
              </ul>
            </section>
            <footer class="no-print" slot="footer" :style="'clear:both'">
              <el-button type="primary" @click="handleClose">确认</el-button>
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
/* 我的Ar详情 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      radio2: 3,
      dialogListVisible: false,
      detailsList: {}
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '详情'
    }
  },
  components: {
    'dialog-list': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/Fund/Work/Loan/DialogList')
  },
  methods: {
    checkInvoice (item) {
      this.axios.post('/loan2/queryInvoicePic.do', {
        billId: this.detailsP.billId,
        invoiceNo: item.invoiceNo,
        hostCode: this.detailsP.hostCode
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

</script>
