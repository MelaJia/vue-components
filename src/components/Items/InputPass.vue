<template>
    <section>
        <input type="password" maxlength="20" v-bind:value="value" v-bind:class="classes" ref="input"  @input="updateValue($event.target.value)" @blur="checkForm($event.target.value)" onKeyDown="if(event.keyCode===32) return false" placeholder="8-20位数字与字母组合的密码" >
        <em class="error">{{msg}}</em>
    </section>
</template>
<script>
import Valid from '@/mixins/Login/Validate'
export default {
    data(){
        return {
            msg:'',
        }
    },
  props: ['value','classes'],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        
      // 如果值尚不合规，则手动覆盖为合规的值
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      
      // 通过 input 事件带出数值
      this.$emit('input', formattedValue)
    }, 
    checkForm(){
        if(Valid.checkPass(this.value)){
                    this.msg='';
            }else{
                    this.msg='8-20位数字与字母组合的密码';
            }
        
    }
  }
}
</script>
