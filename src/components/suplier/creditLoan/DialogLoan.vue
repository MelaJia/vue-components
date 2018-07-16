<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px" status-icon :rules="rules" label-position="right">
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="可融资金额: ">
              <span class="red">{{form.canV}}元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="融资申请金额:" prop="loanPer">
              <el-input v-model="form.loanPer">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="还款日期:" prop="repayDate">
            <el-date-picker :editable="false" v-model="form.repayDate"  :picker-options="pickerOptions" type="date" placeholder="选择日期">
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
      <el-button type="primary" @click="subHandle">修改</el-button>
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
import { debounce } from '@/util/util' // 防抖函数
import { checkNumber } from '@/util/validate' // 校验数字
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  data () {
    return {
      bankProvinceCity: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      rules: {
        loanPer: [
          { required: true, message: '请输入融资金额', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
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
        custId: this.form.custId, // 客户id
        factoringCustId: this.form.factoringCustId, // 保理商Id
        vendorCode: this.form.vendorCode, // 供应商代码
        loanPer: this.form.loanPer, // 放款比例
        fineGraceDays: this.form.fineGraceDays, // 宽容天数
        interestRate: this.form.interestRate, // 年利率
        serviceFeeRate: this.form.serviceFeeRate, // 还款手续费
        fineGraceDayRate: this.form.fineGraceDayRate, // 罚息天利率
        prepaymentDeductRate: this.form.prepaymentDeductRate // 提前还款手续费
      }
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 上传数据
      this.axios.post('/loanFee2/confirmCustLoanFee.do', param).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
          type: type
        })
        // 关闭加载图标
        loading.close()
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: `操作失败${err}`
        })
        // 关闭加载图标
        loading.close()
      })
    }
  })
}
</script>
