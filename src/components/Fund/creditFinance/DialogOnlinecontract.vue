<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout loan-contract-form">
      <el-form ref="form" :model="detailsP" :rules="rules" status-icon label-width="130px">
        <el-row>
          <el-col :span="11" class="flex">
            <el-form-item label="实放金额:" prop="applyAmt">
              <el-input v-model="detailsP.applyAmt">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="flex">
            <el-form-item label="还款日期: " prop="repayDate">
              <span>{{detailsP.repayDate | dateFormat}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="合同上传:">
              <upload :param="{typename:'files'}" :file-list.sync="fileList" :api-url="'/creditLoan/creditLoanUploadFile.do'" @get-url="getUrl">
                <template slot="tip">上传pdf文件,可上传多个文件</template>
              </upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="uploadContract">上传合同</el-button>
      <el-button type="default" @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style lang="scss">
.layout.loan-contract-form {
  margin-top: 10px;
  .el-row {
    margin-top: 10px;
  }
}

.layout.loan-contract-form .flex {
  display: flex;
  label {
    width: 150px;
    height: 40px;
    line-height: 40px;
  }
  span {
    height: 40px;
    line-height: 40px;
  }
  .el-select,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 180px;
  }
  .el-input-group__append {
    padding: 0 5px;
  }
}
// .el-upload.el-upload--text{
//   display: inline-block;
//   vertical-align: top;
// }
// .el-upload-list{
//   display: inline-block;
// }
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
// import { checkNumberPire } from '@/util/validate' // 校验数字
import { debounce, postDataBase } from '@/util/util' // 防抖函数
// import { loadingConf } from '@/config/common' // 获取加载配置
import {
  apiUrl
} from '@/config/env.js'
import { mapGetters } from 'vuex'
import Upload from '@/components/Items/uploadFile'

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      uploadUrl: apiUrl + '/cust/userFilePicture',
      fileList: [], // 文件列表
      fileListCache: [], // 文件缓存列表
      applyAmt: '',
      // 校验规则
      rules: {
        applyAmt: [
          { required: true, message: '请输入实放金额', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.loanId + '合同确认'
    },
    ...mapGetters(['token'])
  },
  components: {
    Upload
  },
  methods: {
    uploadContract: debounce(submit, 1000, true),
    // 上传合同更新fileList
    getUrl: getUrl
  }
}
function submit () {
  // 表单验证
  this.$refs.form.validate((valid) => {
    console.log(this.fileList)
    if (valid) {
      // 组合数据
      const param = {
        loanId: this.detailsP.loanId, // 融资编号Id
        applyAmt: this.detailsP.applyAmt, // 实放金额
        repayDate: this.detailsP.repayDate, // 还款日期
        contractUploadFileList: this.fileList // 合同列表
      }
      postDataBase.call(this, '/factoringCreditLoan/generateContract.do', param, true).then(res => {
        console.log(param)
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
          this.fileList = []
        }
      })
    }
  })
}
// 上传成功调用此事件给fileList中添加数据
function getUrl (obj) {
  let { val, file, fileLength } = obj
  if (val) {
    if (val.status) {
      this.fileListCache.push({ contractUploadFileUrl: val.data, uid: file.uid, name: file.name })
      // 当前文件数
      let nowlength = this.fileListCache.length + this.fileList.length
      if (nowlength === fileLength) {
        // 赋值
        this.fileList = [...this.fileList, ...this.fileListCache]
        // 重置fileListCache
        this.fileListCache = []
      }
    } else {
      this.$message.error(val.msg)
    }
  }
}
</script>
