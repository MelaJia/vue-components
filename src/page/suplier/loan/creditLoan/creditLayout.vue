<template>
  <section>
    <dialog-info :visible-p.sync="dialogInfoVisible" :form="details"></dialog-info>
    <el-card class="box-card search-box-card">
      <div slot="header" class="clearfix" style="position:relative">
        <i class="el-icon-search"></i>
        <span>查询条件</span>
      </div>
      <el-row :style="{fontSize: fontSize-4 + 'px'}">
        <el-col :span="7">
          <div class="style-left">
            <pie ref="pie1" :data="pieArr[0]"></pie>
          </div>
          <div class="style-right">
            <p class="text-title">总限额：</p>
            <span class="text-money" :style="{fontSize: fontSize + 'px'}">{{details.totalCreditAmount |regexNum}}</span>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="style-left">
            <pie ref="pie1" :data="pieArr[2]"></pie>
          </div>
          <div class="style-right">
            <div>
            <p class="text-title">
              已融资金额:
            </p>
            <span class="text-money" :style="{fontSize: fontSize + 'px'}">{{details.usedCreditAmount |regexNum}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="style-left">
            <pie ref="pie1" :data="pieArr[1]"></pie>
          </div>
          <div class="style-right">
            <p class="text-title">
              可融资金额:
            </p>
            <span class="text-money" :style="{fontSize: fontSize + 'px'}">{{details.availableCreditAmount |regexNum}}</span>
          </div>
        </el-col>
        <el-col v-if="showButton" :span="3">
          <el-button class="button-apply" type="danger" @click="handleInfo">申请融资</el-button>
          <img class="icon-apply" src="@/assets/img/images/index_icon02.png" alt="" srcset="">
        </el-col>
      </el-row>
      <el-row :style="{fontSize: fontSize-4 + 'px'}" style="margin: 30px 20px 5px;color: #a5a5a5;">
        <el-col :span="24">
          当前保理商:
          <span class="black">{{details.factoringCustName | nullDealName}}</span>
        </el-col>
      </el-row>
    </el-card>
  </section>
</template>
<style scoped>
section {
  margin-bottom: 10px;
}
.el-col {
  font-weight: 500;
}
.style-right {
    margin: -105px 0 0px 160px;
}
.text-title {
    color: #5a5a5a;
    margin: 0 0 10px 0;
}
.button-apply{
  margin-top: 60px;
  padding-right: 30px;
}
.icon-apply{
  margin: 0 0 -1px -30px;
  height: 12px;
}
</style>

<script>
import Pie from '@/components/items/pie'
import Dialog from '@/mixins/suplier/Ar/Dialog'
import Common from '@/mixins/common'
import { getDataBase } from '@/util/util'
export default {
  props: {
    showButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fontSize: '24',
      pieArr: [],
      details: {
        totalCreditAmount: '', // 总限额
        availableCreditAmount: '', // 可融资金额
        usedCreditAmount: '' // 已融资金额
      }
    }
  },
  mixins: [Dialog, Common],
  mounted () {
    window.onresize = setHtmlFontSize
    const _this = this
    function setHtmlFontSize () {
      const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
      _this.fontSize = htmlWidth > 1380 ? 24 : 20
    }
    setHtmlFontSize()
    getDataBase.call(this, 'creditLoan/queryCreditAmount.do').then(res => {
      if (res) {
        this.details = res
        // 设置饼图数据
        this.pieArr = getPieDatas(res)
      }
    })
  },
  components: {
    Pie,
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/loan/creditLoan/loan/DialogLoan')
  },
  methods: {
    // 申请融资
    handleInfo () {
      this.dialogInfoVisible = true
    },
    /**
     * 刷新父页面数据
     * this.$parent.fresh()
     */
    fresh () {
      // 重新获取金额
      getDataBase.call(this, 'creditLoan/queryCreditAmount.do').then(res => {
        if (res) {
          this.details = res
          // 设置饼图数据
          this.pieArr = getPieDatas(res)
        }
      })
      this.$emit('refresh')
    }
  },
  filters: {
    nullDealName: function (val) {
      if (val === undefined || val === null || val === '') {
        return '当前还未分拨保理商'
      }
      return val
    }
  }
}
function getPieDatas (val) {
  let val1 = Number(val.availableCreditAmount)
  let val2 = Number(val.usedCreditAmount)
  let total = Number(val.totalCreditAmount)
  let arr = []
  arr.push(getPieData(100, val1, val2, '#3f97f8', '#68aa3c'))
  arr.push(getPieData((val1 / total).toFixed(2) * 100, val1, val2, '#3f97f8', 'rgba(0,0,0,0)'))
  arr.push(getPieData((val2 / total).toFixed(2) * 100, val1, val2, 'rgba(0,0,0,0)', '#68aa3c'))
  return arr
}
function getPieData (persent, val1, val2, color1, color2) {
  return {
    persent: persent,
    datas: [
      {
        value: val1,
        name: '可融金额',
        itemStyle: {
          normal: { color: color1 }
        }
      },
      {
        value: val2,
        name: '已融资金额',
        itemStyle: {
          normal: { color: color2 }
        }
      }
    ]
  }
}
</script>
