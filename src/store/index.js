import { createStore } from 'vuex'
import getters from './getters'
export default createStore({
  state() {
    return {
      user: null,
      token: null
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    REMOVE_USER: state => {
      state.user = null
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    REMOVE_TOKEN: state => {
      state.token = null
    }
  },
  getters,
  actions: {
    LOGOUT: context => {
      context.commit('REMOVE_USER')
      context.commit('REMOVE_TOKEN')
    }
  }
})
