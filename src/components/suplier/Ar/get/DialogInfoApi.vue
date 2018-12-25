<template>
  <section id="print">
    <el-dialog :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
      <header slot="title" class="headerTitle">
        <span class="title">
          {{getTitle}}
        </span>
      </header>
      <section class="section">
        <ul>
          <span>交易流水号:
                <em>{{this.detailsP.transSerialNo}}</em>
          </span>
        </ul>
        <ul>
          <li>
            <el-tooltip :content="'转让方:'+this.detailsP.companyName" placement="bottom" effect="light">
              <span>转让方:
                <em>{{this.detailsP.custFromName}}</em>
              </span>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip :content="'接收方:'+this.detailsP.custFromName" placement="bottom" effect="light">
              <span>接收方:
                <em>{{this.detailsP.custToName}}</em>
              </span>
            </el-tooltip>
          </li>
        </ul>
        <ul>
          <li>
            <span>状态:
              <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].checkedStatusName}}</em>
            </span>
          </li>
          <li>
            <span>币别:
              <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].currencyDesc}}</em>
            </span>
          </li>
        </ul>
      </section>
      <section class="section">
        <ul>
          <li v-if="this.detailsP.arList">
            <el-tooltip :content="'付款单位:'+this.detailsP.arList[0].companyName" placement="bottom" effect="light">
              <span>付款单位:
                <em>{{this.detailsP.arList[0].companyName}}</em>
              </span>
            </el-tooltip>
          </li>
          <li>
            <span>转让日期:
              <em>{{this.detailsP.transDate | dateFormat}}</em>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <span>转让金额:
              <em>{{this.detailsP.transAmt | regexNum}}</em>
            </span>
          </li>
          <li>
            <span>打款状态:
            <el-tooltip class="item" effect="light" placement="top-start">
              <div slot="content" class="status-tooltip">
                <ul v-if="this.detailsP.arList">
                  <li :style="this.detailsP.arList[0].signStatusId===0?'color:red':''">会计确认</li>
                  <span>-></span>
                  <li :style="this.detailsP.arList[0].signStatusId===1?'color:red':''">财务确认</li>
                  <span>-></span>
                  <li :style="this.detailsP.arList[0].signStatusId===2?'color:red':''">财务已付款</li>
                  <span>-></span>
                  <li :style="this.detailsP.arList[0].signStatusId===3?'color:red':''">付款单确认</li>
                </ul>
                <ul v-if="this.detailsP.arList">
                  <li :style="this.detailsP.arList[0].signStatusId===0?'color:red':''">{{this.detailsP.arList[0].signStatusId===0&&this.detailsP.arList[0].signStatusName?`(${this.detailsP.arList[0].signStatusName})`: ''}}</li>
                  <li :style="this.detailsP.arList[0].signStatusId===1?'color:red':''">{{this.detailsP.arList[0].signStatusId===1&&this.detailsP.arList[0].signStatusName?`(${this.detailsP.arList[0].signStatusName})`: ''}}</li>
                  <li :style="this.detailsP.arList[0].signStatusId===2?'color:red':''">{{this.detailsP.arList[0].signStatusId===2&&this.detailsP.arList[0].signStatusName?`(${this.detailsP.arList[0].signStatusName})`: ''}}</li>
                  <li :style="this.detailsP.arList[0].signStatusId===3?'color:red':''">{{this.detailsP.arList[0].signStatusId===3&&this.detailsP.arList[0].signStatusName?`(${this.detailsP.arList[0].signStatusName})`: ''}}</li>
                </ul>
              </div>
              <em v-if="this.detailsP.arList">{{this.detailsP.arList[0].billPayStatus}}</em>
            </el-tooltip>
          </span>
          </li>
        </ul>
      </section>
      <section class="section">
        <ul class="height-auto" style="padding-bottom: 0px;">
          <span>待接收AR列表:</span>
        <article>
          <table>
            <thead>
              <tr>
                <th>AR单号</th>
                <th>票据到期日</th>
                <th>发票号</th>
                <th>授让金额</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in detailsP.arList">
               <template v-if="item.usedInvoiceList.length>0">
                <tr  v-for="(invoiceList,index) in item.usedInvoiceList" :key="invoiceList.invoiceNo">
                  <td class="td-center" :class="{'isHidden':index>0}" :rowspan="item.usedInvoiceList.length"><span>{{item.masterChainId}}</span></td>
                  <td class="td-center" :class="{'isHidden':index>0}" :rowspan="item.usedInvoiceList.length"><span>{{item.billPayDate | dateFormat}}</span></td>
                  <td class="td-center">{{invoiceList.invoiceNo}}</td>
                  <td class="td-right">{{invoiceList.invoiceAfterTaxAmt|thousandth}}</td>
                </tr>
               </template>
               <template v-else>
                <tr :key="item.masterChainId">
                  <td class="td-center"><span>{{item.masterChainId}}</span></td>
                  <td class="td-center"><span>{{item.billPayDate | dateFormat}}</span></td>
                  <td class="td-center">--</td>
                  <td class="td-right">--</td>
                </tr>
               </template>
              </template>
            </tbody>
          </table>
        </article>
        </ul>
        <ul class="height-auto">
          <span>备注:
            <em>{{this.detailsP.remark}}</em>
          </span>
        </ul>
      </section>
      <footer class="no-print" slot="footer" :style="'clear:both'">
        <el-button type="primary" class="searchBtn" size="small" @click="handleClose">确认</el-button>
      </footer>
    </el-dialog>
  </section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
@import "@/assets/css/_newUI.scss";
section{
  > ul,>ul:last-of-type{
    border: none;
  }
  > ul > li:not(:first-of-type) {
    border-left: none;
  }
  li{
    width: 68%;
  }
  li+li{
    width: 30%;
  }
}
span > lable.strong {
  color: #303133;
}
table {
  width: 100%;
  border-collapse: collapse; // 表格边框合并
}
td,
th {
  width: 130px;
  border: 1px solid #DEDEDE;
  padding: 10px 0;
}
th {
  text-align: center;
  background: #3F97F8;
  color:#fff;
}
td.td-center {
  text-align: center;
}
td.td-right {
  text-align: right;
}
.isHidden{
  display:none;
}
</style>
<style lang="scss">
.multi-detail-content {
  width: 99.9%;
  padding-left: 0.07%;
  padding-bottom: 0.5px;
}
.multi-detail-content {
  .el-table thead th,
  .el-table thead tr {
    background: #ccc;
    color: #333;
    border-bottom: 0.5px solid #931719;
    border-top: 0.5px solid #931719;
  }
  .el-table thead th + th {
    border-left: 0.5px solid #931719;
  }
  .el-table tbody tr td {
    border-bottom: 0.5px solid #931719;
  }
  .el-table tbody tr td + td {
    border-left: 0.5px solid #931719;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
// 导入时间格式化过滤器
import Common from '@/mixins/common/common'
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
      return '详情'
    }
  },
  methods: {}
}
</script>
