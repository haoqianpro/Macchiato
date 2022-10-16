import { createStore } from 'vuex'
import getters from './getters'
export default createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    REMOVE_USER: state => {
      state.user = null
    }
  },
  getters
})
