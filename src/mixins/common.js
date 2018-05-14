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
    }
  }
}
