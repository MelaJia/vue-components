import * as types from '../types'
export default {
  state: {
    token: null,
    ssoId: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: (state, data) => {
      localStorage.removeItem('token')
      state.token = null
    },
    setSsoId: (state, data) => {
      state.ssoId = data
    }
  }
}
