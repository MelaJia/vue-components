<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <li>
          <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
        </li>
        <li>
          <span>对手单位: <em>{{this.detailsP.custToName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>AR来源: <em>{{this.detailsP.arSourceDesc}}</em></span>
        </li>
        <li>
          <span>状态: <em>{{this.detailsP.arStatusTypeName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>币别: <em>{{this.detailsP.currencyDesc}}</em></span>
        </li>
        <li>
          <span>预计回款日期: <em>{{this.detailsP.billPayDate | dateFormat}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>票面金额: <em>{{this.detailsP.company}}</em></span>
        </li>
        <li>
          <span>可用金额: <em>{{this.detailsP.arAvailableAmt}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
            <span>贴现保理公司：山西英和</span>
        </li>
      </ul>
      <ul>
          <span>已勾选发票:
            <div class="el-check-group inline-block">
              <el-checkbox v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}(￥{{item.invoiceAfterTaxAmt}})</el-checkbox>
            </div>
          </span>
      </ul>
      <ul>
          <span>未勾选发票:
            <el-checkbox-group v-model="checkList" class="inline-blox">
              <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" :label="item.invoiceNo">{{item.invoiceNo}}(￥{{item.invoiceAfterTaxAmt}})</el-checkbox>
            </el-checkbox-group>
            <!-- <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" v-model="item.invoiceIsSelected">{{item.invoiceNo}}</el-checkbox> -->
          </span>
      </ul>
      <!-- <p>
            <span>最终付款单位: <em>{{this.detailsP.company}}</em></span>
            <span>最终付款账户：{{this.detailsP.bankCompaney}}</em></span>
            <el-tooltip :content="'最终付款账号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
                <span>最终付款账号: <em>{{this.detailsP.bankAccount}}</em></span>
            </el-tooltip>
        </p>
        <p>
            <span>AR来源: <em>{{this.detailsP.come}}</em></span>
            <span>状态: <em>{{this.detailsP.status}}</em></span>
            <span>币别: <em>{{this.detailsP.moneyType}}</em></span>
        </p>
        <p>
            <span>票面金额: <em>{{this.detailsP.company}}</em></span>
            <span>可用余额: <em>{{this.detailsP.money_can}}</em></span>
            <span>预计回款日期: <em>{{this.detailsP.arriveDate}}</em></span>
        </p> -->
    </section>
    <section class="layout form">
      <el-row>
        <el-col :span="8" class="flex"><label>贴现金额：</label><el-input v-model.number="transAmt" placeholder="请输入转让金额："></el-input></el-col>
      </el-row>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.layout.form {
  margin-top: 10px;
}
.layout.form .flex {
  display: flex;
  > label {
    width: 120px;
    height: 40px;
    line-height: 40px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置

export default {
  name: 'ardiscount', // 贴现弹窗
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      transAmt: 0,
      checkList: []
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '贴现'
    }
  },
  methods: {
    handleSubmit: debounce(handleSubmit, 1000, true)
  }
}
function handleSubmit () {
  const data = {
    masterChainId: this.detailsP.masterChainId,
    discountAmt: this.transAmt,
    discountSelectedInvoice: this.checkList.join(',')
  }
  // 已勾选发票
  const arr = []
  this.detailsP.invoiceList.forEach(item => {
    for (const iterator of this.checkList) {
      if (iterator === item.invoiceNo) {
        arr.push(item)
      }
    }
  })
  let arrc = this.detailsP.isMasterAr ? arr : arr.concat(...this.detailsP.invoiceListSelected)
  if (arrc.length <= 0) {
    this.$message({
      type: 'error',
      message: '未勾选发票'
    })
    return
  }
  let sum = arrc.reduce((sum, currVal) => {
    let num = Number(currVal.invoiceAfterTaxAmt)
    if (isNaN(num)) {
      return
    }
    return sum + num
  }, 0)
  if (Number(this.transAmt) > sum) {
    this.$message({
      type: 'error',
      message: '贴现金额不得大于勾选发票总额'
    })
    return
  }
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/myAr/initiateDiscount.do', data).then(res => {
    console.log(res)
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data.message ? res.data.data.message : '返回结果错误，请联系管理员',
      type: type
    })
    // 关闭加载图标
    loading.close()
    // 操作成功 关闭弹窗
    if (res.data.status) {
      // 关闭弹窗
      this.handleClose()
      // 刷新数据
      this.$parent.fresh()
    }
  }).catch((err) => {
    console.log(err)
    this.$message({
      type: 'info',
      message: '操作失败'
    })
    // 关闭加载图标
    loading.close()
  })
}

</script>
