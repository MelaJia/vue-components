<template>
  <div id="app" >
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
// @media screen and (min-width: 1356px) and (max-width: 1396px){
//   .body:first-child .el-card__body {
//         width: 1020px;
//     }
// }
// @media screen and (min-width: 1396px) and (max-width: 1440px){
//   .body:first-child .el-card__body {
//         width: 1150px;
//     }
// }
// @media screen and (min-width: 1431px) and (max-width: 1483px){
//   .body:first-child .el-card__body {
//         width: 1150px;
//     }
// }
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
.el-card__header{
  padding: 16px 20px;
}
.el-card.box-card{
  min-width: 990px;
}

.el-message-box__content{
  padding: 20px 15px
}
// 图片预览置顶
.pswp--open {
    z-index: 2600;
}
// 表格子数据滚动条隐藏
td>.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
}
 // 搜索区域
 .search-box-card>.el-card__body{
    padding: 0px 20px 8px 20px;
    position: relative;
 }
 .search-box-card.hideBox>.el-card__body{
    padding-bottom: 0;
 }
 .search-box-card>.el-card__header{
    padding: 8px 20px;
    position: relative;
 }
.is-left .el-button:not(:last-child){
  margin-right: 10px;
}
.is-left .el-button+.el-button{
  margin-left: 0px;
}
</style>
