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
        <button class="btn" @click="pay">Оплатить</button>
      </p>
      <template v-else>
        <h3>Для совершения покупки авторизуйтесь в системе!</h3>
        <AuthForm />
      </template>
    </template>
  </app-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useCartPage } from '@/use/cart-page'
import AppPage from '../components/ui/AppPage'
import { useProductCart } from '@/use/product-cart'
import AuthForm from '@/components/AuthForm'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const { addIncr, delDecr } = useProductCart()
    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const { total } = useCartPage()
    const user = computed(() => store.getters['auth/user'])

    const pay = () => {
      const widget = new cp.CloudPayments();

      widget.pay('auth', // или 'charge'
        { //options
          publicId: 'test_api_00000000000000000000001', //id из личного кабинета
          description: 'Оплата товаров в example.com', //назначение
          amount: total.value, //сумма
          currency: 'RUB', //валюта
          accountId: user.value.email, // идентификатор плательщика (необязательно)
          invoiceId: '1234567', // номер заказа  (необязательно)
          skin: "mini", // дизайн виджета (необязательно)
          data: {
            myProp: 'myProp value'
          }
        },
        {
          onSuccess: function (options) { // success
            //действие при успешной оплате
            router.push({name: 'Success'})
            store.dispatch('orders/create')
          },
          onFail: function (reason, options) { // fail
            //действие при неуспешной оплате
          },
          onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            //например вызов вашей аналитики Facebook Pixel
          }
        }
      )
    }

    return {
      ...useCartPage(),
      addIncr,
      delDecr,
      isAuth,
      pay
    }
  },
  components: {
    AppPage,
    AuthForm
  }
}
</script>
