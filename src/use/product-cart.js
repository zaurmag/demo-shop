import { useStore } from 'vuex'
import { computed } from 'vue'

export function useProductCart(defID) {
  const store = useStore()
  const count = computed(() => store.getters['cart/cart'][defID] ?? 0)
  const addIncr = id => store.commit('cart/add', id)
  const delDecr = id => store.commit('cart/remove', id)

  return {
    count,
    addIncr,
    delDecr
  }
}
