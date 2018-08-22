<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="formInline" label-width="130px" status-icon label-position="right">
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="可融资金额: ">
              <span class="red">{{form.availableCreditAmount}}元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="融资申请金额:" :rules="applyRule" prop="applyAmt">
              <el-input v-model="formInline.applyAmt">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="还款日期:" :rules="rules.repayDate" prop="repayDate">
            <el-date-picker :editable="false" v-model="formInline.repayDate"  :picker-options="pickerOptions" type="date" placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="上传附件:">
            <upload :param="{typename:'files'}" :file-list.sync="fileList" :api-url="'/creditLoan/creditLoanUploadFile.do'" @get-url="getUrl"></upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.red {
  color: red;
}
</style>
<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
import { debounce, postDataBase } from '@/util/util' // 防抖函数
import { checkNumberPire } from '@/util/validate' // 校验数字
import Upload from '@/components/Items/uploadFile'
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  components: {
    Upload
  },
  data () {
    return {
      bankProvinceCity: [],
      fileList: [], // 文件列表
      fileListCache: [], // 文件缓存列表
      // 校验规则
      rules: {
        repayDate: [
          { required: true, message: '请选择还款日期', trigger: 'blur' }
        ]
      },
      // 日期选择器配置
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      // 表单数据
      formInline: {
        applyAmt: '', // 融资申请金额
        repayDate: null // 还款日期
      }
    }
  },
  computed: {
    getTitle () {
      return '信 用 贷 款'
    },
    // 金额校验规则动态
    applyRule () {
      return [
        { required: true, message: '请输入融资金额', trigger: 'blur' },
        { validator: checkNumberPire({ max: this.form.availableCreditAmount }), trigger: 'blur' }
      ]
    }
  },
  methods: {
    subHandle: debounce(submit, 1000, true),
    // 上传图片更新fileList
    getUrl: getUrl,
    init: init
  }
}

// 提交操作
function submit () {
  // 表单验证
  this.$refs.form.validate((valid) => {
    console.log(this.fileList)
    if (valid) {
      // 组合数据
      const param = {
        custId: this.form.custId, // 供應商Id
        applyAmt: this.formInline.applyAmt, // 融资申请金额
        repayDate: this.formInline.repayDate, // 还款日期
        loanUploadFileUrl: this.fileList // 附件列表
      }
      // 提交数据
      postDataBase.call(this, '/creditLoan/creditApplyDiscount.do', param, true).then(res => {
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.init()
          this.$parent.fresh()
          this.handleClose()
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
      this.fileListCache.push({ previewUrl: val.data, loanUploadFileUrl: val.data, uid: file.uid, name: file.name })
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
function init () {
  this.fileList = []
  Object.assign(this.formInline, { applyAmt: '', repayDate: null })
}
</script>
