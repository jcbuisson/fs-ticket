<template>
   <div class="m-4">
      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in ticketList" class="p-4">
               <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id == selectedTicketId"></TicketCard>
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

const ticketList = ref([])

const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)


onMounted(async () => {
   const response = await fetch('/api/ticket')
   ticketList.value = await response.json()
})

const onClick = (ticketId) => {
   selectedTicketId.value = ticketId
   router.push(`/tickets/${ticketId}`)
}
</script>