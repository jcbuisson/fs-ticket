
const id2ticket = {}
let ticketListComplete = false

export async function getAllTickets() {
   if (ticketListComplete) {
      return Object.values(id2ticket)
   }
   const response = await fetch('/api/ticket')
   const ticketList = await response.json()
   for (const ticket of ticketList) {
      id2ticket[ticket.id] = ticket
   }
   ticketListComplete = true
   return ticketList
}

export async function asyncTicket(ticketId) {
   if (id2ticket[ticketId] === undefined) {
      const response = await fetch(`/api/ticket/${ticketId}`)
      const ticket = await response.json()
      id2ticket[ticket.id] = ticket
   }
   return id2ticket[ticketId]
}
