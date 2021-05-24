<template>
  <AppLoader v-if="loader" />

  <app-page title="Магазин">
    <div class="card">
      <div class="products-filter">
        <div class="form-control">
          <input type="text" placeholder="Найти товар..." />
          <span class="form-control-clear">&times;</span>
        </div>

        <CategoriesModule />
      </div>
      <div class="products-table">
        <!--        <pre>{{ products }}</pre>-->
        <ProductCard :products="products" />
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import ProductCard from '@/components/products/ProductCard'
import AppLoader from '@/components/ui/AppLoader'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import CategoriesModule from '@/components/products/ProductFilter'
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  props: ['category'],
  setup(props) {
    const loader = ref(false)
    const store = useStore()
    const products = computed(() => store.getters['products/products'])
    const route = useRoute()

    onMounted(async () => {
      loader.value = true
      await store.dispatch('products/load')
      loader.value = false
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
    CategoriesModule,
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
