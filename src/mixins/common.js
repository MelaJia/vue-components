import {loadingConf} from '@/config/common' // 获取加载配置
import { postDataBase, thousandth, throttle } from '@/util/util' // 发送数据函数
export default {
  methods: {
    // 按下左键
    mouseDown: mouseDown,
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
    // 千分位原始方法
    thousandth: thousandth,
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
    regexNum: thousandth,
    // 添加%
    addPercent: function (val) {
      if (val === undefined || val === null || val === '') {
        return ''
      }
      return `${val}%`
    }
  }
}
// 错误提示函数
function erroShow (err, loading) {
  this.$alert(`网络错误${err}`, '系统提示', {
    confirmButtonText: '确定',
    callback: action => {
      // 关闭加载图标
      loading.close()
    }
  })
}
// 鼠标单击事件
function mouseDown (e) {
  // 获取单击位置
  var disX = e.clientX
  var t = document.querySelector(':not(td)>.el-table>.el-table__body-wrapper')
  // 判断是否需要滑动
  if (t.className.indexOf('is-scrolling-none') > 0) {
    return
  }
  // 改变鼠标
  t.style.cursor = `url(./static/cnd/icon/left-right.cur) 12 12,move`
  // 获取dom节点
  // 绑定鼠标移动事件
  document.onmousemove = throttle(function (e) {
    // 获取鼠标移动距离
    var l = e.clientX - disX
    // 起始点终点判断
    if ((l > 0 && t.className.indexOf('right') < 0) || (l < 0 && t.className.indexOf('left') < 0)) {
      // 设置表格拖动
      t.scrollLeft += l
    }
    // 移动到终点处理
  }, 100)
  // 鼠标松开 移除绑定事件
  document.onmouseup = function (e) {
    document.onmousemove = null
    document.onmouseup = null
    // 恢复鼠标指针
    t.style.cursor = 'auto'
  }
}
