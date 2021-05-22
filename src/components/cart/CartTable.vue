<template>

</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: ['products', 'cartModel'],
  name: "CartTable",
  setup ({ cartModel }) {
    let qty = ref()
    const store = useStore()

    const qtyPlus = id => {
      store.commit('cart/changeCount', { id, count: cartModel[id]+1 })
      store.dispatch('cart/update')
    }

    const qtyMinus = id => {
      if (cartModel[id] <= 1) {
        return true
      }
      store.commit('cart/changeCount', { id, count: cartModel[id]-1 })
      store.dispatch('cart/update')
    }

    const qtyChange = (id) => {
      store.commit('cart/changeCount', { id, count: +cartModel[id] })
      store.dispatch('cart/update')
    }

    return {
      qtyPlus,
      qtyMinus,
      qtyChange
    }
  }
}
</script>

<style scoped>
  .qty-form-control {
    align-items: center;
    display: flex;
    max-width: 250px;
    margin: 0 auto;
  }
  .qty-form-control input {
    margin: 0 10px;
    text-align: center;
  }
</style>
