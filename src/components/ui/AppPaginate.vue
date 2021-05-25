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

    <div class="form-control pagination__select-size">
      <select name="selSize" id="selSize" v-model="selectSize" @change="$emit('changeSize', selectSize)">
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </select>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: "AppPaginate",
  props: ['count', 'pages', 'modelValue'],
  setup (props) {
    const selectSize = ref(props.pages)

    return {
      items: computed(() => Math.ceil(props.count / selectSize.value)),
      selectSize
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .pagination {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;

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

    &__select-size {
      margin-left: 30px;
      margin-bottom: 0;

      select {
        font-size: 14px;
        padding: 6px 12px;
      }
    }
  }
</style>
