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
          <span>法人单位: <em>{{this.detailsP.corpName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>订单项次: <em>{{this.detailsP.poItem}}</em></span>
        </li>
        <li>
          <span>金额: <em>{{this.detailsP.poAmount}}</em>元</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>订单确认日期: <em>{{this.detailsP.confirmDate}}</em></span>
        </li>
        <li>
          <span>约定交货日期: <em>{{this.detailsP.deliveryDate}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别: <em>{{this.detailsP.currency}}</em></span>
        </li>
        <!-- <li>
          <span>撤销状态: <em>{{this.detailsP.paymenttermName}}</em></span>
        </li> -->
      </ul>
      <ul>
        <li>
         <span>交易条件: <em>{{this.detailsP.paymenttermName}}</em></span>
        </li>
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
      return this.detailsP.poNumber + '详情'
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
