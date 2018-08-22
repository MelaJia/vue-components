<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
     <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in this.detailsP.contractList" :key="item.contractId" :label="item.contractId"><a :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a></el-checkbox>
    </el-checkbox-group>
    <footer slot="footer">
      <el-button round @click="handleSubmit" type="primary" v-loading.fullscreen.lock="isLoading">同意签署</el-button>
       <el-button round @click="handleReject" type="warning" v-loading.fullscreen.lock="isLoading">拒绝退回</el-button>
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
import { debounce, postDataBase } from '@/util/util' // 防抖函数
/* 合同确认 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
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
    }),
    init: Init
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
  postDataBase.apply(this, ['/creditLoan/completeSigningDiscount.do', { loanId: this.detailsP.loanId }, true]).then(res => {
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
  postDataBase.apply(this, ['/creditLoan/rejectSigningDiscount.do', { loanId: this.detailsP.loanId }, true]).then(res => {
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
// 初始化
function Init () {
  this.checkList = []
}
</script>
