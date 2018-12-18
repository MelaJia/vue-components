<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="对账单号" prop="statementNo">
          <el-input v-model.trim="formInline.statementNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="购方名称" prop="buyerName">
          <el-input v-model.trim="formInline.buyerName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" offset="3">
        <el-form-item label="销方名称" prop="sellerName">
          <el-input v-model.trim="formInline.sellerName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="发票单号" prop="invoiceNo">
          <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
       <el-col :span="10">
        <el-form-item label="开票日期" prop="entryDate">
          <el-date-picker :editable="false" v-model="formInline.entryDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" clearable placeholder="全部">
            <el-option v-for="(item,index) in stateList" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="发票类型" prop="invoiceType">
          <el-select v-model="formInline.invoiceType" clearable placeholder="全部">
            <el-option v-for="(item,index) in invoiceList" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="金额范围" prop="taxTotalStart">
          <el-col :span="10" class="mon-range-start">
            <el-jx-input v-model="formInline.taxTotalStart" placeholder="起始金额"></el-jx-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10" class="mon-range-end">
            <el-jx-input v-model="formInline.taxTotalEnd" placeholder="结束金额"></el-jx-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="0">
        <el-form-item prop="taxTotalEnd"></el-form-item>
      </el-col>
      <el-col :span="7" v-if="this.$store.getters.roles!==2">
        <el-form-item label="供应商代码" prop="vendorCode">
          <el-input v-model.trim="formInline.vendorCode" placeholder="" required="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" :offset="17">
        <el-form-item label=" " >
          <el-button type="primary" @click="onSubmit" size="mini">&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;</el-button>
          <el-button type="default" @click="resetForm('formInline')" size="mini">&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
@import "@/assets/css/_loanSearch.scss";
.el-select.el-select--mini{
  width:178px;
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
        vendorCode: '', // 供应商代码
        invoiceNo: '', // 发票单号
        statementNo: '', // 对账单号
        buyerName: '', // 购方名称
        sellerName: '', // 销方名称
        status: '', // 状态
        invoiceType: '', // 发票类型
        entryDate: null, // 付款日期
        taxTotalStart: '', // 开始金额
        taxTotalEnd: '' // 结束金额
      }
    }
  }
}
</script>
