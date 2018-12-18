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
          <el-tooltip :content="'付款单位:'+this.detailsP.companyName" placement="bottom" effect="light">
            <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'贴现单位:'+this.detailsP.custFromName" placement="bottom" effect="light">
            <span>贴现单位: <em>{{this.detailsP.custFromName}}</em></span>
          </el-tooltip>
        </li>
      </ul>
      <ul>
          <span>一级供应商: <em>{{this.detailsP.companyNameOfL1}}</em></span>
      </ul>
    </section>
    <section class="section">
      <ul>
        <li>
          <el-tooltip :content="'付款银行:'+this.detailsP.payBankName" placement="bottom" effect="light">
          <span>付款银行: <em>{{this.detailsP.payBankName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <span>付款银行账号: <em>{{this.detailsP.payBankAccount}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <el-tooltip :content="'收款银行:'+this.detailsP.receiveBankName" placement="bottom" effect="light">
          <span>收款银行: <em>{{this.detailsP.receiveBankName}}</em></span>
          </el-tooltip>
        </li>
        <li>
          <span>收款银行账号: <em>{{this.detailsP.receiveBankAccount}}</em></span>
        </li>
      </ul>
      <ul v-if="this.detailsP.auditedTypeId===2">
          <li>
            <span>状态: <em>{{this.detailsP.auditedTypeName}}</em></span>
          </li>
      </ul>
      <ul v-if="this.detailsP.auditedTypeId===2" class="height-auto">
          <span>拒绝理由:
            <em>{{this.detailsP.rejectedReason}}</em>
          </span>
      </ul>
      <ul v-else>
        <li>
          <span>状态: <em>{{this.detailsP.auditedTypeName}}</em></span>
        </li>
        <li v-if="this.detailsP.auditedTypeId===1">
          <span>保理方: <em>{{this.detailsP.custToName}}</em></span>
        </li>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose" class="searchBtn" size="small">确认</el-button>
      <el-button @click="print('print')" type="primary" size="small" plain>打印</el-button>
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
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  data () {
    return {
      radio2: 3
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.custId + '详情'
    }
  },
  methods: {

  }
}

</script>
