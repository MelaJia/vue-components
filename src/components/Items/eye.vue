<template>
  <a v-show = "isHide" slot="suffix" :class="`iconfont ${itemShow?'icon-yanjing_xianshi':'icon-yanjing_yincang'}`" @mousedown="downN($event)"></a>
</template>
<script>
export default {
  props: ['itemShow'],
  methods: {
    downN: downN
  },
  computed: {
    isHide () {
      return !isIE()
    }
  }
}
function downN (e) {
  let x = e.clientX
  let y = e.clientY
  this.$emit('update:itemShow', true)
  document.onmousemove = (e) => {
    var l = e.clientX - x
    var t = e.clientY - y
    if (l > 5 || l < -5 || t > 5 || t < -5) {
      this.$emit('update:itemShow', false)
    }
  }
  document.onmouseup = (e) => {
    document.onmousemove = null
    this.$emit('update:itemShow', false)
  }
}

function isIE () { // ie?
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  } else {
    return false
  }
}
</script>
