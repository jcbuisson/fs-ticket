<template>
   <div class="max-w-md mx-auto mt-8">

      <p class="my-4 p-2 w-full text-lg">Votre demande a bien été enregistrée</p>

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

      <a href="/" class="mt-4 text-blue-500 hover:underline">Saisir une autre demande</a>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
   id: {
      type: String,
      required: true,
   },
})

const ticket = ref({})

onMounted(async () => {
   const response = await fetch(`/api/ticket/${props.id}`)
   ticket.value = await response.json()
})
</script>
