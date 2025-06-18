// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authGuard';
import { useAuth0 } from '@auth0/auth0-vue';
import ForYou from '../components/ForYou.vue'
import AddPost from '../components/AddTweet.vue'
import EditAccount from '../components/ChangeAccount.vue'
import AddAccount from '../components/AddAccount.vue'
import { isUserRegistered } from '../composables/useUserRegistration'; 
const routes = [
  { path: '/', name: 'ForYou', component: ForYou, meta: { requiresUserCheck: true } },
  { path: '/add', name: 'AddPost', component: AddPost, meta: { requiresUserCheck: true } },
  { path: '/editaccount', name: 'EditAccount', component: EditAccount, meta: { requiresUserCheck: true } },
  { path: '/addaccount', name: 'AddAccount', component: AddAccount }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  // Allow access to /addaccount
  if (to.path === '/addaccount') return true;

  // If registration is known and user is not registered → redirect
  if (isUserRegistered.value === false) {
    return { path: '/addaccount' };
  }

  return true;
});

export default router
