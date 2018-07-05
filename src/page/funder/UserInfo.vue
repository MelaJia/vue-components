<template>
  <div class="user-info" style="padding: 0px 10px;">
    <info-list :infos="userInfo"></info-list>
    <info-table :auth-arr="authArr" :infos="userInfo" @refresh="handleRefresh"></info-table>
  </div>
</template>
<script>
import InfoList from '@/components/suplier/userInfo/InfoList'
import InfoTable from '@/components/suplier/userInfo/InfoTable'
export default {
  data () {
    return {
      userInfo: {},
      types: [
        { typeId: '1', name: '企业', firstNode: 'companyAuthenticationInfo', node: 'companyName' },
        { typeId: '2', name: '企业银行信息', firstNode: 'companyAuthenticationInfo', node: 'bankName' },
        { typeId: '3', name: '企业法人', firstNode: 'legalAuthenticationInfo', node: 'legalPerson' },
        { typeId: '4', name: '企业法人手机', firstNode: 'legalAuthenticationInfo', node: 'legalPhone' },
        { typeId: '5', name: '企业法人邮箱', firstNode: 'legalAuthenticationInfo', node: 'legalMail' },
        { typeId: '6', name: '企业联系人', firstNode: 'contractAuthenticationInfo', node: 'contactPerson' },
        { typeId: '7', name: '企业联系人手机', firstNode: 'contractAuthenticationInfo', node: 'contactPhone' },
        { typeId: '8', name: '企业联系人邮箱', firstNode: 'contractAuthenticationInfo', node: 'contactMail' }
      ],
      authArr: []
    }
  },
  components: {
    InfoList,
    InfoTable
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.axios.post('/cust/customerDetailInfo.do', {
      }).then(res => {
        if (res.data.status) {
          const data = res.data.data
          data.registeredCurrencyType = parseInt(data.registeredCurrencyType)
          data.paidinCurrencyType = parseInt(data.paidinCurrencyType)
          this.userInfo = data
          const tableData = []
          this.types.forEach(element => {
            tableData.push(this.getAuthArr(element.name, data[element.firstNode][element.node], element.typeId))
          })
          this.authArr = tableData
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          })
        }
        loading.close()
      }).catch(err => {
        console.log(err)
        // 关闭加载图标
        loading.close()
      })
    },
    getAuthArr (type, name, typeId) {
      return {
        idtType: type,
        idtResult: name,
        typeId: typeId
      }
    },
    handleRefresh () {
      this.getData()
    }
  }
}
</script>
<style>
.user-info > div ~ div {
  margin-top: 20px;
}
</style>
