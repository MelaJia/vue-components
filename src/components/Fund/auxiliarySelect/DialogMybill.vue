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
          <span>销方税号: <em>{{this.detailsP.sellerTaxNo}}</em></span>
        </li>
      </ul>
      <ul>
          <span>销方银行账号: <em>{{this.detailsP.sellerBankNo}}</em></span>
      </ul>
      <ul>
          <span>销方联系方式: <em>{{this.detailsP.sellerPhone}}</em></span>
      </ul>
      <ul>
        <li>
          <span>购方名称: <em>{{this.detailsP.buyerName}}</em></span>
        </li>
        <li>
          <span>购方税号: <em>{{this.detailsP.buyerTaxNo}}</em></span>
        </li>
      </ul>
      <ul>
          <span>购方银行账号: <em>{{this.detailsP.buyerBankNo}}</em></span>
      </ul>
      <ul>
          <span>购方联系方式: <em>{{this.detailsP.buyerPhone}}</em></span>
      </ul>
      <ul>
        <li>
          <span>金额: <em>{{this.detailsP.amount | regexNum}}</em></span>
        </li>
        <li>
          <span>税额: <em>{{this.detailsP.taxAmount | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>税价合计: <em>{{this.detailsP.total | regexNum}}</em></span>
        </li>
        <li>
          <span>录入日期: <em>{{this.detailsP.entryDate}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>状态: <em>{{this.detailsP.statusName}}</em></span>
        </li>
        <li>
          <span>发送状态: <em>{{this.detailsP.postStatusName}}</em></span>
        </li>
      </ul>
      <table class="tableList" border="1">
        <thead>
          <tr>
            <th>进货验收单号</th>
            <th>进货验收单金额</th>
            <th>进货验收单日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(item,index) in this.detailsP.grnDetail" :key="index">
            <td>{{item.grnNumber}}</td>
            <td>{{item.grnAmount | regexNum}}</td>
            <td>{{item.grnDate}}</td>
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
  }
}
span {
  line-height: 32px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import {
  baseUrl
} from '@/config/env.js'
export default {
  props: ['visibleP', 'detailsP', 'filelist'],
  mixins: [DialogClose, Common],
  data () {
    return {
      vendorCode: this.detailsP.vendorCode
    }
  },
  computed: {
    getTitle () {
      return '对账单号' + this.detailsP.statementNo
    }
  },
  mounted () {
    console.log(this.vendorCode)
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
