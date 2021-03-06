import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: false,
    },
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success.vue'),
    meta: {
      layout: 'main',
      auth: false,
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
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
  {
    path: '/product/:id',
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
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    component: () => import('../views/admin/Admin'),
    meta: {
      layout: 'admin',
      admin: true
    },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/Products')
      },
      {
        path: 'product/:id',
        name: 'AdminProduct',
        props: true,
        component: () => import('../views/admin/Product')
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/Categories')
      },
      {
        path: 'category/:id',
        name: 'AdminCategory',
        props: true,
        component: () => import('../views/admin/Category')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/admin/Orders.vue')
      },
      {
        path: 'order/:id',
        name: 'AdminOrder',
        props: true,
        component: () => import('../views/admin/Order.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin

  if (requireAdmin) {
    if (store.getters['auth/isAdmin']) {
      return next()
    } else {
      return next('/auth?message=admin')
    }
  }

  if (requireAuth) {
    if (store.getters['auth/isAuthenticated']) {
      return next()
    } else {
      next('/auth?message=auth')
    }
  }

  next()
})

export default router
