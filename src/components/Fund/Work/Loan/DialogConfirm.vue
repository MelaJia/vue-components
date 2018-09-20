<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
     <header slot="title" v-show="step!==1">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section v-if="step===1">
      <span class="note">温馨提示</span>
      <p>该协议内容由保理方xxx拟定，不由本平台提供，确认签署前需自行对协议内容进行审核</p>
    </section>
    <section v-if="step===2">
        <span>单号为{{getTitle}}的贴现合同确认发起确认</span>
    </section>
    <section style="padding-left:200px" v-if="step===3">
      <verify :captcha.sync="captcha"></verify>
    </section>
    <footer slot="footer" v-if="step===1">
        <el-button round @click="handleNext" type="primary" >我知道了</el-button>
    </footer>
    <footer slot="footer" v-if="step===2">
        <el-button round @click="handleCancel" type="default" >取消</el-button>
        <el-button round @click="handleConfirm" type="primary" >确认</el-button>
    </footer>
    <footer slot="footer" v-if="step===3">
        <el-button round @click="handleSubmit" type="primary" >确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
footer {
  text-align: center;
}
.note {
  color: #f00;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce, postDataBase } from '@/util/util' // 防抖函数
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
  methods: {
    // 取消
    handleCancel () {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    },
    handleConfirm () {
      this.step = 3
    },
    handleSubmit: debounce(handleSubmit, 1000, {
      'leading': true,
      'trailing': false
    })
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '合同签署'
    }
  }
}
function handleSubmit () {
  if (this.captcha.length === 0) {
    this.$message({
      type: 'error',
      message: '验证码不能为空'
    })
    return
  }
  postDataBase.apply(this, ['/loan2/confirmInitiateSigning.do', { masterChainId: this.detailsP.masterChainId, verificationCode: this.captcha }, true]).then(res => {
    // 操作成功 关闭弹窗
    if (res.data.status) {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    }
  }).catch((err) => {
    // 错误提示
    console.log(err)
  })
}
</script>
