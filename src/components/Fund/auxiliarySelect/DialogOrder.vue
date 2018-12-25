<template>
<section id="print">
  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title" class="headerTitle">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="section">
      <ul>
        <li>
          <span>法人代码: <em>{{this.detailsP.corpCode}}</em></span>
        </li>
        <li>
          <span>订单项次: <em>{{this.detailsP.poItem}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>金额: <em>{{this.detailsP.poAmount | regexNum}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyName}}</em></span>
        </li>
      </ul>
    </section>
    <section class="section">
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
         <span>交易条件: <em>{{this.detailsP.paymenttermName}}</em></span>
        </li>
      </ul>
    </section>
    <section class="section">
      <ul class="height-auto" style="display:flex">
        <span style="width:80px;">附件:</span>
        <div class="a-link-group inline-block" style="background:#ECECEC;flex:1;height:80px;max-height:80px;overflow-y:auto;">
            <a v-for="(item, index) in filelist" ref="fileBtn" :key="index" href="http://" @click.prevent="downLoadFile(item.fileDownLoadUrl)">{{item.fileName}}</a>
          </div>
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
import Common from '@/mixins/common/common'
import {
  baseUrl
} from '@/config/env.js'
export default {
  props: ['visibleP', 'detailsP', 'filelist'],
  mixins: [DialogClose, Common],
  computed: {
    getTitle () {
      return '订单' + this.detailsP.poNumber + '详情'
    }
  },
  methods: {
    // 文件下载
    downLoadFile (fileDownLoadUrl) {
      var newWindow = window.open()
      this.axios.post('/commonFile/showFileByUrl.do', {fileUrl: fileDownLoadUrl}).then(res => {
        if (res.data.status) {
          newWindow.location = `${baseUrl}${res.data.data.fileName}`
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
