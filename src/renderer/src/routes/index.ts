import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../views/Home/index.vue'
import Questions from '../views/Questions/index.vue'
import File from '../views/File/index.vue'
import Answer from '../views/Answer/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/questions', component: Questions },
  { path: '/file', component: File },
  { path: '/answer', component: Answer }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
