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
            <button class="btn primary">+</button>
            42 шт.
            <button class="btn danger">-</button>
          </td>
          <td>{{ product.price }} руб.</td>
        </tr>
        </tbody>
      </table>
      <hr>
      <p class="text-right"><strong>Всего: 14 200 руб.</strong></p>
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
    const products = computed(() => store.getters['cart/products'])
    const loader = ref(true)

    onMounted(async () => {
      await store.dispatch('cart/loadProducts')
      loader.value = false
    })

    return {
      products,
      AppLoader,
      loader
    }
  }
}
</script>

<style scoped>

</style>
