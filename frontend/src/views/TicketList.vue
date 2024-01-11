<template>
   <div class="max-w-xl mx-auto mt-8">
      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in ticketList" class="p-4">
               <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id === selectedTicketId"></TicketCard>
            </template>
         </div>

         <!-- detail -->
         <router-view></router-view>
      </div>
   </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import TicketCard from '/src/components/TicketCard.vue'
import router from '/src/router'
import { getAllTickets } from '../use/useTickets'

const ticketList = ref([])
const selectedTicketId = ref()

onMounted(async () => {
   ticketList.value = await getAllTickets()
})

const onClick = (ticketId) => {
   selectedTicketId.value = ticketId
   router.push(`/tickets/${ticketId}`)
}
</script>