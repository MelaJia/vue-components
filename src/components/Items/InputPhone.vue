<template>
    <section>
        <input type="text" maxlength="11" v-bind:value="value" v-bind:class="classes" @input="updateValue($event.target.value)" @blur="checkLength">
        <em class="error">{{msg}}</em>
    </section>
</template>
<script>
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
    checkLength(){
        let phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/; //手机号正则
        console.log(phoneReg.test(this.value))
        if(phoneReg.test(this.value)){
                this.msg='';
            }else{
                this.msg='请输入正确的手机号码';
            }
        }
  }
}
</script>
