<template>
  <AppLoader v-if="loader" />
  <div class="card">
    <h1>Корзина</h1>

    <div v-if="products">
      <table class="table">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена (шт)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>
            <button class="btn primary" @click="qty++">+</button>
            <input type="text" v-model="qty" />
            <button class="btn danger" @click="qty--">-</button>
          </td>
          <td>{{ product.price }} руб.</td>
        </tr>
        </tbody>
      </table>
      <hr>
      <p class="text-right"><strong>Всего: {{ totalSumm }} руб.</strong></p>
      <p class="text-right">
        <button class="btn">Оплатить</button>
      </p>
    </div>
    <h3 v-else class="text-center">В корзине пока ничего нет</h3>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'

const CART_MODEL = {
  '2': 3,
  '5': 1
}

export default {
  setup() {
    const store = useStore()
    const loader = ref(true)
    const qty = ref(1)
    const products = computed(() => store.getters['cart/products'])
    const totalSumm = computed(() => store.getters['cart/total'])

    onMounted(async () => {
      await store.dispatch('cart/load')
      await store.dispatch('cart/total')
      loader.value = false
    })

    return {
      products,
      AppLoader,
      loader,
      totalSumm,
      qty
    }
  }
}
</script>

<style scoped>

</style>
