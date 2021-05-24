<template>
  <admin-navbar />

  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar'
import AppMessage from '@/components/ui/AppMessage'

export default {
  name: 'AdminLayout',
  components: {
    AdminNavbar,
    AppMessage,
  }
}
</script>

<style scoped></style>
