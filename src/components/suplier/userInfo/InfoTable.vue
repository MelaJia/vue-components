<template>
  <div>
    <dialog-info :visible-p.sync="dialogInfoVisible" :form="details"></dialog-info>
    <component v-bind:is="currentTabComponent" :visible-p.sync="dialogVisible" :form="details"></component>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="idtType"
        label="认证类型"
        align="center"
        min-width="280">
      </el-table-column>
      <el-table-column
        prop="idtResult"
        label="认证结果"
        align="center"
        min-width="280">
      </el-table-column>
      <el-table-column
      min-width="180"
        align="center"
        label="操作">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.$index,scope.row,scope.store)" type="text">查看</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Info' */ './DialogInfo'),
    'dialog-bank': () =>
      import(/* webpackChunkName: 'Info' */ './DialogBank'),
    'dialog-email': () =>
      import(/* webpackChunkName: 'Info' */ './DialogEmail')
  },
  data () {
    return {
      tableData: [{
        idtType: '企业',
        idtResult: '王小虎',
        typeId: '1'
      }, {
        idtType: '企业银行信息',
        idtResult: '平安深圳龙华支行 55523656563232',
        typeId: '2'
      }, {
        idtType: '企业法人',
        idtResult: '56525622**********66      吴人',
        typeId: '3'
      }, {
        idtType: '企业法人手机',
        idtResult: '135266546526',
        typeId: '4'
      }, {
        idtType: '企业法人邮箱',
        idtResult: '王小虎',
        typeId: '5'
      }, {
        idtType: '企业联系人',
        idtResult: '王小虎',
        typeId: '6'
      }, {
        idtType: '企业联系人手机',
        idtResult: '王小虎',
        typeId: '7'
      }, {
        idtType: '企业联系人邮箱',
        idtResult: '王小虎',
        typeId: '8'
      }],
      currentTabComponent: 'dialog-info',
      compArr: ['dialog-info', 'dialog-bank', 'dialog-info', 'dialog-info', 'dialog-email', 'dialog-info', 'dialog-info', 'dialog-info'],
      dialogInfoVisible: false,
      dialogVisible: false,
      multipleSelection: [],
      details: { name: '123', select: '1' } // 详情
    }
  },
  methods: {
    handleClick (index, row) {
      console.log(row)
      // this.dialogInfoVisible = true
      this.currentTabComponent = this.compArr[index]
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
// dialog 统一样式
.dia-width-70 {
  min-width: 1200px;
}

.el-select .el-input {
  width: 130px;
}

.my-dialog {
  .el-input-group,
  .el-cascader,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }
}
</style>
