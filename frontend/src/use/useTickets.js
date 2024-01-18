// import { useLocalStorage } from '@vueuse/core'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'


// const id2ticket = useLocalStorage('id2ticket', {})
const id2ticket = useLocalStorage('id2ticket', {})
const ticketListComplete = useLocalStorage('ticket-list-complete', false)


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
   return []
})

export async function asyncTicket(ticketId) {
   if (id2ticket.value[ticketId] === undefined) {
      const response = await fetch(`/api/ticket/${ticketId}`)
      const ticket = await response.json()
      id2ticket.value[ticket.id] = ticket
   }
   return id2ticket.value[ticketId]
}

export const ticketOfId = computed(() => (id) => {
   const ticket = id2ticket.value[id]
   if (ticket) return ticket
   fetch(`/api/ticket/${id}`).then(response => response.json()).then(ticket => {
      id2ticket.value[ticket.id] = ticket
   })
})

export async function createTicket(formData) {
   const response = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
   })
   const createdTicket = await response.json()
   id2ticket.value[createdTicket.id] = createdTicket
   return createdTicket
}
