<template>

  <el-dialog custom-class="dia-width-70 user-info-dialog" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section>
      <el-form ref="form" :model="getForm" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称: ">
              <el-input v-model="getForm.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业电话：">
              <el-input v-model="getForm.companyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业地址：">
              <el-input v-model="getForm.companyAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码:">
              <el-input v-model="getForm.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识別号：">
              <el-input v-model="getForm.payTaxesNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商代码：">
              <el-input v-model="getForm.vendorCodes"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本：">
              <el-input placeholder="请输入内容" v-model="getForm.registeredCapital" class="input-with-select">
                <el-select v-model="getForm.registeredCurrencyType" slot="append" placeholder="请选择">
                  <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收资本：">
              <el-input v-model="getForm.paidinCapital">
                <el-select v-model="getForm.paidinCurrencyType" slot="append" placeholder="请选择">
                  <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司成立日期:">
              <el-date-picker v-model="getForm.establishDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照日期:">
              <el-date-picker v-model="getForm.compuDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司登记日期:">
              <el-date-picker v-model="getForm.companyRegisterDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="经营范围">
            <el-input type="textarea" v-model="getForm.mainProducts"></el-input>
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

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose' // 关闭弹窗handleClose
// import MixInfos from '@/mixins/Infos'
import commonDatas from '@/mixins/commonDatas'
import Upload from '@/components/Items/upload'
/* 企业认证 */
export default {
  props: ['visibleP', 'form'],
  mixins: [DialogClose, commonDatas],
  components: { Upload },
  data () {
    return {
      select: ''
    }
  },
  computed: {
    getTitle () {
      return '企业认证'
    },
    getForm () {
      console.log(this.form)
      return this.form
    }
  },
  methods: {
    subHandle () {
      console.log(this.form)
      this.axios.post('/cust/toAuthenticateCompany.do', this.form).then(res => {
        let type = res.data.status ? 'success' : 'error'
        this.$message({
          message: res.data.msg,
          type: type
        })
        if (res.data.status) {
          this.$parent.fresh()
          this.handleClose()
        }
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
