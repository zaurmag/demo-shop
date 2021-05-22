import {computed, onMounted, ref, watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chunk from 'lodash.chunk'

export function useProductPaginate(products, size) {
  const router = useRouter()
  const route = useRoute()
  const page = ref(route.query.p ? +route.query.p : 1)

  const _setPage = () => router.replace({query: {p: page.value}})

  onMounted(_setPage)
  watch (page, _setPage)
  const paginateProducts = computed(() => chunk(products.value, size)[page.value - 1])

  return {
    page,
    paginateProducts
  }
}
