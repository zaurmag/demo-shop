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
      <li v-if="isAuth">
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
      <li v-if="!isAuth">
        <router-link to="/auth">Вход</router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/admin">Админка</router-link>
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
      cartCount: computed(() => store.getters['cart/totalCount']),
      isAuth: computed(() => store.getters['auth/isAuthenticated'])
    }
  },
}
</script>

<style scoped></style>
