<template>
  <nav class="nav-menu">
      <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="vertical" @select="handleSelect">
      <section v-for="item in navItems" :key="item.idx">
        <el-submenu v-if="item.childrens" :index="item.idx">
          <template slot="title">
            <div :class="item.lClass"></div>
            <div :class="item.hClass"></div>
            <span>{{item.text}}</span>
          </template>
            <el-menu-item  v-for="item in item.childrens" :key="item.idx" :index="item.idx">
              <template slot="title">
                <div :class="item.lClass"></div>
                <div :class="item.hClass"></div>
                <span>{{item.text}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.idx" :disabled="item.disabled">
          <template slot="title">
            <div :class="item.lClass"></div>
                <div :class="item.hClass"></div>
                <span>{{item.text}}</span>
          </template>
        </el-menu-item>
      </section>
<!--       
      <el-submenu index="1">
        <template slot="title">
          <div class="start-line"></div>
          <div class="header-circle bg-icon-1"></div>
          <span>AR管理</span>
        </template>
          <el-menu-item index="myar">
            <template slot="title">
              <div class="line"></div>
              <div class="circle"></div>
              <span>我的AR</span>
            </template>
          </el-menu-item>
          <el-menu-item index="getar">
            <template slot="title">
              <div class="line"></div>
              <div class="circle"></div>
              <span>待收AR</span>
            </template>
          </el-menu-item>
          <el-menu-item index="cancelar">
            <template slot="title">
              <div class="line"></div>
              <div class="circle"></div>
              <span>取消转让</span>
            </template>
          </el-menu-item>
          <el-menu-item index="historyar">
            <template slot="title">
              <div class="line"></div>
              <div class="circle"></div>
              <span>历史AR</span>
            </template>
          </el-menu-item>
      </el-submenu>
      <el-menu-item index="plan" disabled>
        <template slot="title">
          <div class="line"></div>
          <div class="header-circle bg-icon-2"></div>
          <span>资金管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" disabled>
        <template slot="title">
          <div class="line"></div>
          <div class="header-circle bg-icon-2"></div>
          <span>消息中心</span>
        </template>
      </el-menu-item>
      <el-submenu index="3" >
        <template slot="title">
          <div class="end-line"></div>
          <div class="header-circle bg-icon-3"></div>
          <span>账户管理</span>
        </template>
          <el-menu-item index="3-1" disabled>
             <template slot="title">
              <div class="line"></div>
              <div class="circle"></div>
              <span>基本信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-2" disabled>
             <template slot="title">
              <div class="line"></div>
              <div class="circle"></div>
              <span>银行卡管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3-2" disabled>
             <template slot="title">
              <div class="end-line"></div>
              <div class="circle"></div>
              <span>密码修改</span>
            </template>
          </el-menu-item>
      </el-submenu> -->
      </el-menu>
  </nav>
</template>
<style lang="less">
  .nav-menu{
    li i[class*='el-icon-arrow-down']:before{
    content: none;
  }
  ul{
        background: #bc3335;
        border-right: none;
  }
  ul li span{
    color: #fff;
  }
  ul li.el-menu-item.is-active{
    background: #e06d5c;
    span{
        color: black;
      }
  } 
  .el-submenu__title:hover, .el-menu-item:hover{
    background: #ee5c5e;
  }
  .el-menu-item{
    padding-left: 55px !important;
  }
  .el-submenu .el-menu-item{
    min-width: 100px;
    
  }
  .line{
    width: 1px;
    top: 0;
    bottom: 0;
    left: 32px;
    position: absolute;
    border-color: inherit;
    background-color: #c0c4cc;
  }
  .start-line{
    .line;
    top:20px;
  }
  .end-line{
    .line;
    bottom:25px;
  }
  .is-opened>div>.end-line{
    .line;
    bottom:0px;
  }
  .circle{
    border: 1px solid white;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    left: 26px;
    top: 14px;
    .bg-color-pink;
  }
  .header-circle{
    .circle;
    left:20px;
    width: 20px;
    height: 20px;
  }
  .bg-color-pink{
    background-color: rgb(251, 116, 121);
  }
  .bg-icon-1{
    background: url(~@/assets/img/juxin_13.png) center no-repeat;
    .bg-color-pink;
  }
  .bg-icon-2{
    background: url(~@/assets/img/juxin_14.png) center no-repeat;
    .bg-color-pink;
  }
  .bg-icon-3{
    background: url(~@/assets/img/juxin_15.png) center no-repeat;
    .bg-color-pink;
  }
  .el-submenu__title{
    padding-left: 55px !important;
  }
  .el-menu--inline{
    li{
      .el-submenu__title;   
      padding: 0 0;
    }
  }
  } 
</style>

<script>
export default {
  name: "Nav",
  data(){
    return {
      navItems:[
        {
          idx:'1',
          text:'AR管理',
          disabled:false,
          lClass:'start-line',
          hClass:'header-circle bg-icon-1',
          childrens:[
            {
              idx:'myar',
              text:'我的AR',
              disabled:false,
              lClass:'line',
              hClass:'circle'
            },
            {
              idx:'getar',
              text:'待收AR',
              disabled:false,
              lClass:'line',
              hClass:'circle'
            },{
              idx:'cancelar',
              text:'取消转让',
              disabled:false,
              lClass:'line',
              hClass:'circle'
            },
            {
              idx:'historyar',
              text:'历史AR',
              disabled:false,
              lClass:'line',
              hClass:'circle'
            }
          ]
        },
        {
          idx:'plan',
          text:'资金管理',
          disabled:false,
          lClass:'line',
          hClass:'header-circle bg-icon-2'
        },
        {
          idx:'2',
          text:'消息中心',
          disabled:false,
          lClass:'line',
          hClass:'header-circle bg-icon-2'
        },
        {
          idx:'3',
          text:'账户管理',
          disabled:false,
          lClass:'end-line',
          hClass:'header-circle bg-icon-3',
          childrens:[
            {
              idx:'3-1',
              text:'基本信息',
              disabled:false,
              lClass:'line',
              hClass:'circle'
            },
            {
              idx:'3-2',
              text:'银行卡管理',
              disabled:false,
              lClass:'line',
              hClass:'circle'
            },{
              idx:'3-3',
              text:'密码修改',
              disabled:false,
              lClass:'end-line',
              hClass:'circle'
            }
          ]
        }
      ],
      activeIndex: 'myar',
      
    }
  },
  methods:{
    handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      }
  }
}
</script>
