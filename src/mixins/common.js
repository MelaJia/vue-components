import {loadingConf} from '@/config/common' // 获取加载配置
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
    originFormat: function (row, column) {
      return row[column.property] === 1 ? '自有' : '购入'
    },
    /**
     *
     *
     * @param {any} arr 显示列的位置数组
     * @param {any} idx 合计显示位置idx默认0
     * @returns 合计函数
     */
    sumHandle (arr, idx = 0) {
      return function getSummaries (param) {
        const {
          columns,
          data
        } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === idx) {
            sums[index] = '合计'
            return
          }
          for (let iterator of arr) {
            if (index === iterator) {
              const values = data.map(item => Number(item[column.property]))
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr)
                  if (!isNaN(value)) {
                    return prev + curr
                  } else {
                    return prev
                  }
                }, 0)
                sums[index] += '元'
              } else {
                sums[index] = ''
              }
            }
          }
        })

        return sums
      }
    },
    /**
     * 取消基础请求
     * @param {str} url 请求地址
     * @param {str} id 请求参数(ar单号)
     */
    cancelBase (url, id) {
      // 1.显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 2.发送请求
      this.axios.post(url, {
        masterChainId: id
      }).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
          type: type
        })
        // 关闭加载图标
        loading.close()
        this.$emit('refresh')
      }).catch((err) => {
        // 错误提示
        erroShow.call(this, err, loading)
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
