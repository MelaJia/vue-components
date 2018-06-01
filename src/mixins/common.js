export default {
  methods: {
    // 时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return new Date(date).Format('yyyy-MM-dd HH:mm:ss')
    },
    // 时间格式化
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
      this.axios.post(url, {
        masterChainId: id
      }).then(res => {
        let type = res.data.result === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.message,
          type: type
        })
        this.$emit('handle-refresh')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败'
        })
      })
    },
    // 获取放款详情接口
    getLoanDetail (url, param) {
      return this.axios.post(url, param).then(res => {
        if (res.data.status) {
          return res.data.data
        } else {
          this.$message({
            type: 'info',
            message: '取消'
          })
        }
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    // 刷新数据
    fresh () {
      this.$emit('refresh')
    }
  },
  // 过滤器
  filters: {
    dateFormat: function (value) {
      return new Date(value).Format('yyyy-MM-dd')
    },
    originFormat: function (value) {
      return value === 1 ? '自有' : '购入'
    }
  }
}
