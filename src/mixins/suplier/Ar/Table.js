import {loadingConf} from '@/config/common' // 获取加载配置
export default {
  data () {
    return {
      total: 0, // 总数
      psize: 10, // 每页数据
      pageSizesArr: [5, 10, 20, 50], // 每页数据量数组
      currentPage: 1, // 当前页
      loading: false, // 加载状态
      tableData5: [], // 表格数据
      totalStr: 'total', // 服务器返回总数参数名
      dataStr: 'rows', // 服务器返回数据参数名
      // 请求参数
      param: {
        iDisplayStart: 1, // 页数
        iDisplayLength: 10, // 每页数量
        masterChainId: '', // ar单号
        custFromName: '', // 转让单位
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        from: '', // 日期
        to: '',
        transSerialNo: '' // 交易流水号
      },
      postUrl: '/onReceivingAr/getOnReceivingArListTable', // 请求地址
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
        billPayStatus: '120',
        operate: '250'
      }
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.pend) {
        return ''
      }
      return ''
    },
    expendhandle (row, expandedRows) {
      console.log(expandedRows)
      row.pend = !row.pend
    },
    getPendedColor ({row, rowIndex}) {
      if (row.loanStatus === '05') {
        return 'warning-row'
      }
      return 'expendcolor'
    },
    // 父table控制子table宽度控制
    widthHandle (newWidth, oldWidth, column, event) {
      this.widthArr[column.property] = newWidth
      console.log(this.widthArr)
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
      console.log(that.param)
      return this.axios.post(this.postUrl, that.param).then(res => {
        return Promise.resolve(res)
      }).then(response => {
        let result = null
        if (response.data[that.dataStr] && response.data[that.dataStr].length > 0) {
          // 遍历子节点
          response.data[that.dataStr].forEach(item => {
            if (item.tableData && item.tableData.length > 0) {
              item.tableData.map(val => {
                val.company = val.isMasterAr ? val.companyName : val.custToName // 子节点受让公司对手公司处理
              })
            }
          })
          // 父节点处理
          response.data[that.dataStr].map(val => {
            val.company = val.companyName// 父节点受让公司对手公司处理
          })
        }
        result = response
        this.loading = false // 关闭加载动画
        return Promise.resolve(result)
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
          if (response.data.status) {
            that.tableData5 = response.data[that.dataStr]
            that.total = response.data[that.totalStr]
          } else {
            that.tableData5 = []
            that.total = 0
            that.$message.error(response.data.msg)
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
          console.log(response)
          if (response.data.status) {
            that.tableData5 = response.data[that.dataStr]
            that.total = response.data[that.totalStr]
          } else {
            that.tableData5 = []
            that.total = 0
            that.$message.error(response.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取ar详情
    getDetail (val) {
      return this.axios.post('/myAr/queryAr', { masterChainId: val.masterChainId }).then(res => {
        // 处理数据
        if (res.data.status) {
          let details = this.handleInvoiceListFormat(res.data.data)
          details.masterChainId = val.masterChainId
          return details
        } else {
          this.$message({
            type: 'info',
            message: `请求出错`
          })
          return false
        }
      })
    },
    /**
     * 详情
     * @param {*} idx
     * @param {*} val
     */
    handleInfo (idx, val) {
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 获取数据
      this.getDetail(val).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
        }
        // 关闭加载图标
        loading.close()
      }).catch(err => {
        // 错误提示
        erroShow.call(this, err, loading)
      })
    },
    /* 发票已选未选分离 */
    handleInvoiceListFormat (oData) {
      const data = oData
      const list = []
      const listSelected = []
      data.invoiceCustomList.forEach(element => {
        if (element.invoiceIsSelected) {
          element.invoiceIsSelected = true
          listSelected.push(element)
        } else {
          list.push(element)
        }
      })
      data.invoiceList = list
      data.invoiceListSelected = listSelected
      return data
    }
  }
}
// 错误提示函数
function erroShow (err, loading) {
  if (err.response && err.response.status === 401) {
    console.log(err)
  } else {
    this.$alert(`网络错误${err}`, '系统提示', {
      confirmButtonText: '确定',
      callback: action => {
        // 关闭加载图标
        loading.close()
      }
    })
  }
}
