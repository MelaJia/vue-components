<template>
<div>
    <header>
    </header>
    <main>
        <div class="main-section" :style="'height:'+height+'px'">
            <div class="left" width="200px" style="background-color:#bc3335">
                <div class="top">
                </div>
                <nav-t></nav-t>
            </div>
            <div class="right" style="background-color:rgb(242,242,242)" >
                <header style="background-color:rgb(242,242,242);padding-top:10px">
                        <header-section></header-section>
                        
                </header>
                    <tags ref="nav" class="nav"></tags>
                    <main :style="'overflow: auto;background-color:rgb(242,242,242);'+'height:'+(height-120)+'px'">
                        <router-view></router-view>
                    </main>
            </div>
            
            <!-- <el-row >
                <el-col :span="4">
                    <div class="top">
                    </div>
                    <nav-t></nav-t>
                </el-col>
                <el-col :span="20" :style="'background-color:rgb(242,242,242)'">
                    <router-view></router-view>
                </el-col>
            </el-row> -->
        </div>   
    </main>
    <footer>
        <!-- <div class="jt">
            <span>导航</span>
        </div> -->
    </footer>
</div>  
</template>
<style lang="scss">
    .left{
        width: 200px;
        float: left;
    }
    .right{
        margin-left: 200px;
    }
    .top{
        height: 100px;
    }
    .jt span:after{
        position: relative;
        display: block;
        float: left;
        top:8px;
        left: 54%;
        width:5px;
        height: 5px;
        content:" ";
        border-top:1px solid #000;
        border-right:1px solid #000;
        transform: rotate(45deg)
    }
    .el-table thead{
        color:white
    }
    .el-table thead{
        th,tr{
        background: #931719;
    }
    } 
    .el-table .warning-row {
      background: rgb(240, 200, 125);
    }
    .el-table__expanded-cell {
      font-size: 0;
      background: oldlace
    }
   .ar-table{
    .el-table__expanded-cell[class*=cell]{
      padding: 0px 0px;
    }
    .el-table .success-row {
      background: #f0f9eb;
    }
    .el-table .expendcolor{
      background:oldlace;
    }
   }
   .main{
        padding: 0px 10px;
    } 
    .main>.body{
        margin: 0px 0px 10px 0px;
    }
    .el-card__header>.clearfix{
        display: flex;
        align-items: center;
        img{
            height: 30px;
        }
    }
    .top{
        height: 100px;
        background: url(~@/assets/img/juxin_03.png) #931719 center no-repeat;
    }
    // 时间选择器范围颜色
    .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div{
        background: rgba(236, 156, 145, 0.884)
    }
  </style>

<script>
import Nav from './Nav'
import ComponentsInit from "@/mixins/Ar/ComponentsInit"
import Tags from './tags'
 export default {
  mixins:[ComponentsInit],
  data(){
      return{
          height:'900'
      }
  },
  components:{
      'nav-t':Nav,
      Tags
  },
  created(){
      var winHeight = 0;
        if (window.innerHeight){
            winHeight = window.innerHeight;
        }else if ((document.body) && (document.body.clientHeight)){
            winHeight = document.body.clientHeight;
        }
        this.height=winHeight;
        window.onresize = () =>{
            this.height = document.body.clientHeight;
        };
  }
}
</script>
