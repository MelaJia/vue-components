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
          <span>付款单位:{{this.detailsP.companyName}}</span>
        </li>
        <li>
          <span>贴现单位:{{this.detailsP.custFromName}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>付款银行:{{this.detailsP.payBankName}}</span>
        </li>
        <li>
          <span>付款银行账号:{{this.detailsP.payBankAccount}}</span>
        </li>
      </ul>
      <ul>
        <li>
          <span>收款银行:{{this.detailsP.receiveBankName}}</span>
        </li>
        <li>
          <span>收款银行账号:{{this.detailsP.receiveBankAccount}}</span>
        </li>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
      <el-button type="primary" @click="print($refs.print)">打印</el-button>
    </footer>
  </el-dialog>
  </section>
</template>
<style scoped>
#title {
  color: #931719;
  line-height: 24px;
  font-size: 18px;
}

section {
  padding: 0px 20px;
}

ul {
  position: relative;
  border-top: 0.5px solid #931719;
  margin: 0;
  border-right: 0.5px solid #931719;
  padding: 0;
  height: 32px;
}

ul:last-of-type {
  border-bottom: 0.5px solid #931719;
}

li {
  list-style: none;
  width: 48%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 32px;
  border-left: 0.5px solid #931719;
  text-align: left;
  padding-left: 5px;
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
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {

  }
}

</script>
