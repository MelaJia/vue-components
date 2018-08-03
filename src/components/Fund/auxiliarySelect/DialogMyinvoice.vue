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
          <span>销方名称: <em>{{this.detailsP.sellerName}}</em></span>
        </li>
        <li>
          <span>购方名称: <em>{{this.detailsP.buyerName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>金额: <em>{{this.detailsP.amount}}</em>元</span>
        </li>
        <li>
          <span>税额: <em>{{this.detailsP.taxAmount}}</em>元</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>税价总计: <em>{{this.detailsP.total}}</em>元</span>
        </li>
        <li>
          <span>发票类型: <em>{{this.detailsP.invoiceTypeName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别: <em>{{this.detailsP.currencyName}}</em></span>
        </li>
        <li>
          <span>状态: <em>{{this.detailsP.statusName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>开票日期: <em>{{this.detailsP.entryDate}}</em></span>
        </li>
        <li>
          <span>创建日期: <em>{{this.detailsP.creationDate}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>发票代码: <em>{{this.detailsP.invoiceCode}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>对账单号:
          <div class="a-link-group inline-block">
            <label v-for="(item, index) in this.detailsP.statementDetail" :key="index">{{item.statementNo}}</label>
          </div>
        </span>
      </ul>
      <ul>
        <span>
          <div class="a-link-group inline-block">
            附件:<a v-for="(item, index) in filelist" ref="fileBtn" :key="index" href="http://" @click.prevent="downLoadFile(item.fileDownLoadUrl)">{{item.fileName}}</a>
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
ul:last-child{
  height: auto;
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import {
  baseUrl
} from '@/config/env.js'
export default {
  props: ['visibleP', 'detailsP', 'filelist'],
  mixins: [DialogClose],
  computed: {
    getTitle () {
      return '发票单号' + this.detailsP.invoiceNo
    }
  },
  methods: {
    // 文件下载
    downLoadFile (fileDownLoadUrl) {
      var newWindow = window.open()
      this.axios.post('/commonFile/showFileByUrl.do', {fileUrl: fileDownLoadUrl}).then(res => {
        if (res.data.status) {
          newWindow.location = `${baseUrl}/static/pdfjs/web/viewer.html?file=${res.data.data.fileName}`
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
