<template>
<section id="print">
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <!-- <ul>
        <li>
          <span>法人代码: <em>{{this.detailsP.poLoanInfoList.corpCode}}</em></span>
        </li>
        <li>
          <span>法人单位: <em>{{this.detailsP.poLoanInfoList.corpName}}</em></span>
        </li>
      </ul> -->
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
      <ul>
        <li>
          <span>实际放款日期: <em>{{this.detailsP.actualLoanDate | dateFormat}}</em></span>
        </li>
      </ul>
      <!-- <ul class="height-auto">
        <span>
          <div class="a-link-group inline-block">
            订单号:<label v-for="(item, index) in this.detailsP.poLoanInfoList.poLoanDetailInfoList" :key="index">{{item.poNumber}}</label>
          </div>
        </span>
      </ul> -->
      <table class="tableList" border="1">
        <thead>
          <tr>
            <th>法人代码</th>
            <th>法人单位</th>
            <th>订单号</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(item,index) in this.detailsP.poLoanInfoList" :key="index">
            <td>{{item.corpCode}}</td>
            <td>{{item.corpName}}</td>
            <td><div class="a-link-group inline-block"><label v-for = "(itemList,index) in item.poLoanDetailInfoList" :key="index">{{itemList.poNumber}}</label></div></td>
          </tr>
        </tbody>
      </table>
      <ul class="height-auto">
          <span>
          <div class="a-link-group inline-block">
            合同:<a v-for="item in this.detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank">{{item.contractName}}</a>
            <!-- <a v-for="item in detailsP.contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractId)">{{item.contractName}}</a> -->
          </div>
        </span>
      </ul>
      <!-- <ul>
        <span>
          <div class="a-link-group inline-block">
            附件:<a v-for="(item, index) in this.detailsP.loanUploadFileList" :key="index" :href="item.fileUrl">{{item.fileName}}</a>
          </div>
        </span>
      </ul> -->
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
    </footer>
  </el-dialog>
</section>
</template>

<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.tableList{
  width: 100%;
  border: 0.5px solid #931719;
  border-collapse: collapse;
  thead tr{
    height: 30px;
    th{
      font-weight: normal;
    }
  }
  tbody tr{
    height: 30px;
    text-align: center;
    &:last-child{
      border-bottom: none;
      td{
        border-bottom: none;
        span{
          margin-right: 10px;
        }
      }
    }
  }
}
ul:last-child{
  height: auto;
  border-top: none;
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  computed: {
    getTitle () {
      return '融资编号' + this.detailsP.loanId
    }
  }
}
</script>
