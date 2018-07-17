<template>
  <el-upload class="avatar-uploader" :data="param" :headers="{'Authorization':token}" :action="uploadUrl" :show-file-list="false" :on-progress="uploadVideoProcess" :on-success="handleAvatarSuccess" :on-error="uploadError">
    <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" :status="status" :width="120"></el-progress>
    <img v-else-if="imgurl" :src="imgurl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<style>
/* 上传样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
<script>
import {
  apiUrl
} from '@/config/env.js'
import { mapGetters } from 'vuex'
export default {
  props: ['param', 'oImgUrl'],
  data () {
    return {
      imgurl: '',
      uploadUrl: apiUrl + '/cust/userFilePicture',
      videoFlag: false,
      videoUploadPercent: 0,
      status: ''
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.videoUploadPercent = 100
      this.status = 'success'
      setTimeout(() => {
        this.videoFlag = false
      }, 1000)
      this.imgurl = URL.createObjectURL(file.raw)
      this.$emit('get-url', res) // 返回图片地址
    },
    // 进度
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage
    },
    // 上传失败
    uploadError (err, file, fileList) {
      this.status = 'exception'
      setTimeout(() => {
        this.videoFlag = false
      }, 1000)
      console.log(err)
    }
  }
}
</script>
