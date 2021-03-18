<template>
  <AppLoader v-if="loader" />
  <div class="card">
    <h1>Корзина</h1>

    <div v-if="products">
      <CartTable :products="products" :cartModel="cartModel" />
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
import {ref, onMounted, computed, reactive} from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import CartTable from '@/components/cart/CartTable'

export default {
  setup() {
    const store = useStore()
    const loader = ref(false)
    const products = computed(() => store.getters['cart/products'])
    const totalSumm = computed(() => store.getters['cart/total'])
    const cartModel = computed(() => store.getters['cart/cartProductsModel'])

    onMounted(async () => {
      loader.value = true
      await store.dispatch('cart/load')
      await store.dispatch('cart/total')
      loader.value = false
    })

    return {
      products,
      AppLoader,
      loader,
      totalSumm,
      CartTable,
      cartModel
    }
  }
}
</script>
