import {
  baseUrl
} from '@/config/env.js'
import {Print} from '@/util/util'
export default {
  methods: {
    handleClose (done) {
      this.$emit('update:visibleP', false)
    },
    constractHandle (id) { // 打开合同窗口
      let width = 800
      let height = 600
      let left = (window.innerWidth - width) / 2
      let top = (window.innerHeight - height) / 2
      window.open(`${baseUrl}/static/pdfjs/web/viewer.html?contractNo=${id}`, 'newwindow', `height=${height}, width=${width}, top=${top}, left=${left}, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=n o, status=no`)
    },
    print: Print // 打印
  }
}
