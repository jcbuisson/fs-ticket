<template>
   <div class="m-4">
      <div class="flex mb-3">
         <span class="mr-2 font-bold">Priorités :</span>
         <ul class="flex space-x-1">
            <li><a href="#" @click="togglePriority('low')" :class="{ 'opacity-20': !filteredPriorities.has('low') }" class="bg-yellow-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
               {{ PRIORITIES['low'] }}
            </a></li>
            <li><a href="#" @click="togglePriority('normal')" :class="{ 'opacity-20': !filteredPriorities.has('normal') }" class="bg-orange-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
               {{ PRIORITIES['normal'] }}
            </a></li>
            <li><a href="#" @click="togglePriority('high')" :class="{ 'opacity-20': !filteredPriorities.has('high') }" class="bg-red-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
               {{ PRIORITIES['high'] }}
            </a></li>
         </ul>
         <span class="ml-8 mr-2 font-bold">Catégories :</span>
         <ul class="flex space-x-1">
            <li><a href="#" @click="toggleCategory('furniture')" :class="{ 'opacity-20': !filteredCategories.has('furniture') }" class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
               {{ CATEGORIES['furniture'] }}
            </a></li>
            <li><a href="#" @click="toggleCategory('computer')" :class="{ 'opacity-20': !filteredCategories.has('computer') }" class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
               {{ CATEGORIES['computer'] }}
            </a></li>
            <li><a href="#" @click="toggleCategory('other')" :class="{ 'opacity-20': !filteredCategories.has('other') }" class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
               {{ CATEGORIES['other'] }}
            </a></li>
         </ul>
      </div>

      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in visibleTickets" class="p-4">
               <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id == selectedTicketId"></TicketCard>
            </template>
         </div>

         <!-- detail -->
         <router-view class="w-full"></router-view>
      </div>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import router from '/src/router'
import { allTickets } from '../use/useTickets'
import TicketCard from '/src/components/TicketCard.vue'
import { CATEGORIES, PRIORITIES } from '/src/constants'


const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)

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
   // filter list by priorities
   .filter(ticket => filteredPriorities.value.has(ticket.priority))
   // filter list by categories
   .filter(ticket => filteredCategories.value.has(ticket.category))
   // sort result by 'created_at' attribute
   .sort((ticket1, ticket2) => {
      // return new Date(ticket1.created_at) - new Date(ticket2.created_at)
      if (ticket1.created_at < ticket2.created_at) return -1
      if (ticket1.created_at > ticket2.created_at) return 1
      return 0
   })
)
</script>