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
          <span>法人单位: <em>{{this.detailsP.corpName}}</em></span>
        </li>
        <li>
          <span>法人代码: <em>{{this.detailsP.corpCode}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>实际付款金额: <em>{{this.detailsP.rcvAmtOrigin}}</em>元</span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>付款日期: <em>{{this.detailsP.payDate}}</em></span>
        </li>
      </ul>
      <table class="tableList" border="1">
        <caption>结报信息:</caption>
        <thead>
          <tr>
            <th>结报单号</th>
            <th>金额</th>
            <th>结报日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(item,index) in this.detailsP.billDetailList" :key="index">
            <td>{{item.billNo}}</td>
            <td>{{item.oriAmt}}</td>
            <td>{{item.billDate}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <ul>
        <span>
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP[0].contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractNo)">{{item.contractName}}</a>
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
ul:last-child{
  border-top: none;
}
span {
  line-height: 32px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  computed: {
    getTitle () {
      return '付款单号' + this.detailsP.payNo
    }
  }
}
</script>
