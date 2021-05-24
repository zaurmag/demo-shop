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
  </form>
</template>

<script>
import { useLoginForm } from '@/use/login-form'

export default {
  name: 'AuthForm',
  setup() {

    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>

</style>
