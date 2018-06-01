<template>
  <div>
    <dialog-info :visible-p="dialogInfoVisible" :details="details"></dialog-info>
    <component v-bind:is="currentTabComponent" :visible-p.sync="dialogVisible" :form="details"></component>
    <el-table
      :data="authArr"
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
import InfoArr from '@/mixins/userInfo'
/* 用户信息表格 */
export default {
  mixins: [InfoArr],
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
  props: ['authArr'],
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
      compArr: ['dialog-info', 'dialog-bank', 'dialog-legal', 'dialog-legalphone', 'dialog-legalemail', 'dialog-contact', 'dialog-contactphone', 'dialog-contactemail'],
      dialogInfoVisible: false,
      dialogVisible: false,
      multipleSelection: [],
      details: null // 详情
    }
  },
  computed: {
    ssoId: {
      get () {
        return this.$store.state.user.ssoId
      },
      set (val) { }
    }
  },
  methods: {
    handleClick (index, row) {
      console.log(index)
      if (index === 4) {
        let param = {
          legalMail: '',
          ssoId: this.ssoId
        }
        this.subEmail('/cust/toAuthenticateLegalMail.do', param, 'legalMail')
        return
      }
      if (index === 7) {
        let param = {
          contactMail: '',
          ssoId: this.ssoId
        }
        this.subEmail('/cust/toAuthenticateContractMail.do', param, 'contactMail')
        return
      }
      this.currentTabComponent = this.compArr[index]
      this.ssoId = '1'
      this.details = this.infoArrs[index]
      this.details.ssoId = this.ssoId
      this.dialogVisible = true
    },
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    },
    // 更改邮箱
    subEmail (url, param, name) {
      this.$prompt('请输入邮箱', '提示', {
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
