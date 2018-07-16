<template>
  <section>
    <dialog-info :visible-p.sync="dialogInfoVisible" :form="details"></dialog-info>
    <el-row>
      <el-col :span="6">
        总限额：
        <span class="red">3000000元</span>
      </el-col>
      <el-col :span="6">
        可融资金额:
        <span class="red">1175500元</span>
      </el-col>
      <el-col :span="6">
        已融资金额:
        <span class="red">1824500元</span>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" @click="handleInfo">申请融资</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<style scoped>
section {
  padding: 10px 10px;
}
.el-col {
  font-size: 24px;
  font-weight: 500;
}
.red {
  color: red;
}
</style>

<script>
import Dialog from '@/mixins/suplier/Ar/Dialog'
export default {
  data () {
    return {
      details: {
        canV: 12345
      }
    }
  },
  mixins: [Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/creditLoan/DialogLoan')
  },
  methods: {
    handleInfo () {
      this.dialogInfoVisible = true
    }
  }
}
</script>
