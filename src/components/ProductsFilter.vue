<template>
  <div class="products-filter">
    <AppSearch v-model="filter" />

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
  </div>

</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppSearch from '@/components/AppSearch'

export default {
  name: 'CategoriesModule',
  setup() {
    const store = useStore()
    const categories = computed(() => store.getters['categories/categories'])
    const products = computed(async () => await store.dispatch('products/load'))
    const router = useRouter()
    const route = useRoute()
    const filter = ref()

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

    // watch (filter, val => {
    //   router.push(query: {title: filter.value})
    // })

    const catFilterHandler = type => {
      router.push({query: { category: type }})
      products.value.then(
        result => {
          const productsFilter = result
            .filter(p => p.category === type)
            // .filter(product => {
            //   if (filter.value) {
            //     return filter.value === product.title
            //   }
            //
            //   return product
            // })

          store.commit('products/setProducts', productsFilter)
        },
        error => {
          throw error
        }
      )
    }

    onMounted(async () => {
      catFilterHandler(route.query.category)

      try {
        await store.dispatch('categories/load')
      } catch (e) {}
    })

    return {
      categories,
      catFilterHandler,
      catFilterAllHandler,
      AppSearch,
      filter
    }
  },
}
</script>

<style scoped></style>
