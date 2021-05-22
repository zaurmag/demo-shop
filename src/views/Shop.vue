<template>
  <AppLoader v-if="loader" />

  <app-page title="Магазин" v-else>
    <div class="card">
      <ProductsFilter v-model="filter" :categories="categories" />

      <div class="products-table">
        <ProductCard
          :products="paginateProducts"
        />

        <AppPaginate :count="products.length" :pages="PAGE_SIZE" v-model="page" />
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import ProductCard from '@/components/ProductCard'
import AppLoader from '@/components/ui/AppLoader'
import { useStore } from 'vuex'
import {computed, onMounted, ref} from 'vue'
import ProductsFilter from '@/components/ProductsFilter'
import { useRouter, useRoute } from 'vue-router'
import AppPaginate from '@/components/ui/AppPaginate'
import { useProductPaginate } from '@/use/product-paginate'

export default {
  name: 'Home',
  setup() {
    const loader = ref(false)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const categories = computed(() => store.getters['categories/categories'])
    const PAGE_SIZE = 6

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
      ...useProductPaginate(products, PAGE_SIZE),
      products,
      loader,
      categories,
      filter,
      open: id => router.push(`/product/${id}`),
      PAGE_SIZE
    }
  },
  components: {
    AppPage,
    ProductCard,
    AppLoader,
    ProductsFilter,
    AppPaginate
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
