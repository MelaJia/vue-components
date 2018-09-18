export const loadingConf = {
  // 提交数据中
  sub: function () {
    return {
      lock: true,
      text: '系统处理中，请稍候',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  },
  // 获取数据中
  get: function () {
    return {
      lock: true,
      text: '获取数据中，请稍候',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  },
  // 获取数据中
  success: function () {
    return {
      lock: true,
      text: '操作成功，请稍候',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  }
}
