<template>
  <div>
    <component v-bind:is="currentTabComponent" :visible-p.sync="dialogVisible" :form="getDetails" :param-name="paName"></component>
    <el-card class="box-card-userinfo">
      <div slot="header" class="clearfix">
        <i class="el-icon-document"></i>
        <span>企业认证信息</span>
      </div>
      <el-table
        :data="authArr"
        border
        style="width: 100%">
        <el-table-column
          prop="idtType"
          label="认证类型"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="idtResult"
          label="认证结果"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
        min-width="80"
          align="center"
          label="操作">
          <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index,scope.row,scope.store)" type="text">{{operaNames[scope.$index]}}</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
/* 用户信息表格 */
export default {
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Info' */ './DialogInfo'),
    'dialog-bank': () =>
      import(/* webpackChunkName: 'Info' */ './DialogBank'),
    'dialog-legal': () =>
      import(/* webpackChunkName: 'Info' */ './DialogLegal'),
    'dialog-legalphone': () =>
      import(/* webpackChunkName: 'Info' */ './DialogLegalPhone'),
    'dialog-legalemail': () =>
      import(/* webpackChunkName: 'Info' */ './DialogEmail'),
    'dialog-contact': () =>
      import(/* webpackChunkName: 'Info' */ './DialogContact'),
    'dialog-contactphone': () =>
      import(/* webpackChunkName: 'Info' */ './DialogContactPhone'),
    'dialog-contactemail': () =>
      import(/* webpackChunkName: 'Info' */ './DialogEmail')
  },
  props: ['authArr', 'infos'],
  data () {
    return {
      operaNames: ['修改', '修改', '修改', '去认证', '去认证', '去认证', '去认证'],
      currentTabComponent: 'dialog-bank',
      compArr: ['dialog-bank', 'dialog-legal', 'dialog-legalphone', 'dialog-legalemail', 'dialog-contact', 'dialog-contactphone', 'dialog-contactemail'],
      dialogVisible: false,
      multipleSelection: [],
      paName: '', // 额外传参
      getDetails: null
    }
  },
  computed: {
  },
  methods: {
    handleClick (index, row) {
      console.log(index)
      const info = Object.assign({}, this.infos)
      this.getDetails = info
      if (index === 3) {
        this.currentTabComponent = this.compArr[index]
        this.paName = 'legalMail'
        this.dialogVisible = true
        // let param = {
        //   legalMail: ''
        // }
        // this.subEmail('/cust/toAuthenticateLegalMail.do', param, 'legalMail', '企业法人邮箱认证')
        return
      }
      if (index === 6) {
        this.currentTabComponent = this.compArr[index]
        this.paName = 'contactMail'
        this.dialogVisible = true
        // let param = {
        //   contactMail: ''
        // }
        // this.subEmail('/cust/toAuthenticateContractMail.do', param, 'contactMail', '企业联系人邮箱认证')
        return
      }
      this.currentTabComponent = this.compArr[index]
      this.paName = this.compArr[index]
      this.dialogVisible = true
    },
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    },
    // 更改邮箱
    subEmail (url, param, name, tilte) {
      this.$prompt('请新邮箱地址', tilte, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        // 上传到服务器
        param[name] = value
        this.axios.post(url, param).then(res => {
          let type = res.data.status ? 'success' : 'error'
          this.$message({
            message: res.data.result,
            type: type
          })
          if (res.data.status) {
            this.$parent.fresh()
            this.handleClose()
          }
        }).catch(err => {
          this.$message({
            type: 'info',
            message: `操作失败${err}`
          })
        })
        // 上传到服务器end
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>
<style lang="scss">
// dialog 统一样式
.dia-width-70 {
  min-width: 1200px;
}

.user-info-dialog .el-select .el-input {
  width: 130px;
}

.user-info-dialog {
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
