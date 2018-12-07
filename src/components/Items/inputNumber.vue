<template>
  <el-input v-model="valueProp" :placeholder="placeholder" :maxlength="maxLength"
  :disabled="disabled" @blur="$emit('blur')"
  onKeyDown="if (event.keyCode >= 8 && event.keyCode < 32 | event.keyCode > 32 && event.keyCode <= 46 | event.keyCode >= 48 && event.keyCode <= 57 | event.keyCode >= 96 && event.keyCode <= 105 | event.keyCode === 110 | event.keyCode === 190) { return true }else {return false}" @input.native="handleInput">
    <template slot="append"><slot name="append"></slot></template>
  </el-input>
</template>
<script>
import { isIE } from '@/util/util'
export default {
  props: ['value', 'placeholder', 'disabled'],
  data () {
    return { valueProp: this.value }
  },
  updated () {
    this.valueProp = this.value
  },
  computed: {
    maxLength () {
      let idx = this.value ? String(this.value).indexOf('.') : -4
      if (idx === -1) {
        return null
      }
      idx = idx + 4
      return idx > 0 ? idx : null
    }
  },
  methods: {
    handleInput: handleInput
  }
}
function handleInput (e) {
  let re = /^([1-9]\d*\.\d*|0\.\d*|[1-9]\d*|0)$/
  console.log('初始输入', e.target.value)
  if (isIE() && re.test(e.target.value)) {
    console.log('Ie可输入')
    console.log(e)
    let result = String(this.value).indexOf('.') > 0 ? Math.floor(e.target.value * 100) / 100 : e.target.value
    console.log(result)
    this.$emit('input', result)
  } else if (re.test(e.target.value) || e.target.value.length === 0 || e.inputType === 'deleteContentForward' || e.inputType === 'deleteContentBackward') {
    console.log('可输入')
    let result = String(this.value).indexOf('.') > 0 ? Math.floor(e.target.value * 100) / 100 : e.target.value
    console.log(result)
    this.$emit('input', result)
  }
}
</script>
