<template>
  <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" >
    <img v-if="imgurl" :src="imgurl" class="avatar">
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
export default {
  data () {
    return {
      imgurl: ''
    }
  },
  methods: {
    // 图片上传
    handleAvatarSuccess (res, file) {
      console.log(file)
      this.imgurl = URL.createObjectURL(file.raw)
      this.$emit('get-url', this.imgurl) // 返回图片地址
    }
  }
}
</script>
