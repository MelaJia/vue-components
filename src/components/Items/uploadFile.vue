<template>
  <el-upload class="upload-demo" ref="upload" :data="param" :action="uploadUrl"
    :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div><slot name="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</slot></div>
  </el-upload>
</template>
<script>
/** 参数 param请求参数、 file-list文件列表、api-url请求地址
 *  事件 get-url 上传成功触发事件function(val:服务器返回参数,file:当前文件,fileLength:上传插件中当前文件数)
 **/
import {
  apiUrl, baseUrl
} from '@/config/env.js'
export default {
  // param请求参数、 fileList文件列表、apiUrl请求地址、showFileList是否显示文件列表
  props: ['param', 'fileList', 'apiUrl'],
  data () {
    return {
      uploadUrl: apiUrl + this.apiUrl
    }
  },
  methods: {
    submitUpload () {
      // let files = this.$refs.upload.uploadFiles
      // let formData = new FormData()
      // for (const file of files) {
      //   formData.append('file', file.raw)
      // }
      // this.axios.post(this.uploadUrl, formData).then(res => {
      //   console.log(res)
      // })
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      let arr = this.fileList.slice(0)
      let idx = this.fileList.findIndex((n) => n.uid === file.uid)
      if (idx >= 0) {
        arr.splice(idx, 1)
        this.$emit('update:fileList', arr)
      }
    },
    handlePreview (file) {
      console.log(file)
      let reg = /^http:/
      let url = reg.test(file.previewUrl) ? file.previewUrl : `${baseUrl}${file.previewUrl}`
      window.open(url, '_File')
    },
    handleSuccess: handleSuccess
  }
}
// 上传成功事件
function handleSuccess (res, file, fileList) {
  console.log('上传成功')
  this.$emit('get-url', { val: res, file: file, fileLength: fileList.length }) // 返回到父级
}
</script>
