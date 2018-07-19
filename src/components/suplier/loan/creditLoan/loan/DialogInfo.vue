<template>
<section id="print">
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>申请金额: <em>{{this.detailsP.applyAmt}}</em></span>
        </li>
        <li>
         <span>实放金额: <em>{{this.detailsP.loanAmt}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>还款日期: <em>{{this.detailsP.repayDate | dateFormat}}</em></span>
        </li>
         <li>
          <span>币别: <em>{{this.detailsP.currency}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>利率: <em>{{this.detailsP.interestRate}}</em></span>
        </li>
        <li>
          <span>手续费率: <em>{{this.detailsP.serviceFeeRate}}</em></span>
        </li>
      </ul>
      <ul>
         <li>
          <span>罚息利率: <em>{{this.detailsP.overdueRate}}</em></span>
        </li>
        <li>
          <span>提前还款手续费: <em>{{this.detailsP.prepaymentDeductInterest}}</em></span>
        </li>
      </ul>
      <ul>
         <li>
          <span>宽容天数: <em>{{this.detailsP.fineGraceDays}}</em></span>
        </li>
        <li>
          <span>还款方式: <em>{{this.detailsP.repaymentType}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>附件:
          <div class="a-link-group inline-block">
             <a v-for="(item,idx) in detailsP.fileInfoList" :key="idx" :href="item.fileUrl" target="_blank" @click="constractHandle(item.fileUrl)">{{item.fileName}}</a>
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
      <el-button type="primary" @click="print('print')">打印</el-button>
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
      radio2: 3
    }
  },
  computed: {
    getTitle () {
      return '融资编号' + this.detailsP.loanId
    }
  },
  methods: {
  }
}

</script>
