import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: true
    }
  },
  {
    path: '/product:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    props: true,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
