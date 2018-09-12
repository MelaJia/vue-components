<template>
<section id="print">
  <el-dialog  :custom-class="'dia-class '+detailsP.masterChainId" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="order-main-style">
      <div class="order-title-style">
        <el-row>
          <el-col><span>{{detailsP.applyAmt | regexNum}}</span>元</el-col>
          <el-col>还款日期:{{detailsP.repayDate|dateFormat}}</el-col>
        </el-row>
      </div>
      <div class="order-list-style">
        <table>
          <thead>
            <tr>
          <th><div class="cell">订单号</div></th>
          <th><div class="cell">金额</div></th>
          <th><div class="cell">融资金额</div></th>
        </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in detailsP.poLoanInfoList" :key="item.poNumber">
          <td><i v-if="item.isError" class="el-icon-error"></i><div class="cell">{{item.poNumber}}</div></td>
          <td><div class="cell">{{item.poAmount}}</div></td>
          <td>
            <div class="cell">
              <input-edit v-model="item.applyPoAmount" :idx="index" :max="item.poAmount" @check-up="handleCheck">
              </input-edit>
            </div>
          </td>
        </tr>
          </tbody>
        </table>
      </div>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSub" :disabled="canSub">确认</el-button>
    </footer>
  </el-dialog>
</section>
</template>
<style scoped lang="scss">
.order-main-style {
  width: 600px;
  margin: 0 auto;
}
.order-list-style i.el-icon-error {
  position: absolute;
  color: red;
}
.order-title-style {
  border-bottom: 1px solid #ebeef5;
  padding: 10px 20px;
  .el-row {
    div {
      text-align: center;
    }
    div + div {
      text-align: right;
    }
  }
  span {
    font-size: 24px;
    font-weight: 500;
  }
}
table {
  width: 600px;
  margin: 0 auto;
}
tr {
  th {
    border-bottom: 1px solid #ebeef5;
    padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    .cell {
      position: relative;
      word-wrap: normal;
      vertical-align: middle;
      width: 100%;
      line-height: 23px;
      padding-left: 10px;
      padding-right: 10px;
      display: inline-block;
      box-sizing: border-box;
      text-overflow: ellipsis;
    }
  }
  th + th,
  td + td {
    .cell {
      text-align: right;
    }
  }
  td {
    width: 33%;
    @extend th; //继承使用
    .cell {
      white-space: normal;
      word-break: break-all;
      line-height: 23px;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
    }
  }
}
.pointer {
  cursor: pointer;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
// 导入时间格式化过滤器
import Common from '@/mixins/common'
import { thousandth, postDataBase } from '@/util/util' // 发送数据函数
/* 待收Ar详情 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  components: {
    'input-edit': () =>
      import(/* webpackChunkName: 'Input' */ '@/components/Items/inputEdit')
  },
  data () {
    return {
      canSub: false
    }
  },
  computed: {
    getTitle () {
      return '提交申请'
    }
  },
  methods: {
    handleCheck (val) {
      console.log(val)
      this.detailsP.poLoanInfoList[val.idx].isError = val.isError
      let sum = 0
      this.canSub = false
      this.detailsP.poLoanInfoList.forEach(element => {
        if (element.isError) {
          this.canSub = true
        }
        element.applyPoAmount = Number(element.applyPoAmount)
        sum += element.applyPoAmount
      })
      this.detailsP.applyAmt = sum
    },
    handleSub: submit
  },
  filters: {
    // 千分位
    regexNum: function (val) {
      return `${thousandth(val)}`
    }
  }
}
function submit () {
  console.log(this.detailsP)
  postDataBase.call(this, 'supplierOrderLoan/supplierOrderApplyDiscount.do', this.detailsP, true).then(res => {
    if (res.data.status) {
      // 成功刷新数据
      this.handleClose() // 关闭弹窗
      console.log('删除勾选')
      this.$parent.handleClearSelection() // 删除勾选
      this.$parent.fresh() // 刷新数据
    }
  })
}
</script>
