<template>
  <el-input v-model="valueProp" :placeholder="placeholder" :maxlength="maxLength" onKeyDown="if (event.keyCode >= 8 && event.keyCode < 32 | event.keyCode > 32 && event.keyCode <= 46 | event.keyCode >= 48 && event.keyCode <= 57 | event.keyCode >= 96 && event.keyCode <= 105 | event.keyCode === 110 | event.keyCode === 190) { return true }else {return false}" @input.native="handleInput">
    <template slot="append"><slot name="append"></slot></template>
  </el-input>
</template>
<script>
import { isIE } from '@/util/util'
export default {
  props: ['value', 'placeholder'],
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
      idx = idx + 3
      return idx > 0 ? idx : null
    }
  },
  methods: {
    handleInput: handleInput
  }
}
function handleInput (e) {
  let re = /^([1-9]\d*\.\d*|0\.\d*|[1-9]\d*|0)$/
  if (isIE() && re.test(e.target.value)) {
    console.log('Ie可输入')
    console.log(e)
    console.log(e.target.value)
    this.$emit('input', e.target.value)
  } else if (re.test(e.target.value) || e.target.value.length === 0 || e.inputType === 'deleteContentForward' || e.inputType === 'deleteContentBackward') {
    console.log('可输入')
    this.$emit('input', e.target.value)
  }
}
</script>
