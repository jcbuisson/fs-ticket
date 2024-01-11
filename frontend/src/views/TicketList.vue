<template>
   <div class="w-full mx-auto mt-8">
      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in ticketList" class="p-4">
               <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id === selectedTicketId"></TicketCard>
            </template>
         </div>

         <!-- detail -->
         <router-view class="w-full"></router-view>
      </div>
   </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import TicketCard from '/src/components/TicketCard.vue'
import router from '/src/router'
import { getAllTickets } from '../use/useTickets'

const ticketList = ref([])

const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)

onMounted(async () => {
   const unsortedTicketList = await getAllTickets()
   ticketList.value = unsortedTicketList.sort((t1, t2) => (t2.created_at < t1.created_at) ? 1 : -1)
})

const onClick = (ticketId) => {
   selectedTicketId.value = ticketId
   router.push(`/tickets/${ticketId}`)
}
</script>
