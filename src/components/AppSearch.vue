<template>
  <div class="form-control">
    <input type="text" placeholder="Найти товар..." v-model="title" />
    <span class="form-control-clear" v-if="isActive" @click="reset">&times;</span>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  name: "AppSearch",

  setup (_, { emit }) {
    const title = ref()

    watch (title, value => {
      emit('update:modelValue', value)
    })

    const isActive = computed(() => title.value)

    return {
      title,
      isActive,
      reset: () => {
        title.value = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
