<template>
  <el-input v-model="valueProp" :placeholder="placeholder" :maxlength="maxLength" @input.native="$emit('input', $event.target.value)">
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
        idx = -4
      }
      return idx + 3
    }
  }
}
</script>
