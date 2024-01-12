<template>
   <div class="m-4">
      <ul class="flex">
         <li><a href="#" @click="togglePriority('low')" :class="{ 'opacity-20': !filteredPriorities.has('low') }" class="bg-yellow-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Faible</a></li>
         <li><a href="#" @click="togglePriority('normal')" :class="{ 'opacity-20': !filteredPriorities.has('normal') }" class="bg-orange-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Normale</a></li>
         <li><a href="#" @click="togglePriority('high')" :class="{ 'opacity-20': !filteredPriorities.has('high') }" class="bg-red-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Élevée</a></li>
      </ul>

      <ul class="flex">
         <li><a href="#" @click="toggleCategory('furniture')" :class="{ 'opacity-20': !filteredCategories.has('furniture') }" class="bg-yellow-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Mobilier</a></li>
         <li><a href="#" @click="toggleCategory('computer')" :class="{ 'opacity-20': !filteredCategories.has('computer') }" class="bg-orange-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Informatique</a></li>
         <li><a href="#" @click="toggleCategory('other')" :class="{ 'opacity-20': !filteredCategories.has('other') }" class="bg-red-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Autre</a></li>
      </ul>

      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in visibleTickets" class="p-4">
               <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id === selectedTicketId"></TicketCard>
            </template>
         </div>

         <!-- detail -->
         <router-view class="w-full"></router-view>
      </div>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TicketCard from '/src/components/TicketCard.vue'
import router from '/src/router'
import { allTickets } from '../use/useTickets'

const selectedTicketId = ref()

const onClick = (ticketId) => {
   selectedTicketId.value = ticketId
   router.push(`/tickets/${ticketId}`)
}

const filteredPriorities = ref(new Set(['low', 'normal', 'high']))
const togglePriority = (priority) => {
   if (filteredPriorities.value.has(priority)) {
      filteredPriorities.value.delete(priority)
   } else {
      filteredPriorities.value.add(priority)
   }
   router.push(`/tickets`)
}

const filteredCategories = ref(new Set(['furniture', 'computer', 'other']))
const toggleCategory = (category) => {
   if (filteredCategories.value.has(category)) {
      filteredCategories.value.delete(category)
   } else {
      filteredCategories.value.add(category)
   }
   router.push(`/tickets`)
}


const visibleTickets = computed(() => allTickets.value
   .filter(ticket => filteredPriorities.value.has(ticket.priority))
   .filter(ticket => filteredCategories.value.has(ticket.category))
)
</script>