import { createRouter, createWebHistory } from 'vue-router'

import TicketForm from '/src/views/TicketForm.vue'

const routes = [
   {
      path: '/',
      component: TicketForm,
   },
   {
      path: '/tickets',
      component: () => import('/src/views/TicketList.vue'),
   },
   {
      path: '/recap/:ticketId',
      component: () => import('/src/components/TicketRecap.vue'),
      props: true,
   },
   {
      path: "/:catchAll(.*)",
      redirect: '/',
   },
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router
