import axios from 'axios'

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
      }
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    total (state, summ) {
      state.total = summ
    },
    changeCount (state, {id, count}) {
      state.cartModel[id] = count
    }
  },
  actions: {
    async load ({ dispatch, commit, state } ) {
      try {
        const productsID = Object.keys(state.cartModel).map((id) => {
          return `id=${id}`
        }).join('&')
        const { data } = await axios.get(`http://localhost:3000/products?${productsID}`)
        await commit('setProducts', data)
        await dispatch('countSumm')
        await dispatch('total')
      } catch(e) {
        throw e
      }
    },
    total ({ commit, getters }) {
      const data = getters['products']
      const summ = data.reduce((total, amount) => total + amount.countSumm, 0)
      commit('total', summ)
    },
    countSumm ({ getters, dispatch }) {
      const data = getters.products
      data.map(product => product.countSumm = product.price * getters.cartProductsModel[product.id])
      dispatch('total')
    }
  },
  getters: {
    products: state => state.products,
    total: state => state.total,
    cartProductsModel: state => state.cartModel
  }
}
