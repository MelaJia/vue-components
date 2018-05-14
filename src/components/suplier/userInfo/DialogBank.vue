<template>

  <el-dialog custom-class="my-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span id="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="form" label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="开户省市:">
              <el-cascader
  :options="options"
  change-on-select
></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="开户支行:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="银行名称:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="银行账号:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="账号名称:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="subHandle">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import DialogClose from '@/mixins/Ar/DialogClose' // 关闭弹窗handleClose
import CityData from '@/mixins/CityData' // 关闭弹窗handleClose
import citys from './city'
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose, CityData],
  components: {
    citys
  },
  data () {
    return {
      select: ''
    }
  },
  computed: {
    getTitle () {
      return this.form + '企业银行信息'
    }
  },
  methods: {
    subHandle () {
      console.log(this.form)
    }
  }
}

</script>
