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
          <span>法人代码: <em>{{this.detailsP.corpCode}}</em></span>
        </li>
        <li>
          <span>进货验收单日期: <em>{{this.detailsP.confirmDate}}</em></span>
        </li>
      </ul>
      <table class="tableList" border="1">
        <thead>
          <tr>
            <th>进货项次</th>
            <th>订单号</th>
            <th>订单项次</th>
            <th>约定交货日期</th>
            <th>类型</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(item,index) in this.detailsP.poDetail" :key="index">
            <td>{{item.grnItem}}</td>
            <td>{{item.poNumber}}</td>
            <td>{{item.poItem}}</td>
            <td>{{item.deliveryDate}}</td>
            <td>{{item.dataName}}</td>
          </tr>
        </tbody>
      </table>
      <ul>
          <span>
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" href="http://" @click.prevent="constractHandle(item.contractNo)">{{item.contractName}}</a>
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
      }
    }
  }
}
ul:last-child{
  border-top: none;
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  computed: {
    getTitle () {
      return '进货验收单' + this.detailsP.grnNumbe
    }
  }
}
</script>
