<template>

  <el-dialog custom-class="dia-width-70 my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称: ">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业电话：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业地址：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识別号：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商代码：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本：">
              <el-input placeholder="请输入内容" v-model="form.name" class="input-with-select">
                <el-select v-model="form.select" slot="append" placeholder="请选择">
                  <el-option label="人民币" value="1"></el-option>
                  <el-option label="美元" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收资本：">
              <el-input v-model="form.name">
                <el-select v-model="form.select" slot="append" placeholder="请选择">
                  <el-option label="人民币" value="1"></el-option>
                  <el-option label="美元" value="2"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司成立日期:">
              <el-date-picker v-model="form.creatDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照日期:">
              <el-date-picker v-model="form.compuDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司登记日期:">
              <el-date-picker v-model="form.recordDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="经营范围">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style lang="scss">
.dia-width-70 {
  min-width: 1200px;
}

.el-select .el-input {
  width: 130px;
}

.my-dialog {
  .el-input-group,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }
}
</style>

<script>
import DialogClose from '@/mixins/Ar/DialogClose' // 关闭弹窗handleClose

export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose],
  data () {
    return {
      select: ''
    }
  },
  computed: {
    getTitle () {
      return this.form + '邮箱认证'
    }
  },
  methods: {
    subHandle () {
      console.log(this.form)
    }
  }
}

</script>
