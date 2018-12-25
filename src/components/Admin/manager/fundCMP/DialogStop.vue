<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title" class="headerTitle">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="停用理由:" prop="stopReason">
              <el-input type="textarea" v-model="form.stopReason" @change="deleteText"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit" class="searchBtn" size="small">确认</el-button>
      <el-button @click="handleClose" type="primary" size="small" plain>取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_newUI.scss";
.layout.form {
  margin-top: 10px;
  > .el-row {
    margin-top: 10px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 80px;
    height: 40px;
    line-height: 40px;
  }
  > span {
    height: 40px;
    line-height: 40px;
    font-weight: 600;
  }
  > .el-select,
  > .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      form: {
        stopReason: '' // 停用理由
      },
      rules: {
        stopReason: [
          { required: true, message: '停用理由不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return `${this.detailsP.companyName}停用理由`
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true),
    init: Init,
    deleteText () {
      this.form.stopReason = this.form.stopReason.replace(/^\s+|\s+$/g, '')
    }
  }
}
// 提交操作
function submit () {
  this.$refs.form.validate((valid) => {
    if (valid) {
      let param = {
        custId: this.detailsP.custId, // 融资Id
        stopReason: this.form.stopReason // 停用理由
      }
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 发送数据
      this.axios.post('/sysCompanyUserManager/disableFactoringCompany', param).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
          type: type
        })
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          this.handleClose() // 关闭弹窗
          this.$parent.fresh() // 刷新数据
        } else {
          loading.close()
          this.$message.error(res.data.msg)
        }
      }).catch((err) => {
        // 错误提示
        erroShow.call(this, err, loading)
      })
    }
  })
}
// 初始化
function Init () {
  this.form.stopReason = ''
  if (this.$refs.form) {
    this.$refs.form.resetFields()
  }
}
</script>
