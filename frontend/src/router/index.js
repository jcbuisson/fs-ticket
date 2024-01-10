import { createRouter, createWebHistory } from 'vue-router'

import TicketForm from '/src/views/TicketForm.vue'
import TicketList from '/src/views/TicketList.vue'

const routes = [
   {
      path: '/',
      component: TicketForm,
   },
   {
      path: '/list',
      component: TicketList,
   },
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router
