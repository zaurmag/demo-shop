import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'
import { dateFormat } from '@/utils/date'

export default {
  namespaced: true,
  state () {
    return {
      orders: []
    }
  },
  mutations: {
    setOrders (state, order) {
      state.orders = order
    }
  },
  actions: {
    async load({ commit }) {
      try {
        const { data } = await axios.get('/orders.json')
        commit('setOrders', transform(data))
      } catch (e) {
        console.error(e.message)
      }
    },
    async loadOne(_, id) {
      const { data } = await axios.get(`/orders/${id}.json`)
      return {
        ...data,
        id
      }
    },
    async create({ commit, rootGetters }) {
      const cart = rootGetters['cart/cart']
      const products = rootGetters['products/products']

      const order = {
        id: Date.now(),
        date: dateFormat(new Date()),
        user: rootGetters['auth/user'].email,
        items: []
      }
      let total = 0
      for (const [key, value] of Object.entries(cart)) {
        const product = products.find(p => p.id === key)
        const amount = product.price * value
        total += product.price * value
        const item = {
          title: product.title,
          price: product.price,
          count: value,
          amount
        }

        order.total = total
        order.items.push(item)
        const count = product.count - value

        commit('products/updateProductCount', {
          id: key,
          count
        }, { root: true })

        await axios.patch(`/products/${key}.json`, { count })
        // Rest API:
        // PUT - change full object
        // PATCH - change specific fields
      }

      commit('cart/clear', null, {root: true})
      await axios.post('/orders/.json', order)
    }
  },
  getters: {
    orders: state => state.orders
  }
}
