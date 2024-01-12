<template>
   <div class="w-80 rounded shadow-lg cursor-pointer" :class="{'bg-gray-200': selected}">
      <div class="px-6 py-4">
         <div class="font-bold text-xl mb-2">Ticket #{{ ticket.id }}</div>
         <div class="text-lg mb-2">Créé le {{ format(new Date(ticket.created_at || '1970-01-01'), 'dd/MM/yyyy HH:mm') }}</div>
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

<script setup>
import { ref, watch } from 'vue'
import { format } from 'date-fns'

import { CATEGORIES, PRIORITIES } from '../constants'
import { asyncTicket } from '../use/useTickets'

const props = defineProps({
   ticketId: {
      type: String,
      required: true,
   },
   selected: {
      type: Boolean,
      default: false,
   },
})

const ticket = ref({})

watch(() => props.ticketId, async () => {
   ticket.value = await asyncTicket(props.ticketId)
}, {
   immediate: true
})
</script>
