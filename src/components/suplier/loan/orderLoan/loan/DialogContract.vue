<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose" :close-on-click-modal="false">
     <header slot="title" v-show="step!==1">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section v-if="step===1">
      <i class="el-icon-warning" style="color:#F54F41;font-size:24px;"></i>
      <p>该协议内容由保理方{{this.detailsP.factoringCustName}}拟定，不由本平台提供，确认签署前需自行对协议内容进行审核</p>
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
        <el-button @click="handleNext" class="searchBtn" type="primary" size="small" >我知道了</el-button>
    </footer>
    <footer slot="footer" v-if="step===2">
        <el-button v-if="detailsP.contractSignType === 1" @click="beforeSubmit" class="searchBtn" type="primary" size="small" v-loading.fullscreen.lock="isLoading">同意签署</el-button>
        <el-button v-else @click="handleSubmit" class="searchBtn" type="primary" size="small" v-loading.fullscreen.lock="isLoading">同意签署</el-button>
        <el-button  @click="handleReject" class="rejectBtn" type="warning" size="small" v-loading.fullscreen.lock="isLoading">拒绝退回</el-button>
    </footer>
    <footer slot="footer" v-if="step===3">
        <el-button @click="handleSubmit" type="primary" >确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_newUI.scss";
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
  // 电子合同需要验证码
  if (this.detailsP.contractSignType === 1 && this.captcha.length === 0) {
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
