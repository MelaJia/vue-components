<template>
  <section id="print">
    <el-dialog :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
      <header slot="title">
        <span class="title">
          {{getTitle}}
        </span>
      </header>
      <section>
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
              <em>{{this.detailsP.arStatusTypeName}}</em>
            </span>
          </li>
          <li>
            <span>币别:
              <em>{{this.detailsP.currencyDesc}}</em>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <el-tooltip :content="'付款单位:'+this.detailsP.paymentUnitName" placement="bottom" effect="light">
              <span>付款单位:
                <em>{{this.detailsP.paymentUnitName}}</em>
              </span>
            </el-tooltip>
          </li>
          <li>
            <span>转让日期:
              <em>{{this.detailsP.arGenerateDate | dateFormat}}</em>
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
                <ul>
                  <li :style="this.detailsP.signStatusId===0?'color:red':''">会计确认</li>
                  <span>-></span>
                  <li :style="this.detailsP.signStatusId===1?'color:red':''">财务确认</li>
                  <span>-></span>
                  <li :style="this.detailsP.signStatusId===2?'color:red':''">财务已付款</li>
                  <span>-></span>
                  <li :style="this.detailsP.signStatusId===3?'color:red':''">付款单确认</li>
                </ul>
                <ul>
                  <li :style="this.detailsP.signStatusId===0?'color:red':''">{{this.detailsP.signStatusId===0&&this.detailsP.signStatusName?`(${this.detailsP.signStatusName})`: ''}}</li>
                  <li :style="this.detailsP.signStatusId===1?'color:red':''">{{this.detailsP.signStatusId===1&&this.detailsP.signStatusName?`(${this.detailsP.signStatusName})`: ''}}</li>
                  <li :style="this.detailsP.signStatusId===2?'color:red':''">{{this.detailsP.signStatusId===2&&this.detailsP.signStatusName?`(${this.detailsP.signStatusName})`: ''}}</li>
                  <li :style="this.detailsP.signStatusId===3?'color:red':''">{{this.detailsP.signStatusId===3&&this.detailsP.signStatusName?`(${this.detailsP.signStatusName})`: ''}}</li>
                </ul>
              </div>
              <em>{{this.detailsP.billPayStatus}}</em>
            </el-tooltip>
          </span>
          </li>
        </ul>
        <ul class="height-auto" style="padding-bottom: 0px;">
          <span>待接收AR列表:</span>
          <article class="multi-detail-content">
          <el-table
            :data="this.detailsP.arList"
            border
            style="width: 100%;">
            <el-table-column
              prop="masterChainId"
              label="Ar单号"
              align="center"
              :formatter="nullDealWith"
              width="130">
            </el-table-column>
            <el-table-column
              prop="billPayDate"
              label="票据到期日"
              align="center"
              :formatter="dateFormat"
              width="130">
            </el-table-column>
            <el-table-column
              prop="loanAmt"
              label="授让金额"
              align="right" header-align="center"
              :formatter="regexNum"
              width="130">
            </el-table-column>
            <el-table-column
              align="left" header-align="center"
              label="发票列表">
              <template slot-scope="scope">
                <el-tooltip v-for="(item,index) in scope.row.usedInvoiceList" :key="item.invoiceNo" :content="'金额:'+item.invoiceAfterTaxAmt|regexNum" placement="bottom" effect="light">
                  <label>
                    {{item.invoiceNo}}<template v-if="index<scope.row.usedInvoiceList.length-1">;</template>
                  </label>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </article>
        </ul>
        <ul class="height-auto">
          <span>备注:
            <em>{{this.detailsP.remark}}</em>
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
span > lable.strong {
  color: #303133;
}
</style>
<style lang="scss">
.multi-detail-content{
  width: 99.9%;
  padding-left: 0.07%;
  padding-bottom: .5px;
}
.multi-detail-content {
  .el-table thead th,.el-table thead tr {
      background: #ccc;
      color: #333;
      border-bottom: .5px solid #931719;
      border-top: .5px solid #931719;
  }
  .el-table thead th+th{
    border-left: .5px solid #931719;
  }
  .el-table tbody tr td{
    border-bottom: .5px solid #931719;
  }
  .el-table tbody tr td+td{
    border-left: .5px solid #931719;
  }
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
      return '详情'
    }
  },
  methods: {}
}

</script>
