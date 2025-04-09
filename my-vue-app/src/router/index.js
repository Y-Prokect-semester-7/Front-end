// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ForYou from '../components/ForYou.vue'
import AddPost from '../components/AddTweet.vue'
import EditAccount from '../components/ChangeAccount.vue'

const routes = [
  { path: '/', name: 'ForYou', component: ForYou },
  { path: '/add', name: 'AddPost', component: AddPost },
  { path: '/editaccount', name: 'EditAccount', component: EditAccount }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
