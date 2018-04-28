<template>
  <el-dialog title="批量AR确认" :visible.sync="visibleP" :before-close="handleClose">
    <el-table :data="multipleSelectionP" style="width: 100%">
      <el-table-column property="id" label="AR单号" min-width="150"></el-table-column>
      <el-table-column property="money" label="金额" min-width="180"></el-table-column>
      <el-table-column property="status" label="状态" min-width="100"></el-table-column>
      <el-table-column property="arriveDate" label="预计回款日期" min-width="150"></el-table-column>
    </el-table>
    <el-radio-group v-model="radio2">
      <el-radio :label="3">合同1</el-radio>
      <el-radio :label="6">合同2</el-radio>
    </el-radio-group>
    <footer>
      <el-button>确认</el-button>
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
  props: ['visibleP', 'multipleSelectionP'],
  mixins: [DialogClose],
  data () {
    return {
      radio2: 3
    }
  },
  methods: {

  }
}

</script>
