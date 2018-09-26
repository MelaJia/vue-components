<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-form ref="form" :model="getform" :rules="rules" size="small" label-width="140px">
        <el-row>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="角色名:" prop="roleName">
              <el-input v-model="getform.roleName" placeholder="请输入角色名" @change="deleteText"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="角色所属:" prop="roleType">
              <el-select v-model="getform.roleType" placeholder="请选择">
                <el-option v-for="(item, index) in this.$store.getters.roleBelong" :key="index" :label="item.roleTypeName"
                  :value="item.roleType"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
.el-input.el-input--small{
  width:240px;
}
.el-select.el-select--small{
  width:240px;
}
.layout.form {
  margin-top: 10px;
  > .el-row {
    margin-top: 10px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 120px;
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
import Common from '@/mixins/common'
import { debounce } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      rules: {
        roleName: [
          { required: true, message: '角色名不能为空', trigger: 'blur' }
        ],
        roleType: [
          {required: true, message: '角色所属不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.roleId + '角色修改'
    },
    getform () {
      return this.detailsP
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true), // 修改
    init: Init,
    deleteText () {
      // console.log(this.getform)
      this.getform.roleName = this.getform.roleName.replace(/^\s+|\s+$/g, '')
    }
  }
}
// 确认提交
function submit () {
  this.$refs.form.validate((valid) => {
    if (valid) {
      const param = {
        roleId: this.detailsP.roleId,
        roleName: this.getform.roleName,
        roleType: this.getform.roleType
      }
      // 显示加载图标
      const loading = this.$loading(loadingConf.sub())
      // 发送数据
      this.axios.post('/roleAdmin/adjustRole.do', param).then(res => {
        console.log(res)
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.msg ? res.data.msg : '返回结果错误，请联系管理员',
          type: type
        })
        // 操作成功关闭弹窗刷新数据
        if (res.data.status) {
          console.log(param)
          this.init()
          this.$parent.fresh()
          this.handleClose()
        } else {
          loading.close()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '操作失败'
        })
        // 关闭加载图标
        loading.close()
      })
    }
  })
}
// 初始化
function Init () {
  // this.getform.roleName = ''
  // this.getform.roleType = ''
  if (this.$refs.form) {
    this.$refs.form.resetFields()
  }
}
</script>
