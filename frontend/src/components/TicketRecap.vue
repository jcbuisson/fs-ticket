<template>
   <div class="max-w-md mx-auto mt-8">

      <p class="my-4 p-2 w-full text-lg">Votre demande a bien été enregistrée</p>

      <label class=" mt-4 text-sm font-medium text-gray-700">Identifiant : <span class="mt-1 p-2 w-full">{{ ticket.id }}</span></label>
      

      <label class="block mt-4 text-sm font-medium text-gray-700">Email : <span class="mt-1 p-2 w-full">{{ ticket.email }}</span></label>

      <label class="block mt-4 text-sm font-medium text-gray-700">Catégorie : <span class="mt-1 p-2 w-full">{{ CATEGORIES[ticket.category] }}</span></label>

      <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
      <p class="mt-1 p-2 border rounded-md w-full">{{ ticket.description }}</p>

      <label class="block mt-4 text-sm font-medium text-gray-700">Priorité : <span class="mt-1 p-2 w-full">{{ PRIORITIES[ticket.priority] }}</span></label>

      <a href="/" class="block mt-4 text-blue-500 hover:underline">Saisir une autre demande</a>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CATEGORIES, PRIORITIES } from '../constants'

const props = defineProps({
   ticketId: {
      type: Number,
      required: true,
   },
})

const ticket = ref({})

onMounted(async () => {
   const response = await fetch(`/api/ticket/${props.ticketId}`)
   ticket.value = await response.json()
})
</script>
