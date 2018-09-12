<template>
<div class="ipt-edit-style">
  <el-tooltip v-show='!edit' class='item' effect='dark' content='单击编辑' placement='top-start'>
    <span class='pointer' @click='handleClick'>{{valueProp}}</span>
  </el-tooltip>
  <div v-show='edit' :class="valueProp>max? 'is-error':'is-success'" >
  <el-input :autofocus="true" ref="inputedit" v-model='valueProp' placeholder='请输入内容' @blur='handleBlur' @input.native='handleInput' onKeyDown='if (event.keyCode >= 8 && event.keyCode < 32 | event.keyCode > 32 && event.keyCode <= 46 | event.keyCode >= 48 && event.keyCode <= 57 | event.keyCode >= 96 && event.keyCode <= 105 | event.keyCode === 110 | event.keyCode === 190) { return true }else {return false}'>
    </el-input>
  <div class="item__error" v-if="valueProp>max">
      融资金额不得大于金额
    </div>
  </div>
</div>
</template>
<style lang="scss">
.ipt-edit-style {
  .cell__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    position: absolute;
    top: 100%;
    right: 0;
  }
  .is-success .el-input__inner {
    border-color: #67c23a;
  }
  .is-error .el-input__inner {
    border-color: #f56c6c;
  }
  .item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    padding-left: 10px;
  }
}
</style>

<script>
import { isIE } from '@/util/util'
export default {
  props: ['value', 'placeholder', 'max', 'idx'],
  data () {
    return {
      edit: false,
      valueProp: this.value
    }
  },
  methods: {
    handleClick: editShow,
    handleInput: handleInput,
    handleBlur: editHide
  }
}
function editShow () {
  console.log(this.$refs.inputedit)
  this.edit = true
  setTimeout(() => {
    this.$refs.inputedit.focus()
  }, 100)
}
function editHide () {
  this.edit = false
}
function handleInput (e) {
  let re = /^([1-9]\d*\.\d*|0\.\d*|[1-9]\d*|0)$/
  if (isIE() && re.test(e.target.value)) {
    console.log('Ie可输入')
    console.log(e)
    console.log(e.target.value)
    this.$emit('input', e.target.value)
    this.$emit('check-up')
  } else if (re.test(e.target.value) || e.target.value.length === 0 || e.inputType === 'deleteContentForward' || e.inputType === 'deleteContentBackward') {
    console.log('可输入')
    this.$emit('input', e.target.value)
    this.$emit('check-up', {idx: this.idx, isError: this.valueProp > this.max})
  }
}
</script>
