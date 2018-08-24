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
          <span>余额: <em>{{this.detailsP.arAvailableAmt | regexNum}}</em></span>
        </li>
      </ul>
      <ul>
          <span>授让公司名：<em>{{rc.name}}</em></span>
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
              <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" :label="item.invoiceNo">{{item.invoiceNo}}(￥{{item.invoiceAfterTaxAmt|regexNum}})</el-checkbox>
            </el-checkbox-group>
            <!-- <el-checkbox v-for="item in detailsP.invoiceList" :key="item.invoiceNo" v-model="item.invoiceIsSelected">{{item.invoiceNo}}</el-checkbox> -->
          </span>
      </ul>
    </section>
    <section class="layout form">
      <el-row>
        <el-col :span="9" class="flex"><label>授让公司Id:</label><el-input v-model.trim="receiveCustId" placeholder="请输入授让公司Id"></el-input></el-col>
        <el-col :span="8" :offset="1" class="flex"><label style="width: 80px;">转让金额:</label><el-input v-model.number="transAmt" type="number" placeholder="请输入转让金额："></el-input></el-col>
        <el-col :span="6" v-if="sum">
          <el-tooltip class="item" effect="dark" :content="`已勾选发票金额合计:${thousandth(sum)}`" placement="top-start">
            <label class="sum-content">金额上限:{{sum | regexNum}}</label>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" class="flex">
          <label style="width: 40px;">备注:</label><el-input  type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model.trim="remark" :maxlength="255" ></el-input>
        </el-col>
      </el-row>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit" >确认</el-button>
      <el-button type="default" @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.layout.form {
  margin-top: 20px;
  .el-row {
    margin-bottom: 20px;
    padding-left: 5px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin-right: 5px
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
/* 转让弹窗 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      receiveCustId: '', // 授让公司id
      rc: {
        name: '', // 授让公司名称
        status: false // 是否正确
      },
      transAmt: 0, // 转让金额
      remark: '', // 备注
      checkList: [],
      sum: 0 // 勾选发票总金额
    }
  },
  watch: {
    receiveCustId: debounce(function (val) {
      this.axios.post('/commonCust/queryCustomer.do', { 'custId': val, 'companyName': '' }).then(res => {
        if (res.data.status) {
          this.rc.name = res.data.data.companyName
          this.rc.status = true
        } else {
          this.rc.name = '授让公司不存在'
          this.rc.status = false
        }
      })
    }, 1000)
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '转让'
    }
  },
  methods: {
    // 提交事件
    handleSubmit: debounce(submit, 1000, true),
    // 发票修改事件
    handleCheckedChange: handleCheckedChange,
    init: Init
  }
}
// 提交操作
function submit () {
  // 1.判断是否填写正确授让公司
  if (!this.rc.status) {
    this.$message({
      type: 'error',
      message: '请填写正确授让公司id'
    })
    return
  }
  // 2.将要发送的数据
  const data = {
    masterChainId: this.detailsP.masterChainId,
    receiveCustId: this.receiveCustId,
    transAmt: this.transAmt,
    remark: this.remark,
    transferSelectedInvoice: this.checkList.join(',')
  }
  // 3.获取已勾选发票
  const arr = []
  this.detailsP.invoiceList.forEach(item => {
    for (const iterator of this.checkList) {
      if (iterator === item.invoiceNo) {
        arr.push(item)
      }
    }
  })
  console.log(this.detailsP.invoiceListSelected)
  let arrc = this.detailsP.isMasterAr ? arr : arr.concat(...this.detailsP.invoiceListSelected)
  console.log(arrc)
  if (arrc.length <= 0) {
    this.$message({
      type: 'error',
      message: '未勾选发票'
    })
    return
  }
  // 4.获取勾选发票金额
  let sum = arrc.reduce((sum, currVal) => {
    let num = Number(currVal.invoiceAfterTaxAmt)
    if (isNaN(num)) {
      return
    }
    return sum + num
  }, 0)
  // 5.判断转让金额是否大于勾选发票总金额
  if (Number(this.transAmt) > sum) {
    this.$message({
      type: 'error',
      message: '转让金额不得大于勾选发票总额'
    })
    return
  }
  // 6.显示加载图标
  const loading = this.$loading(loadingConf.sub())
  // 7.发送数据给服务端
  this.axios.post('/myAr/initiateTrans.do', data).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data.message ? res.data.data.message : '返回结果错误，请联系管理员',
      type: type
    })
    loading.close() // 关闭加载图标
    // 操作成功 关闭弹窗
    if (res.data.status) {
      this.checkList = [] // 已选发票置空
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    }
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 改变选项
function handleCheckedChange (value) {
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
function Init () {
  this.checkList = []
  this.sum = 0
  this.transAmt = 0
  this.receiveCustId = ''
}
</script>
