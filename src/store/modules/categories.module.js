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
    }
  },
  getters: {
    categories: state => state.categories
  }
}
