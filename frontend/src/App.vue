<template>
   <div class="max-w-md mx-auto mt-8">
      <form @submit.prevent="submitForm">

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
         <button type="submit" :disabled="!isFormValid" class="mt-4 p-2 bg-blue-500 text-white rounded-md hover:valid:bg-blue-600" :class="{ 'bg-red-500' : !isFormValid}">
            Valider
         </button>
      </form>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
   email: null,
   category: null,
   description: null,
   priority: null,
})

const submitForm = () => {
   console.log('Form submitted with data:', formData.value)
}

const isEmailValid = computed(() => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(formData.value.email)
})
const isCategoryValid = computed(() => !!formData.value.category)
const isDescriptionValid = computed(() => formData.value.description.length > 0)
const isPriorityValid = computed(() => !!formData.value.priority)

const isFormValid = computed(() => isEmailValid.value && isCategoryValid.value && isDescriptionValid.value && isPriorityValid.value)
</script>

<style>
input:invalid {
  border: 2px dashed red;
}
</style>