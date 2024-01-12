import { useSessionStorage } from '@vueuse/core'
import { computed } from 'vue'


const id2ticket = useSessionStorage('id2ticket', {})
const ticketListComplete = useSessionStorage('ticket-list-complete', false)


export const allTickets = computed(() => {
   if (ticketListComplete.value) {
      return Object.values(id2ticket.value)
   }
   fetch('/api/ticket').then(response => response.json()).then(ticketList => {
      for (const ticket of ticketList) {
         id2ticket.value[ticket.id] = ticket
      }
      ticketListComplete.value = true
   })
   return {}
})

export async function asyncTicket(ticketId) {
   if (id2ticket.value[ticketId] === undefined) {
      const response = await fetch(`/api/ticket/${ticketId}`)
      const ticket = await response.json()
      id2ticket.value[ticket.id] = ticket
   }
   return id2ticket.value[ticketId]
}
