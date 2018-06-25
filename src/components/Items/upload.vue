<template>
  <el-upload class="avatar-uploader" :data="param" :headers="{'Authorization':token}" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" >
    <img v-if="imgurl" :src="imgurl" class="avatar">
    <img v-else-if="oImgUrl" :src="oImgUrl" class="avatar">
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
import {
  apiUrl
} from '@/config/env.js'
import {mapGetters} from 'vuex'
export default {
  props: ['param', 'oImgUrl'],
  data () {
    return {
      imgurl: '',
      uploadUrl: apiUrl + '/cust/uploadPicture'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    // 图片上传
    handleAvatarSuccess (res, file) {
      this.imgurl = URL.createObjectURL(file.raw)
      this.$emit('get-url', res) // 返回图片地址
    }
  }
}
</script>
