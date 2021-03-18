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
      console.log(state.cartModel[id])
    },
    changePrice (state, { price, id }) {
      const product = state.products.filter(p => p.id === id)
      product.price = price
    }
  },
  actions: {
    async load ({ commit, state } ) {
      try {
        const productsID = Object.keys(state.cartModel).map((id) => {
          return `id=${id}`
        }).join('&')
        const { data } = await axios.get(`http://localhost:3000/products?${productsID}`)
        commit('setProducts', data)
      } catch(e) {
        throw e
      }
    },
    total ({ commit, getters }) {
      const data = getters['products']
      const summ = data.reduce((total, amount) => total + amount.price, 0)
      commit('total', summ)
    }
  },
  getters: {
    products: state => state.products,
    total: state => state.total,
    cartProductsModel: state => state.cartModel
  }
}
