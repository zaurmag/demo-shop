<template>
  <component :is="layout + '-layout'" v-if="layout"></component>
</template>

<script>
import {computed, onMounted} from 'vue'
import { useStore } from 'vuex'
import {useRoute} from 'vue-router'
import MainLayout from '@/layout/MainLayout'
import AdminLayout from '@/layout/AdminLayout'
import AuthLayout from '@/layout/AuthLayout'

export default {
  setup () {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    MainLayout,
    AuthLayout,
    AdminLayout
  }
}
</script>
