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
          <span>订单项次: <em>{{this.detailsP.poItem}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>金额: <em>{{this.detailsP.poAmount}}</em>元</span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currency}}</em></span>
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
         <span>交易条件: <em>{{this.detailsP.paymenttermName}}</em></span>
        </li>
      </ul>
      <ul>
        <span>
          <div class="a-link-group inline-block" v-if="filelist.length > 0">
            <a v-for="(item, index) in filelist" ref="fileBtn" :key="index" href="http://" @click.prevent="downLoadFile(item.fileDownLoadUrl, item.fileName)">{{item.fileName}}</a>
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
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
export default {
  props: ['visibleP', 'detailsP', 'filelist'],
  mixins: [DialogClose],
  computed: {
    getTitle () {
      return '订单' + this.detailsP.poNumber
    }
  },
  methods: {
    downLoadFile (url, fileName) {
      this.axios.post('/commonFile/showFileByUrl.do', {fileUrl: url}).then(res => {
        if (res.data.status === 1) {
          var blob = new Blob([res.data.data], {type: 'application/octet-stream'})
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            console.log(fileName)
            window.navigator.msSaveOrOpenBlob(blob, fileName)
          } else {
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.style.display = 'none'
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
