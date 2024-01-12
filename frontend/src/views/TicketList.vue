<template>
   <div class="max-w-xl mx-auto mt-8">
      <template v-for="ticket in ticketList">
         <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
               <div class="font-bold text-xl mb-2">Ticket #{{ ticket.id }}</div>
               <p class="text-gray-700 text-sm">
                  {{ ticket.description }}
               </p>
            </div>
            <div class="px-6 pt-2 pb-2">
               <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ CATEGORIES[ticket.category] }}</span>
               <span class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  :class="{'bg-red-200': ticket.priority === 'high', 'bg-orange-200': ticket.priority === 'normal', 'bg-yellow-200': ticket.priority === 'low',  }">
                  {{ PRIORITIES[ticket.priority] }}
               </span>
            </div>
         </div>
      </template>
   </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { CATEGORIES, PRIORITIES } from '../constants'

const ticketList = ref([])

onMounted(async () => {
   const response = await fetch('/api/ticket', {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
      },
   })
   ticketList.value = await response.json()
})
</script>