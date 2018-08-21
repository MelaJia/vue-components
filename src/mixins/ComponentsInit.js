import HeaderSection from '@/components/HeaderSection'
import NavItems from '@/config/navMenu'
export default {
  components: {
    HeaderSection,
    'dialog-pass-update': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/pwdUpdate')
  },
  data () {
    return {
      dialogPassVisible: false, // 密码修改
      navItems: NavItems[this.$options.name].navItems // 获取菜单
    }
  },
  methods: {
    pwdChange: pwdChange
  }
}
// 密码修改
function pwdChange () {
  console.log('修改密码')
  this.dialogPassVisible = true
}
