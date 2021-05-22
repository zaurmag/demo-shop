const CART = 'cart'
export default {
  namespaced: true,
  state () {
    return {
      cart: JSON.parse(localStorage.getItem(CART)) ?? {}
    }
  },
  mutations: {
    clear(state) {
      state.cart = {}
      localStorage.removeItem(CART)
    },
    add(state, id) {
      if (!state.cart[id]) {
        state.cart[id] = 0
      }

      const count = state.cart[id]
      state.cart[id] = count + 1
      localStorage.setItem(CART, JSON.stringify(state.cart))
    },
    remove(state, id) {
      const count = state.cart[id]

      if (typeof count === 'undefined') {

        return
      }

      if (count <= 1) {
        delete state.cart[id]
        localStorage.setItem(CART, JSON.stringify(state.cart))

        return
      }

      state.cart[id] = count - 1
      localStorage.setItem(CART, JSON.stringify(state.cart))
    }
  },
  getters: {
    cart: state => state.cart,
    count: state => Object.values(state.cart).reduce((acc, i) => acc + i, 0)
  }
}
