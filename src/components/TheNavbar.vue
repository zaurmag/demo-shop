<template>
  <nav class="navbar">
    <h3>Online Shop</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина [{{ cartCount }}]</router-link>
      </li>
      <template v-if="isAuth">
        <li>
          <router-link :to="{name: 'Orders'}">Мои заказы</router-link>
        </li>
        <li>
          <a href="#" @click.prevent="logout">Выход</a>
        </li>
      </template>
      <li v-if="!isAuth">
        <router-link to="/auth">Вход</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link class="btn btn-sm" to="/admin" target="_blank">Админка</router-link>
      </li>
      <li v-if="isAuth && username">
        {{ username.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      },
      cartCount: computed(() => store.getters['cart/count']),
      isAuth: computed(() => store.getters['auth/isAuthenticated']),
      isAdmin: computed(() => store.getters['auth/isAdmin']),
      username: computed(() => store.getters['auth/user'])
    }
  },
}
</script>

<style scoped></style>
