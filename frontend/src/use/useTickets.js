import { useSessionStorage } from '@vueuse/core'

const id2ticket = useSessionStorage('id2ticket', {})
const ticketListComplete = useSessionStorage('ticket-list-complete', false)


export async function getAllTickets() {
   if (ticketListComplete.value) {
      return Object.values(id2ticket.value)
   }
   const response = await fetch('/api/ticket')
   const ticketList = await response.json()
   for (const ticket of ticketList) {
      id2ticket.value[ticket.id] = ticket
   }
   ticketListComplete.value = true
   return ticketList
}

export async function asyncTicket(ticketId) {
   if (id2ticket.value[ticketId] === undefined) {
      const response = await fetch(`/api/ticket/${ticketId}`)
      const ticket = await response.json()
      id2ticket.value[ticket.id] = ticket
   }
   return id2ticket.value[ticketId]
}
