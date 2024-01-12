<template>
   <div class="m-4">
      <ul class="flex">
         <li><a href="#" @click="toggleLowPriority" :class="{ 'opacity-20': !visiblePriorities.has('low') }" class="bg-yellow-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Faible</a></li>
         <li><a href="#" @click="toggleNormalPriority" :class="{ 'opacity-20': !visiblePriorities.has('normal') }" class="bg-orange-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Normale</a></li>
         <li><a href="#" @click="toggleHighPriority" :class="{ 'opacity-20': !visiblePriorities.has('high') }" class="bg-red-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">Élevée</a></li>
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
const toggleLowPriority = () => visiblePriorities.value.has('low') ? visiblePriorities.value.delete('low') : visiblePriorities.value.add('low')
const toggleNormalPriority = () => visiblePriorities.value.has('normal') ? visiblePriorities.value.delete('normal') : visiblePriorities.value.add('normal')
const toggleHighPriority = () => visiblePriorities.value.has('high') ? visiblePriorities.value.delete('high') : visiblePriorities.value.add('high')

const visiblePriorities = ref(new Set(['low', 'normal', 'high']))

const filteredCategories = ref(new Set(['furniture', 'computer', 'other']))
const toggleCategory = (category) => {
   console.log('category', category)
   if (filteredCategories.value.has(category)) {
      visiblePriorities.value.delete(category)
   } else {
      visiblePriorities.value.add(category)
   }
}


const visibleTickets = computed(() => allTickets.value
   .filter(ticket => visiblePriorities.value.has(ticket.priority))
   .filter(ticket => filteredCategories.value.has(ticket.category))
)
</script>