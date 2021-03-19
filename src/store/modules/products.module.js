import axios from '@/axios/json-server'

export default {
  namespaced: true,
  state () {
    return {
      products: []
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        const { data } = await axios.get('/products')
        commit('setProducts', data)
      } catch (e) {
        throw e
      }
    }
  },
  getters: {
    products: state => state.products
  }
}