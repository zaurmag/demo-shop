<template>
  <AppLoader v-if="loading" />
  <app-page v-else-if="product" back :title="product.title">
    <img class="img" :src="product.img" :alt="product.title">

    <AdminProductForm :id="id" :initialValues="initialValues" @close="close">
      <template #edit />
    </AdminProductForm>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{ $route.params.id }} нет.
  </h3>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AdminProductForm from '@/components/admin/AdminProductForm'

export default {
  name: "Product",
  setup () {
    const loading = ref(false)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id
    const product = ref({})
    const initialValues = ref({})

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
      close: () => router.push('/admin'),
      id,
      initialValues
    }
  },
  components: {
    AppLoader,
    AppPage,
    AdminProductForm
  }
}
</script>

<style scoped>

</style>
