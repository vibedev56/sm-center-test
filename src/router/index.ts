import { createRouter, createWebHistory } from 'vue-router'
import UserProfileForm from '../views/UserProfileForm.vue'
import ProductForm from '../views/ProductForm.vue'
import OrderForm from '../views/OrderForm.vue'
import FeedbackForm from '../views/FeedbackForm.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/profile',
      component: UserProfileForm,
      name: 'profile'
    },
    {
      path: '/product',
      component: ProductForm,
      name: 'product'
    },
    {
      path: '/order',
      component: OrderForm,
      name: 'order'
    },
    {
      path: '/feedback',
      component: FeedbackForm,
      name: 'feedback'
    },
    {
      path: '/',
      redirect: '/profile'
    }
  ]
}) 