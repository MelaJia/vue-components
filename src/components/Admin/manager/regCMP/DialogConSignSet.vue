<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-row>
        <el-radio v-model="radio" label="1">电子签章</el-radio>
        <el-radio v-model="radio" label="2">线下上传</el-radio>
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
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      radio: '1',
      transAmt: 0,
      checkList: [],
      factoringCusts: [{
        factoringCustId: 1,
        factoringApId: '获取数据失败'
      }]
    }
  },
  mounted () {
  },
  computed: {
    getTitle () {
      return this.detailsP.companyName
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true)
  }
}
// 提交操作
function submit () {
  const param = {
    custId: this.detailsP.custId, // 客户Id
    contractSignedType: this.radio // 付款法人代码
  }
  console.log(param)
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/sysCompanyUserManager/contractSignedTypeConfig.do', param).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      showClose: true,
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 关闭加载图标
    loading.close()
    // 操作成功关闭弹窗刷新数据
    if (res.data.status) {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    }
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
</script>
