<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
     <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section style="padding-left:200px">
      <verify ref="verify" :captcha.sync="captcha"></verify>
    </section>
    <footer slot="footer">
        <el-button round @click="handleSubmit" type="primary" >确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
footer {
  text-align: center;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
import mixVerify from '@/mixins/common/dialogContract'
/* 合同确认 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common, mixVerify],
  data () {
    return {
      checkList: [],
      isLoading: false
    }
  },
  destroyed () {
    console.log('销毁')
  },
  methods: {
    handleSubmit: debounce(submit, 1000, {
      'leading': true,
      'trailing': false
    }),
    init: Init
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '合同签署'
    }
  }
}
function submit () {
  if (this.captcha.length === 0) {
    this.$message({
      type: 'error',
      message: '验证码不能为空'
    })
    return
  }
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/myAr/completeSigningDiscount.do', { masterChainId: this.detailsP.masterChainId, verificationCode: this.captcha }).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 关闭加载图标
    loading.close()
    // 操作成功 关闭弹窗
    if (res.data.status) {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    }
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
// 初始化
function Init () {
  this.captcha = ''
  if (this.$refs.verify) {
    this.$refs.verify.init()
  }
}
</script>
