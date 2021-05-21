<template>
  <button class="btn" v-if="count === 0" @click.stop="addIncr(product.id)">
    {{ $currency(product.price, 'RUB') }}
  </button>

  <div v-else :class="['product-controls', {'in-card': productFull}]">
    <button class="btn danger" @click.stop="delDecr(product.id)">-</button>
    <strong>{{ count }}</strong>
    <button class="btn primary" @click.stop="addIncr(product.id)">+</button>
  </div>
</template>

<script>
import { useProductCart } from '@/use/product-cart'

export default {
  name: "ProductActions",
  props: {
    product: {
      type: Object,
      required: true
    },
    productFull: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      ...useProductCart(props.product.id)
    }
  }
}
</script>

<style scoped>

</style>
