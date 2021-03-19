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
    total (state) {
      const summ = state.products.reduce((total, amount) => total + amount.countSumm, 0)
      state.total = summ
    },
    changeCount (state, {id, count}) {
      state.cartModel[id] = count
    },
    countSumm (state, context) {
      console.log(context)
      state.products.map(product => product.countSumm = product.price * state.cartModel[product.id])
    }
  },
  actions: {
    async load ({ commit, state } ) {
      try {
        const productsID = Object.keys(state.cartModel).map((id) => {
          return `id=${id}`
        }).join('&')
        const { data } = await axios.get(`http://localhost:3000/products?${productsID}`)
        await commit('setProducts', data)
        await commit('countSumm')
        await commit('total')
      } catch(e) {
        throw e
      }
    },
    update ({ commit }) {
      commit('total')
      commit('countSumm')
    }
  },
  getters: {
    products: state => state.products,
    total: state => state.total,
    cartProductsModel: state => state.cartModel
  }
}
