<template>
   <div class="max-w-md mx-auto mt-8">
      <!-- Email Input -->
      <label class="block mt-4 text-sm font-medium text-gray-700">Email</label>
      <input v-model="formData.email" type="email" class="mt-1 p-2 border rounded-md w-full" />
      <div v-if="!isEmailValid" class="text-red-500 text-sm mt-1">Entrez une adresse mail valide</div>

      <!-- Category Level Select -->
      <label class="block mt-4 text-sm font-medium text-gray-700">Catégorie</label>
      <select v-model="formData.category" class="mt-1 p-2 border rounded-md w-full">
         <option value="furniture">Mobilier</option>
         <option value="computer">Informatique</option>
         <option value="other">Autre</option>
      </select>
      <div v-if="!isCategoryValid" class="text-red-500 text-sm mt-1">Choisissez la catégorie</div>

      <!-- Description Textarea -->
      <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
      <textarea v-model="formData.description" class="mt-1 p-2 border rounded-md w-full"></textarea>
      <div v-if="!isDescriptionValid" class="text-red-500 text-sm mt-1">La description ne doit pas être vide</div>

      <!-- Priority Select -->
      <label class="block mt-4 text-sm font-medium text-gray-700">Priorité</label>
      <select v-model="formData.priority" class="mt-1 p-2 border rounded-md w-full">
         <option value="low">Faible</option>
         <option value="normal">Normale</option>
         <option value="high">Haute</option>
      </select>
      <div v-if="!isPriorityValid" class="text-red-500 text-sm mt-1">Choisissez la priorité</div>

      <!-- Submit Button -->
      <button @click="submitForm" :disabled="!isFormValid" class="mt-4 p-2 text-white rounded-md hover:valid:bg-blue-600 bg-blue-500 disabled:bg-red-600">
         Valider
      </button>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import router from '/src/router'

const formData = ref({
   email: null,
   category: null,
   description: null,
   priority: null,
})

const submitForm = async () => {
   console.log('Form submitted with data:', formData.value)
   const response = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
   })
   const createdTicket = await response.json()
   console.log('createdTicket', createdTicket)
   router.push(`/recap/${createdTicket.id}`)
}

const isEmailValid = computed(() => {
   if (!formData.value) return false
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(formData.value.email)
})
const isCategoryValid = computed(() => !!formData.value.category)
const isDescriptionValid = computed(() => formData.value.description && formData.value.description.length > 0)
const isPriorityValid = computed(() => !!formData.value.priority)

const isFormValid = computed(() => isEmailValid.value && isCategoryValid.value && isDescriptionValid.value && isPriorityValid.value)
</script>
