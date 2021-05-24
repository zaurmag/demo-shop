import axios from '@/axios/dbase'
import store from '../../store'
import { transform } from '@/utils/transform'

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
    },
    updateProductCount(state, {id, count}) {
      const product = state.products.find(p => p.id === id)
      product.count = count
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        const { data } = await axios.get('/products.json')
        commit('setProducts', transform(data))
      } catch (e) {
        throw e
      }
    },
    async loadOne (_, id) {
      try {
        const { data } = await axios.get(`/products/${id}.json`)
        return { ...data, id}
      } catch (e) {
        throw e
      }
    },
    async update ({ dispatch }, product) {
      try {
        const { data } = await axios.put(`/products/${product.id}.json`, product)
        dispatch('setMessage', {
          value: 'Товар успешно обновлен',
          type: 'primary'
        }, {root: true})

        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async add ({ dispatch }, product) {
      try {
        const token = store.getters['auth/token']
        await axios.post(`/products.json`, product)
        dispatch('setMessage', {
          value: 'Товар успешно добавлен',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async delete ({ dispatch }, id) {
      try {
        await axios.delete(`/products/${id}.json`)
        dispatch('setMessage', {
          value: 'Товар успешно удален',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
  },
  getters: {
    products: state => state.products.sort((a, b) => b.count - a.count)
  }
}
