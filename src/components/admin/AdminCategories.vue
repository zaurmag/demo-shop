<template>
  <table class="table admin-products-table">
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(category, index) in categories" :key="category.id">
        <td>{{ index + 1 }}</td>
        <td>{{ category.title }}</td>
        <td>{{ category.type }}</td>
        <td>
          <button class="btn" @click="$emit('open', category.id)">Открыть</button>
          <button class="btn danger" type="button" @click="$emit('remove', category.id)">x</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['categories'],
  emits: ['open', 'remove'],
  name: "AdminProducts"
}
</script>
