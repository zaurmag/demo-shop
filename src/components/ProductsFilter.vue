<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="search" />
      <span class="form-control-clear" v-if="isActive" @click="reset">&times;</span>
    </div>

    <ul class="list">
      <li
        :class="['list-item', {active: category === null}]"
        @click="catFilterHandler(null)"
      >Все</li>
      <li
        :class="['list-item', {active: category === type}]"
        v-for="{ id, title, type } in categories"
        :key="id"
        @click="catFilterHandler(type)"
      >
        {{ title }}
      </li>
    </ul>
  </div>

</template>

<script>
import {computed, ref, watch} from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CategoriesModule',
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const router = useRouter()
    const search = ref()
    const category = ref()

    watch ([search, category], values => {
      const query = {}
      if (values[0]) {
        query.search = values[0]
      }
      if (values[1]) {
        query.category = values[1]
      }
      emit('update:modelValue', query)
      router.replace({ query })
    })

    const isActive = computed(() => search.value || category.value)

    return {
      search,
      category,
      isActive,
      catFilterHandler: type => category.value = type,
      reset: () => {
        search.value = '',
        category.value = null
      }
    }
  },
}
</script>

<style scoped></style>
