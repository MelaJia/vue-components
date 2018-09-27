<template>
  <div class="user-info" style="padding: 0px 10px;">
    <info-list :infos="userInfo"></info-list>
    <info-table :auth-arr="authArr" :infos="userInfo" @refresh="handleRefresh"></info-table>
  </div>
</template>
<script>
import InfoList from '@/components/suplier/userInfo/InfoList'
import InfoTable from '@/components/suplier/userInfo/InfoTable'
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  data () {
    return {
      userInfo: {},
      types: [
        // { typeId: '1', name: '企业', firstNode: 'companyAuthenticationInfo', node: 'companyName' },
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
      const loading = this.$loading(loadingConf.get())
      setTimeout(() => {
        loading.setText('获取数据中，请稍候')
      }, 1000)
      this.axios.post('/cust/customerDetailInfo.do', {
      }).then(res => {
        if (res.data.status) {
          const data = res.data.data
          const tableData = []
          const compuDate = [] // 营业执照日期
          data.registeredCurrencyType = parseInt(data.registeredCurrencyType) // 货币类型数字转字符串
          data.paidinCurrencyType = parseInt(data.paidinCurrencyType) // 货币类型数字转字符串
          compuDate.push(data.businessStartDate)
          compuDate.push(data.businessEndDate)
          data.compuDate = compuDate
          this.userInfo = data
          console.log(this.userInfo)
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
        // 关闭加载图标
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
