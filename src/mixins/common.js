import { postDataBase, thousandth, getDataBase, mouseDown } from '@/util/util' // 发送数据函数
export default {
  // 监听器
  watch: {
    visibleP: function () {
      this.init()
    }
  },
  // 方法
  methods: {
    // 初始化操作
    init () {},
    // 按下左键
    mouseDown: mouseDown,
    // 时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined || date === null || date === '') {
        return '- -'
      }
      return new Date(date).Format('yyyy-MM-dd')
    },
    // 空值处理
    nullDealWith: function (row, column) {
      var val = row[column.property]
      if (val === undefined || val === null || val === '') {
        return '- -'
      }
      return val
    },
    // 添加%
    addPercent: function (row, column) {
      var val = row[column.property]
      if (val === undefined) {
        return '- -'
      }
      return `${val}%`
    },
    // 千分位原始方法
    thousandth: function (val) {
      return `${thousandth(val)}元`
    },
    // 千分位formatter方法
    regexNum: function (row, column) {
      var val = row[column.property]
      return thousandth(val)
    },
    // 来源格式化
    originFormat: function (row, column) {
      return row[column.property] === 1 ? '自有' : '购入'
    },
    /**
     * 操作固定参数请求
     * 操作成功刷新父页面
     * 显示加载框
     * @param {str} url 请求地址
     * @param {str} id 请求参数(ar单号)
     */
    async postWithId (url, id) {
      let res = await this.post(url, { masterChainId: id }, true)
      console.log(res)
      // 操作成功刷新数据
      if (res && res.data.status) {
        this.fresh()
      }
    },
    // 获取放款详情接口
    async getLoanDetail (url, param) {
      // 显示加载图标
      let res = await getDataBase.call(this, url, param, true)
      return res
    },
    /**
     * 操作类基础请求
     * 操作成功刷新父页面
     * 显示加载框
     * @param {str} url 请求地址
     * @param {obj} param 请求参数
     */
    async postResultFresh (url, param) {
      let res = await this.post(url, param, true)
      // 操作成功刷新数据
      if (res && res.data.status) {
        this.fresh()
      }
    },
    /*
    *发送post请求
    *默认不显示加载框 不自动关闭加载框
    */
    async post (url, param, loading = false, auto = false) {
      let res = await postDataBase.call(this, url, param, loading, auto)
      return res
    },
    /**
     * 刷新父页面数据
     * this.$parent.fresh()
     */
    fresh () {
      this.$emit('refresh')
    }
  },
  // 过滤器
  filters: {
    /**
     * 时间戳转时间
     */
    dateFormat: function (value) {
      if (value === null || value === undefined || value === '') {
        return '- -'
      }
      return new Date(value).Format('yyyy-MM-dd')
    },
    // 来源格式化
    originFormat: function (value) {
      return value === 1 ? '自有' : '购入'
    },
    // 千分位转换
    thousandth: function (val) {
      return thousandth(val) === '- -' ? '0' : thousandth(val)
    },
    // 千分位待元单位
    regexNum: function (val) {
      return `${thousandth(val)}元`
    },
    // 添加%
    addPercent: function (val) {
      if (val === undefined || val === null || val === '') {
        return '- -'
      }
      return `${val}%`
    }
  }
}
