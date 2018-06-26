<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
     <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in this.detailsP.contractList" :key="item.contractId" :label="item.contractId"><a href="http://" @click.prevent="constractHandle(item.contractNo)">{{item.contractName}}</a></el-checkbox>
    </el-checkbox-group>
    <footer slot="footer">
      <el-button round @click="handleSubmit" type="primary" :loading="isLoading">同意签署</el-button>
       <el-button round @click="handleReject" type="warning" :loading="isLoading">拒绝退回</el-button>
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
import { debounce } from '@/util/util' // 防抖函数
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
    handleSubmit: debounce(function () {
      this.isLoading = true
      if (this.checkList.length !== this.detailsP.contractList.length) {
        this.$message({
          type: 'error',
          message: '有未勾选合同'
        })
        this.isLoading = false
        return
      }
      this.axios.post('/myAr/completeSigningDiscount.do', { masterChainId: this.detailsP.masterChainId }).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
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
    }, 1000, {
      'leading': true,
      'trailing': false
    }),
    handleReject: debounce(function () {
      this.isLoading = true
      if (this.checkList.length !== this.detailsP.contractList.length) {
        this.$message({
          type: 'error',
          message: '有未勾选合同'
        })
        this.isLoading = false
        return
      }
      this.axios.post('/myAr/cancelSigningDiscount.do', { masterChainId: this.detailsP.masterChainId }).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
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
    }, 1000, {
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

</script>
