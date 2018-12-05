import * as types from '../types'
import {
  setStore,
  removeStore
} from '@/util/store'
export default {
  state: {
    token: null,
    monitorToken: null, // 接口用户token
    roles: null,
    userinfos: null,
    // scheduleNumber: 0
    roleBelong: [], // 角色所属
    navitems: [], // 导航菜单数组
    menu: [], // 路径数组
    menuName: [] // 路径数组
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
      // 清除菜单信息
      removeStore({
        name: 'navitems'
      })
      state.navitems = null
      // 清除用户可用页面信息
      removeStore({
        name: 'menu'
      })
      state.menu = null
      // 清除用户可用页面名称信息
      removeStore({
        name: 'menuName'
      })
      state.menuName = null
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
    },
    // getScheduleNumber: (state, data) => {
    //   state.scheduleNumber += data
    // }
    getRoleBelong: (state, data) => {
      state.roleBelong = data
    },
    SET_NAVITEM: (state, data) => {
      state.navitems = data
      setStore({
        name: 'navitems',
        content: state.navitems
      })
    },
    SET_MENU: (state, data) => {
      state.menu = data
      setStore({
        name: 'menu',
        content: state.menu
      })
    },
    SET_MENUNAME: (state, data) => {
      state.menuName = data
      setStore({
        name: 'menuName',
        content: state.menuName
      })
    },
    monitorLogIn: (state, data) => {
      state.monitorToken = data
      setStore({
        name: 'monitorToken',
        content: state.monitorToken
      })
    },
    monitorLogOut: (state, data) => {
      // 清除token
      removeStore({
        name: 'monitorToken'
      })
      state.monitorToken = null
    }

  }
}
