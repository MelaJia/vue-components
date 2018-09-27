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
    let pageName = this.$options.name ? this.$options.name : 'all'
    const statusArr = getStore({
      name: 'arStatus'
    })
    this.moneyTypes = getStore({
      name: 'moneyTypes'
    })
    const loanTypeArr = getStore({
      name: 'loanTypes'
    })
    this.repayTypes = getStore({
      name: 'repayTypes'
    })
    // 判断值是否为空
    // let lisN = this.loanTypes ? this.loanTypes[0].loanTypeName : null
    // if (!this.loanTypes | lisN === null) {
    //   // 获取融资类型
    //   this.axios.get('/commonTrans/queryLoanType.do').then(res => {
    //     if (res.data.status) {
    //       setStore({
    //         name: 'loanTypes',
    //         content: res.data.data,
    //         type: true
    //       })
    //       // 赋值
    //       this.loanTypes = res.data.data
    //       console.log(res.data.data)
    //     } else {
    //       console.log(res.data.msg)
    //     }
    //   }).catch(err => {
    //     throw new Error(err)
    //   })
    // }
    // 融资类型
    if (loanTypeArr) {
      // storage中有数据
      for (const iterator of loanTypeArr) {
        if (iterator.pageName === pageName) {
          this.loanTypes = iterator.loanTypeList
        }
      }
    } else {
      // storage中无数据
      // 获取ar状态并保存
      this.axios.get('/commonTrans/queryLoanType.do').then(res => {
        if (res.data.status) {
          setStore({
            name: 'loanTypes',
            content: res.data.data,
            type: true
          })
          // 赋值
          for (const iterator of res.data.data) {
            if (iterator.pageName === pageName) {
              this.arStatus = iterator.loanTypeList
            }
          }
        } else {
          console.log(res.data.msg)
        }
      }).catch(err => {
        throw new Error(err)
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
          console.log(res.data.msg)
        }
      }).catch(err => {
        throw new Error(err)
      })
    }
    // 判断值是否为空
    let misN = this.moneyTypes ? this.moneyTypes[0].currencyDesc : null
    // storage中无数据
    if (!this.moneyTypes | misN === null) {
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
          console.log(res.data.msg)
        }
      }).catch(err => {
        throw new Error(err)
      })
    }
    if (statusArr) {
      // storage中有数据
      for (const iterator of statusArr) {
        if (iterator.pageName === pageName) {
          this.arStatus = iterator.arStatusList
        }
      }
    } else {
      // storage中无数据
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
          console.log(res.data.msg)
        }
      }).catch(err => {
        throw new Error(err)
      })
    }
  }
}
