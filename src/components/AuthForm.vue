<template>
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', { invalid: eError }]">
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button
      type="submit"
      class="btn primary"
      :disabled="isSubmitting || isToManyAttempts"
    >
      Войти
    </button>
    <router-link :to="{name: 'Register'}" custom v-slot="{ navigate }">
      <button class="btn" type="button" @click="navigate">Регистрация</button>
    </router-link>

    <br />
    <br />
    <p>Тестовые данные для входа:</p>
    <button class="btn warning btn-sm" @click="email = 'admin@zaurmag.ru'; password='123456'">Администратор</button>
    <button class="btn btn-sm" @click="email = 'demo@zaurmag.ru'; password='321321321'">Пользователь</button>
  </form>
</template>

<script>
import { useLoginForm } from '@/use/login-form'

export default {
  name: 'AuthForm',
  setup() {
    const { email } = useLoginForm()
    email.value = 'demo@zaurmag.ru'

    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>

</style>
