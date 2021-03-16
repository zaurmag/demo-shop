import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      products: [],
      total: null
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    total (state, summ) {
      state.total = summ
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:3000/products')
        commit('setProducts', data)
        return data
      } catch(e) {
        throw e
      }
    },
    async total ({ dispatch, commit, getters }) {
      try {
        const data = await getters['products']
        const summ = data.reduce((total, amount) => total += amount.price, 0)
        commit('total', summ)
      } catch (e) {
        throw e
      }
    }
  },
  getters: {
    products: state => state.products,
    total: state => state.total
  }
}
