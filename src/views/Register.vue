<template>
  <app-page title="Регистрация">
  <form @submit.prevent="onSubmit">
    <div :class="['form-control', { invalid: nError }]">
      <label for="name">Имя</label>
      <input type="text" id="name" v-model="name" @blur="nBlur" />
      <small v-if="nError">{{ nError }}</small>
    </div>

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

    <div :class="['form-control', { invalid: p2Error }]">
      <label for="password2">Повторить пароль</label>
      <input type="password" id="password2" v-model="password2" @blur="p2Blur" />
      <small v-if="p2Error">{{ p2Error }}</small>
    </div>

    <button
      type="submit"
      class="btn primary"
      :disabled="isSubmitting || isToManyAttempts"
    >
      Зарегистрироваться
    </button>
    <p>Если зарегистрированы, то <router-link :to="{name: 'Auth'}">авторизуйтесь</router-link> пожалуйста.</p>
  </form>
  </app-page>
</template>

<script>
import { useRegisterForm } from '@/use/register-form'
import AppPage from '@/components/ui/AppPage'

export default {
  name: 'Register',
  setup() {

    return {
      ...useRegisterForm('reg')
    }
  },
  components: {
    AppPage
  }
}
</script>

<style scoped>

</style>
