<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться к списку товаров</router-link>
  </div>

  <div class="card">
    <h1 class="card-title">{{ title }}<slot name="header"></slot></h1>
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Интернет магазин`
  }
}
</script>
