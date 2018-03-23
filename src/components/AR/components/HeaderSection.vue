<template>
  <div class="header-section">
      <div class="header-left">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-ai-home"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="header-right">
        <span>早安，李先生</span><img src="~@/assets/img/juxin_18.png" alt="">
        </div>
  </div>
</template>
<style scoped>
    .header-section{
        display: flex;
        justify-content: space-between;
    }
    .header-right{
        display: flex;
        align-items: center;
        margin-left: 80%\9\0;
    }
    :root .header-left{
        float: left;
    }
    .header-left{
        float: left \9\0;
        width: 200px\9\0;
        padding-top: 40px;
    }
    img{
      width: 60px;
      height: 60px;
    }
    .left>div>span{
      height: 17px;
      line-height: 17px;
    }
    .el-breadcrumb{
        height: 17px;
        line-height: 17px;
    }
</style>

