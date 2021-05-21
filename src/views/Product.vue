<template>
  <AppLoader v-if="loading" />

  <app-page back center :title="product.title" v-else-if="product">
    <img :src="product.img" />
    <p>Категория: <strong>{{ product.category }}</strong></p>

    <ProductActions :product="product" product-full />
  </app-page>

  <h3 class="text-center text-white" v-else>
    Товар с ID {{ product.id }} не найден.
  </h3>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import AppLoader from '@/components/ui/AppLoader'
import ProductActions from '@/components/products/ProductActions'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const loading = ref(true)
    const product = ref()
    const id = route.params.id

    onMounted(async () => {
      product.value = await store.dispatch('products/loadOne', id)
      loading.value = false
    })

    return {
      product,
      loading
    }
  },
  components: {
    AppPage,
    AppLoader,
    ProductActions
  }
}
</script>

<style scoped>

</style>
