import { createRouter, createWebHistory } from 'vue-router'

import TicketForm from '/src/views/TicketForm.vue'

const routes = [
   {
      path: '/',
      component: TicketForm,
   },
   {
      path: '/list',
      component: () => import('/src/views/TicketList.vue'),
   },
   {
      path: '/recap/:id',
      component: () => import('/src/components/TicketRecap.vue'),
      props: true,
   },
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router
