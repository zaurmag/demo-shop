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
      <button class="btn primary" type="submit">Добавить</button>
      <button class="btn" type="button" @click="$emit('close')">Отменить</button>
    </div>

    <div v-if="$slots.edit">
      <div v-if="changed">
        <button class="btn primary" type="submit">Обновить</button>
        <button class="btn danger" type="button" @click="handleReset">Отменить</button>
      </div>

      <div v-else>
        <button class="btn danger" type="button" @click="remove">Удалить</button>
        <button class="btn" type="button" @click="$emit('close')">Закрыть</button>
      </div>
    </div>
  </form>
</template>

<script>
import { useAdminProductForm } from '@/use/admin-product'
import {computed, ref, watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  emits: ['close', 'delete'],
  props: ['id', 'initialValues'],
  name: "AdminProductForm",
  setup(props, { emit }) {
    const store = useStore()
    const id = props.id
    const router = useRouter()
    const isDelete = ref(false)
    const categories = computed(() => store.getters['categories/categories'])

    const submit = async values => {
      try {
        const data = {
          ...values,
          id: id ? id : Date.now().toString()
        }

        if (id) {
          await store.dispatch('products/update', data)
        } else {
          await store.dispatch('products/add', data)
          await store.dispatch('products/load')
          emit('close')
        }
      } catch (e) {}
    }

    const remove = () => {
      modal.value = true
      watch(isDelete, val => {
        if (val) {
          store.dispatch('products/delete', id)
          router.push('/admin')
          modal.value = false
        }
      })
    }

    console.log(props.initialValues)

    return {
      ...useAdminProductForm(submit, props.initialValues),
      categories,
      remove,
      isDelete
    }
  }
}
</script>
