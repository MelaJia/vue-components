<template>
  <div>
    <header>
    </header>
    <el-container>
      <el-header height="auto">
        <header>
          <header-section></header-section>

        </header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-t :nav-items="navItems"></nav-t>
        </el-aside>
        <el-main>
          <tags ref="nav" class="nav"></tags>
          <main :style="'overflow: auto;background-color:rgb(242,242,242);'+'height:'+(height-120)+'px'">
            <router-view></router-view>
          </main>
        </el-main>
      </el-container>
    </el-container>
    <footer>
      <!-- <div class="jt">
            <span>导航</span>
        </div> -->
    </footer>
  </div>
</template>
<style lang="scss">
@import "../assets/css/common";
</style>

<script>
import Nav from './Nav'
import ComponentsInit from '@/mixins/ComponentsInit'
import Tags from './tags'
export default {
  mixins: [ComponentsInit],
  data () {
    return {
      height: '900',
      navItems: [{
        idx: '1',
        text: '业务处理',
        disabled: false,
        lClass: 'start-line',
        hClass: 'header-circle bg-icon-1',
        childrens: [{
          idx: 'loan',
          text: '放款处理',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: 'loanreject',
          text: '拒绝放款查询',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        }, {
          idx: 'loaned',
          text: '已放款查询',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: 'loanfinish',
          text: '已完结查询',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        }
        ]
      },
      {
        idx: '2',
        text: '客户资料',
        disabled: true,
        lClass: 'line',
        hClass: 'header-circle bg-icon-2'
      },
      {
        idx: 'cstLoanFee',
        text: '客户利率维护',
        disabled: false,
        lClass: 'line',
        hClass: 'header-circle bg-icon-2'
      },
      {
        idx: '4',
        text: '账户管理',
        disabled: false,
        lClass: 'end-line',
        hClass: 'header-circle bg-icon-3',
        childrens: [{
          idx: 'lolanuserinfo',
          text: '基本信息',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: '4-2',
          text: '银行卡管理',
          disabled: true,
          lClass: 'line',
          hClass: 'circle'
        }, {
          idx: '4-3',
          text: '密码修改',
          disabled: true,
          lClass: 'end-line',
          hClass: 'circle'
        }
        ]
      }
      ]
    }
  },
  components: {
    'nav-t': Nav,
    Tags
  },
  created () {
    var winHeight = 0
    if (window.innerHeight) {
      winHeight = window.innerHeight
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight
    }
    this.height = winHeight
    window.onresize = () => {
      this.height = document.body.clientHeight
    }
  }
}

</script>
