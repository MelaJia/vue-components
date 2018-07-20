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
              <span>{{detailsP.repayDate|dateFormat}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="合同上传:">
              <el-upload ref="upload" class="upload-demo" :headers="{'Authorization':token}" :auto-upload="false" :action="uploadUrl" :show-file-list="true" :on-remove="handleRemove" :on-preview="handlePreview">
                <el-progress v-if="flag == true" type="circle" :percentage="uploadPercent" :status="status" :width="120"></el-progress>
                <el-button size="mini" type="primary">选择文件</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传pdf文件,可以上传多个文件</div>
              </el-upload>
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

export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      uploadUrl: apiUrl + '/cust/userFilePicture',
      fileUrl: '',
      flag: false,
      contractList: [],
      status: '',
      applyAmt: '',
      uploadPercent: 0,
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
  methods: {
    uploadContract: debounce(submit, 1000, true),
    // 上传服务器
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
function submit () {
  // 表单验证
  this.$refs.form.validate((valid) => {
    if (valid) {
      // 组合数据
      const param = {
        loanId: this.detailsP.loanId, // 供應商Id
        applyAmt: this.detailsP.applyAmt, // 实放金额
        repayDate: this.detailsP.repayDate // 还款日期
      }
      // 提交数据
      postDataBase.call(this, '/factoringCreditLoan/generateContract.do', param, true).then(res => {
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
      })
    }
  })
}
</script>
