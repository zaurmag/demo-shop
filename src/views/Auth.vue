<template>
  <app-page back="/" title="Авторизация">
    <AuthForm />
  </app-page>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { error } from '@/utils/error'
import AppPage from '@/components/ui/AppPage'
import AuthForm from '@/components/AuthForm'
import { computed, watch } from 'vue'

export default {
  name: 'Auth',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'danger',
      })
    }

    const isAuth = computed(() => store.getters['auth/isAuthenticated'])

    watch(isAuth, val => {
      if (val && route.path === '/auth') {
        router.push('/')
      }
    })
  },
  components: {
    AppPage,
    AuthForm
  }
}
</script>
