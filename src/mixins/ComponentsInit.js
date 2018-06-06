import HeaderSection from '@/components/HeaderSection'
import NavItems from '@/config/navMenu'
export default {
  components: {
    HeaderSection
  },
  data () {
    return {
      navItems: NavItems[this.$options.name].navItems // 获取菜单
    }
  }
}
