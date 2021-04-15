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
    },
    async loadOne (_, id) {
      try {
        const { data } = await axios.get(`/products/${+id}`)
        return data
      } catch (e) {
        throw e
      }
    },
    async update ({ dispatch }, product) {
      try {
        await axios.put(`/products/${product.id}`, product)
        dispatch('setMessage', {
          value: 'Товар успешно обновлен',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  },
  getters: {
    products: state => state.products.sort((a, b) => b.count - a.count)
  }
}
