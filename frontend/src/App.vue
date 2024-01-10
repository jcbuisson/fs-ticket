<template>
   <div class="max-w-md mx-auto mt-8">
      <form @submit.prevent="submitForm">

         <!-- Email Input version 2 -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Email</label>
         <input ref="emailRef" v-model="formData.email" type="email" class="mt-1 p-2 border rounded-md w-full invalid:border-red-500 invalid:border-2 invalid:border-dashed" />
         <div v-if="!isEmailValid2" class="text-red-500 text-sm mt-1">Entrez une adresse mail valide</div>

         <!-- Category Level Select -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Catégorie</label>
         <select v-model="formData.category" class="mt-1 p-2 border rounded-md w-full">
            <option value="furniture">Mobilier</option>
            <option value="computer">Informatique</option>
            <option value="other">Autre</option>
         </select>
         <div v-if="!isCategoryValid" class="text-red-500 text-sm mt-1">Choisissez la catégorie</div>

         <!-- Description Textarea, version 2 -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Description</label>
         <textarea ref="descriptionRef" v-model="formData.description" class="mt-1 p-2 border rounded-md w-full invalid:border-red-500 invalid:border-2 invalid:border-dashed" required></textarea>
         <div v-if="!isDescriptionValid2" class="text-red-500 text-sm mt-1">La description ne doit pas être vide</div>

         <!-- Priority Select -->
         <label class="block mt-4 text-sm font-medium text-gray-700">Priorité</label>
         <select v-model="formData.priority" class="mt-1 p-2 border rounded-md w-full">
            <option value="low">Faible</option>
            <option value="normal">Normale</option>
            <option value="high">Haute</option>
         </select>
         <div v-if="!isPriorityValid" class="text-red-500 text-sm mt-1">Choisissez la priorité</div>

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
   category: null,
   description: '',
   priority: null,
})

const submitForm = () => {
   console.log('Form submitted with data:', formData.value)
}

const emailRef = ref(null)
const descriptionRef = ref(null)

const isEmailValid = computed(() => emailRef.value && emailRef.value.validity.valid)
const isCategoryValid = computed(() => !!formData.value.category)
const isDescriptionValid = computed(() => descriptionRef.value && descriptionRef.value.validity.valid)
const isPriorityValid = computed(() => !!formData.value.priority)

const isFormValid = computed(() => isEmailValid.value && isCategoryValid.value && isDescriptionValid.value && isPriorityValid.value)

</script>
