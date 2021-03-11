import { createStore } from 'vuex'
import auth from './modules/auth.module'

export default createStore({
  state: {
    message: ''
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = ''
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
