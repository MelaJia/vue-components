import * as types from '../types'
import {
  setStore,
  removeStore
} from '@/util/store'
export default {
  state: {
    token: null,
    roles: null,
    ssoId: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      state.token = data
      setStore({
        name: 'token',
        content: state.token
      })
    },
    [types.LOGOUT]: (state, data) => {
      removeStore('token')
      state.token = null
    },
    [types.SETROLE]: (state, data) => {
      state.roles = data
      setStore({
        name: 'roles',
        content: state.roles
      })
    },
    setSsoId: (state, data) => {
      state.ssoId = data
    }
  }
}
