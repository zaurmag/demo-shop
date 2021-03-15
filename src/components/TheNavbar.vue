<template>
  <nav class="navbar">
    <h3>Online Shop</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
      <!--      <li>-->
      <!--        <router-link to="/auth">Вход</router-link>-->
      <!--      </li>-->
    </ul>
  </nav>
</template>

<script>
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
    }
  },
}
</script>

<style scoped></style>
