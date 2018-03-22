<template>
   <el-dialog title="批量AR转让" :visible.sync="visibleP" :before-close="handleClose">
     <label for="">接受方:</label>
     <el-select v-model="acceptor" placeholder="接受方">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <p>预转让金额：{{getTotal}}元</p>
    <el-table :data="multipleSelectionP">
      <el-table-column property="id" label="AR单号" min-width="150"></el-table-column>
      <el-table-column property="money" label="金额" min-width="180"></el-table-column>
      <el-table-column property="status" label="状态" min-width="100"></el-table-column>
      <el-table-column  label="转让金额" min-width="150">
        <template slot-scope="scope">
          <el-input :max="2" :min="0" @change="handleChange(scope.row)" value="number" v-model="scope.row.consum" placeholder="请输入内容"></el-input>  
        </template>  
      </el-table-column>
    </el-table>
    <p>转让金额合计：<span class="red">{{getTotal}}</span>元</p>
    <el-radio-group v-model="radio2">
      <el-radio :label="3">合同1</el-radio>
      <el-radio :label="6">合同2</el-radio>
    </el-radio-group>
    <footer>
      <el-button @click="handleShow">确认</el-button>
    </footer>
  </el-dialog>
</template>
<style scoped>
  .red{
    color: red;
  }
  footer{
    text-align: center;
  }
</style>

<script>
import DialogClose from '@/mixins/Ar/DialogClose'
export default {
  props:['visibleP','multipleSelectionP','options'],
  mixins:[DialogClose],
  data() {
      return {
        radio2:3,
        acceptor: '',
        total:'',
      }
    },
    mounted(){
      console.log(this.options[0])
      this.acceptor=this.options[0].value;
    },
    computed:{
      getTotal:function(){
        let total=0,object=this.multipleSelectionP;
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            if(element.hasOwnProperty('consum')){
            total+=parseInt(element.consum);
            }
          }
        }
        return total;
      }
    },

  methods:{
      handleShow(){
        console.log(this.multipleSelectionP)
      },
      handleChange(value) {
        if(parseInt(value.consum)>parseInt(value.money)){
          value.consum=value.money
        }
        console.log(this.total);
      }
  }
}
</script>
