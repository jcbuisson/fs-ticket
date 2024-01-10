<template>
   <div class="max-w-xl mx-auto mt-8">

      <!-- <div class="grid grid-cols-2 gap-3"> -->
         <template v-for="ticket in ticketList" class="p-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
               <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">Ticket #{{ ticket.id }}</div>
                  <p class="text-gray-700 text-sm">
                     {{ ticket.description }}
                  </p>
               </div>
               <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ ticket.category }}</span>
                  <span class="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ ticket.priority }}</span>
               </div>
            </div>
         </template>
      <!-- </div> -->
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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