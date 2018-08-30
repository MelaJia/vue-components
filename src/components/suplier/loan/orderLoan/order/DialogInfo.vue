<template>
<section id="print">
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
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
         <span>法人单位: <em>{{this.detailsP.corpName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>订单项次: <em>{{this.detailsP.poItem}}</em></span>
        </li>
         <li>
          <span>金额: <em>{{this.detailsP.poAmount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>订单确认日期: <em>{{this.detailsP.confirmDate | dateFormat}}</em></span>
        </li>
        <li>
          <span>约定交货日期: <em>{{this.detailsP.deliveryDate | dateFormat}}</em></span>
        </li>
      </ul>
      <ul>
         <li>
          <span>币别: <em>{{this.detailsP.currencyName}}</em></span>
        </li>
        <li>
          <span>交易条件:
            <el-tooltip class="item" effect="dark" :content="this.detailsP.paymenttermName" placement="top-start">
                <em>{{this.detailsP.paymenttermName}}</em>
            </el-tooltip>
          </span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>附件:
          <div class="a-link-group inline-block">
             <a v-for="(item,idx) in detailsP.fileInfoList" :key="idx" :href="item.fileUrl" target="_blank" @click="constractHandle(item.fileUrl)">{{item.fileName}}</a>
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
span>lable.strong{
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
      return '订单' + this.detailsP.poNumber
    }
  },
  methods: {
  }
}

</script>
