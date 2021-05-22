<template>
  <div class="pagination" v-if="items > 1">
    <ul class="pagination__list">
      <li class="pagination__nav pagination__nav--start">
        <button class="btn" type="button" @click="$emit('update:modelValue', modelValue - 1)" :disabled="modelValue === 1">Предыдущая</button>
      </li>
      <li class="pagination__item" v-for="p in items">
        <a href="#" @click.prevent="$emit('update:modelValue', p)" :class="['pagination__item-link', {'is-active': p === modelValue}]">{{ p }}</a>
      </li>
      <li class="pagination__nav pagination__nav--end">
        <button class="btn" type="button" @click="$emit('update:modelValue', modelValue + 1)" :disabled="modelValue === items">Следующая</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: "AppPaginate",
  props: ['count', 'pages', 'modelValue'],
  setup (props) {

    return {
      items: computed(() => Math.ceil(props.count / props.pages))
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .pagination {
    margin-top: 30px;
    padding-top: 10px;
    padding-bottom: 10px;

    &__list {
      align-items: center;
      display: flex;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 1;
     }

    &__item {
      margin: 0 3px;

      &-link {
        border: 1px solid #ccc;
        border-radius: 3px;
        color: #555;
        display: block;
        padding: 8px 10px;

        &:hover,
        &.is-active {
          background-color: #42b983;
          border-color: #42b983;
          color: #fff;
        }
      }
    }

    &__nav {
      &--start {
        margin-right: 10px;
      }
      &--end {
        margin-left: 10px;
      }

      .btn {
        margin: 0;
      }
    }
  }
</style>
