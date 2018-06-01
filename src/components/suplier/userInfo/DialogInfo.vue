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
              <el-input v-model="form.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业电话：">
              <el-input v-model="form.companyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业地址：">
              <el-input v-model="form.companyAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码:">
              <el-input v-model="form.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识別号：">
              <el-input v-model="form.payTaxesNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商代码：">
              <el-input v-model="form.vendorCodes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本：">
              <el-input placeholder="请输入内容" v-model="form.registeredCapital" class="input-with-select">
                <el-select v-model="form.registeredCurrencyType" slot="append" placeholder="请选择">
                  <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收资本：">
              <el-input v-model="form.paidinCapital">
                <el-select v-model="form.paidinCurrencyType" slot="append" placeholder="请选择">
                  <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司成立日期:">
              <el-date-picker v-model="form.establishDate" type="date" placeholder="选择日期">
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
              <el-date-picker v-model="form.companyRegisterDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="经营范围">
            <el-input type="textarea" v-model="form.mainProducts"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司logo">
              <upload @get-url="getUrl($event, 'logoUrl')"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照(图片)">
              <upload @get-url="getUrl($event, 'licenseUrl')"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照副本">
              <upload  @get-url="getUrl($event, 'licenseViceUrl')"></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="组织机构代码证">
              <upload @get-url="getUrl($event, 'organizationUrl')"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税务登记证">
              <upload @get-url="getUrl($event, 'taxUrl')"></upload>
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
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
import MixInfos from '@/mixins/Infos'
import commonDatas from '@/mixins/commonDatas'
import Upload from '@/components/Items/upload'
/* 企业认证 */
export default {
  props: ['visibleP', 'details'],
  mixins: [DialogClose, MixInfos, commonDatas],
  components: {Upload},
  data () {
    return {
      select: ''
    }
  },
  computed: {
    getTitle () {
      return '企业认证'
    }
  },
  methods: {
    subHandle () {
      console.log(this.form)
      this.axios.post('/cust/toAuthenticateCompany.do', this.form).then(res => {
        let type = res.data.isAuthened === 'true' ? 'success' : 'error'
        this.$message({
          message: res.data.isAuthened,
          type: type
        })
        this.$parent.fresh()
        this.handleClose()
      }).catch(err => {
        this.$message({
          type: 'info',
          message: `操作失败${err}`
        })
      })
    },
    // 上传图片更新formUrl地址
    getUrl (val, idx) {
      console.log(val)
      console.log(idx)
      this.form[idx] = val
    }
  }
}

</script>
