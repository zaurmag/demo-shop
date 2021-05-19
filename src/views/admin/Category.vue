<template>
  <AppLoader v-if="loading" />

  <app-page v-else-if="category" :title="category.title">
    <AdminCategoryForm :id="id" :initialValues="initialValues" @close="close">
      <template #edit />
    </AdminCategoryForm>
  </app-page>

  <h3 v-else class="text-center text-white">
    Категории с ID = {{ $route.params.id }} нет.
  </h3>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'

export default {
  name: "Category",
  setup () {
    const loading = ref(true)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const id = route.params.id
    const category = ref({})
    const initialValues = ref({})

    onMounted(async () => {
      category.value = await store.dispatch('categories/loadOne', id)
      initialValues.value = { ...category.value }
      loading.value = false
    })

    return {
      category,
      loading,
      close: () => router.push('/admin/categories'),
      id,
      initialValues
    }
  },
  components: {
    AppLoader,
    AppPage,
    AdminCategoryForm
  }
}
</script>

<style scoped>

</style>
