<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <!-- <el-row>
        <el-radio v-model="radio" :label="1">电子合同</el-radio>
        <el-radio v-model="radio" :label="2">线下合同</el-radio>
      </el-row> -->
      <el-form ref="form" :model="getform" size="small" label-width="140px">
        <el-row>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="合同签署设置:">
              <el-select v-model="getform.contractSignType" placeholder="请选择">
                <el-option v-for="(item, index) in this.contract" :key="index" :label="item.contractSignName" :value="item.contractSignType"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="角色:" prop="roleDes">
              <el-select v-model="getform.roleId" placeholder="请选择">
                <el-option v-for="(item, index) in this.$store.getters.roleBelong" :key="index" :label="item.roleName"
                  :value="item.roleId"></el-option>
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
  }
  > span {
    height: 40px;
    line-height: 40px;
  }
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import { debounce } from '@/util/util' // 防抖函数
export default {
  props: ['visibleP', 'detailsP', 'contract'],
  mixins: [DialogClose, Common],
  data () {
    return {
      radio: null,
      transAmt: 0,
      checkList: [],
      factoringCusts: [{
        factoringCustId: 1,
        factoringApId: '获取数据失败'
      }]
    }
  },
  mounted () {
  },
  computed: {
    getTitle () {
      return this.detailsP.companyName + '修改页面'
    },
    getform () {
      return this.detailsP
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true),
    init: Init
  }
}
// 提交操作
async function submit () {
  let roleObj = this.$store.getters.roleBelong.find((item) => {
    return item.roleId === this.getform.roleId
  })
  const param = {
    custId: this.detailsP.custId, // 客户Id
    contractSignType: this.getform.contractSignType, // 合同签署方式
    roleId: this.getform.roleId,
    roleDes: roleObj.roleName
  }
  console.log(param)
  try {
    let res = await this.post('/sysCompanyUserManager/factoringAdjustConfig.do', param, true)
    // 操作成功关闭弹窗刷新数据
    if (res.data.status) {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    }
  } catch (error) {
    console.log(error)
  }
}
function Init () {
  console.log(this.detailsP)
  this.radio = this.detailsP.contractSignType
}
</script>
