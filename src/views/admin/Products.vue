<template>
  <AppLoader v-if="loader" />

  <app-page title="Админка - Товары">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <AdminProducts
      :products="products"
      @open="open"
    />
  </app-page>

  <teleport to="body">
    <app-modal v-if="modal" title="Добавить товар" @close="modal = false">
      <AdminProductForm>
        <template #add />
      </AdminProductForm>
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import AdminProducts from '@/components/admin/AdminProducts'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from "vue";
import AppLoader from '@/components/ui/AppLoader'
import { useRouter } from 'vue-router'
import AdminProductForm from '@/components/admin/AdminProductForm'

export default {
  name: 'Products',
  setup () {
    let loader = ref(false)
    const store = useStore()
    const router = useRouter()
    const products = computed(() => store.getters['products/products'])
    const modal = ref(false)

    onMounted(async () => {
      loader.value = true
      await store.dispatch('products/load')
      loader.value = false
    })

    const open = id => {
      router.push(`/admin/product/${id}`)
    }

    return {
      products,
      loader,
      open,
      modal
    }
  },
  components: {
    AppLoader,
    AdminProducts,
    AppPage,
    AppModal,
    AdminProductForm
  }
}
</script>

<style scoped>

</style>
