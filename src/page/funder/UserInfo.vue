<template>
  <div class="user-info" style="padding: 0px 10px;">
    <info-list :infos="userInfo"></info-list>
    <info-table :auth-arr="authArr" @refresh="handleRefresh"></info-table>
  </div>
</template>
<script>
import InfoList from '@/components/suplier/userInfo/InfoList'
import InfoTable from '@/components/suplier/userInfo/InfoTable'
import MixinsUserInfo from '@/mixins/Infos'
import {mapGetters} from 'vuex'
export default {
  // 保理商信息页面
  mixins: [MixinsUserInfo],
  data () {
    return {
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
    this.$store.commit('setSsoId', '82418b0d3a106c8ee638b0f52f4b07eae7e279a0c0c8698c95c6b5956319fcc4')
    this.getData()
  },
  computed: {
    ...mapGetters(['ssoId'])
  },
  methods: {
    getData () {
      this.axios.post('/cust/customerDetailInfo.do', {
        ssoId: this.ssoId
      }).then(res => {
        if (res.data.status) {
          const data = res.data.data
          this.userInfo = data
          console.log('设置数据')
          const tableData = []
          this.types.forEach(element => {
            tableData.push(this.getAuthArr(element.name, data[element.firstNode][element.node], element.typeId))
          })
          this.authArr = tableData
        } else {
          console.log(res.data.msg)
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          })
        }
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
