export default {
  namespaced: true,
  state () {
    return {
      cart: {}
    }
  },
  mutations: {
    clear(state) {
      state.cart = {}
    },
    add(state, id) {
      if (!state.cart[id]) {
        state.cart[id] = 0
      }

      const count = state.cart[id]
      state.cart[id] = count + 1
    },
    remove(state, id) {
      const count = state.cart[id]

      if (typeof count === 'undefined') {

        return
      }

      if (count <= 1) {
        delete state.cart[id]

        return
      }

      state.cart[id] = count - 1
    }
  },
  getters: {
    cart: state => state.cart,
    count: state => Object.values(state.cart).reduce((acc, i) => acc + i, 0)
  }
}
