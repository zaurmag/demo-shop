<template>
  <AppLoader v-if="loader" />
  <app-page title="Список заказов" v-else>
      <table class="table text-center" v-if="orders.length">
        <thead>
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Покупатель</th>
            <th>Сумма</th>
            <th>Действие</th>
          </tr>
        <tr v-for="(order, index) in orders">
          <td>{{ index + 1 }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.user }}</td>
          <td>{{ $currency(order.total) }}</td>
          <td>
            <router-link :to="'/admin/order/' + order.id" custom v-slot="{ navigate }">
              <button class="btn btn-sm" @click="navigate">Открыть</button>
            </router-link>
          </td>
        </tr>
        </thead>
      </table>
    <p v-else>Пока нет заказов.</p>
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

    onMounted(async () => {
      await store.dispatch('orders/load')
      loader.value = false
    })

    return {
      orders,
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
