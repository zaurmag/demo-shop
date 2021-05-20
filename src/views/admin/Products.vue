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
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import chunk from 'lodash.chunk'

export default {
  name: 'Products',
  setup () {
    let loader = ref(true)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const modal = ref(false)
    const PAGE_SIZE = 5
    const page = ref(route.query.p ? +route.query.p : 1)

    const _setPage = () => router.replace({query: {p: page.value}})

    onMounted(_setPage)
    watch (page, _setPage)

    onMounted(async () => {
      await store.dispatch('products/load')
      await store.dispatch('categories/load')
      loader.value = false
    })

    const products = computed(() => store.getters['products/products'])
    const paginateProducts = computed(() => chunk(products.value, PAGE_SIZE)[page.value - 1])

    const open = id => {
      router.push(`/admin/product/${id}`)
    }

    return {
      products,
      loader,
      open,
      close: () => modal.value = false,
      modal,
      PAGE_SIZE,
      page,
      paginateProducts
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
