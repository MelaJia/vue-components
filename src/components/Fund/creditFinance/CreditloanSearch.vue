<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="mini" label-width="150px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="融资编号" prop="loanId">
          <el-input v-model.trim="formInline.loanId" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="融资客户" prop="companyName">
          <el-input v-model.trim="formInline.companyName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="融资类型" prop="loanType">
          <el-select v-model="formInline.loanType" clearable placeholder="全部">
            <el-option v-for="(item,index) in loanTypes" :key="index" :label="item.loanTypeName" :value="item.loanType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" clearable placeholder="全部">
            <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币别" prop="currency">
          <el-select v-model="formInline.currency" clearable placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="还款日期" prop="repayDate">
          <el-date-picker :editable="false" v-model="formInline.repayDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height:50px;">
        <el-form-item label="金额范围">
          <el-col :span="11">
            <el-form-item prop="amountBegin">
            <el-jx-input v-model="formInline.amountBegin" clearable placeholder="起始金额"></el-jx-input>
          </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="amountEnd">
            <el-jx-input v-model="formInline.amountEnd" clearable placeholder="结束金额"></el-jx-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="合同签署日期" prop="contractSignedDate">
          <el-date-picker :editable="false" v-model="formInline.contractSignedDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="10">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="default" @click="resetForm('formInline')">重置</el-button>
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
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的验收单查询搜索 */
export default {
  name: 'creditLoanPage', // 信用拒绝查询
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      creditType: [
        {
          'dataType': '1',
          'LoanTypeName': '纯信用融资'
        },
        {
          'dataType': '2',
          'LoanTypeName': '订单融资'
        }
      ],
      creditStatus: [
        {
          'arStatusTypeId': 22,
          'arStatusTypeName': '贴现申请中'
        },
        {
          'arStatusTypeId': 23,
          'arStatusTypeName': '贴现合同签署中'
        },
        {
          'arStatusTypeId': 24,
          'arStatusTypeName': '放款核实'
        },
        {
          'arStatusTypeId': 27,
          'arStatusTypeName': '贴现取消'
        },
        {
          'arStatusTypeId': 28,
          'arStatusTypeName': '贴现拒绝'
        }
      ],
      formInline: {
        loanId: '', // 融资编号
        companyName: '', // 融资客户
        currency: '', // 币别
        loanType: '', // 融资类型
        status: '', // 状态
        repayDate: null, // 还款日期
        contractSignedDate: null, // 合同签署日期
        amountBegin: '', // 开始金额
        amountEnd: '' // 结束金额
      }
    }
  }
}
</script>
