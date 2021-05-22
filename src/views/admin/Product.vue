<template>
  <AppLoader v-if="loading" />

  <app-page v-else-if="product" back="/admin/products" :title="product.title">
    <img class="img" :src="product.img" :alt="product.title">

    <form action="#" @submit.prevent="update">
      <div :class="['form-control', { invalid: tError }]">
        <label for="title">Название</label>
        <input id="title" type="text" v-model="product.title" @blur="tBlur">
        <small v-if="tError">{{ tError }}</small>
      </div>

      <div :class="['form-control', { invalid: iError }]">
        <label for="image">Изображение</label>
        <input id="image" type="text" v-model="product.img" @blur="iBlur">
        <small v-if="iError">{{ iError }}</small>
      </div>

      <div :class="['form-control', { invalid: pError }]">
        <label for="price">Цена, руб.</label>
        <input id="price" type="text" v-model="product.price" @blur="pBlur">
        <small v-if="pError">{{ pError }}</small>
      </div>

      <div :class="['form-control', { invalid: cError }]">
        <label for="count">Остаток на складе</label>
        <input id="count" type="text" v-model="product.count" @blur="cBlur">
        <small v-if="cError">{{ cError }}</small>
      </div>

      <div class="form-control">
        <label for="category">Категория</label>
        <select name="" id="category" v-model="product.category">
          <option
            v-for="option in categories"
            :key="option.id"
            :value="option.type"
          >{{ option.title }}</option>
        </select>
      </div>

      <button class="btn primary" type="submit" :disabled="!changes">Обновить</button>
      <button class="btn danger" type="button" @click="confirm = true">Удалить</button>
    </form>
  </app-page>

  <h3 v-else class="text-center text-white">
    Товара с ID = {{ id }} нет.
  </h3>

  <teleport to="body">
    <AppConfirm
      v-if="leave"
      title="Внимание! Есть несохраненные данные. Вы действительно хотите покинуть страницу?"
      @reject="leave = false"
      @confirm="navigate"
    />
  </teleport>

  <teleport to="body">
    <AppConfirm
      v-if="confirm"
      title="Уверены, что хотите удалить товар?"
      @reject="confirm = false"
      @confirm="remove"
    />
  </teleport>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed, toRaw } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'
import AdminProductForm from '@/components/admin/AdminProductForm'
import AppConfirm from '@/components/ui/AppConfirm'
import { useConfirmGuard } from '@/use/confirm-guard'

export default {
  name: "Product",
  setup () {
    const loading = ref(true)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id
    const product = ref({})
    const confirm = ref(false)
    let initial

    onMounted(async () => {
      await store.dispatch('categories/load')
      initial = await store.dispatch('products/loadOne', id)
      product.value = { ...initial }
      loading.value = false
    })

    const changes = computed(() =>
      product.value.title !== initial.title ||
      product.value.img !== initial.img ||
      product.value.price !== initial.price ||
      product.value.count !== initial.count ||
      product.value.category !== initial.category
    )

    const categories = store.getters['categories/categories']

    const remove = async () => {
      confirm.value = false
      await store.dispatch('products/delete', id)
      await router.push({name: 'AdminProducts'})
    }

    const update = async () => {
      initial = await store.dispatch('products/update', toRaw(product.value))
      product.value = { ...initial }
    }

    return {
      confirm,
      ...useConfirmGuard(changes),
      product,
      loading,
      update,
      remove,
      categories,
      changes
    }
  },
  components: {
    AppLoader,
    AppPage,
    AdminProductForm,
    AppConfirm
  }
}
</script>

<style scoped>

</style>
