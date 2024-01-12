<template>
   <div class="m-4">
      <ul class="flex">
         <li><a href="#" @click="toggleLowPriority" :class="{ 'opacity-20': !isLowPriorityVisible }" class="bg-yellow-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Faible</a></li>
         <li><a href="#" @click="toggleNormalPriority" :class="{ 'opacity-20': !isNormalPriorityVisible }" class="bg-orange-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Normale</a></li>
         <li><a href="#" @click="toggleHighPriority" :class="{ 'opacity-20': !isHighPriorityVisible }" class="bg-red-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Élevée</a></li>
      </ul>

      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in allTickets" class="p-4">
               <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id === selectedTicketId"></TicketCard>
            </template>
         </div>

         <!-- detail -->
         <router-view class="w-full"></router-view>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import TicketCard from '/src/components/TicketCard.vue'
import router from '/src/router'
import { allTickets } from '../use/useTickets'

const selectedTicketId = ref()
const isLowPriorityVisible = ref(true)
const isNormalPriorityVisible = ref(true)
const isHighPriorityVisible = ref(true)

const onClick = (ticketId) => {
   selectedTicketId.value = ticketId
   router.push(`/tickets/${ticketId}`)
}
const toggleLowPriority = () => isLowPriorityVisible.value = !isLowPriorityVisible.value
const toggleNormalPriority = () => isNormalPriorityVisible.value = !isNormalPriorityVisible.value
const toggleHighPriority = () => isHighPriorityVisible.value = !isHighPriorityVisible.value
</script>