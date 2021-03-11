import { axios } from 'axios'
import { error } from '@/utils/error'

export default {
    namespaced: true,

    state () {
        return {
            token: ''
        }
    },
    mutation: {
        setToken (state, token) {
            state.token = token
        },
        logout(state) {
            state.token = null
        }
    },
    actions: {
        async login({ commit, dispatch }, data) {
            try {
                commit('setToken', data.idToken)
                commit('clearMessage', null, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}
