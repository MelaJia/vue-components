<template>
  <el-form :inline="true" :model="formInline" :rules="rules" class="demo-form-inline" size="mini" label-width="150px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="供应商代码">
          <el-input v-model.trim="formInline.vendorCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="结报单号">
          <el-input v-model.trim="formInline.billNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票单号">
          <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
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
      <el-col :span="8">
        <el-form-item label="币别">
          <el-select v-model="formInline.currency" clearable placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="money">
      <el-col :span="12">
        <el-form-item label="结报申请付款日期" style="text-align:left;">
          <el-date-picker :editable="false" v-model="formInline.dueDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="应付金额">
          <el-col :span="11">
            <el-form-item prop="oriAmtBegin">
              <el-input v-model="formInline.oriAmtBegin" clearable placeholder="起始金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="oriAmtEnd">
              <el-input v-model="formInline.oriAmtEnd" clearable placeholder="结束金额"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="money">
      <el-col :span="12">
        <el-form-item label="已付金额">
          <el-col :span="11">
            <el-form-item prop="oriPaidAmtBegin">
              <el-input v-model="formInline.oriPaidAmtBegin" clearable placeholder="起始金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="oriPaidAmtEnd">
              <el-input v-model="formInline.oriPaidAmtEnd" clearable placeholder="结束金额"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="未付金额">
          <el-col :span="11">
            <el-form-item prop="oriUnPaidAmtBegin">
              <el-input v-model="formInline.oriUnPaidAmtBegin" clearable placeholder="起始金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="oriUnPaidAmtEnd">
              <el-input v-model="formInline.oriUnPaidAmtEnd" clearable placeholder="结束金额"></el-input>
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
/* 我的对账单查询搜索 */
export default {
  name: 'mysubmit', // 我的结报单
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        vendorCode: '', // 供应商代码
        billNo: '', // 结报单号
        invoiceNo: '', // 发票单号
        corpCode: '', // 法人代码
        corpName: '', // 法人单位
        currency: '', // 币别
        dueDate: null, // 结报申请付款日期
        oriAmtBegin: '', // 应付开始金额
        oriAmtEnd: '', // 应付结束金额
        oriPaidAmtBegin: '', // 已付开始金额
        oriPaidAmtEnd: '', // 已付结束金额
        oriUnPaidAmtBegin: '', // 未付开始金额
        oriUnPaidAmtEnd: '' // 未付结束金额
      },
      rules: {
        oriAmtBegin: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        oriAmtEnd: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        oriPaidAmtBegin: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        oriPaidAmtEnd: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        oriUnPaidAmtBegin: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        oriUnPaidAmtEnd: [
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
