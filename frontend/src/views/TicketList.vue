<template>
   <div class="max-w-xl mx-auto mt-8">
      <div class="flex">
         <!-- list -->
         <div>
            <template v-for="ticket in ticketList" class="p-4">
               <TicketCard :ticketId="ticket.id"></TicketCard>
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

const ticketList = ref([])

onMounted(async () => {
   const response = await fetch('/api/ticket')
   ticketList.value = await response.json()
})
</script>