<template>
  <ul class="list">
    <li class="list-item" @click="catFilterAllHandler">Все</li>
    <li
      class="list-item"
      v-for="cat in categories"
      :key="cat.id"
      @click="catFilterHandler(cat.type)"
    >
      {{ cat.title }}
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import {computed, onMounted} from 'vue'

export default {
  name: "CategoriesModule",
  setup () {
    const store = useStore()
    const categories = computed(() => store.getters['categories/categories'])
    const products = computed(async () => await store.dispatch('products/load'))

    const catFilterAllHandler = () => {
      products.value.then(
        result => {
          store.commit('products/setProducts', result)
        },
        error => {
          throw error
        }
      )
    }

    const catFilterHandler = type => {
      products.value.then(
        result => {
          const productsFilter = result.filter(p => p.category === type)
          store.commit('products/setProducts', productsFilter)
        },
        error => {
          throw error
        }
      )

    }

    onMounted(async () => {
      try {
        await store.dispatch('categories/load')
      } catch (e) {}
    })

    return {
      categories,
      catFilterHandler,
      catFilterAllHandler
    }
  }
}
</script>

<style scoped>

</style>
