<template>
  <app-modal v-if="modal" :title="title" @click="$emit('reject')">
    <button class="btn primary" type="button" @close="$emit('confirm')">Да</button>
    <button class="btn danger" type="button" @close="$emit('reject')">Нет</button>
  </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal'

export default {
  name: "AppConfirm",
  emits: ['reject', 'confirm'],
  components: {
    AppModal
  }
}
</script>

<style scoped>

</style>
