<template>
   <el-dialog :title="getTitle" :visible.sync="visibleP" :before-close="handleClose">
    <section>
        <p>
            <span>最终付款单位:{{this.detailsP.company}}</span>
            <span>最终付款账户：{{this.detailsP.bankCompaney}}</span>
            <el-tooltip :content="'最终付款账号:'+this.detailsP.bankAccount" placement="bottom" effect="light">
                <span>最终付款账号:{{this.detailsP.bankAccount}}</span>
            </el-tooltip>
        </p>
        <p>
            <span>AR来源:{{this.detailsP.come}}</span>
            <span>状态:{{this.detailsP.status}}</span>
            <span>币别:{{this.detailsP.moneyType}}</span>
        </p>
        <p>
            <span>票面金额:{{this.detailsP.company}}</span>
            <span>可用余额:{{this.detailsP.money_can}}</span>
        </p>
        <p>
            <span>预计回款日期:{{this.detailsP.arriveDate}}</span>
        </p>
    </section>
    <footer>
      <el-button @click="handleClose">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
    footer{
        text-align: center;
    }
    p>span{
        width: 30%;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>

<script>
import DialogClose from '@/mixins/Ar/DialogClose'

export default {
  props:['visibleP','detailsP'],
  mixins:[DialogClose],
  data(){
      return {
          radio2:3,
      }
  },
  computed:{
      getTitle(){
          return this.detailsP.id+"结报单号";
      }
  },
  methods:{
      
  }
}
</script>
