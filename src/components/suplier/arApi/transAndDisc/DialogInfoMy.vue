<template>
  <section id="print">
  <!-- 发票详情 -->
  <dialog-list :visible-p.sync="dialogListVisible" :details-p="detailsList" ></dialog-list>
  <el-dialog :custom-class="'dia-class p'+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
            <header slot="title" class="headerTitle">
              <span class="title">
                详情
              </span>
            </header>
            <section class="section">
              <ul>
                <li>
                  <span>AR来源: <em>{{this.detailsP.arSourceDesc}}</em></span>
                </li>
                <li>
                  <span>状态: <em>{{this.detailsP.arStatusTypeName}}</em></span>
                </li>
              </ul>
              <ul>
                <li>
                  <el-tooltip :content="'付款单位:'+this.detailsP.companyName" placement="bottom" effect="light">
                    <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
                  </el-tooltip>
                </li>
                <li>
                  <span>结报单号: <em>{{this.detailsP.billId}}</em></span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>保理方: <em>{{this.detailsP.factoringCustName}}</em></span>
                </li>
                <li>
                  <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
                </li>
              </ul>
            </section>
            <section class="section">
              <ul>
                <li>
                  <span>票据到期日: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
                </li>
                <li>
                  <span>结报状态:
                    <el-tooltip class="item" effect="light" placement="top-start">
                      <div slot="content" class="status-tooltip">
                        <ul>
                          <li :style="this.detailsP.signStatusId===0?'color:red':''">会计确认</li><span>-></span>
                          <li :style="this.detailsP.signStatusId===1?'color:red':''">财务确认</li><span>-></span>
                          <li :style="this.detailsP.signStatusId===2?'color:red':''">财务已付款</li><span>-></span>
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
              <ul>
                <li>
                  <span>票面金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
                </li>
                <li>
                  <span>可用余额: <em>{{this.detailsP.arAvailableAmt | regexNum}}</em></span>
                </li>
              </ul>
            </section>
            <section class="section">
              <ul class="height-auto" v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9" style="display:flex">
                <span style="width:80px;">发票清单:</span>
                <article style="flex:1">
                  <table>
                    <thead>
                      <tr>
                        <th>发票号码</th>
                        <th>票面金额</th>
                        <th>不可用金额</th>
                        <th>可用余额</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in detailsP.invoiceCustomList" :key="item.invoiceNo">
                        <td class="td-center">{{item.invoiceNo}}</td>
                        <td class="td-right">{{item.invoiceAfterTaxAmt|thousandth}}</td>
                        <td class="td-right">{{item.invoiceDisabledAmount|thousandth}}</td>
                        <td class="td-right">{{item.invoiceAvailableAmount|thousandth}}</td>
                      </tr>
                    </tbody>
                  </table>
                </article>
              </ul>
            </section>
            <footer class="no-print" slot="footer" :style="'clear:both'">
              <el-button type="primary" size="small" class="searchBtn" @click="handleClose">确认</el-button>
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
table{
  border-collapse: collapse; // 表格边框合并
  width:100%;
}
td, th {
    width: 130px;
    border: 1px solid #E4E4E4;
    padding: 10px 0;
}
th {
    text-align: center;
    background: #3F97F8;
    color:#fff;
}
td.td-center{
  text-align: center;
}
td.td-right{
  text-align: right;
}
tbody tr:nth-child(even){
  background:#ECECEC;
}
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
