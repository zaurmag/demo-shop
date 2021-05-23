<template>
  <nav class="navbar">
    <h3>Админка</h3>

    <ul class="navbar-menu">
      <li v-if="isAuth">
        <router-link to="/admin/products">Товары</router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li class="logout" v-if="isAuth">
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
      <li class="go-shop">
        <router-link class="btn primary btn-sm" to="/" target="_blank">В магазин</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue'
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
      isAuth: computed(() => store.getters['auth/isAuthenticated'])
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
