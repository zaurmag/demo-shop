<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <a href="#" class="modal-close" @click="$emit('close')">&times;</a>
    <h2 v-if="title">{{ title }}</h2>

    <slot />
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
