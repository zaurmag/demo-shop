import axios from 'axios'
import { error } from '@/utils/error'
const JWT_TOKEN = 'jwt-token'
const EXPIRES_KEY = 'jwt-expires'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(JWT_TOKEN),
      expiresDate: new Date(localStorage.getItem(EXPIRES_KEY)),
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(JWT_TOKEN, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(JWT_TOKEN)
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, {...payload, returnSecureToken: true})
        console.log(data)
        commit('setToken', data.idToken)
        commit('clearMessage', null, {root: true})
      } catch(e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, {
          root: true
        })
        throw new Error()
      }
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: (_, getters) => !!getters.token, // && !getters.isExpired
    isExpired: state => new Date() >= state.expiresDate
  },
}
