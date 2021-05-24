<template>
  <app-page title="Спасибо за покупку!">
    <button @click="$router.push('/')" class="btn">Вернуться на главную</button>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'

export default {
  name: 'Success',
  components: {
    AppPage
  }
}
</script>

<style scoped>

</style>
