<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
      <th>Сумма</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.id">
      <td>{{ product.title }}</td>
      <td>
        <div class="form-control qty-form-control">
          <button class="btn primary" @click="qtyPlus(product.id)">+</button>
          <input type="text" v-model="cartModel[product.id]" @keyup="qtyChange(product.id)" />
          <button class="btn danger" @click="qtyMinus(product.id)">-</button>
        </div>
      </td>
      <td>{{ $currency(product.price, 'RUB') }}</td>
      <td>{{ $currency(product.countSumm, 'RUB') }}</td>
    </tr>
    </tbody>
  </table>
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
