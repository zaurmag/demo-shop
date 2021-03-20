import axios from '../../axios/json-server'

export default {
  namespaced: true,
  state () {
    return {
      products: [],
      total: null,
      cartModel: {
        '2': 3,
        '5': 1,
        '7': 5
      },
      totalCount: 0
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    total (state) {
      state.total = state.products.reduce((total, amount) => total + amount.countSumm, 0)
    },
    changeCount (state, {id, count}) {
      state.cartModel[id] = count
    },
    countSumm (state) {
      state.products.map(product => product.countSumm = product.price * state.cartModel[product.id])
    },
    countTotal (state) {
      const obj = state.cartModel
      state.totalCount = Object.keys(obj).reduce((total, key) => total += obj[key], 0)
    }
  },
  actions: {
    async load ({ dispatch, state } ) {
      try {
        const productsID = Object.keys(state.cartModel).map((id) => {
          return `id=${id}`
        }).join('&')
        const { data } = await axios.get(`/products?${productsID}`)
        dispatch('update')
      } catch(e) {
        throw e
      }
    },
    update ({ commit }) {
      commit('total')
      commit('countSumm')
      commit('countTotal')
    }
  },
  getters: {
    products: state => state.products,
    total: state => state.total,
    cartProductsModel: state => state.cartModel,
    totalCount: state => state.totalCount
  }
}
