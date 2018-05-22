<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose">
     <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in this.detailsP.contractList" :key="item.contractId" :label="item.contractId">{{item.contractName}}</el-checkbox>
    </el-checkbox-group>
    <footer>
      <el-button @click="handleSubmit">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
footer {
  text-align: center;
}
</style>

<script>
import DialogClose from '@/mixins/Ar/DialogClose'
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose],
  data () {
    return {
      checkList: []
    }
  },
  methods: {
    handleSubmit () {
      if (this.checkList.length !== this.detailsP.contractList.length) {
        this.$message({
          type: 'error',
          message: '合同未勾选'
        })
        return
      }
      this.axios.post('/myAr2/completeSigningDiscount.do', { masterChainId: this.detailsP.masterChainId }).then(res => {
        let type = res.data.result === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.message,
          type: type
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作失败'
          })
        })
      })
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '合同签署'
    }
  }
}

</script>
