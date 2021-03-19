<template>
  <AppLoader v-if="loader" />

  <app-page title="Магазин">
    <div class="card">
      <div class="products-filter">
        <div class="form-control">
          <input type="text" placeholder="Найти товар...">
          <span class="form-control-clear">&times;</span>
        </div>

        <ul class="list">
          <li class="list-item">Все</li>
          <li class="list-item">
            Название категории
          </li>
        </ul>
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
import ProductCard from '@/components/ProductCard'
import AppLoader from '@/components/ui/AppLoader'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

export default {
  name: 'Home',
  setup () {
    const loader = ref(false)
    const store = useStore()
    const products = computed(() => store.getters['products/products'])

    onMounted(async () => {
      loader.value = true
      await store.dispatch('products/load')
      loader.value = false
      console.log(products.value)
    })

    return {
      products,
      loader
    }
  },
  components: {
    AppPage,
    ProductCard,
    AppLoader
  }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
