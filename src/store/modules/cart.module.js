import axios from 'axios'

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
    async loadProducts ({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:3000/products')
        commit('setProducts', data)
        return data
      } catch(e) {
        throw e
      }
    }
  },
  getters: {
    products: state => state.products
  }
}
