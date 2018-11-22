<template>
  <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small" label-width="130px">
    <el-row>
                <el-col :span="8">
                  <el-form-item label="AR单号" prop="masterChainId">
                    <el-input v-model.trim="formInline.masterChainId" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态" prop="status">
                      <el-select v-model="formInline.status" clearable disabled placeholder="全部">
                        <el-option v-for="(item,index) in arStatus" :key="index" :label="item.arStatusTypeName" :value="item.arStatusTypeId"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="币别" prop="billBookCurr">
                      <el-select v-model="formInline.billBookCurr" clearable placeholder="全部">
                        <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                      <el-form-item label="付款单位/对手单位" prop="companyName">
                        <el-input v-model.trim="formInline.companyName" placeholder=""></el-input>
                      </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发票号" prop="invoiceNo">
                    <el-input v-model.trim="formInline.invoiceNo" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="结报单号" prop="billId">
                      <el-input v-model.trim="formInline.billId" placeholder=""></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="票据到期日" prop="moneyDate">
                    <el-date-picker :editable="false" v-model="formInline.moneyDate" type="daterange" unlink-panels
                      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" :offset="10">
                  <el-button type="primary" @click="onSubmit" round size="small">查询</el-button>
                  <el-button type="default" @click="resetForm('formInline')" round size="small">重置</el-button>
                </el-col>
              </el-row>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
</style>

<script>
import SearchMixIn from '@/mixins/suplier/Ar/Search'
import commonDatas from '@/mixins/commonDatas'
/* 我的Ar搜索 */
export default {
  name: 'myArPage',
  mixins: [SearchMixIn, commonDatas],
  data () {
    return {
      formInline: {
        masterChainId: '', // ar单号
        isMasterAr: '', // ar来源
        companyName: '', // 付款单位/对手单位
        status: null, // 状态
        billBookCurr: '', // 币别
        invoiceNo: '', // 发票号
        moneyDate: null, // 日期
        billId: '' // 结报单号
      }
    }
  }
}

</script>
