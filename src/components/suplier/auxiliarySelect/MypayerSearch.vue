<template>
  <el-form :inline="true" :model="formInline" :rules="rules" class="demo-form-inline" size="mini" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="付款编号">
          <el-input v-model.trim="formInline.payNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法人代码">
          <el-input v-model.trim="formInline.corpCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法人单位">
          <el-input v-model.trim="formInline.corpName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="结报单号">
          <el-input v-model.trim="formInline.billNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币别">
          <el-select v-model="formInline.currency" clearable placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <el-row class="money">
      <el-col :span="12">
        <el-form-item label="付款日期">
          <el-date-picker :editable="false" v-model="formInline.payDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实际付款金额">
          <el-col :span="11">
            <el-form-item prop="rcvAmtOriginStart">
              <el-input v-model="formInline.rcvAmtOriginStart" placeholder="起始金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="rcvAmtOriginEnd">
              <el-input v-model="formInline.rcvAmtOriginEnd" placeholder="结束金额"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="10">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
.el-select.el-select--mini{
  width:178px;
}
.money {
  .el-form-item.el-form-item--mini{
    margin-bottom: 10px;
  }
}
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的付款单查询搜索 */
export default {
  name: 'mypay', // 我的付款单
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        payNo: '', // 付款编号
        corpCode: '', // 法人代码
        corpName: '', // 法人单位
        billNo: '', // 结报单号
        currency: '', // 币别
        payDate: null, // 付款日期
        rcvAmtOriginStart: '', // 开始金额
        rcvAmtOriginEnd: '' // 结束金额
      },
      rules: {
        rcvAmtOriginStart: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        rcvAmtOriginEnd: [
          { validator: checkNumber, trigger: 'blur' }
        ]
      }
    }
  }
}
// 数字规则
var checkNumber = (rule, value, callback) => {
  // if (!value) {
  //   return callback(new Error('不能为空'))
  // }
  let re = /^(0|[1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/
  setTimeout(() => {
    if (!re.test(value)) {
      callback(new Error('请输入大于等于0的数字'))
    } else {
      if (value < 0) {
        callback(new Error('必须大于等于0'))
      } else {
        callback()
      }
    }
  }, 1000)
}
</script>
