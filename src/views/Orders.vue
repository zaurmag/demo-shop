<template>
  <AppLoader v-if="loader" />
  <app-page title="Мои заказы" v-else>
    <table class="table text-center" v-if="userOrders.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Дата</th>
        <th>Сумма</th>
      </tr>
      <tr v-for="(order, index) in userOrders">
        <td>{{ index + 1 }}</td>
        <td>{{ order.date }}</td>
        <td>{{ $currency(order.total) }}</td>
      </tr>
      </thead>
    </table>
    <p v-else>У вас пока нет заказов.</p>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import { useStore } from 'vuex'
import { onMounted, ref, computed } from 'vue'

export default {
  name: 'Orders',
  setup() {
    const store = useStore()
    const loader = ref(true)
    const orders = computed(() => store.getters['orders/orders'])
    const user = store.getters['auth/user'].email

    onMounted(async () => {
      await store.dispatch('orders/load')
      loader.value = false
    })

    return {
      userOrders: computed(() => orders.value.filter(o => o.user === user)),
      loader
    }
  },
  components: {
    AppPage,
    AppLoader
  }
}
</script>

<style scoped>

</style>
