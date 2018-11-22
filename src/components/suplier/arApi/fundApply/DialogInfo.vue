<template>
  <section id="print">
  <!-- 发票详情 -->
  <dialog-list :visible-p.sync="dialogListVisible" :details-p="detailsList" ></dialog-list>
  <el-dialog :custom-class="'dia-class p'+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
              <span class="title">
                {{getTitle}}
              </span>
            </header>
            <section>
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
                  <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
                </li>
                <li>
                  <span>单位: <em>{{this.detailsP.currencyUnitName}}</em></span>
                </li>
              </ul>
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
                        <em>{{this.detailsP.billStatusName}}</em>
                    </el-tooltip>
                  </span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>票面金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
                </li>
                <li>
                  <span>可用余额: <em>{{this.detailsP.loanAmt | regexNum}}</em></span>
                </li>
              </ul>
              <ul class="height-auto" v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9">
                <span>发票清单:</span>
                <article>
                  <table>
                    <thead>
                      <tr>
                        <th>发票号码</th>
                        <th>票面金额</th>
                        <th>可用余额</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in detailsP.invoiceCustomList" :key="item.invoiceNo">
                        <td class="td-center">{{item.invoiceNo}}</td>
                        <td class="td-right">{{item.invoiceAfterTaxAmt|thousandth}}</td>
                        <td class="td-right">{{item.invoiceAvailableAmount|thousandth}}</td>
                      </tr>
                    </tbody>
                  </table>
                </article>
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
article{
  margin-left: 80px;
}
table{
  border-collapse: collapse; // 表格边框合并
}
td, th {
    width: 130px;
    border: 1px solid;
    padding: 10px 0;
}
th {
    text-align: center;
    background: #cccccc;
}
td.td-center{
  text-align: center;
}
td.td-right{
  text-align: right;
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
