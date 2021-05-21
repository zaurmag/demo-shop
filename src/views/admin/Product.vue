<template>
  <AppLoader v-if="loading" />
  <app-page v-else-if="product" back :title="product.title">
    <img class="img" :src="product.img" :alt="product.title">

    <AdminProductForm :id="id" :initialValues="initial" @close="close">
      <template #edit />
    </AdminProductForm>
  </app-page>
  <h3 v-else class="text-center text-white">
    Товара с ID = {{ id }} нет.
  </h3>

  <teleport to="body">
    <AppConfirm
      v-if="leave"
      title="Уверены, что хотите удалить товар?"
      @reject="leave = false"
      @confirm="navigate"
    />
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import {onMounted, ref, computed, watch} from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AdminProductForm from '@/components/admin/AdminProductForm'
import AppConfirm from '@/components/ui/AppConfirm'
import { useConfirmGuard } from '@/use/confirm-guard'

export default {
  name: "Product",
  setup () {
    const loading = ref(true)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id
    const product = ref({})
    const initial = ref()

    onMounted(async () => {
      await store.dispatch('categories/load')
      product.value = await store.dispatch('products/loadOne', id)
      initial.value = { ...product.value }
      loading.value = false
    })

    const hasChanges = computed(() => {
      return product.value.title !== initial.value.title ||
      product.value.img !== initial.value.img ||
      product.value.price !== initial.value.price ||
      product.value.count !== initial.value.count
    })

    return {
      ...useConfirmGuard(hasChanges),
      product,
      loading,
      close: () => router.push('/admin'),
      id,
      initial
    }
  },
  components: {
    AppLoader,
    AppPage,
    AdminProductForm,
    AppConfirm
  }
}
</script>

<style scoped>

</style>
