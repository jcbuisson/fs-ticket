<template>
   <div class="max-w-md mx-auto mt-8">
      <form @submit.prevent="submitForm">

         <!-- Email Input -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Email</label>
         <input v-model="formData.email" type="email" class="mt-1 p-2 border rounded-md w-full" />
         <div v-if="!isEmailValid" class="text-red-500 text-sm mt-1">Entrez une adresse mail valide</div>

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

         <!-- Submit Button -->
         <button type="submit" :disabled="!isFormValid" class="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Valider
         </button>
      </form>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
   email: '',
   description: '',
   priority: 'normal',
})

const submitForm = () => {
   console.log('Form submitted with data:', formData.value)
}

const isEmailValid = computed(() => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(formData.value.email)
})
const isDescriptionValid = computed(() => formData.value.description.length > 0)
const isFormValid = computed(() => isEmailValid.value && isDescriptionValid.value)

</script>
