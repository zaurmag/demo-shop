<template>
  <table class="table admin-products-table">
    <thead>
    <tr>
      <th>#</th>
      <th>Картинка</th>
      <th>Название</th>
      <th>Категория</th>
      <th>Цена</th>
      <th>Количество</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>{{ index + 1 }}</td>
        <td><img class="img" :src="product.img" :alt="product.title" /></td>
        <td>{{ product.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ $currency(product.price, 'RUB') }}</td>
        <td>{{ product.count }}</td>
        <td>
          <button class="btn" @click="$emit('open', product.id)">Открыть</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  emits: ['open'],
  name: "AdminProducts"
}
</script>

<style scoped>
  .admin-products-table .img {
      max-width: 50px
  }
</style>
