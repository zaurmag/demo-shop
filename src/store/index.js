import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import cart from './modules/cart.module'
import products from './modules/products.module'
import categories from './modules/categories.module'
import orders from './modules/orders.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state: {
    message: null,
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message)

      setTimeout(() => {
        commit('clearMessage')
      }, 5000)
    },
  },
  modules: {
    auth,
    cart,
    products,
    categories,
    orders
  },
})
