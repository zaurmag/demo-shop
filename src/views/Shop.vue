<template>
  <AppLoader v-if="loader" />

  <app-page title="Магазин">
    <div class="card">
      <ProductsFilter />

      <div class="products-table">
        <ProductCard :products="products" />
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import ProductCard from '@/components/ProductCard'
import AppLoader from '@/components/ui/AppLoader'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import ProductsFilter from '@/components/ProductsFilter'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const loader = ref(false)
    const store = useStore()
    const route = useRoute()
    const products = computed(() => store.getters['products/products'])

    onMounted(async () => {
      console.log(route.query.category)
      if (!route.query.category && !route.query.title) {
        loader.value = true
        await store.dispatch('products/load')
        loader.value = false
      }
    })

    return {
      products,
      loader,
    }
  },
  components: {
    AppPage,
    ProductCard,
    AppLoader,
    ProductsFilter,
  },
}
</script>

<style scoped>
.card {
  border-radius: 4px;
  padding: 0;
  display: flex;
}
</style>
