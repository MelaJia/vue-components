<template>
  <el-dialog :visible.sync="visibleP" :before-close="handleClose" :close-on-click-modal="false" class="Dialog">
     <header slot="title" v-show="step!==1">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section v-if="step===1">
      <i class="el-icon-warning" style="color:#F54F41;font-size:24px;"></i>
      <p>该协议内容由保理方{{this.detailsP.custToName}}拟定，不由本平台提供，确认签署前需自行对协议内容进行审核</p>
    </section>
    <section v-if="step===2">
      <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in this.detailsP.contractList" :key="item.contractId" :label="item.contractId"><a :href="item.contractUrl" target="_blank" @click="constractHandle(item.contractUrl)">{{item.contractName}}</a></el-checkbox>
      </el-checkbox-group>
    </section>
    <section style="padding-left:200px" v-if="step===3">
      <verify :captcha.sync="captcha"></verify>
    </section>
    <footer slot="footer" v-if="step===1" style="padding:0">
        <el-button @click="handleNext" class="searchBtn" type="primary" size="small">我知道了</el-button>
    </footer>
    <footer slot="footer" v-if="step===2">
        <el-button @click="beforeSubmit" class="searchBtn" type="primary" size="small" >同意签署</el-button>
        <el-button @click="handleReject" class="rejectBtn" type="warning" size="small">拒绝退回</el-button>
    </footer>
    <footer slot="footer" v-if="step===3">
        <el-button @click="handleSubmit" class="searchBtn" type="primary" size="small">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_newUI.scss";

footer {
  text-align: center;
}
.note {
  color:#f00;
}
</style>
<style>
.Dialog .el-dialog__footer{
  background:#F0F0F0;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common/common'
import { debounce, erroShow } from '@/util/util' // 防抖函数
import { loadingConf } from '@/config/common' // 获取加载配置
import mixVerify from '@/mixins/common/dialogContract'
/* 合同确认 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common, mixVerify],
  data () {
    return {
      checkList: []
    }
  },
  destroyed () {
    console.log('销毁')
  },
  methods: {
    handleSubmit: debounce(submit, 1000, {
      'leading': true,
      'trailing': false
    }),
    handleReject: debounce(reject, 1000, {
      'leading': true,
      'trailing': false
    })
  },
  computed: {
    getTitle () {
      if (this.detailsP.arList) {
        return this.detailsP.arList[0].masterChainId + '合同签署'
      }
    }
  }
}
function submit () {
  if (this.checkList.length !== this.detailsP.contractList.length) {
    this.$message({
      type: 'error',
      message: '有未勾选合同'
    })
    return
  }
  if (this.captcha.length === 0) {
    this.$message({
      type: 'error',
      message: '验证码不能为空'
    })
    return
  }
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/multiArInFinancingManager/multiArCompleteSigningDiscount.do', { transSerialNo: this.detailsP.transSerialNo, verificationCode: this.captcha, interfaceTransSerial: this.detailsP.interfaceTransSerial }).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 操作成功 关闭弹窗
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
// 拒绝操作
function reject () {
  // 显示加载图标
  const loading = this.$loading(loadingConf.sub())
  this.axios.post('/multiArInFinancingManager/multiArCancelSigningDiscount.do', { transSerialNo: this.detailsP.transSerialNo, interfaceTransSerial: this.detailsP.interfaceTransSerial }).then(res => {
    let type = res.data.status ? 'success' : 'error'
    this.$message({
      message: res.data.data ? res.data.data : '返回结果错误，请联系管理员',
      type: type
    })
    // 操作成功 关闭弹窗
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
