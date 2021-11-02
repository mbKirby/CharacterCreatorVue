import { createRouter, createWebHistory } from 'vue-router'
import CharacterCreation from '../views/CharacterCreation.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import CharacterSheet from '../views/CharacterSheet.vue'
import SignUp from '../views/SignUp.vue'
import CharacterDetail from '../views/CharacterDetail.vue'

const routes = [
  {
    path: '/',
    name: 'CharacterCreation',
    component: CharacterCreation,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/character-sheet',
    name: 'character-sheet',
    component: CharacterSheet
  },
  {
    path: '/details/:characterName',
    name: 'details',
    props: true,
    component: CharacterDetail
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
