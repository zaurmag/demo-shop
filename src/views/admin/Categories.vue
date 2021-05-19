<template>
  <AppLoader v-if="loader" />

  <AppPage title="Категории" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <AdminCategories
      :categories="categories"
      @open="open"
    />
  </AppPage>

  <teleport to="body">
    <app-modal v-if="modal" title="Добавить категорию" @close="modal = false">
      <AdminCategoryForm @close="close">
        <template #add />
      </AdminCategoryForm>
    </app-modal>
  </teleport>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import AppPage from '@/components/ui/AppPage'
import AdminCategories from '@/components/admin/AdminCategories'
import { useRouter } from 'vue-router'
import {computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'
import AppModal from '@/components/ui/AppModal'

export default {
  name: "Categories",
  setup() {
    let loader = ref(true)
    const store = useStore()
    const router = useRouter()
    const modal = ref(false)

    onMounted(async () => {
      await store.dispatch('categories/load')
      loader.value = false
    })

    const categories = computed(() => store.getters['categories/categories'])

    return {
      open: id => router.push(`/admin/category/${id}`),
      categories,
      loader,
      modal,
      close: () => modal.value = false,
    }
  },
  components: {
    AppPage,
    AdminCategories,
    AppLoader,
    AdminCategoryForm,
    AppModal
  }
}
</script>
