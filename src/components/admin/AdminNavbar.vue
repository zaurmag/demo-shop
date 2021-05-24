<template>
  <nav class="navbar">
    <h3>Админка</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/admin/products">Товары</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <router-link to="/admin/orders">Заказы</router-link>
      </li>
      <li class="logout">
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
      <li class="go-shop">
        <router-link class="btn primary btn-sm" to="/" target="_blank">В магазин</router-link>
      </li>
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
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .go-shop {
    margin-left: 15px;
  }
  .logout {
    a {
      color: #ca0000;
    }
  }
</style>
