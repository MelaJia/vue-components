<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" label-width="120px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="供应商代码">
          <el-input v-model.trim="formInline.vendorCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="对账单号">
          <el-input v-model.trim="formInline.statementNo" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="进货验收单号" style="white-space:nowrap">
          <el-input v-model.trim="formInline.grnNumber" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="购方名称">
          <el-input v-model.trim="formInline.buyerName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="销方名称">
          <el-input v-model.trim="formInline.sellerName" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <el-select v-model="formInline.status" clearable placeholder="">
            <el-option v-for="(item,index) in stateList" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="发送状态">
          <el-select v-model="formInline.postStatus" clearable placeholder="">
            <el-option v-for="(item,index) in sendList" :key="index" :label="item.dataName" :value="item.dataType"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="金额范围">
          <el-col :span="11">
            <el-jx-input v-model="formInline.amountStart" clearable placeholder="起始金额"></el-jx-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
              <el-jx-input v-model="formInline.amountEnd" clearable placeholder="结束金额"></el-jx-input>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="录入日期">
          <el-date-picker :editable="false" v-model="formInline.entryDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
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
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的对账单查询搜索 */
export default {
  name: 'mybill', // 我的对账单
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
      sendList: [
        {
          'dataType': 0,
          'dataName': '全部'
        },
        {
          'dataType': 1,
          'dataName': '已推送'
        },
        {
          'dataType': 2,
          'dataName': '未推送'
        }
      ],
      formInline: {
        vendorCode: '', // 供应商代码
        statementNo: '', // 对账单号
        grnNumber: '', // 进货验收单号
        buyerName: '', // 购方名称
        sellerName: '', // 销方名称
        status: '', // 状态
        postStatus: '', // 发送状态
        entryDate: null, // 约定交货日期
        amountStart: '', // 开始金额
        amountEnd: '' // 结束金额
      }
    }
  }
}
</script>
