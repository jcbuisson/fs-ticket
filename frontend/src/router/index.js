import { createRouter, createWebHistory } from 'vue-router'

import TicketForm from '/src/views/TicketForm.vue'

const routes = [
   {
      path: '/',
      component: TicketForm,
   },
   {
      path: '/signin',
      component: () => import('/src/views/Signin.vue'),
   },
   {
      path: '/tickets',
      component: () => import('/src/views/TicketList.vue'),
      children: [
         {
            path: ':ticketId',
            component: () => import('/src/components/TicketDetail.vue'),
            props: true,
         },
      ],
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
