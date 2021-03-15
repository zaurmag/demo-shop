<template>
  <div class="container">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import AppMessage from '@/components/ui/AppMessage'

export default {
  components: {
    TheNavbar,
    AppMessage,
  },
}
</script>

<style scoped></style>
