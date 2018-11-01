<template>
<base-layout>
  <router-view></router-view>
</base-layout>
</template>
<style lang="scss">
@import "../assets/css/common";
</style>

<script>
import baseLayout from './layout'
export default {
  name: 'suplier',
  data () {
    return {
      height: '900'
    }
  },
  components: {
    baseLayout
  },
  created () {
    // var winHeight = 0
    // if (window.innerHeight) {
    //   winHeight = window.innerHeight
    // } else if ((document.body) && (document.body.clientHeight)) {
    //   winHeight = document.body.clientHeight
    // }
    // this.height = winHeight
    // window.onresize = () => {
    //   this.height = document.body.clientHeight
    // }
  }
}
</script>
