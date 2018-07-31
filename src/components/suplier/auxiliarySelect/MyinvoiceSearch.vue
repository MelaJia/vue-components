<template>
  <el-form :inline="true" :model="formInline" :rules="rules" class="demo-form-inline" size="mini" label-width="100px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="发票单号">
          <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="对账单号">
          <el-input v-model.trim="formInline.statementNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="购方名称">
          <el-input v-model.trim="formInline.buyerName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="销方名称">
          <el-input v-model.trim="formInline.sellerName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <el-select v-model="formInline.status" clearable placeholder="全部">
            <el-option v-for="(item,index) in stateList" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发票类型">
          <el-select v-model="formInline.invoiceType" clearable placeholder="全部">
            <el-option v-for="(item,index) in invoiceList" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="money">
      <el-col :span="12">
        <el-form-item label="开票日期">
          <el-date-picker :editable="false" v-model="formInline.entryDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="金额范围">
          <el-col :span="11">
            <el-form-item prop="taxTotalStart">
              <el-input v-model="formInline.taxTotalStart" placeholder="起始金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="taxTotalEnd">
              <el-input v-model="formInline.taxTotalEnd" placeholder="结束金额"></el-input>
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
/* 我的发票单查询搜索 */
export default {
  name: 'myinvoice', // 我的发票
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      stateList: [
        {
          'dataType': 0,
          'dataName': '全部'
        },
        {
          'dataType': 1,
          'dataName': '正常'
        },
        {
          'dataType': 2,
          'dataName': '作废'
        }
      ],
      invoiceList: [
        {
          'dataType': 0,
          'dataName': '全部'
        },
        {
          'dataType': 1,
          'dataName': '增专'
        },
        {
          'dataType': 2,
          'dataName': '增普'
        },
        {
          'dataType': 3,
          'dataName': '电动车票'
        },
        {
          'dataType': 4,
          'dataName': '电子发票'
        }
      ],
      formInline: {
        invoiceNo: '', // 发票单号
        statementNo: '', // 对账单号
        buyerName: '', // 购方名称
        sellerName: '', // 销方名称
        status: '', // 状态
        invoiceType: '', // 发票类型
        entryDate: null, // 付款日期
        taxTotalStart: '', // 开始金额
        taxTotalEnd: '' // 结束金额
      },
      rules: {
        taxTotalStart: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        taxTotalEnd: [
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
