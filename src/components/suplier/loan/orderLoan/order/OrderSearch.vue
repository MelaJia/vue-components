<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" label-width="100px">
    <el-row>
      <el-col :span="7">
        <el-form-item label="法人代码">
          <el-input class="wd-190" v-model.trim="formInline.corpCode" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="3">
          <el-form-item label="法人单位">
            <el-input class="wd-190" v-model.trim="formInline.corpName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="订单号">
            <el-input class="wd-190" v-model.trim="formInline.poNumber" placeholder=""></el-input>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
           <el-form-item label="币别">
              <el-select class="wd-190" v-model="formInline.currency" clearable placeholder="全部">
                <el-option v-for="(item,index) in moneyTypes" :key="index" :label="item.currencyDesc" :value="item.currencyId"></el-option>
              </el-select>
            </el-form-item>
      </el-col>
      <el-col :span="10" :offset="3">
        <el-form-item label="金额范围">
          <el-col :span="10">
            <el-input class="ipt" v-model.number="formInline.amountBegin" placeholder="起始金额"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-input v-model.number="formInline.amountEnd" placeholder="结束金额"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="10">
          <el-form-item label="订单确认日期">
            <el-date-picker :editable="false" v-model="formInline.confirmDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="约定交货日期">
            <el-date-picker :editable="false" v-model="formInline.deliveryDate" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="11">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped lang="scss">
@import "@/assets/css/_searchBase.scss";
@media screen and (min-width: 1512px) and (max-width: 1601px) {
  .el-form {
    width: 1199px;
  }
}
.wd-190 {
  width: 190px;
}
form {
  padding: 10px;
}
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
        corpCode: '', // 法人代码
        corpName: '', // 法人单位
        poNumber: '', // 订单号
        currency: '', // 币别
        confirmDate: '', // 订单确认日期
        deliveryDate: null, // 约定交货日期
        amountBegin: '', // 起始金额
        amountEnd: '' // 结束金额
      }
    }
  }
}

</script>
