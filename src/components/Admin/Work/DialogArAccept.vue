<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-row>
        <el-col :span="11" class="flex"><label>付款单位:</label>
           <el-tooltip class="item" effect="dark" :content="detailsP.companyName" placement="top">
            <span>{{detailsP.companyName}}</span>
           </el-tooltip>
        </el-col>
        <el-col :span="11" :offset="1" class="flex"><label>贴现客户:</label>
          <el-tooltip class="item" effect="dark" :content="detailsP.custFromName" placement="top">
            <span>{{detailsP.custFromName}}</span>
           </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" class="flex"><label>一级供应商:</label>
          <el-tooltip class="item" effect="dark" :content="detailsP.companyNameOfL1" placement="top">
            <span>{{detailsP.companyNameOfL1}}</span>
           </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" class="flex"><label>保理单位:</label>
          <el-select v-model="form.factoringCustId" clearable placeholder="保理单位">
            <el-option v-for="(item,index) in factoringCusts" :key="index" :label="item.factoringApId" :value="item.factoringCustId"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </section>
    <footer slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleSubmit">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
.layout.form {
  margin-top: 10px;
  > .el-row {
    margin-top: 10px;
  }
}
.layout.form .flex {
  display: flex;
  > label {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 20px;
    font-weight: 600;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  > span {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      form: {
        custId: this.detailsP.custId, // 客户Id
        buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
        factoringCustId: '' // 保理单位
      },
      transAmt: 0,
      checkList: [],
      factoringCusts: [{
        factoringCustId: 1,
        factoringApId: '获取数据失败'
      }]
    }
  },
  mounted () {
    this.axios.post('/commonCust/factoringCustomerList.do').then(res => {
      if (res.data.status) {
        this.factoringCusts = res.data.data
      }
    }).catch((err) => {
      throw new Error(err)
    })
  },
  computed: {
    getTitle () {
      return this.detailsP.custFromName
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true)
  }
}
// 提交操作
function submit () {
  if (this.form.factoringCustId.length <= 0) {
    this.$message({
      type: 'warning',
      message: '请选择保理单位'
    })
    return
  }
  const param = {
    custId: this.detailsP.custId, // 客户Id
    buyerCustNo: this.detailsP.buyerCustNo, // 付款法人代码
    factoringCustId: this.form.factoringCustId // 保理单位
  }
  console.log(param)
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/discountAudit/approveDiscountAudit.do', param).then(res => {
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
    }
  }).catch((err) => {
    // 错误提示
    erroShow.call(this, err, loading)
  })
}
</script>
