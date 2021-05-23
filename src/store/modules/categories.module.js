import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  mutations: {
    setCategory (state, categories) {
      state.categories = categories
    },
    removeCategory (state, id) {
      state.categories = state.categories.filter(с => c.id !== id)
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        const { data } = await axios.get('/categories.json')
        await commit('setCategory', transform(data))
      } catch (e) {
        throw e
      }
    },
    async loadOne (_, id) {
      try {
        const { data } = await axios.get(`/categories/${id}.json`)
        return { ...data, id}
      } catch (e) {
        throw e
      }
    },
    async update ({ dispatch }, category) {
      try {
        await axios.put(`/categories/${category.id}.json`, category)
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
    async add ({ dispatch, commit }, category) {
      try {
        const { data } = await axios.post(`/categories.json`, category)
        commit('setCategory', { ...category, id: data.name })

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
    async delete ({ dispatch, commit }, id) {
      try {
        await axios.delete(`/categories/${id}.json`)
        commit('removeCategory', id)

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
