<template>
<section id="print2">
  <!-- 预还款详情 -->
  <dialog-info :visible-p.sync="dialogRepayInfoVisible" :details-p="details" ></dialog-info>
  <el-dialog :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
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
          <el-tooltip :content="'对手单位:'+this.detailsP.transUnitName" placement="bottom" effect="light">
           <span>对手单位: <em>{{this.detailsP.transUnitName}}</em></span>
          </el-tooltip>
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
          <span>票据到期日: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
        </li>
        <li v-if="this.detailsP.transType==='discount'">
          <span>贴现申请日期: <em>{{this.detailsP.discountApplyDate | dateFormat}}</em></span>
        </li>
        <li v-if="this.detailsP.transType==='arpay'">
          <span>转让申请日期: <em>{{this.detailsP.arGenerateDate | dateFormat}}</em></span>
        </li>
      </ul>
      <ul v-if="this.detailsP.transType==='discount'">
        <li>
          <span>贴现申请金额: <em>{{this.detailsP.discountApplyAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>贴现确认金额: <em>{{this.detailsP.discountLoanAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul v-if="this.detailsP.transType==='discount'">
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
      </ul>
      <ul v-else-if="this.detailsP.transType==='arpay'">
        <li>
          <span>转让金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
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
      <ul class="height-auto">
          <span>使用发票:
            <div class="el-check-group inline-block">
            <el-checkbox v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}</el-checkbox>
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
      <ul class="height-auto">
        <span>备注:
           <em>{{this.detailsP.remark}}</em>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button @click="print('print2')">打印</el-button>
      <el-button v-if="isShowRepayBtn" @click="handleShowRepay">预还款计划</el-button>

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
      dialogRepayInfoVisible: false,
      details: {} // 详情数据
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '详情'
    },
    isShowRepayBtn () {
      return this.detailsP.checkedStatus === 22 || this.detailsP.checkedStatus === 23 || this.detailsP.checkedStatus === 24 || this.detailsP.checkedStatus === 26 || this.detailsP.checkedStatus === 29
    }
  },
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/my/DialogRepayInfo')
  },
  methods: {
    handleShowRepay: handleShowRepay
  }
}
function handleShowRepay () {
  this.getLoanDetail('/loan/loanTrialRepaymentScheduleInfo.do', { loanId: this.detailsP.masterChainId }).then(res => {
    if (res) {
      this.details = res
      this.dialogRepayInfoVisible = true
    }
  })
}
</script>
