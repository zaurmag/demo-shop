<template>
  <AppLoader v-if="loader" />

  <app-page title="Админка - Товары">
    <AdminProducts
      :products="products"
      @open="open"
    />
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AdminProducts from '@/components/admin/AdminProducts'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from "vue";
import AppLoader from '@/components/ui/AppLoader'
import { useRouter } from 'vue-router'

export default {
  name: 'Products',
  setup () {
    let loader = ref(false)
    const store = useStore()
    const router = useRouter()
    const products = computed(() => store.getters['products/products'])

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
      open
    }
  },
  components: {
    AppLoader,
    AdminProducts,
    AppPage
  }
}
</script>

<style scoped>

</style>
