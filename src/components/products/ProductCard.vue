<template>
  <div
    class="product-card"
    v-for="product in products"
    :key="product.id"
    @click="$router.push(`/product/${product.id}`)"
  >
    <div class="product-img">
      <img :src="product.img" :alt="product.title" />
    </div>

    <h4 class="product-title">{{ product.title }}</h4>

    <div class="text-center">
      <ProductActions :product="product" />

      <small class="small mt-20" :class="{ 'not-avilable': !product.count }">{{
        product.count ? 'В наличии: ' + product.count + ' шт.' : 'Нет в наличии'
      }}</small>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductActions from '@/components/products/ProductActions'

export default {
  props: ['products'],
  name: 'ProductCard',
  setup() {
    const controls = ref(false)

    return {
      controls,
    }
  },
  components: {
    ProductActions
  }
}
</script>

<style scoped></style>
