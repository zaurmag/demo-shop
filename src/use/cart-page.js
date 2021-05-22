import { useStore } from 'vuex'
import { computed, ref } from 'vue'

export function useCartPage () {
  const store = useStore()
  const cart = store.getters['cart/cart']
  const products = computed(() => store.getters['products/products'])
  const title = id => products.value.find(p => p.id === id)?.title
  const price = id => products.value.find(p => p.id === id)?.price
  const count = id => products.value.find(p => p.id === id)?.count

  const total = computed(() => {
    return Object.keys(cart).reduce((acc, id) => {
      return acc += products.value.find(p => p.id === id)?.price * cart[id]
    }, 0)
  })

  const isEmpty = computed(() => Object.keys(cart).length === 0)

  return {
    cart,
    products,
    title,
    price,
    count,
    total,
    isEmpty
  }
}
