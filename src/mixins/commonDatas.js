import {
  getStore
} from '@/util/store'
export default {
  data () {
    return {
      moneyTypes: [], // 货币类型
      arStatus: [] // ar状态
    }
  },
  mounted () {
    // 从storage获取通用数据
    console.log('从storage获取通用数据')

    let pageName = this.$options.name ? this.$options.name : 'all'
    this.moneyTypes = getStore({
      name: 'moneyTypes'
    })
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
