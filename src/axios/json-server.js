import axios from 'axios'
import router from '../router'

const dbtAxios = axios.create({
    baseURL: process.env.VUE_APP_DB_URL
})

// Add a response interceptor
dbtAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }

    return Promise.reject(error)
});

export default dbtAxios
