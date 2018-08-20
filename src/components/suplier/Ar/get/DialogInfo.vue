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
          <li>
            <el-tooltip :content="'付款单位:'+this.detailsP.companyName" placement="bottom" effect="light">
              <span>付款单位:
                <em>{{this.detailsP.companyName}}</em>
              </span>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip :content="'转让单位:'+this.detailsP.custFromName" placement="bottom" effect="light">
              <span>转让单位:
                <em>{{this.detailsP.custFromName}}</em>
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
            <span>预计回款日期:
              <em>{{this.detailsP.billPayDate | dateFormat}}</em>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <span>转让日期:
              <em>{{this.detailsP.arGenerateDate | dateFormat}}</em>
            </span>
          </li>
          <li>
            <span>转让金额:
              <em>{{this.detailsP.billBookAmt | regexNum}}</em>
            </span>
          </li>
        </ul>
        <ul>
          <li>
            <span>币别:
              <em>{{this.detailsP.currencyDesc}}</em>
            </span>
          </li>
          <li>
            <el-tooltip :content="'交易流水:'+this.detailsP.transSerialNo" placement="bottom" effect="light">
              <span>交易流水:
                <em>{{this.detailsP.transSerialNo}}</em>
              </span>
            </el-tooltip>
          </li>
        </ul>
        <ul>
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
        </ul>
        <ul class="height-auto">
          <span>AR单号:
            <div class="a-link-group inline-block">
              <label>{{this.detailsP.masterChainId}}</label>
              <!-- <label v-for="item in detailsP.arIdList" :key="item.arId">{{item.arId}}</label> -->
            </div>
          </span>
        </ul>
        <ul class="height-auto" v-if="detailsP.checkedStatus!==6&&detailsP.checkedStatus!==9">
          <span>对应发票号:
            <div class="a-link-group inline-block">
              <label v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo">{{item.invoiceNo}}</label>
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
        <el-button type="primary" @click="print('print')">打印</el-button>
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
