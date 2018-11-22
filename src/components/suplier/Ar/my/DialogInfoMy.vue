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
    <section ref="print">
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
        <li>
          <span>状态: <em>{{this.detailsP.arStatusTypeName}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>余额: <em>{{this.detailsP.arAvailableAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>票面金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>票据到期日: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
        </li>
        <li>
          <span>打款状态:
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
      <ul v-if="!detailsP.isMasterAr">
          <el-tooltip :content="'原始AR单位:'+this.detailsP.originalUnitName" placement="bottom" effect="light">
           <span>原始AR单位: <em>{{this.detailsP.originalUnitName}}</em></span>
          </el-tooltip>
      </ul>
      <ul class="height-auto">
        <span>未勾选发票:
          <div class="a-link-group inline-block">
            <!-- <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}</el-checkbox> -->
            <a href="javascript:;" v-for="(item,index) in detailsP.invoiceList" :class="{'first-child':index===0}" :key="item.invoiceNo" @click.prevent="checkInvoice(item)">{{item.invoiceNo}}(金额:{{item.invoiceAfterTaxAmt|regexNum}})</a>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
          <span>已勾选发票:
            <div class="el-check-group inline-block">
            <el-checkbox v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}</el-checkbox>
            </div>
          </span>
      </ul>
      <ul class="height-auto">
          <span>合同:
          <div class="a-link-group inline-block">
            <a v-for="item in detailsP.contractList" :key="item.contractId" :href="item.contractUrl" download="w3logo.jpg"  target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a>
          </div>
        </span>
      </ul>
      <ul class="height-auto">
        <span>备注:
           <em>{{this.detailsP.remark}}</em>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button @click="print('print')">打印</el-button>
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
