import {getDataBase} from '@/util/util' // 发送数据函数
import { loadingConf } from '@/config/common' // 获取加载配置
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
        transUnitName: '150',
        arStatusTypeName: '',
        currencyDesc: '',
        billBookAmt: '',
        loanAmt: '',
        billPayDate: '120',
        billPayStatus: '120',
        operate: '250'
      },
      searchShow: true // 搜索区
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
      ieAutoResize.call(this)
      row.pend = !row.pend
    },
    getPendedColor ({row, rowIndex}) {
      if (row.isOverDue) {
        return 'warning-row'
      }
      return 'expendcolor'
    },
    // 父table控制子table宽度控制
    widthHandle (newWidth, oldWidth, column, event) {
      this.widthArr[column.property] = newWidth
      console.log(newWidth)
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
    async getdata (page, length) {
      const that = this
      const loading = this.$loading(loadingConf.get())// 开启加载动画
      loading.setText('获取数据中，请稍候')
      that.param.iDisplayStart = page
      that.param.iDisplayLength = length
      try {
        let response = await this.axios.post(this.postUrl, that.param)
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
        loading.close() // 关闭加载动画
        return Promise.resolve(result)
      } catch (error) {
        loading.close() // 关闭加载动画
        console.log(error)
      }
    },
    startSearch () {
      this.currentPage = 1
      this.getdata(1, this.psize).then(res => {
        if (res) {
          this.tableData5 = res.data[this.dataStr]
          this.total = res.data[this.totalStr]
        }
        // if (res.data.status) {
        //   this.tableData5 = res.data[this.dataStr]
        //   this.total = res.data[this.totalStr]
        // } else {
        //   this.tableData5 = []
        //   this.total = 0
        //   this.$message.error(res.data.msg)
        // }
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
    async getDetail (val) {
      let res = await getDataBase.call(this, '/myAr/queryAr', { masterChainId: val.masterChainId }, true)
      // 处理数据
      if (res) {
        let details = this.handleInvoiceListFormat(res)
        details.masterChainId = val.masterChainId
        return details
      } else {
        return res
      }
    },
    /**
     * 详情
     * @param {*} idx
     * @param {*} val
     */
    handleInfo (idx, val) {
      // 获取数据
      this.getDetail(val).then(res => {
        if (res) {
          this.details = res
          this.dialogInfoVisible = true
        }
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
function isIE () { // ie?
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  } else {
    return false
  }
}
function ieAutoResize () {
  if (!this.$refs.resizeContext) {
    return false
  }
  const tNode = this.$refs.resizeContext
  if (isIE() && tNode.offsetWidth > tNode.querySelector('.el-table__body').offsetWidth) {
    console.log('改变')
    const tNode = this.$refs.resizeContext
    if (tNode.parentElement.offsetWidth !== tNode.offsetWidth + 40) {
      tNode.style.width = tNode.offsetWidth + 1 + 'px'
    } else {
      tNode.style.width = tNode.offsetWidth - 1 + 'px'
    }
  }
}
