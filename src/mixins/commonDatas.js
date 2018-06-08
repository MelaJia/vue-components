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
    this.moneyTypes = getStore({
      name: 'moneyTypes'
    })
    this.arStatus = getStore({
      name: 'arStatus'
    })
  }
}
