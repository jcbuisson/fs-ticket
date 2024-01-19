<template>
   <div class="max-w-md mx-auto mt-8">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
               Email
            </label>
            <input type="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Username">
         </div>
         <div class="flex items-center justify-between">
            <button @click="signin" :disabled="!email" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Sign In
            </button>
         </div>
      </form>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '/src/router'

const email = ref()

function signin() {
   fetch('/api/auth', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         email: email.value,
      }),
   })
}
</script>