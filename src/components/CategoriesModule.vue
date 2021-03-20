<template>
  <ul class="list">
    <li class="list-item">Все</li>
    <li
      class="list-item"
      v-for="cat in categories"
      :key="cat.id"
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

    onMounted(async () => {
      try {
        await store.dispatch('categories/load')
      } catch (e) {}
    })

    return {
      categories
    }
  }
}
</script>

<style scoped>

</style>
