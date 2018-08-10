<template>
  <el-upload class="upload-demo" ref="upload" :data="param" action="https://jurongtest.foxconn.com/JuXin/openapi/cust/userFilePicture"
    :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div><slot name="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</slot></div>
  </el-upload>
</template>
<script>
import {
  apiUrl
} from '@/config/env.js'
export default {
  props: ['param', 'fileList'],
  data () {
    return {
      uploadUrl: apiUrl + '/cust/userFilePicture'
    }
  },
  methods: {
    submitUpload () {
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
    },
    handleSuccess: handleSuccess
  }
}
// 上传成功事件
function handleSuccess (res, file, fileList) {
  this.$emit('get-url', { val: res, file: file }) // 返回到父级
}
</script>
