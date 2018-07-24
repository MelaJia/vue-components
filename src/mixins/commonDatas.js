import {
  getStore,
  setStore
} from '@/util/store'
export default {
  data () {
    return {
      moneyTypes: [], // 货币类型
      arStatus: [], // ar状态
      loanTypes: [], // 融资类型
      repayTypes: [] // 还款方式
    }
  },
  mounted () {
    // 从storage获取通用数据
    console.log('从storage获取通用数据')

    let pageName = this.$options.name ? this.$options.name : 'all'
    this.moneyTypes = getStore({
      name: 'moneyTypes'
    })
    this.loanTypes = getStore({
      name: 'loanTypes'
    })
    this.repayTypes = getStore({
      name: 'repayTypes'
    })
    if (!this.loanTypes) {
      // 获取融资类型
      this.axios.get('/commonTrans/queryLoanType.do').then(res => {
        if (res.data.status) {
          setStore({
            name: 'loanTypes',
            content: res.data.data,
            type: true
          })
          // 赋值
          this.loanTypes = res.data.data
          console.log(res.data.data)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
    if (!this.repayTypes) {
      // 获取还款方式类型
      this.axios.get('/commonTrans/queryRepaymentType.do').then(res => {
        if (res.data.status) {
          setStore({
            name: 'repayTypes',
            content: res.data.data,
            type: true
          })
          // 赋值
          this.repayTypes = res.data.data
          console.log(res.data.data)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
    // storage中无数据
    if (!this.moneyTypes) {
      console.log('从服务器获取通用数据')
      // 获取货币类型并保存
      this.axios.get('/commonAr/queryCurr.do').then(res => {
        if (res.data.status) {
          setStore({
            name: 'moneyTypes',
            content: res.data.data,
            type: true
          })
          // 赋值
          this.moneyTypes = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
      // 获取ar状态并保存
      this.axios.get('/commonAr/queryARStatusType.do').then(res => {
        if (res.data.status) {
          setStore({
            name: 'arStatus',
            content: res.data.data,
            type: true
          })
          // 赋值
          for (const iterator of res.data.data) {
            if (iterator.pageName === pageName) {
              this.arStatus = iterator.arStatusList
            }
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    } else { // storage中有数据
      const statusArr = getStore({
        name: 'arStatus'
      })
      for (const iterator of statusArr) {
        if (iterator.pageName === pageName) {
          this.arStatus = iterator.arStatusList
        }
      }
    }
  }
}
