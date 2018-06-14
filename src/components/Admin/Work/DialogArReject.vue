<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-row>
        <el-col :span="16" :offset="4" class="flex"><span>确定拒绝{{detailsP.companyName}}公司的申请贴现请求？</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4" class="flex"><label>拒绝理由:</label>
          <el-input type="textarea" v-model="form.rejectedReason"></el-input>
        </el-col>
      </el-row>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit" :loading="isLoading">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
.layout.form {
  margin-top: 10px;
  > .el-row {
    margin-top: 10px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 80px;
    height: 40px;
    line-height: 40px;
  }
  > span {
    height: 40px;
    line-height: 40px;
    font-weight: 600;
  }
  > .el-select,
  > .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      form: {
        rejectedReason: '' // 拒绝理由
      },
      isLoading: false // 请求数据中
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.custFromName
    }
  },
  methods: {
    handleSubmit () {
      let param = {
        custId: this.detailsP.custId, // 客户Id
        buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
        rejectedReason: this.form.rejectedReason // 拒绝理由
      }
      this.isLoading = true
      this.axios.post('/discountAudit/rejectDiscountAudit.do', param).then(res => {
        let type = res.data.data.result === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.data.message,
          type: type
        })
        this.isLoading = true
        this.handleClose() // 关闭弹窗
        this.$parent.fresh() // 刷新数据
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败'
        })
        this.isLoading = true
      })
    }
  }
}

</script>
