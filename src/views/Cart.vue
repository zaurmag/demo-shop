<template>
  <app-page title="Корзина">
    <p class="text-center" v-if="isEmpty">В корзине пока ничего нет.</p>

    <template v-else>
      <table class="table">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена (шт)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key) in cart" :key="key">
          <td>{{ title(key) }}</td>
          <td>
            <button class="btn danger" @click="delDecr(key)" :disabled="value >= count(key)">-</button>
            <strong>{{ value }}</strong>
            <button class="btn primary" @click="addIncr(key)">+</button>
          </td>
          <td>{{ $currency(price(key), 'RUB') }}</td>
        </tr>
        </tbody>
      </table>
      <hr>
      <p class="text-right"><strong>Всего: {{ $currency(total, 'RUB') }}</strong></p>
      <p class="text-right" v-if="isAuth">
        <button class="btn">Оплатить</button>
      </p>
      <template v-else>
        <h3>Для совершения покупки авторизуйтесь в системе!</h3>
        <AuthForm />
      </template>
    </template>
  </app-page>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useCartPage } from '@/use/cart-page'
import AppPage from '../components/ui/AppPage'
import { useProductCart } from '@/use/product-cart'
import AuthForm from '@/components/AuthForm'

export default {
  setup() {
    const store = useStore()
    const { addIncr, delDecr } = useProductCart()
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])

    return {
      ...useCartPage(),
      addIncr,
      delDecr,
      isAuth
    }
  },
  components: {
    AppPage,
    AuthForm
  }
}
</script>
