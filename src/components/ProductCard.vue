<template>
  <div class="product-card" v-for="product in products" :key="product.id">
    <div class="product-img">
      <img :src="product.img" :alt="product.title" />
    </div>
    <h4 class="product-title">{{ product.title }}</h4>
    <div class="text-center">
      <button class="btn">{{ product.price }}</button>
      <!--            <div class="product-controls">-->
      <!--              <button class="btn danger">-</button>-->
      <!--              <strong>123</strong>-->
      <!--              <button class="btn primary">+</button>-->
      <!--            </div>-->
      <small class="small mt-20" :class="{'not-avilable' : !product.count}">{{ product.count ? 'В наличии: ' + product.count + ' шт.' : 'Нет в наличии' }}</small>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['products'],
  name: "ProductCard",
  setup (props) {

    return {
      products: computed(() => props.products)
    }
  }
}
</script>

<style scoped>

</style>
