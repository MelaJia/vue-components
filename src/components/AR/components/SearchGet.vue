<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="AR单号">
        <el-input v-model="formInline.id" placeholder="AR单号"></el-input>
    </el-form-item>
    <el-form-item label="付款单位">
        <el-input v-model="formInline.department" placeholder="付款单位"></el-input>
    </el-form-item>
    <el-form-item label="转让日期">
        <el-date-picker
        v-model="formInline.moneyDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>
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
    <el-form-item label="交易流水号">
        <el-input v-model="formInline.id" placeholder="交易流水号"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary"  @click="onSubmit">查询</el-button>
    </el-form-item>
    </el-form>
</template>
<style scoped>
    form{
        padding: 10px;
    }
</style>

<script>
import SearchMixIn from '@/mixins/Ar/Search'
export default {
 mixins:[SearchMixIn]
}
</script>
