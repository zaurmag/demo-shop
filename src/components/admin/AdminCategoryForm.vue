<template>
  <form action="#" @submit.prevent="onSubmit">
    <div :class="['form-control', { invalid: tError }]">
      <label for="title">Название</label>
      <input id="title" type="text" v-model="title" @blur="tBlur">
      <small v-if="tError">{{ tError }}</small>
    </div>

    <div :class="['form-control', { invalid: typeError }]">
      <label for="count">Тип</label>
      <input id="count" type="text" v-model="type" @blur="typeBlur">
      <small v-if="typeError">{{ typeError }}</small>
    </div>

    <div v-if="$slots.add">
      <button class="btn primary" type="submit">Добавить</button>
      <button class="btn" type="button" @click="$emit('close')">Отменить</button>
    </div>

    <div v-if="$slots.edit">
      <div v-if="changed">
        <button class="btn primary" type="submit">Обновить</button>
        <button class="btn danger" type="button" @click="handleReset">Сбросить</button>
      </div>

      <div v-else>
        <button class="btn danger" type="button" @click="$emit('remove')">Удалить</button>
        <button class="btn" type="button" @click="$emit('close')">Закрыть</button>
      </div>
    </div>
  </form>
</template>

<script>
import { useAdminCategoryForm } from '@/use/admin-category'
import AppModal from '@/components/ui/AppModal'
import { useStore } from 'vuex'

export default {
  emits: ['close','remove'],
  props: ['id', 'initialValues'],
  name: "AdminProductForm",
  setup(props, { emit }) {
    const store = useStore()
    const id = props.id

    const submit = async values => {
      try {
        const data = {
          ...values,
          id: id ? id : Date.now().toString()
        }

        if (id) {
          await store.dispatch('categories/update', data)
        } else {
          await store.dispatch('categories/add', data)
          await store.dispatch('categories/load')
          emit('close')
        }
      } catch (e) {}
    }

    return {
      ...useAdminCategoryForm(submit, props.initialValues)
    }
  },
  components: {
    AppModal
  }
}
</script>
