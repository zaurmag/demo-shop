<template>
  <form action="#" @submit.prevent="onSubmit">
    <div :class="['form-control', { invalid: tError }]">
      <label for="title">Название</label>
      <input id="title" type="text" v-model="title" @blur="tBlur">
      <small v-if="tError">{{ tError }}</small>
    </div>

    <div :class="['form-control', { invalid: iError }]">
      <label for="image">Изображение</label>
      <input id="image" type="text" v-model="img" @blur="iBlur">
      <small v-if="iError">{{ iError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="price">Цена, руб.</label>
      <input id="price" type="text" v-model="price" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div :class="['form-control', { invalid: cError }]">
      <label for="count">Остаток на складе</label>
      <input id="count" type="text" v-model="count" @blur="cBlur">
      <small v-if="cError">{{ cError }}</small>
    </div>

    <div class="form-control">
      <label for="category">Категория</label>
      <select name="" id="category" v-model="category">
        <option
          v-for="option in categories"
          :key="option.id"
          :value="option.type"
        >{{ option.title }}</option>
      </select>
    </div>

    <div v-if="$slots.add">
      <button class="btn primary">Добавить</button>
    </div>

    <div v-if="$slots.edit">
      <div v-if="changed">
        <button class="btn primary" type="submit">Обновить</button>
        <button class="btn danger" type="button" @click="handleReset">Отменить</button>
      </div>

      <div v-else>
        <button class="btn danger">Удалить</button>
        <button class="btn" @click="$emit('close')">Закрыть</button>
      </div>
    </div>
  </form>
</template>

<script>
import { useAdminProductForm } from '@/use/admin-product'
import {computed, ref} from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['close'],
  props: ['id', 'initialValues'],
  name: "AdminProductForm",
  setup(props) {
    const store = useStore()
    const id = props.id
    const categories = computed(() => store.getters['categories/categories'])

    const submit = async values => {
      try {
        if (id) {
          const data = {
            ...values,
            id
          }
          await store.dispatch('products/update', data)
        } else {

        }
      } catch (e) {}
    }

    return {
      ...useAdminProductForm(submit, props.initialValues),
      categories
    }
  }
}
</script>
