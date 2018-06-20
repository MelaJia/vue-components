<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/css/ie.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin: 0px;
  min-width: 1200px;
}
html,body,#app,#app>div,#app>div>main,.main-section,.main-section>div{
  height: 100%;
}
.el-card__body {
        min-width: 950px;
    }
.el-message-box__content{
  padding: 20px 15px
}
</style>
