<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" label-width="150px">
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
        <el-form-item label="进货验收单编号">
          <el-input v-model.trim="formInline.grnNumber" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="订单号">
          <el-input v-model.trim="formInline.poNumber" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="币别">
          <el-select v-model="formInline.currency" placeholder="全部">
            <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="类型">
            <el-select v-model="formInline.dataType">
              <el-option v-for="(item,index) in listType" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="约定交货日期">
          <el-date-picker :editable="false" v-model="formInline.deliveryDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="进货验收单日期" style="white-space:nowrap">
          <el-date-picker :editable="false" v-model="formInline.confirmDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="金额范围">
          <el-col :span="11">
            <el-input v-model.number="formInline.amountBegin" placeholder="起始金额"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-input v-model.number="formInline.amountEnd" placeholder="结束金额"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
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
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的验收单查询搜索 */
export default {
  name: 'acceptsearch', // 验收单查询
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      listType: [
        {
          'dataType': 1,
          'dataName': '进货单'
        },
        {
          'dataType': 2,
          'dataName': '退货单'
        }
      ],
      formInline: {
        // vendorCode: '', // 供应商代码
        corpCode: '', // 法人代码
        corpName: '', // 法人单位
        grnNumber: '', // 进货验收单编号
        poNumber: '', // 订单号
        currency: '', // 币别
        dataType: '', // 类型
        deliveryDate: null, // 约定交货日期
        confirmDate: null, // 进货验收单日期
        amountBegin: '', // 开始金额
        amountEnd: '' // 结束金额
      }
    }
  }
}
</script>
