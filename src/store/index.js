import Vue from 'vue'
import Vuex from 'Vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import errLog from './modules/errLog'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        common,
        errLog,
        tags
      },
      getters,
})
