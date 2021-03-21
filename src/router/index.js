import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
  {
    path: '/product:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    props: true,
    meta: {
      layout: 'main',
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false,
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      layout: 'main',
      auth: false,
    },
    props: route => ({ query: route.query.category }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requireAuth && isAuthenticated) {
    next()
  } else if (requireAuth && !isAuthenticated) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
