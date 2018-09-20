<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
     <header slot="title" v-show="step!==1">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section v-if="step===1">
      <span class="note">温馨提示</span>
      <p>该协议内容由保理方{{this.detailsP.transUnitName}}拟定，不由本平台提供，确认签署前需自行对协议内容进行审核</p>
    </section>
   <section v-if="step===2">
      <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in this.detailsP.contractList" :key="item.contractId" :label="item.contractId"><a :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a></el-checkbox>
      </el-checkbox-group>
    </section>
    <section style="padding-left:200px" v-if="step===3">
      <verify :captcha.sync="captcha"></verify>
    </section>
    <footer slot="footer" v-if="step===1">
        <el-button round @click="handleNext" type="primary" >我知道了</el-button>
    </footer>
    <footer slot="footer" v-if="step===2">
        <el-button round @click="beforeSubmit" type="primary" v-loading.fullscreen.lock="isLoading">同意签署</el-button>
        <el-button round @click="handleReject" type="warning" v-loading.fullscreen.lock="isLoading">拒绝退回</el-button>
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
  color:#f00;
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
    handleSubmit: debounce(submit, 1000, {
      'leading': true,
      'trailing': false
    }),
    handleReject: debounce(reject, 1000, {
      'leading': true,
      'trailing': false
    })
  },
  computed: {
    getTitle () {
      return this.detailsP.loanId + '合同签署'
    }
  }
}
function submit () {
  if (this.checkList.length !== this.detailsP.contractList.length) {
    this.$message({
      type: 'error',
      message: '有未勾选合同'
    })
    return
  }
  if (this.captcha.length === 0) {
    this.$message({
      type: 'error',
      message: '验证码不能为空'
    })
    return
  }
  postDataBase.apply(this, ['/supplierOrderLoan/supplierOrderCompleteSigningDiscount.do', { loanId: this.detailsP.loanId, verificationCode: this.captcha }, true]).then(res => {
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
// 拒绝操作
function reject () {
  // if (this.checkList.length !== this.detailsP.contractList.length) {
  //   this.$message({
  //     type: 'error',
  //     message: '有未勾选合同'
  //   })
  //   return
  // }
  postDataBase.apply(this, ['/supplierOrderLoan/supplierOrderRejectSigningDiscount.do', { loanId: this.detailsP.loanId }, true]).then(res => {
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
