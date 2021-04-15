<template>
  <AppLoader v-if="loading" />
  <app-page v-else-if="product" back :title="product.title">
    <img class="img" :src="product.img" :alt="product.title">

    <form action="#" @submit.prevent="onSubmit">
      <div :class="['form-control', { invalid: tError }]">
        <label for="title">Название</label>
        <input id="title" type="text" v-model="title" @blur="tBlur">
        <small v-if="tError">{{ tError }}</small>
      </div>

      <div :class="['form-control', { invalid: iError }]">
        <label for="image">Изображение</label>
        <input id="image" type="text" v-model="img" @blur="iBlur">
        <small v-if="iError">{{ iError }}</small>
      </div>

      <div :class="['form-control', { invalid: pError }]">
        <label for="price">Цена, руб.</label>
        <input id="price" type="text" v-model="price" @blur="pBlur">
        <small v-if="pError">{{ pError }}</small>
      </div>

      <div :class="['form-control', { invalid: cError }]">
        <label for="count">Остаток на складе</label>
        <input id="count" type="text" v-model="count" @blur="cBlur">
        <small v-if="cError">{{ cError }}</small>
      </div>

      <div class="form-control">
        <label for="category">Категория</label>
        <select name="" id="category" v-model="category">
          <option
             v-for="option in categories"
             :key="option.id"
             :value="option.type"
          >{{ option.title }}</option>
        </select>
      </div>

      <div v-if="changed">
        <button class="btn primary" type="submit">Обновить</button>
        <button class="btn danger" type="button" @click="handleReset">Отменить</button>
      </div>

      <div v-else>
        <button class="btn danger">Удалить</button>
        <button class="btn" @click="close">Закрыть</button>
      </div>

    </form>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{ $route.params.id }} нет.
  </h3>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import { useAdminProductForm } from '@/use/admin-product'

export default {
  name: "Product",
  setup () {
    const loading = ref(false)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id
    const product = ref({})
    let initialValues = ref({})

    const categories = computed(() => store.getters['categories/categories'])

    onMounted(async () => {
      loading.value = true
      product.value = await store.dispatch('products/loadOne', id)
      initialValues.value = { ...product.value }
      await store.dispatch('categories/load')
      loading.value = false
    })

    return {
      product,
      loading,
      categories,
      ...useAdminProductForm(id, initialValues),
      close: () => router.push('/admin')
    }
  },
  components: {
    AppLoader,
    AppPage
  }
}
</script>

<style scoped>

</style>
