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
          this.$emit('refresh')
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
      if (value === null || value === undefined) {
        return ' '
      }
      return new Date(value).Format('yyyy-MM-dd')
    },
    // 来源格式化
    originFormat: function (value) {
      return value === 1 ? '自有' : '购入'
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
