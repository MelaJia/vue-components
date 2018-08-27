<template>
  <el-upload class="upload-demo" ref="upload" :data="param" :action="uploadUrl" :headers="{'Authorization':token}"
    :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :on-success="handleSuccess" :file-list="fileList" :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div><slot name="tip" class="el-upload__tip">只能上传xls,pdf,doc,gif,JPG,jpeg,xlsx文件,且大小不能超过 4MB</slot></div>
  </el-upload>
</template>
<script>
/** 参数 param请求参数、 file-list文件列表、api-url请求地址
 *  事件 get-url 上传成功触发事件function(val:服务器返回参数,file:当前文件,fileLength:上传插件中当前文件数)
 **/
import {
  apiUrl, baseUrl
} from '@/config/env.js'
import {mapGetters} from 'vuex'
export default {
  // param请求参数、 fileList文件列表、apiUrl请求地址、showFileList是否显示文件列表
  props: ['param', 'fileList', 'apiUrl'],
  data () {
    return {
      uploadUrl: apiUrl + this.apiUrl
    }
  },
  computed: {
    ...mapGetters(['token'])
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
    handleSuccess: handleSuccess,
    // 上传前检查类型
    beforeAvatarUpload: beforeAvatarUpload
  }
}
// 上传成功事件
function handleSuccess (res, file, fileList) {
  console.log('上传成功')
  this.$emit('get-url', { val: res, file: file, fileLength: fileList.length }) // 返回到父级
}
// 检查上传文件
function beforeAvatarUpload (file) {
  console.log(file)
  let typeName = file.name.substr(file.name.lastIndexOf('.') + 1)
  const typeReg = /(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG|xls|pdf|doc|xlsx)$/
  const isIMG = typeReg.test(typeName)
  const isLt4M = file.size / 1024 / 1024 < 4

  if (!isIMG) {
    this.$message.error('上传文件只能是xls,pdf,doc,gif,JPG,jpeg,xlsx格式!')
  }
  if (!isLt4M) {
    this.$message.error('上传文件大小不能超过 4MB!')
  }
  return isIMG && isLt4M
}
</script>
