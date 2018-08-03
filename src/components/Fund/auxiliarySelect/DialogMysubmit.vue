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
          <span>供应商名称: <em>{{this.detailsP.vendorName}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currencyName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>结报申请付款日期: <em>{{this.detailsP.dueDate}}</em></span>
        </li>
        <li>
          <span>应付金额: <em>{{this.detailsP.oriAmt}}</em>元</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>已付金额: <em>{{this.detailsP.oriPaidAmt}}</em>元</span>
        </li>
        <li>
          <span>未付金额: <em>{{this.detailsP.oriUnPaidAmt}}</em>元</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>打款处理状态: <em>{{this.detailsP.statusName}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>发票单号:
          <div class="a-link-group inline-block">
            <label v-for="(item, index) in this.detailsP.invoiceDetail" :key="index">{{item.invoiceNo}}</label>
          </div>
        </span>
      </ul>
      <table class="tableList" border="1">
        <thead>
          <tr>
            <th>付款批次</th>
            <th>付款单号</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(item,index) in this.detailsP.payBatchList" :key="index">
            <td>{{item.payBatch}}</td>
            <td>{{item.payNo}}</td>
          </tr>
        </tbody>
      </table>
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
.tableList{
  width: 100%;
  border: 0.5px solid #931719;
  border-collapse: collapse;
  caption{
    border: 0.5px solid #931719;
    border-top: none;
    border-bottom: none;
    line-height: 32px;
    text-align: left;
  }
  thead tr{
    height: 30px;
    th{
      font-weight: normal;
    }
  }
  tbody tr{
    height: 30px;
    text-align: center;
    &:last-child{
      border-bottom: none;
      td{
        border-bottom: none;
      }
    }
  }
}
ul:last-child{
  height: auto;
  border-top: none;
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
      return '结报单号' + this.detailsP.billNo
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
