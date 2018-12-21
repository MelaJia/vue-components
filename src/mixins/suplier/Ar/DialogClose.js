import {
  baseUrl
} from '@/config/env.js'
import Print from 'print-js'
export default {
  methods: {
    handleClose (done) {
      this.$emit('update:visibleP', false)
      this.$emit('update:visi', false)
    },
    constractHandle (url, event) { // 打开合同窗口
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        event.preventdefault()
        window.open(`${baseUrl}/static/pdfjs/web/viewer.html?url=${url}`)
        return false
      } else {
        return true
      }
    },
    print (val) { // 打印
      // this.$print(this.$refs[val]) // 使用
      Print({
        printable: val,
        type: 'html',
        // 继承原来的所有样式
        targetStyles: ['*']
      })
    }
  }
}
