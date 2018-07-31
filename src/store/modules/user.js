import * as types from '../types'
import {
  setStore,
  removeStore
} from '@/util/store'
export default {
  state: {
    token: null,
    roles: null,
    userinfos: null
    // scheduleNumber: 0
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
      // 清除token
      removeStore({
        name: 'token'
      })
      state.token = null
      // 清除roles
      removeStore({
        name: 'roles'
      })
      state.roles = null
      // 清除用户信息
      removeStore({
        name: 'userinfos'
      })
      state.userinfos = null
    },
    [types.SETROLE]: (state, data) => {
      state.roles = data
      setStore({
        name: 'roles',
        content: state.roles
      })
    },
    SET_UINFO: (state, data) => {
      state.userinfos = data
      setStore({
        name: 'userinfos',
        content: state.userinfos
      })
    }
    // getScheduleNumber: (state, data) => {
    //   state.scheduleNumber += data
    // }
  }
}
