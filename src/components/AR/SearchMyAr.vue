<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="AR来源">
      <el-select v-model="formInline.origin" placeholder="AR来源">
        <el-option v-for="(item,index) in selectData.origin" :key="index" :label="item.lable" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="付款单位">
      <el-input v-model="formInline.department" placeholder="付款单位"></el-input>
    </el-form-item>
    <el-form-item label="AR状态">
      <el-select v-model="formInline.status" placeholder="AR状态">
        <el-option v-for="(item,index) in selectData.status" :key="index" :label="item.lable" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="币别">
      <el-select v-model="formInline.moneyType" placeholder="币别">
        <el-option v-for="(item,index) in selectData.moneyType" :key="index" :label="item.lable" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预计回款日期">
      <el-date-picker v-model="formInline.moneyDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
form {
  padding: 10px;
}
</style>

<script>
export default {
  data () {
    return {
      selectData: {
        origin: [{
          lable: '自有AR',
          value: '自有AR'
        }, {
          lable: '购入AR',
          value: '购入AR'
        }],
        status: [{
          lable: '待确认',
          value: '待确认'
        }, {
          lable: '可用',
          value: '可用'
        }, {
          lable: '不可用',
          value: '不可用'
        }],
        moneyType: [{
          lable: '人民币',
          value: '人民币'
        }, {
          lable: '台币',
          value: '台币'
        }, {
          lable: '港币',
          value: '港币'
        }, {
          lable: '美元',
          value: '美元'
        }]
      },
      formInline: {
        origin: '',
        department: '',
        status: '',
        moneyType: '',
        moneyDate: []
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('searchSubmit', this.formInline)
      console.log('submit!')
    }
  }
}

</script>
