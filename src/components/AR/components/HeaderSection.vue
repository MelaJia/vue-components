<template>
  <div class="header-section">
      <div class="header-left">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-ai-home"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="header-right">
        <el-button type="danger" size="medium" :class="'process'" icon="el-icon-caret-right">您的工作进度</el-button>
        <span>早安，李先生</span><img src="../../../assets/img/juxin_18.png" alt="">
        </div>
  </div>
</template>
<style scoped>
    .header-section{
        display: flex;
        justify-content: space-between;
    }
    .header-section{
        font-size: 14px;
    }
    .header-right{
        display: flex;
        align-items: center;
    }
    .header-left{
        padding-top: 40px;
    }
    .header-right img{
      width: 60px;
      height: 60px;
    }
    .header-left>div>span{
      height: 17px;
      line-height: 17px;
    }
    .header-right .process{
        background: rgb(220, 45, 55);
        color: white;
        align-items: center;
        margin-right: 50px;
    }
    .header-right .process>img{
        width: 32px;
        height: 32px;
    }
</style>

