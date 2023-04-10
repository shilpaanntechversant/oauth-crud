import { createRouter, createWebHistory } from 'vue-router'
import { IsAuthenticated, IsUser} from '@/middlewares/index';
import MyHome from '../views/MyHome.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'
import UserList from '../views/UserList.vue'

import TagList from '../views/TagList.vue'
import TagCreate from '../views/TagCreate.vue'
import TagDetails from '../views/TagDetails.vue'
import TagUpdate from '../views/TagUpdate.vue'

import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    beforeEnter: IsUser, // restricted routes
    name: 'home',
    component: MyHome,
    

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/register',
    beforeEnter: IsUser, // restricted routes
    name: 'register',
    component: RegistrationView
  },
  {
    path: '/login',
    beforeEnter: IsUser, // restricted routes
    name: 'login',
    component: LoginView
  },

  {
    path: '/user/list',
    beforeEnter: IsAuthenticated, // restricted routes
    name: 'userlist',
    component: UserList

  },
  
  {
    path: '/tag/list',
    beforeEnter: IsAuthenticated, // restricted routes
    name: 'taglist',
    component: TagList

  },
  {
    path: '/tag/create',
    beforeEnter: IsAuthenticated, // restricted routes
    name: 'tagcreate',
    component: TagCreate

  },
  {
    path: '/tag/update/:tagId',
    beforeEnter: IsAuthenticated, // restricted routes
    name: 'tagupdate',
    component: TagUpdate

  },
  {
    path: '/tag/details/:tagId',
    beforeEnter: IsAuthenticated, // restricted routes
    name: 'tagdetails',
    component: TagDetails

  },
  

  
]
 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
