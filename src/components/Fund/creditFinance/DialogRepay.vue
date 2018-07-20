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
          <span>还款单位: <em>{{this.detailsP.corpName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>还款银行名称: <em>{{this.detailsP.corpName}}</em></span>
        </li>
        <li>
          <span>还款银行账号: <em>{{this.detailsP.corpName}}</em></span>
        </li>
      </ul>
      <ul>
        <li>
          <span>应还款金额: <em>{{this.detailsP.totalRepayAmt}}</em></span>
        </li>
        <li>
          <span>币别: <em>{{this.detailsP.currency}}</em></span>
        </li>
      </ul>
      <ul>
        <span>客户还款金额:</span> <input class="repayInput" type="number" min="0" v-model="repayAmt" placeholder="请输入金额"> <span>代入应还金额</span>
      </ul>
      <ul>
        <li>
          <span>实际还款日期: <em>{{this.detailsP.actualRepayDate}}</em></span>
        </li>
      </ul>
      <ul class="height-auto">
        <span>
          <div class="a-link-group inline-block">
            合同:<a v-for="item in this.detailsP.contractList" :key="item.contractId" :href="item.contractUrl" target="_blank">{{item.contractName}}</a>
          </div>
        </span>
      </ul>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleRepay">还款</el-button>
      <el-button type="default" @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</section>
</template>

<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
ul:last-child{
  height: auto;
  span{
    padding-left: 0;
    line-height: 45px;
  }
}
.repayInput{
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  text-indent: 4px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  data () {
    return {
      repayAmt: ''
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.loanId + '还款'
    }
  },
  methods: {
    // 还款
    handleRepay () {
      if (this.repayAmt === '' || this.repayAmt === null) {
        this.$message({
          message: '请输入还款金额',
          type: 'warning'
        })
      } else {
        const loading = this.$loading(loadingConf.sub())
        this.axios.post('/factoringCreditLoan/repayLoan.do', {custId: this.detailsP.custId, factoringCustId: this.detailsP.factoringCustId, loanId: this.detailsP.loanId, repayAmt: this.repayAmt}).then(res => {
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
          // 错误提示
          erroShow.call(this, err, loading)
        })
      }
    }
  }
}
</script>
