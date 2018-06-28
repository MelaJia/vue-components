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
@media screen and (min-width: 1356px) and (max-width: 1396px){
  .body:first-child .el-card__body {
        width: 1020px;
    }
}
@media screen and (min-width: 1396px) and (max-width: 1440px){
  .body:first-child .el-card__body {
        width: 1150px;
    }
}
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
.el-card.box-card,
.el-card__body {
        min-width: 950px;
    }
.el-message-box__content{
  padding: 20px 15px
}
</style>
