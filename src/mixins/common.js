import {loadingConf} from '@/config/common' // 获取加载配置
import { postDataBase } from '@/util/util' // 发送数据函数
export default {
  methods: {
    // 时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined || date === null) {
        return ''
      }
      return new Date(date).Format('yyyy-MM-dd')
    },
    // 添加%
    addPercent: function (row, column) {
      var val = row[column.property]
      if (val === undefined) {
        return ''
      }
      return `${val}%`
    },
    // 千分位
    regexNum: function (row, column) {
      var val = row[column.property]
      var regex = /(\d)(?=(\d\d\d)+(?!\d))/g
      var result
      if (typeof val === 'string') {
        let str = val
        if (str.indexOf('.') === -1) {
          str = str.replace(regex, ',') + '.00'
        } else {
          var newStr = str.split('.')
          var str2 = newStr[0].replace(regex, ',')
          if (newStr[1].length <= 1) {
            // 小数点后只有一位时
            result = str2 + '.' + newStr[1] + '0'
            console.log(result)
          } else if (newStr[1].length > 1) {
            // 小数点后两位以上时
            var decimals = newStr[1].substr(0, 2)
            result = str2 + '.' + decimals
            console.log(result)
          }
        }
      } else if (typeof val === 'number') {
        return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
      return result
    },
    // 来源格式化
    originFormat: function (row, column) {
      return row[column.property] === 1 ? '自有' : '购入'
    },
    /**
     * 取消基础请求
     * @param {str} url 请求地址
     * @param {str} id 请求参数(ar单号)
     */
    cancelBase (url, id) {
      postDataBase.call(this, url, {
        masterChainId: id
      }, true).then(res => {
        console.log(res)
        // 操作成功刷新数据
        if (res && res.data.status) {
          this.$emit('refresh')
        }
      })
    },
    // 获取放款详情接口
    getLoanDetail (url, param) {
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      return this.axios.post(url, param).then(res => {
        // 关闭加载图标
        loading.close()
        if (res.data.status) {
          return res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }).catch((err) => {
        // 错误提示
        erroShow.call(this, err, loading)
      })
    },
    /**
     * 操作类基础请求
     * @param {str} url 请求地址
     * @param {obj} param 请求参数
     */
    postBase (url, param) {
      postDataBase.call(this, url, param, true).then(res => {
        console.log(res)
        // 操作成功刷新数据
        if (res && res.data.status) {
          this.fresh()
        }
      })
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
        return ' '
      }
      return new Date(value).Format('yyyy-MM-dd')
    },
    // 来源格式化
    originFormat: function (value) {
      return value === 1 ? '自有' : '购入'
    },
    // 千分位
    regexNum: function (val) {
      var regex = /(\d)(?=(\d\d\d)+(?!\d))/g
      var result
      if (typeof val === 'string') {
        let str = val
        if (str.indexOf('.') === -1) {
          str = str.replace(regex, ',') + '.00'
        } else {
          var newStr = str.split('.')
          var str2 = newStr[0].replace(regex, ',')
          if (newStr[1].length <= 1) {
            // 小数点后只有一位时
            result = str2 + '.' + newStr[1] + '0'
            console.log(result)
          } else if (newStr[1].length > 1) {
            // 小数点后两位以上时
            var decimals = newStr[1].substr(0, 2)
            result = str2 + '.' + decimals
            console.log(result)
          }
        }
      } else if (typeof val === 'number') {
        return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      }
      return result
    }
  }
}
// 错误提示函数
function erroShow (err, loading) {
  console.log(this)
  this.$alert(`网络错误${err}`, '系统提示', {
    confirmButtonText: '确定',
    callback: action => {
      // 关闭加载图标
      loading.close()
    }
  })
}
