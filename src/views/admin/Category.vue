<template>
  <AppLoader v-if="loading" />

  <app-page v-else-if="category" back="/admin/categories" :title="category.title">
    <AdminCategoryForm :id="id" :initialValues="initialValues" @close="close" @remove="confirmLeave = true">
      <template #edit />
    </AdminCategoryForm>
  </app-page>

  <h3 v-else class="text-center text-white">
    Категории с ID = {{ $route.params.id }} нет.
  </h3>

  <teleport to="body">
    <AppConfirm
      v-if="confirmLeave"
      title="Действительно хотите удалить категорию?"
      @reject="confirmLeave = false"
      @confirm="confirm"
    />
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'
import AppConfirm from '@/components/ui/AppConfirm'

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
    const confirmLeave = ref(false)

    onMounted(async () => {
      category.value = await store.dispatch('categories/loadOne', id)
      initialValues.value = { ...category.value }
      loading.value = false
    })

    const confirm = async () => {
      await store.dispatch('categories/delete', id)
      confirmLeave.value = false
      await router.push('/admin/categories')
    }

    return {
      category,
      loading,
      close: () => router.push('/admin/categories'),
      id,
      initialValues,
      confirmLeave,
      confirm
    }
  },
  components: {
    AppLoader,
    AppPage,
    AdminCategoryForm,
    AppConfirm
  }
}
</script>

<style scoped>

</style>
