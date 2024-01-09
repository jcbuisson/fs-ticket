<template>
   <div class="max-w-md mx-auto mt-8">
      <form @submit.prevent="submitForm">

         <!-- Email Input -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Email</label>
         <input v-model="formData.email" type="email" class="mt-1 p-2 border rounded-md w-full" />
         
         <!-- Textarea -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
         <textarea v-model="formData.description" class="mt-1 p-2 border rounded-md w-full"></textarea>

         <!-- Priority Level Select -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Priorité</label>
         <select v-model="formData.priority" class="mt-1 p-2 border rounded-md w-full">
            <option value="low">Faible</option>
            <option value="normal">Normale</option>
            <option value="high">Haute</option>
         </select>

         <!-- Submit Button -->
         <button type="submit" class="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Valider
         </button>
      </form>
   </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
   email: '',
   description: '',
   priority: 'normal',
})

const submitForm = () => {
   console.log('Form submitted with data:', formData.value)
}
</script>
