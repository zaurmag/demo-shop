<template>
  <AppLoader v-if="loader" />
  <app-page back="/admin/orders" :title="'Заказ от ' + order.date" v-else>
    <p>Покупатель: {{ order.user }}</p>
    <template v-if="order">
      <table class="table">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in order.items">
            <td>{{ product.title }}</td>
            <td>{{ product.count }}</td>
            <td>{{ $currency(product.price) }}</td>
            <td>{{ $currency(product.amount) }}</td>
          </tr>
        </tbody>
      </table>
      <h3>Общая сумма: {{ $currency(order.total) }}</h3>
    </template>
    <p v-else>Заказ с номером #{{ id }} не найден.</p>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'Order',
  setup() {
    const loader = ref(true)
    const route = useRoute()
    const id = route.params.id
    const store = useStore()
    const order = ref()
    console.log(order.value)

    onMounted(async () => {
      order.value = await store.dispatch('orders/loadOne', id)
      loader.value = false
    })

    return {
      loader,
      order,
      id
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
