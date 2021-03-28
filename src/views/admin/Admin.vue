<template>
  <div class="card">
    <router-view />
  </div>
</template>

<script>
import AdminProducts from '@/components/admin/AdminProducts'
export default {
  name: "Admin",
  setup () {

  },
  components: {
    AdminProducts
  }
}
</script>

<style scoped>

</style>
