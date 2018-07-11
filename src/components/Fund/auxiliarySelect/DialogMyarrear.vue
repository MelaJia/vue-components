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
          <span>供应商代码: <em>{{this.detailsP.vendorCode}}</em></span>
        </li>
        <li>
          <span>供应商名称: <em>{{this.detailsP.vendorName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>管报代码: <em>{{this.detailsP.corpCode}}</em></span>
        </li>
        <li>
          <span>客户集团代码: <em>{{this.detailsP.customerGroupNo}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>事业群代码: <em>{{this.detailsP.bgCode}}</em></span>
        </li>
        <li>
          <span>事业处代码: <em>{{this.detailsP.buCode}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>生产单位代码: <em>{{this.detailsP.bmCode}}</em></span>
        </li>
        <li>
          <span>关系单位: <em>{{this.detailsP.isRelativeParty}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别: <em>{{this.detailsP.currency}}</em></span>
        </li>
        <li>
          <span>结账日期: <em>{{this.detailsP.agingDate | dateFormat}}</em></span>
        </li>
      </ul>
      <table class="tableList" border="1">
        <caption>逾期欠款信息:</caption>
        <thead>
          <tr>
            <th>说明</th>
            <th>金额</th>
            <th>说明</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>逾期0天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_000}}</td>
            <td>逾期1-3天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_001_003}}</td>
          </tr>
          <tr>
            <td>逾期4-7天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_004_007}}</td>
            <td>逾期8-14天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_008_014}}</td>
          </tr>
          <tr>
            <td>逾期15-30天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_015_030}}</td>
            <td>逾期31-60天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_031_060}}</td>
          </tr>
          <tr>
            <td>逾期61-90天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_061_090}}</td>
            <td>逾期91-180天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_091_180}}</td>
          </tr>
          <tr>
            <td>逾期181-270天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_181_270}}</td>
            <td>逾期271-360天之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_271_360}}</td>
          </tr>
          <tr>
            <td>逾期361天及以上之欠款金额</td>
            <td>{{this.detailsP.dueARAmount_361}}</td>
            <td>逾期之欠款金额</td>
            <td>{{this.detailsP.totalDueARAmount}}</td>
          </tr>
        </tbody>
      </table>
      <table class="tableList" border="1">
        <caption>未到期欠款信息：</caption>
        <thead>
          <tr>
            <th>说明</th>
            <th>金额</th>
            <th>说明</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1-7天内到期之欠款金额</td>
            <td>{{this.detailsP.undueARAmount_01_07}}</td>
            <td>8-15天内到期之欠款金额</td>
            <td>{{this.detailsP.undueARAmount_08_15}}</td>
          </tr>
          <tr>
            <td>16-22天内到期之欠款金额</td>
            <td>{{this.detailsP.undueARAmount_16_22}}</td>
            <td>23-30天内到期之欠款金额</td>
            <td>{{this.detailsP.undueARAmount_23_30}}</td>
          </tr>
          <tr>
            <td>31天后到期之欠款金额</td>
            <td>{{this.detailsP.undueARAmount_31}}</td>
            <td>未到期之欠款金额</td>
            <td>{{this.detailsP.totalUndueARAmount}}</td>
          </tr>
        </tbody>
      </table>
      <table class="tableList" border="1">
        <caption>预付款信息：</caption>
        <thead>
          <tr>
            <th>说明</th>
            <th>金额</th>
            <th>说明</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>报表日的应收商业承兑汇票余额</td>
            <td>{{this.detailsP.tradeAcceptanceAmount}}</td>
            <td>报表日的应收银行承兑汇票余额</td>
            <td>{{this.detailsP.bankAcceptanceAmount}}</td>
          </tr>
          <tr>
            <td>报表日的暂收款余额</td>
            <td>{{this.detailsP.temporaryReceiptsAmount}}</td>
            <td>报表日的预收款余额</td>
            <td>{{this.detailsP.advanceReceiptsAmount}}</td>
          </tr>
        </tbody>
      </table>
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
  caption{
    border: 0.5px solid #931719;
    border-top: none;
    border-bottom: none;
    line-height: 32px;
    text-align: left;
  }
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
      }
    }
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
      return '详情'
    }
  }
}
</script>
