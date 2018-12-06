/** 公共方法 **/

/**
 *根据参数部分和参数名来获取参数值
 *
 * @param {*} paraPart 参数部分
 * @param {*} name 参数值名
 * @returns
 */
function getQueryString(paraPart,name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = paraPart.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
function getParamFromUrl(name){
  var r = getQueryString(window.location.search,name)
  return r
}
/**
   * Date扩展时间格式化初始化
   */
  // The Vue build version to load with the 'import' command
  // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
  /* eslint-disable */
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份         
      "d+": this.getDate(), //日         
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
      "H+": this.getHours(), //小时         
      "m+": this.getMinutes(), //分         
      "s+": this.getSeconds(), //秒         
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
      "S": this.getMilliseconds() //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") +
        week[this.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
  /**
   * 千分位转换
   * @param {number} val 转换值
   */
  function thousandth(val) {
    var regex = /(\d)(?=(\d{3})+$)/g
    var result
    if (typeof val === 'string' && val !== '') {
      var str = val
      if (str.indexOf('.') === -1) {
        result = str.replace(regex, '$1,') + '.00'
      } else {
        var newStr = str.split('.')
        var str2 = newStr[0].replace(regex, '$1,')
        if (newStr[1].length <= 1) {
          // 小数点后只有一位时
          result = str2 + '.' + newStr[1] + '0'
        } else if (newStr[1].length > 1) {
          // 小数点后两位以上时
          var decimals = newStr[1].substr(0, 2)
          result = str2 + '.' + decimals
        }
      }
    } else if (typeof val === 'number') {
      return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    } else if (val === undefined || val === null || val === '') {
      return '- -'
    }
    return result
  }
  /**
   * 延时
   **/
  function debounce(fun, delay, immediate) {
    var timer, lasttime, context, arg
    var later = function () {
      var now = new Date().getTime(),
        l = now - lasttime
      if (l < delay && l >= 0) {
        clearTimeout(timer)
        timer = setTimeout(later, delay - l)
      } else {
        clearTimeout(timer)
        timer = null
        if (!immediate) {
          fun.apply(context, arg)
          if (!timer) context = arg = null
        }
      }
    }
    return function () {
      context = this
      arg = arguments
      lasttime = new Date().getTime()
      var callNow = immediate && !timer
      if (!timer) timer = setTimeout(later, delay)
      if (callNow) {
        fun.apply(context, arg)
        context = arg = null
      }
    }
  }
// 开始
  new Vue({
    el: '#app',
    data: function () {
      return {
       operateType: 0, // 操作类型
        /* 搜索区域数据 */
        searchShow: true, // 搜索区显示
        formInline: {
          masterChainId: '', // ar单号
          isMasterAr: '', // ar来源
          companyName: '', // 付款单位/对手单位
          factoringCustName: '', // 保理方
          status: 2, // 状态
          billBookCurr: '', // 币别
          invoiceNo: '', // 发票号
          moneyDate: null, // 日期
          billId: '' // 结报单号
        },
        arStatus: [{arStatusTypeId: 2,arStatusTypeName:'可用'}], // 状态
        moneyTypes: [], // 货币类型
        /* 弹出窗-详情数据*/
        detailsP: {},
        visibleInfo: false,
        /* 表格区域数据 */
        baseUrl: window.webConfig.apiUrl, // 接口地址
        dataLoading: false, // 加载框
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
          billId: '', // 结报单号
          interfaceTransSerial: null //外部系统交易标示信息
        },
        tableData: [],
        multipleSelection: [], // 已选项
        // 分页数据
        total: 0, // 总数
        psize: 10, // 每页数据
        pageSizesArr: [5, 10, 20, 50], // 每页数据量数组
        currentPage: 1, // 当前页
        // 表单数据
        displayTransAmt: '0.00', // 待转总金额
        displaySumAmt: '0.00', // 已选总金额
        /** 弹出窗-转让数据 */
        /* 弹出窗-自有转让数据*/
        visibleTrans: false,
        multipleSelectionTrans: [], // 已选项
        displaySumAmtTrans: '0.00', // 已选总金额
        transDatas: {
          arInvoiceList: [{
            masterChainId: '', // 唯一標識當前ar
            companyName: '', //付款单位
            billPayDate: null, //预计回款日期
            billBookAmt: null, //票面金额
            loanAmt: null, //可用金额
            invoiceNo: '', //发票号
            afterTaxAmt: null, //发票金额
            availableAfterTaxAmt: null, //可用发票金额
            transferAfterTaxAmt: null, //转让发票金额
            billBookCurr: null, //AR币别
            currencyName: '', //AR货币英文名稱
            currencyDesc: '', //AR货币中文名稱
            currencyUnitName: '', //AR货币单位名称
          }],
        },
        receiveCustId: '', // 授让公司id
        rc: {
          name: '', // 授让公司名称
          status: false // 是否正确
        },
        remark: '', // 备注
        agreeCheckList: [], // 同意协议勾选
        /* 弹出窗-购入转让数据*/
        detailsTG: {
          arInvoiceList: [{
            masterChainId: '', // 唯一標識當前ar
            companyName: '', //付款单位
            billPayDate: null, //预计回款日期
            billBookAmt: null, //票面金额
            loanAmt: null, //可用金额
            invoiceNo: '', //发票号
            afterTaxAmt: null, //发票金额
            availableAfterTaxAmt: null, //可用发票金额
            transferAfterTaxAmt: null, //转让发票金额
            billBookCurr: null, //AR币别
            currencyName: '', //AR货币英文名稱
            currencyDesc: '', //AR货币中文名稱
            currencyUnitName: '', //AR货币单位名称
          }],
          transAmt: '',
          interfaceTransSerial: ''
        },
        visibleTransGou: false,
        /* 弹出窗-贴现数据*/
        detailsDisc: {
          discountAmt: '',
          discountTotalCreditAmt: '',
          interfaceTransSerial: '',
          arList: [{
            masterChainId: '', // 唯一標識當前ar
            usedInvoiceList: [
              {
                invoiceNo:	'123', // 发票号
                afterTaxAmt:	150000, // 发票金额
              }
            ],
            availableInvoiceList: [
              {
                invoiceNo:	'123', // 发票号
                afterTaxAmt:	150000, // 发票金额
              }
            ],
            companyName: '', //付款单位
            billPayDate: null, //预计回款日期
            billBookAmt: null, //票面金额
            loanAmt: null, //可用金额
            isMasterAr:	0	, // AR来源0：购入AR1：自有AR
            checkedStatus:	1	, // AR状态
            arStatusTypeName:	'可用'	, // AR状态名称
            arSourceDesc:	'购入',	// AR來源
            billBookCurr: null, //AR币别
            currencyName: '', //AR货币英文名稱
            currencyDesc: '', //AR货币中文名稱
            currencyUnitName: '', //AR货币单位名称
          }],
        },
        visibleDisc: false,
        checkList: [], //选中发票
        arAmt: '', // 贴现金额
        maxSum: null, // 最大金额
      }
    },
    mounted: async function () {
      _this = this
      // 获取url中参数
      this.param.interfaceTransSerial = getParamFromUrl('interfaceTransSerial')
      this.operateType = Number(getParamFromUrl('type'))
      if (this.param.interfaceTransSerial) {
        // 模拟登陆
        await this.monitorLogin(this.param.interfaceTransSerial)
      }
      //设置拦截器
      // 添加请求拦截器
      axios.interceptors.request.use(function (config) {
        var token = window.localStorage.getItem('monitorToken')
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.Authorization = token
        }
        return config
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });
      /** 获取货币类型**/
      _this.moneyTypes = JSON.parse(window.sessionStorage.getItem('moneyTypes'))
      // 判断值是否为空
      var misN = _this.moneyTypes ? _this.moneyTypes[0].currencyDesc : null
      // storage中无数据
      if (!_this.moneyTypes | misN === null) {
        console.log('从服务器获取通用数据')
        // 获取货币类型并保存
        axios.get(_this.baseUrl+'/commonAr/queryCurr.do').then(function (res) {
          if (res.data.status) {
            window.sessionStorage.setItem('moneyTypes', JSON.stringify(res.data.data))
            // 赋值
            _this.moneyTypes = res.data.data
            console.log('保存通用数据')
          } else {
            console.log(res.data.msg)
          }
        }).catch(function (err) {
          throw new Error(err)
        })
      }
      // 初始化获取数据
      _this.initData()
    },
    watch: {
      receiveCustId: debounce(function (val) {
        if (val.length === 0) {
          return false
        }
        var _this = this
        axios.post(_this.baseUrl + '/commonCust/queryCustomer.do', {
          'custId': val,
          'companyName': ''
        }).then(function (res) {
          if (res.data.status) {
            _this.rc.name = res.data.data.companyName
            _this.rc.status = true
          } else {
            _this.rc.name = '授让公司不存在'
            _this.rc.status = false
          }
        })
      }, 1000)
    },
    computed: {
      comDatas: function () {
        return this.tableData.map(function (item, index, arr) {
          item.idx = index
          return item
        })
      },
    },
    methods: {
      /* 搜索区 */
      onSubmit: debounce(onSubmit, 1000, true),
      // 重置表单
      resetForm: resetForm,
      /* 表格区 */
      getdata: getdata,
      initData: initData,
      initForm: initForm,
      handleClearSelection: clearSelection, // 清除已勾选
      // 选中项改变事件
      handleSelectionChange: debounce(handleSelectionChange, 500),
      // 是否可选择
      disableHandle: disableHandle,
      // 空值处理
      nullDealWith: nullDealWith,
      // 千分位formatter方法
      regexNum: regexNum,
      // 时间格式化
      dateFormat: dateFormat,
      // 详情
      handleInfo: handleInfo,
      // 关闭弹窗
      handleClose: handleClose,
      // 全选
      handleSelectAll: handleSelectAll,
      /* 分页区 */
      // 页数改变
      handleSizeChange: handleSizeChange,
      // 翻页
      handleCurrentChange: handleCurrentChange,
      // 转让
      handleTrans: handleTrans,
      /* 转让区*/
      // 转让选择
      handleTransSelectionChange: handleTransSelectionChange,
      // 输入金额框
      handleInput: handleInput,
      // 转让确认
      transSub: debounce(transSub, 1000, true),
      // 转让表中勾选事件
      select: select,
      blurIsClear: blurIsClear,
      openLoading:openLoading,
      closeLoading:closeLoading,
      // 贴现弹窗
      handleDisc: handleDisc,
      // 发票修改事件
    handleCheckedChange: handleCheckedChange,
      // 贴现
      handleSubmitDisc:handleSubmitDisc,
      // 金额输入框
      handleInputDisc:handleInputDisc,
      monitorLogin: monitorLogin,
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
      // 千分位
      regexNum: function (val) {
        return thousandth(val) + '元'
      }
    }
  })

  function resetForm(formName) {
    this.$refs[formName].resetFields()
  }

  function onSubmit() {
    if(this.dataLoading){
      this.$message.error('获取数据中，请稍候...')
      return false
    }
    var form = this.formInline.moneyDate ? this.formInline.moneyDate[0].Format('yyyy-MM-dd') : ''
    var to = this.formInline.moneyDate ? this.formInline.moneyDate[1].Format('yyyy-MM-dd') : ''
    var param = Object.assign(this.param,{
      masterChainId: this.formInline.masterChainId, // ar单号
      isMasterAr: this.formInline.isMasterAr, // ar来源
      companyName: this.formInline.companyName, // 付款单位
      checkedStatus: this.formInline.status, // 状态
      billBookCurr:this.formInline.billBookCurr, // 币别
      invoiceNo: this.formInline.invoiceNo, // 发票号
      from: form, // 日期
      to: to,
      billId: this.formInline.billId // 结报号
  })
    this.param = this.operateType === 1 ? Object.assign(param, {factoringCustName: this.formInline.factoringCustName}) : param
    this.initData()
  }
  // 空值处理
  function nullDealWith(row, column) {
    var val = row[column.property]
    if (val === undefined || val === null || val === '') {
      return '- -'
    }
    return val
  }
  // 时间格式化
  function dateFormat(row, column) {
    var date = row[column.property]
    if (date === undefined || date === null || date === '') {
      return '- -'
    }
    return new Date(date).Format('yyyy-MM-dd')
  }
  // 千分位formatter方法
  function regexNum(row, column) {
    var val = row[column.property]
    return thousandth(val)
  }
  /**
   *
   * 获取数据
   * @param {any} page 页数
   * @param {any} length 长度
   * @returns promise
   */
  function getdata(page, length) {
    var _this = this, loading = this.openLoading('获取数据中...','.main-content-box-card')
    return new Promise(function (resolve, reject) {
      //var  loading = this.$loading(loadingConf.get())// 开启加载动画
      //loading.setText('获取数据中，请稍候')
      _this.param.iDisplayStart = page
      _this.param.iDisplayLength = length
      try {
        var url = _this.operateType===1?'/multiArManager/getMultiArTransferListTable.do':'/multiArManager/getMultiArDiscountListTable.do'
        axios.post(_this.baseUrl + url, _this.param).then(function (response) {
          var result = null
          if (response.data.data && response.data.data.length > 0) {
            // 遍历子节点
            response.data.data.forEach(function (item) {
              if (item.tableData && item.tableData.length > 0) {
                item.tableData.map(function (val) {
                  val.company = val.isMasterAr ? val.companyName : val.custToName // 子节点受让公司对手公司处理
                })
              }
            })
            // 父节点处理
            response.data.data.map(function (val) {
              val.company = val.companyName // 父节点受让公司对手公司处理
            })
          }
          result = response
          _this.closeLoading() // 关闭加载动画
          resolve(result)
        })
      } catch (error) {
        _this.closeLoading() // 关闭加载动画
        console.log(error)
      }
    })
  }
  // 初始化获取数据
  function initData() {
    var _this = this
    _this.currentPage = 1
    var t = _this.getdata(_this.currentPage, _this.psize)
    t.then(function (res) {
        console.log('请求到数据', res)
        assginFunc.apply(_this,[res])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // 初始化表单
  function initForm() {
    this.receiveCustId = ''
    this.remark = ''
    this.rc = {
      name: '', // 授让公司名称
      status: false // 是否正确
    }
    this.agreeCheckList = []
    // 贴现部分
    this.checkList = []
    this.arAmt = '' // 贴现金额
    this.maxSum = null // 最大金额
  }
  /** 清除选中项 **/
  function clearSelection() {
    this.$refs.table.clearSelection()
  }
  // 主列表选中项改变事件
  function handleSelectionChange(val) {
    this.multipleSelection = val
    console.log(val)
    // 输入框赋值总金额
    this.displaySumAmt = thousandth(getSum(val, 'loanAmt'))
  }
  // 转让中选中项改变事件
  function handleTransSelectionChange(val) {
    this.multipleSelectionTrans = val
  }
  /**
   * 加总金额
   * val 数组
   * tag 加总的属性
   */
  function getSum(val, tag) {
    console.log(val)
    // 总金额
    var amount = 0
    // 遍历选择项
    // 2.计算勾选发票金额
    var sum = val.reduce(function(sum, currVal){
        var num = Number(currVal[tag])
        if (isNaN(num)) {
          return
        }
        return sum + num * 100
      }, 0) / 100
    // val.forEach(function (item) {
    //   amount += Number(item[tag]) * 100 // 金额累加
    // })
    // amount = amount / 100
    return sum // 返回
  }
  /**
   * 勾选中后填入金额
   */
  function amtAutoInpput(val) {
    // 总金额
    var amount = 0
    // 遍历选择项
    val.forEach(function (item) {
      amount += item[tag] // 金额累加
    })
    return thousandth(amount) // 格式化返回
  }
  // 可选项（金额为人民币）
  function disableHandle(row, index) {
    if (this.multipleSelection.length === 0) {
      return true
    }
    var result = row.currency === this.multipleSelection[0].currency &&
      row.factoringCustId === this.multipleSelection[0].factoringCustId
    return result
  }
  /**
   * 详情
   * @param {*} idx
   * @param {*} val
   */
  function handleInfo(idx, val) {
    var _this = this
    var loading = _this.openLoading('获取数据中...')
    // 获取数据
    var url = _this.operateType===1?'/multiArManager/arInfoDetail.do':'/multiArManager/arInfoDetail2Discount.do'
    axios.post(_this.baseUrl + url, { masterChainId: val.masterChainId }).then(function (res) {
      _this.closeLoading()
      if (res.data.status) {
        _this.detailsP = res.data.data
        _this.visibleInfo = true
      }else{
        _this.$message.error(res.data.msg)
      }
    })
  }

  function handleClose(val) {
    _this = this
    return function () {
      _this[val] = false
      _this.initForm()
    }
  }
  // 全选中事件
  function handleSelectAll(val) {
    _this = this
    // 1.选中
    if (val.length > 0 && _this.multipleSelection.length === 0) {
      // 1.1清除所有选中
      this.$refs.table.clearSelection()
      // 1.2勾选全部与第一个类型相同的
      _this.tableData.forEach(function (item, idx) {
        if (val[0].isMasterAr === item.isMasterAr && item.currency === val[0].currency && item.companyName === val[
            0].companyName) {
          _this.$refs.table.toggleRowSelection(item)
        }
      })
    } else { // 2.未选择
    }
  }
  // 页数改变
  function handleSizeChange(val) {
    var _this = this
    _this.currentPage = 1 
    this.psize = val
    this.getdata(_this.currentPage, _this.psize)
      .then(function (response) {
        assginFunc.apply(_this,[response])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // 翻页
  function handleCurrentChange(val) {
    var _this = this
    this.getdata(val, _this.psize)
      .then(function (response) {
        assginFunc.apply(_this,[response])
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // 赋值
  function assginFunc(res){
    if (res.data.status) {
      this.displayTransAmt = res.data.data.transAmt // 待转让金额
      this.tableData = res.data.data.arList
      this.total = res.data.recordsTotal
    } else {
      this.tableData = []
      this.total = 0
      this.$message.error(res.data.msg)
    }
  }
  // 显示转让
  function handleTrans() {
    if (this.multipleSelection.length === 0) {
      this.$message({
          message: '请至少选择一笔单进行作业',
          type: 'warning'
        });
      return true
    }
    var _this = this
    var loading = _this.openLoading('获取数据中...')
    var data = {
      arList: _this.multipleSelection,
      interfaceTransSerial: _this.param.interfaceTransSerial
    }
      //2018-12-4 by:xyl
      axios.post(_this.baseUrl + '/multiArTransferManager/multiArTransView.do',data).then(function (res) {
        _this.closeLoading()
        if(res.data.status){
          _this.transDatas = res.data.data
          _this.visibleTrans = true
          setTimeout(function () {
            // 全选
            console.log(_this.$refs)
            _this.$refs.tableTrans.toggleAllSelection()
            // 赋值总金额
            _this.displaySumAmtTrans = thousandth(getSum(_this.transDatas.arInvoiceList, 'transferAfterTaxAmt'))
          }, 500)
        }else{
          _this.$message.error(res.data.msg)
        }
      }).catch(function(error){
        console.log(error)
        loading.close()
      })
      // 2018-11-30 by:xyl
      // axios.post(_this.baseUrl + '/multiArTransferManager/multiArTransView.do',data).then(function (res) {
      //   _this.detailsTG = res.data.data
      //   _this.visibleTransGou = true
      //   setTimeout(function () {
      //     _this.closeLoading()
      //     // 赋值总金额
      //     if(res.data.status){
      //       _this.displaySumAmtTrans = thousandth(getSum(_this.detailsTG.arInvoiceList, 'availableAfterTaxAmt'))
      //     }else{
      //       _this.$message.error(res.data.msg)
      //     }
      //   }, 500)
      // }).catch(function(error){
      //   console.log(error)
      //   loading.close()
      // })
      // 2018-11-30 by:xyl
    // if(this.multipleSelection[0].isMasterAr === 1){
    //   //获取自有数据
    //   axios.post(_this.baseUrl + '/multiArTransferManager/multiArTransViewOwn.do',data).then(function (res) {
    //     _this.closeLoading()
    //     if(res.data.status){
    //       _this.transDatas = res.data.data
    //       _this.visibleTrans = true
    //       setTimeout(function () {
    //         // 全选
    //         console.log(_this.$refs)
    //         _this.$refs.tableTrans.toggleAllSelection()
    //         // 赋值总金额
    //         _this.displaySumAmtTrans = thousandth(getSum(_this.transDatas.arInvoiceList, 'transferAfterTaxAmt'))
    //       }, 500)
    //     }else{
    //       _this.$message.error(res.data.msg)
    //     }
    //   }).catch(function(error){
    //     console.log(error)
    //     _this.closeLoading()
    //   })
    // }else{
    //   // 获取购入数据
    //   axios.post(_this.baseUrl + '/multiArTransferManager/multiArTransViewPurchased.do',data).then(function (res) {
    //     _this.detailsTG = res.data.data
    //     _this.visibleTransGou = true
    //     setTimeout(function () {
    //       _this.closeLoading()
    //       // 赋值总金额
    //       if(res.data.status){
    //         _this.displaySumAmtTrans = thousandth(getSum(_this.detailsTG.arList, 'arTransferAmt'))
    //       }else{
    //         _this.$message.error(res.data.msg)
    //       }
    //     }, 500)
    //   }).catch(function(error){
    //     console.log(error)
    //     loading.close()
    //   })
    // }
  }
  // 转让金额输入框事件
  function handleInput(type, row, e, selection) {
    if (row[type] < Number(e.target.value)) {
      var _this=this
      this.$alert('转让金额不得大于可用金额', '警告', {
        confirmButtonText: '确定',
        callback: function(action) {
          if(type === 'availableAfterTaxAmt'){
            row.transferAfterTaxAmt = row.availableAfterTaxAmt
            _this.displaySumAmtTrans = thousandth(getSum(selection, 'availableAfterTaxAmt'))
          }else if(type === 'loanAmt'){
            row.arTransferAmt = row.loanAmt
            _this.displaySumAmtTrans = thousandth(getSum(selection, 'arTransferAmt'))
          }
        }
      })
    }
    var typrTag = type === 'availableAfterTaxAmt'?'transferAfterTaxAmt':'arTransferAmt'
    this.displaySumAmtTrans = thousandth(getSum(selection, typrTag))
  }
  // 贴现金额输入框事件
  function handleInputDisc(e) {
    var _this = this
    if (this.maxSum < Number(e.target.value)) {
      this.$alert('贴现金额不得超过金额上限', '警告', {
        confirmButtonText: '确定',
        callback: function(action) {
          _this.arAmt = _this.maxSum
        }
      })
    }
  }
  // blurIsClear
  function blurIsClear(row) {
    if (Number(row.transferAfterTaxAmt) === 0) {
      this.$refs.tableTrans.toggleRowSelection(row, false)
      row.transferAfterTaxAmt = ''
      row.disabled = true
      return
    }
  }

  function inputCan() {
    var event = this.event
    return getInputDecimal(event)
  }
  // 转让确认
  function transSub(type,originData,selection) {
    // 1.判断是否填写正确授让公司
    if (!this.rc.status&&this.param.interfaceTransSerial===null) {
      this.$message({
        type: 'error',
        message: '请填写正确授让公司id'
      })
      return
    }
    // 判断是否同意协议
    if (this.agreeCheckList.length!==2) {
      this.$message({
        type: 'error',
        message: '有未勾选确认项'
      })
      return
    }
    var loading = this.openLoading('系统处理中...')
    // 2.将要发送的数据
    var data = {
      arInvoiceList: selection,
      transAmt: originData.transAmt,
      interfaceTransSerial: originData.interfaceTransSerial,
      custToId: this.param.interfaceTransSerial===null ? this.receiveCustId : originData.custToId,
      custToName:  this.param.interfaceTransSerial===null ? this.rc.name : originData.custToName,
      remark: this.remark,
    }
    var url = this.baseUrl + '/multiArTransferManager/multiInitiateTransfer.do'
    var dialogTag = type===1?'visibleTrans':'visibleTransGou'
    axios.post(url, data).then(function (res) {
      _this.closeLoading()
      if (res.data.status) {
        _this.handleClose(dialogTag)()
        _this.$message({
          showClose: true,
          message: res.data.msg,
          type: 'success'
        })
        if(res.data.data.isSignNow === 'true'){
          var operateType = 'transfer'
          window.location.href='./CF/receive.html?transSerialNo='+res.data.data.transSerialNo+'&operateType='+operateType,'_target'
          return
        }
        // 初始化获取数据
        _this.initData()
      } else {
        _this.$message.error(res.data.msg)
      }
    }).catch(function (err) {
      console.log('系统异常',err)
      _this.closeLoading()
      _this.$alert('系统异常,请联系管理员!', '系统提示', {
        confirmButtonText: '确定',
        callback: function(action) {
        }
      })
    })
  }

  function select(selection, row) {
    if (isSelect(selection, row)) {
      row.transferAfterTaxAmt = row.availableAfterTaxAmt
      row.disabled = false
    } else {
      row.transferAfterTaxAmt = ''
      row.disabled = true
    }
    // 赋值总金额
    this.displaySumAmtTrans = thousandth(getSum(selection, 'transferAfterTaxAmt'))
  }
  // 当前点击是否为勾选
  function isSelect(selection, row) {
    for (var index = 0; index < selection.length; index++) {
      var element = selection[index];
      if (element === row) {
        return true
      }
    }
    return false
  }

  function openLoading(text,target) {
    target = target ? target : 'document.body'
    var loading = this.$loading({
      target: target,
      lock: true,
      text: text,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.dataLoading = loading
    return loading
  }
  function closeLoading() {
    console.log(this.dataLoading)
    this.dataLoading.close()
    this.dataLoading = false
  }
  function handleDisc(idx, val){
    var _this = this
    var param = {
      arList: [val],
      interfaceTransSerial:_this.param.interfaceTransSerial
    }
    _this.openLoading('获取数据中')
    // 获取数据
    axios.post(_this.baseUrl + '/multiArDiscountManager/multiArDiscountView.do',param).then(function (res) {
      _this.closeLoading()
      if(res.data.status){
        _this.detailsDisc = res.data.data
        _this.maxSum = res.data.data.discountTotalCreditAmt
        _this.visibleDisc = true
      }else{
        _this.$message.error(res.data.msg)
      }
      }).catch(function(error){
        console.log(error)
        _this.closeLoading()
    })
  }
// 改变选项
function handleCheckedChange (value) {
  console.log(value)
  // 1.获取已勾选发票
  var arr = getSelect.call(this,value)
  // 2.计算勾选发票金额
  var sum = getSum(arr, 'afterTaxAmt')
  if(this.detailsDisc.discountTotalCreditAmt!==null){
    _this.maxSum = sum < this.detailsDisc.discountTotalCreditAmt&&sum!==0 ? sum : this.detailsDisc.discountTotalCreditAmt
  }else{
    _this.maxSum = sum
  }
  // 赋值
  this.arAmt = sum === 0 ? 0 : _this.maxSum
}
function getSelect(value){
  var arr = []
  this.detailsDisc.arList[0].availableInvoiceList.forEach(function(item) {
    for (var index = 0; index < value.length; index++) {
      if (value[index] === item.invoiceNo) {
        arr.push(item)
      }
    }
  })
  return arr
}
// 贴现
function handleSubmitDisc(){
  var _this = this
  // 1.获取已勾选发票
  var arr = getSelect.call(this,this.checkList)
  var data = {
    arList: [{
      masterChainId:this.detailsDisc.arList[0].masterChainId
    }],
    remark: '',
    interfaceTransSerial: _this.param.interfaceTransSerial
  }
  if (arr.length===0) {
    this.$message({
      type: 'error',
      message: '未勾选发票'
    })
    return
  }
  if (Number(this.arAmt) > this.maxSum) {
    this.$message({
      type: 'error',
      message: '贴现金额不得超过金额上限'
    })
    return
  }
  // 5.2判断是否大于余额
  if (Number(this.arAmt) > this.detailsDisc.arList[0].loanAmt) {
    this.$message({
      type: 'error',
      message: '贴现金额不得大于可用余额'
    })
    return
  }
  data.arList[0].arAmt = this.arAmt
  data.arList[0].selectedInvoiceList = arr
  console.log(JSON.stringify(data))
  axios.post(_this.baseUrl + '/multiArDiscountManager/multiInitiateDiscount.do', data, true).then(function(res){
    // 操作成功 关闭弹窗
    if (res.data.status) {
      // 关闭弹窗
      _this.handleClose('visibleDisc')()
      if(res.data.data.isSignNow === 'true'){
        var operateType = 'discount'
        window.location.href='./CF/receive.html?transSerialNo='+res.data.data.transSerialNo+'&operateType='+operateType,'_target'
        return
      }
      // 初始化获取数据
      _this.initData()
    }
  }).catch(function(err){
    // 错误提示
    console.log(err)
  })
}
// 模拟登陆
function monitorLogin (id) {
  var _this = this
  return new Promise(function (resolve, reject){
    let param = {
      interfaceTransSerial: id
    }
    axios.post(_this.baseUrl+'/login/simulateLogin.do', param).then(res => {
      if (res.data.status === 1) {
        window.localStorage.setItem('monitorToken', res.data.data.token)
        resolve(1)
      }
      resolve(0)
    }).catch(err => {
      console.log(err)
    })
  })
}