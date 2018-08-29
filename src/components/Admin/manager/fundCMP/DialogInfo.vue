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
          <span>企业状态: <em>{{this.detailsP.isUsableDesc}}</em></span>
        </li>
        <li>
          <span>所属客户经理: <em>{{this.detailsP.sourceName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>企业电话: <em>{{this.detailsP.companyPhone}}</em></span>
        </li>
        <li>
          <span>企业地址:
             <el-tooltip class="item" effect="dark" :content="detailsP.companyAddress" placement="top-start">
               <em>{{this.detailsP.companyAddress}}</em>
              </el-tooltip>
            </span>
        </li>
      </ul>
      <ul>
        <li>
          <span>统一社会信用代码: <em>{{this.detailsP.creditCode}}</em></span>
        </li>
        <li>
          <span>纳税人识別号: <em>{{this.detailsP.payTaxesNumber}}</em></span>
        </li>
      </ul>
      <ul>
        <li class="wd-3">
          <span>供应商代码: <em>{{this.detailsP.vendorCodes}}</em></span>
        </li>
        <li class="wd-3">
          <span>注册资本: <em>{{this.detailsP.registeredCapital}} ({{getRegisteredCurrencyType}})</em></span>
        </li>
        <li class="wd-3">
          <span>实收资本: <em>{{this.detailsP.paidinCapital}} ({{getPaidinCurrencyType}})</em></span>
        </li>
      </ul>
      <ul>
        <li class="wd-3">
          <span>公司成立日期: <em>{{this.detailsP.establishDate|dateFormat}}</em></span>
        </li>
        <li class="wd-3">
          <span>营业执照开始日期: <em>{{this.detailsP.businessStartDate|dateFormat}}</em></span>
        </li>
        <li class="wd-3">
          <span>营业执照结束日期: <em>{{this.detailsP.businessEndDate|dateFormat}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>经营范围: <em>{{this.detailsP.mainProducts}}</em></span>
        </li>
        <li>
          <span>公司登记日期: <em>{{this.detailsP.companyRegisterDate|dateFormat}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>企业法人: <em>{{this.detailsP.legalPerson}}</em></span>
        </li>
        <li>
          <span>企业法人身份证号: <em>{{this.detailsP.legalIdcardNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>企业法人电话: <em>{{this.detailsP.legalPhone}}</em></span>
        </li>
        <li>
          <span>企业法人邮箱: <em>{{this.detailsP.legalMail}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>联系人: <em>{{this.detailsP.contactPerson}}</em></span>
        </li>
        <li>
          <span>联系人身份证号: <em>{{this.detailsP.contactIdcardNum}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>联系人手机: <em>{{this.detailsP.contactPhone}}</em></span>
        </li>
        <li>
          <span>联系人邮箱: <em>{{this.detailsP.contactMail}}</em></span>
        </li>
      </ul>
      <ul>
        <li class="wd-3">
          <span>企业银行名称: <em>{{this.detailsP.bankName}}</em></span>
        </li>
        <li class="wd-3">
          <el-tooltip :content="'企业银行账户:'+this.detailsP.bankAccount" placement="bottom" effect="light">
            <span>企业银行账户: <em>{{this.detailsP.bankAccount}}</em></span>
          </el-tooltip>
        </li>
        <li class="wd-3">
          <el-tooltip :content="'企业银行支行:'+this.detailsP.accountOpeningBranch" placement="bottom" effect="light">
            <span>企业银行支行: <em>{{this.detailsP.accountOpeningBranch}}</em></span>
          </el-tooltip>
        </li>
      </ul>
       <el-row>
          <el-col :span="6">
            <p>公司LOGO</p>
            <img :src="detailsP.logoUrl" width="100px" preview="0" preview-text="公司LOGO">
          </el-col>
          <el-col :span="6">
            <p>营业执照</p>
            <img :src="detailsP.licenseUrl" width="100px" preview="0" preview-text="营业执照">
          </el-col>
          <el-col :span="6">
            <p>组织机构代码证</p>
            <img :src="detailsP.organizationUrl" width="100px" preview="0" preview-text="组织机构代码证">
          </el-col>
          <el-col :span="6">
            <p>税务登记证</p>
            <img :src="detailsP.taxUrl" width="100px" preview="0" preview-text="税务登记证">
          </el-col>
        </el-row>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">确认</el-button>
    </footer>
  </el-dialog>
  </section>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import commonDatas from '@/mixins/commonDatas' // 货币类型
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common, commonDatas],
  data () {
    return {
      radio2: 3
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.companyName
    },
    // 实收资本单位
    getPaidinCurrencyType () {
      // 全部索引
      let result = null
      if (this.moneyTypes) {
        result = this.moneyTypes.find(val => {
          return val.currencyId === this.detailsP.paidinCurrencyType
        })
      }
      return result ? result.currencyDesc : ''
    },
    // 注册资本单位
    getRegisteredCurrencyType () {
      // 全部索引
      let result = null
      if (this.moneyTypes) {
        result = this.moneyTypes.find(val => {
          return val.currencyId === this.detailsP.registeredCurrencyType
        })
      }
      return result ? result.currencyDesc : ''
    }
  },
  updated () {
    this.$previewRefresh()
  },
  methods: {

  }
}

</script>
