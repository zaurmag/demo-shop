<template>
  <AppLoader v-if="loader" />

  <app-page title="Магазин">
    <div class="card">
      <ProductsFilter v-model="filter" :categories="categories" />

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
import { computed, onMounted, ref, reactive } from 'vue'
import ProductsFilter from '@/components/ProductsFilter'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const loader = ref(false)
    const store = useStore()
    const route = useRoute()
    const categories = computed(() => store.getters['categories/categories'])
    const filter = ref({
      search: route.query.search,
      category: route.query.category
    })

    const products = computed(() => store.getters['products/products']
      .filter(product => {
        if (filter.value.search) {
          return product.title.toLowerCase().includes(filter.value.search.toLowerCase())
        }

        return product
      })
      .filter(product => {
        if (filter.value.category) {
          return product.category === filter.value.category
        }

        return product
      })
    )

    onMounted(async () => {
      loader.value = true
      await store.dispatch('products/load')
      await store.dispatch('categories/load')
      loader.value = false
    })

    return {
      products,
      loader,
      categories,
      filter
    }
  },
  components: {
    AppPage,
    ProductCard,
    AppLoader,
    ProductsFilter
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
