<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="formInline" label-width="130px" status-icon :rules="rules" label-position="right">
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="可融资金额: ">
              <span class="red">{{form.canV}}元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="融资申请金额:" prop="applyAmt">
              <el-input v-model="formInline.applyAmt">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="还款日期:" prop="repayDate">
            <el-date-picker :editable="false" v-model="formInline.repayDate"  :picker-options="pickerOptions" type="date" placeholder="选择日期">
            </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="上传附件:">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  data () {
    return {
      bankProvinceCity: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      // 校验规则
      rules: {
        applyAmt: [
          { required: true, message: '请输入融资金额', trigger: 'blur' },
          { validator: checkNumberPire({ max: this.form.canV }), trigger: 'blur' }
        ],
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
    }
  },
  methods: {
    subHandle: debounce(submit, 1000, true),
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

// 提交操作
function submit () {
  // 表单验证
  this.$refs.form.validate((valid) => {
    if (valid) {
      // 组合数据
      const param = {
        custId: this.form.custId, // 供應商Id
        applyAmt: this.formInline.applyAmt, // 融资申请金额
        repayDate: this.formInline.repayDate // 还款日期
      }
      // 提交数据
      postDataBase.call(this, '/creditLoan/creditApplyDiscount.do', param, true).then(res => {
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
