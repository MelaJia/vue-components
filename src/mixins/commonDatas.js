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
    this.moneyTypes = getStore({
      name: 'moneyTypes'
    })
    this.arStatus = getStore({
      name: 'arStatus'
    })
  }
}
