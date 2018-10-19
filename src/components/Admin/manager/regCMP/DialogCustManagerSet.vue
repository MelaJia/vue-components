<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
      <span class="title">
        {{getTitle}}
      </span>
    </header>
    <section class="layout form">
      <el-form ref="form" :model="getform" size="small" label-width="140px">
        <el-row>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="客户经理设置:">
              <el-select v-model="getform.customerManagerId" placeholder="请选择" @change="change" value-key="customerManagerId">
                <el-option
                  v-for="item in this.customerManagerList"
                  :key="item.customerManagerId"
                  :label="item.customerManagerName"
                  :value="item.customerManagerId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="4" class="flex">
            <el-form-item label="角色:" prop="roleDes">
              <el-select v-model="getform.roleId" placeholder="请选择" @change="change" value-key="roleId">
                <el-option v-for="item in roleTypes" :key="item.roleId" :label="item.roleName"
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
import { debounce, getDataBase, postDataBase } from '@/util/util' // 防抖函数
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
      // value: null, // 选中数据
      customerManagerList: [{
        customerManagerId: 1,
        customerManagerName: 'String'
      }, {
        customerManagerId: 2,
        customerManagerName: 'String1212'
      }]
    }
  },
  mounted () {
    // 获取客户经理列表
    getDataBase.call(this, '/commonCust/customerManagerList.do').then((res) => {
      if (res) {
        this.customerManagerList = res
      }
    })
  },
  computed: {
    getTitle () {
      return this.detailsP.companyName + '修改页面'
    },
    getform () {
      return this.detailsP
    },
    roleTypes () {
      for (const iterator of this.$store.getters.roleBelong) {
        if (iterator.pageName === 'fundDemandManagementPage') {
          return iterator.roleList
        }
      }
    }
  },
  methods: {
    handleSubmit: debounce(submit, 1000, true),
    change (val) {
      // let obj = this.$store.getters.roleBelong.find((item) => {
      //   console.log(item.value)
      //   return item.roleId === val
      // })
      // console.log(obj)
      // console.log(val)
    }
  }
}
// 提交操作
function submit () {
  let roleObj = this.roleTypes.find((item) => {
    return item.roleId === this.getform.roleId
  })
  let managerObj = this.customerManagerList.find((item) => {
    return item.customerManagerId === this.getform.customerManagerId
    // return Number(item.customerManagerId) === this.getform.customerManagerId
  })
  console.log(roleObj)
  let param = {
    custId: this.detailsP.custId, // 客户Id
    customerManagerId: this.getform.customerManagerId, // 客户经理Id
    customerManagerName: managerObj.customerManagerName, // 客户经理名称
    roleId: this.getform.roleId,
    roleDes: roleObj.roleName
  }
  // 发送数据
  postDataBase.call(this, '/sysRegisteredCompanyManager/registeredCompanyAdjust.do', param, true).then(res => {
    console.log(param)
    // 操作成功关闭弹窗刷新数据
    if (res.data.status) {
      this.handleClose() // 关闭弹窗
      this.$parent.fresh() // 刷新数据
    }
  })
}
</script>
