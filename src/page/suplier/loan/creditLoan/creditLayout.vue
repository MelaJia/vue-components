<template>
  <section>
    <dialog-info :visible-p.sync="dialogInfoVisible" :form="details"></dialog-info>
    <el-row :style="{fontSize: fontSize + 'px'}">
      <el-col :span="7">
        总限额：
        <span class="red">{{details.totalCreditAmount |regexNum}}</span>
      </el-col>
      <el-col :span="7">
        可融资金额:
        <span class="red">{{details.availableCreditAmount |regexNum}}</span>
      </el-col>
      <el-col :span="7">
        已融资金额:
        <span class="red">{{details.usedCreditAmount |regexNum}}</span>
      </el-col>
      <el-col v-if="showButton" :span="3">
        <el-button type="danger" @click="handleInfo">申请融资</el-button>
      </el-col>
    </el-row>
    <el-row :style="{fontSize: fontSize + 'px'}">
      <el-col :span="7">
        当前保理商:
        <span class="black">{{details.totalCreditAmount |regexNum}}</span>
      </el-col>
    </el-row>
  </section>
</template>
<style scoped>
section {
  padding: 10px 10px;
}
.el-col {
  font-weight: 500;
}
.red {
  color: red;
}
</style>

<script>
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
      }
    })
  },
  components: {
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
        }
      })
      this.$emit('refresh')
    }
  }
}
</script>
