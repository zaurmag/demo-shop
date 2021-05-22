<template>
  <AppLoader v-if="loader" />

  <app-page title="Товары" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <AdminProducts
      :products="paginateProducts"
      @open="open"
    />
    <AppPaginate :count="products.length" :pages="PAGE_SIZE" v-model="page" />
  </app-page>

  <teleport to="body">
    <app-modal v-if="modal" title="Добавить товар" @close="modal = false">
      <AdminProductForm @close="close">
        <template #add />
      </AdminProductForm>
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import AdminProducts from '@/components/admin/AdminProducts'
import AppLoader from '@/components/ui/AppLoader'
import AdminProductForm from '@/components/admin/AdminProductForm'
import AppPaginate from '@/components/ui/AppPaginate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useProductPaginate } from '@/use/product-paginate'

export default {
  name: 'Products',
  setup () {
    let loader = ref(true)
    const store = useStore()
    const router = useRouter()
    const modal = ref(false)
    const PAGE_SIZE = 5

    onMounted(async () => {
      await store.dispatch('products/load')
      await store.dispatch('categories/load')
      loader.value = false
    })

    const products = computed(() => store.getters['products/products'])

    const open = id => {
      router.push(`/admin/product/${id}`)
    }

    return {
      ...useProductPaginate(products, PAGE_SIZE),
      products,
      loader,
      open,
      close: () => modal.value = false,
      modal,
      PAGE_SIZE
    }
  },
  components: {
    AppLoader,
    AdminProducts,
    AppPage,
    AppModal,
    AdminProductForm,
    AppPaginate
  }
}
</script>

<style scoped>

</style>
