<template>
   <div class="p-6">

      <label class=" mt-4 text-sm font-medium text-gray-700">Identifiant</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.id }}</p>

      <label class="block mt-4 text-sm font-medium text-gray-700">Email</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.email }}</p>

      <label class="block mt-4 text-sm font-medium text-gray-700">Catégorie</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.category }}</p>

      <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.description }}</p>

      <label class="block mt-4 text-sm font-medium text-gray-700">Priorité</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.priority }}</p>

   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
   ticketId: {
      type: String,
      required: true,
   },
})

const ticket = ref({})

onMounted(async () => {
   const response = await fetch(`/api/ticket/${props.ticketId}`)
   ticket.value = await response.json()
})
</script>
