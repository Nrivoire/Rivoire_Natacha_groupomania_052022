import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import SessionView from '../views/SessionView.vue'
import AccountView from '../views/AccountView.vue'
import CommentaireView from '../views/CommentaireView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/session',
    name: 'session',
    component: SessionView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/commentaire/:id',
    name: 'commentaire',
    component: CommentaireView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
