import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/home/index.vue'
import Questions from '../views/questions/index.vue'
import File from '../views/file/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/questions', component: Questions },
  { path: '/file', component: File }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
