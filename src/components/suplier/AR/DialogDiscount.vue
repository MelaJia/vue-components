<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <ul>
        <span>付款单位: <em>{{this.detailsP.companyName}}</em></span>
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
          <span>票面金额: <em>{{this.detailsP.billBookAmt | regexNum}}</em></span>
        </li>
        <li>
          <span>可用金额: <em>{{this.detailsP.arAvailableAmt}}</em></span>
        </li>
      </ul>
      <ul>
        <span>贴现保理公司：{{this.detailsP.factorCompany}}</span>
      </ul>
      <ul class="height-auto">
          <span>已勾选发票:
            <div class="el-check-group inline-block">
              <el-checkbox v-for="item in detailsP.invoiceListSelected" :key="item.invoiceNo" v-model="item.invoiceIsSelected" disabled>{{item.invoiceNo}}(￥{{item.invoiceAfterTaxAmt}})</el-checkbox>
            </div>
          </span>
      </ul>
      <ul class="height-auto">
          <span>未勾选发票:
            <el-checkbox-group v-model="checkList" class="inline-blox" @change="handleCheckedChange">
              <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" :label="item.invoiceNo">{{item.invoiceNo}}(￥{{item.invoiceAfterTaxAmt |regexNum}})</el-checkbox>
            </el-checkbox-group>
            <!-- <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" v-model="item.invoiceIsSelected">{{item.invoiceNo}}</el-checkbox> -->
          </span>
      </ul>
    </section>
    <section class="layout form">
      <el-row>
        <el-col :span="8" class="flex"><label>贴现金额：</label><el-input v-model.number="transAmt" placeholder="请输入贴现金额：："></el-input></el-col>
        <el-col :span="6">
          <el-tooltip class="item" effect="dark" :content="`已勾选发票总金额${thousandth(sum)}`" placement="top-start">
            <label class="sum-content">{{sum | regexNum}}</label>
          </el-tooltip>
        </el-col>
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
.sum-content{
  height: 40px;
  line-height: 40px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置

export default {
  name: 'ardiscount', // 贴现弹窗
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      transAmt: 0,
      checkList: [],
      sum: 0 // 勾选发票总金额
    }
  },
  watch: {
    getTitle: function () {
      // 已选发票置空
      console.log('发票置空')
      this.checkList = []
      this.sum = []
      this.transAmt = 0
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '贴现'
    }
  },
  methods: {
    handleSubmit: debounce(handleSubmit, 1000, true),
    // 发票修改事件
    handleCheckedChange: handleCheckedChange
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
      // 已选发票置空
      this.checkList = []
      // 关闭弹窗
      this.handleClose()
      // 刷新数据
      this.$parent.fresh()
    }
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 改变选项
function handleCheckedChange (value) {
  console.log(value)
  // 1.获取已勾选发票
  const arr = []
  this.detailsP.invoiceList.forEach(item => {
    for (const iterator of value) {
      if (iterator === item.invoiceNo) {
        arr.push(item)
      }
    }
  })
  // 2.计算勾选发票金额
  let sum = arr.reduce((sum, currVal) => {
    let num = Number(currVal.invoiceAfterTaxAmt)
    if (isNaN(num)) {
      return
    }
    return sum + num
  }, 0)
  // 赋值
  this.transAmt = this.sum = sum
}
</script>
