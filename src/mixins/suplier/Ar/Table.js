export default {
  data () {
    return {
      total: 0, // 总数
      psize: 10, // 每页数据
      currentPage: 1, // 当前页
      loading: false, // 加载状态
      tableData5: [], // 表格数据
      totalStr: 'total', // 服务器返回总数参数名
      dataStr: 'rows', // 服务器返回数据参数名
      // 请求参数
      param: {
        iDisplayStart: 1, // 页数
        iDisplayLength: 10, // 每页数量
        masterChain: '', // ar单号
        custFromName: '', // 转让单位
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        from: '', // 日期
        to: '',
        transSerialNo: '' // 交易流水号
      },
      postUrl: '/onReceivingAr/getOnReceivingArListTable', // 请求地址
      Options: [{
        value: '大吉制造',
        label: '大吉制造'
      }, {
        value: '大诚制造',
        label: '大诚制造'
      }, {
        value: '大利制造',
        label: '大利制造'
      }],
      // 宽度控制
      widthArr: {
        masterChainId: '150',
        billId: '150',
        isMasterAr: '',
        company: '150',
        arStatusTypeName: '',
        currencyDesc: '',
        billBookAmt: '',
        loanAmt: '',
        billPayDate: '120',
        operate: '200'
      }
    }
  },
  methods: {
    tableRowClassName ({
      row,
      rowIndex
    }) {
      if (row.pend) {
        return 'warning-row'
      }
      return ''
    },
    expendhandle (row, expandedRows) {
      console.log(expandedRows)
      row.pend = !row.pend
    },
    getPendedColor ({
      row,
      rowIndex
    }) {
      return 'expendcolor'
    },
    handleInfo (rowIndex, row) {
      console.log(rowIndex)
      console.log(row)
    },
    // 父table控制子table宽度控制
    widthHandle (newWidth, oldWidth, column, event) {
      this.widthArr[column.property] = newWidth
      console.log(this.widthArr)
    },
    /**
     *
     * 获取数据
     * @param {any} page 页数
     * @param {any} length 长度
     * @returns promise
     */
    getdata (page, length) {
      console.log('获取数据')
      const that = this
      this.loading = true // 开启加载动画
      that.param.iDisplayStart = page
      that.param.iDisplayLength = length
      return this.axios.post(this.postUrl, that.param).then(res => {
        return res
      }).then(response => {
        let result = null
        if (response.data[that.dataStr] && response.data[that.dataStr].length > 0) {
          // 遍历子节点
          response.data[that.dataStr].forEach(item => {
            if (item.tableData && item.tableData.length > 0) {
              item.tableData.map(val => {
                val.company = val.isMasterAr ? val.companyName : val.custToName // 子节点受让公司对手公司处理
                val.infoLoading = false // 添加详情按钮loading节点
              })
            }
          })
          // 父节点处理
          response.data[that.dataStr].map(val => {
            val.company = val.isMasterAr ? val.companyName : val.custToName // 父节点受让公司对手公司处理
            val.infoLoading = false // 添加详情按钮loading节点
          })
        }
        result = response
        this.loading = false // 关闭加载动画
        return result
      }).catch(err => {
        this.loading = false // 关闭加载动画
        console.log(err)
      })
    },
    // 页数改变
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      const that = this
      this.psize = val
      this.getdata(1, that.psize)
        .then(function (response) {
          if (response) {
            that.tableData5 = response.data[that.dataStr]
            that.total = response.data[that.totalStr]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 翻页
    handleCurrentChange (val) {
      const that = this
      this.getdata(val, that.psize)
        .then(function (response) {
          if (response) {
            that.tableData5 = response.data[that.dataStr]
            that.total = response.data[that.totalStr]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    /**
     * 取消基础请求
     * @param {str} url 请求地址
     * @param {str} id 请求参数(ar单号)
     */
    cancelBase (url, id) {
      this.axios.post(url, { masterChainId: id }).then(res => {
        let type = res.data.result === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.message,
          type: type
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作失败'
        })
      })
    }
  }
}
