<template>
  <el-input v-model="valueProp" :placeholder="placeholder" :maxlength="maxLength" onKeyDown="if (event.keyCode >= 8 && event.keyCode < 32 | event.keyCode > 32 && event.keyCode <= 46 | event.keyCode >= 48 && event.keyCode <= 57 | event.keyCode >= 96 && event.keyCode <= 105 | event.keyCode === 110 | event.keyCode === 190) { return true }else {return false}" @input.native="$emit('input', $event.target.value)">
    <template slot="append"><slot name="append"></slot></template>
  </el-input>
</template>
<script>
export default {
  props: ['value', 'placeholder'],
  data () {
    return { valueProp: this.value }
  },
  updated () {
    console.log('gengxin')
    this.valueProp = this.value
  },
  computed: {
    maxLength () {
      let idx = this.value ? String(this.value).indexOf('.') : -4
      console.log(idx)
      if (idx === -1) {
        return null
      }
      idx = idx + 3
      return idx > 0 ? idx : null
    }
  }
}
</script>
