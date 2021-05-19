import axios from '@/axios/json-server'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        const { data } = await axios.get('/categories')
        await commit('setCategories', data)
      } catch (e) {
        throw e
      }
    },
    async loadOne (_, id) {
      try {
        const { data } = await axios.get(`/categories/${+id}`)
        return data
      } catch (e) {
        throw e
      }
    },
    async update ({ dispatch }, category) {
      try {
        await axios.put(`/categories/${category.id}`, category)
        dispatch('setMessage', {
          value: 'Категория успешно обновлена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async add ({ dispatch }, category) {
      try {
        await axios.post(`/categories/`, category)
        dispatch('setMessage', {
          value: 'Категория успешно добавлена',
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
        await axios.delete(`/categories/${id}`)
        dispatch('setMessage', {
          value: 'Категория успешно удалена',
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
    categories: state => state.categories
  }
}
