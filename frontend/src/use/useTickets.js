
const id2ticket = {}


export async function getAllTickets() {
   const response = await fetch('/api/ticket')
   const ticketList = await response.json()
   for (const ticket of ticketList) {
      id2ticket[ticket.id] = ticket
   }
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
