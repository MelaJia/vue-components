<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-row>
        <el-col :span="11" :offset="1" class="flex"><label>付款单位:</label><span>{{detailsP.companyName}}</span></el-col>
        <el-col :span="11" :offset="1" class="flex"><label>贴现客户:</label><span>{{detailsP.custFromName}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1" class="flex"><label>一级供应商:</label><span>{{detailsP.companyNameOfL1}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1" class="flex"><label>保理单位:</label>
          <el-select v-model="form.factoringCustId" clearable placeholder="保理单位">
            <el-option v-for="(item,index) in factoringCusts" :key="index" :label="item.factoringApId" :value="item.factoringCustId"></el-option>
          </el-select>
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
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 20px;
    font-weight: 600;
  }
  > span {
    height: 40px;
    line-height: 40px;
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
        custId: this.detailsP.custId, // 客户Id
        buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
        factoringCustId: '' // 保理单位
      },
      transAmt: 0,
      checkList: [],
      factoringCusts: [{
        factoringCustId: 1,
        factoringApId: '获取数据失败'
      }],
      isLoading: false // 请求数据中
    }
  },
  mounted () {
    this.axios.post('/commonCust/factoringCustomerList.do').then(res => {
      if (res.data.status) {
        this.factoringCusts = res.data.showData
      }
    }).catch((err) => {
      this.$message({
        type: 'info',
        message: err
      })
    })
  },
  computed: {
    getTitle () {
      return this.detailsP.custFromName
    }
  },
  methods: {
    handleSubmit () {
      if (this.form.factoringCustId.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请选择保理单位'
        })
        return
      }
      this.isLoading = true
      const param = {
        custId: this.detailsP.custId, // 客户Id
        buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
        factoringCustId: this.form.factoringCustId // 保理单位
      }
      console.log(param)
      this.axios.post('/discountAudit/approveDiscountAudit.do', param).then(res => {
        let type = res.data.result === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.message,
          type: type
        })
        this.isLoading = false
        this.handleClose() // 关闭弹窗
        this.$parent.fresh() // 刷新数据
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败'
        })
        this.isLoading = false
      })
    }
  }
}

</script>
