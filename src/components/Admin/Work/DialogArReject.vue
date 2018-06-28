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
      <el-button type="primary" @click="handleSubmit">确认</el-button>
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
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      form: {
        rejectedReason: '' // 拒绝理由
      }
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.custFromName
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true)
  }
}
// 错误提示函数
function erroShow (err, loading) {
  console.log(this)
  this.$alert(`网络错误${err}`, '系统提示', {
    confirmButtonText: '确定',
    callback: action => {
      // 关闭加载图标
      loading.close()
    }
  })
}
// 提交操作
function submit () {
  let param = {
    custId: this.detailsP.custId, // 客户Id
    buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
    rejectedReason: this.form.rejectedReason // 拒绝理由
  }
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  // 发送数据
  this.axios.post('/discountAudit/rejectDiscountAudit.do', param).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 关闭加载图标
    loading.close()
    this.handleClose() // 关闭弹窗
    this.$parent.fresh() // 刷新数据
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
</script>
